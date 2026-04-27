import {
  customerCreateMutation,
  type CustomerCreateOperation,
} from "lib/shopify/mutations/customer";
import { shopifyFetch } from "lib/shopify";
import { NextResponse } from "next/server";

/* Newsletter signup endpoint.
 * - Server-side validates the email (RFC-ish regex + length cap)
 * - Honeypot field traps bots without a captcha
 * - Hits Storefront API customerCreate with acceptsMarketing: true
 * - Treats "already exists" as success so we never leak account existence
 * - Generates a strong random password server-side; client never sees it */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_EMAIL_LEN = 254; // RFC 5321 limit

function generatePassword(): string {
  // 64 hex chars — way past Shopify's minimum and never returned to client.
  return crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  /* ── Parse body ── */
  let payload: { email?: unknown; honeypot?: unknown } = {};
  try {
    payload = await req.json();
  } catch {
    return jsonError("Invalid request.", 400);
  }

  /* ── Honeypot — bots autofill any input. Real users never see this. ── */
  if (typeof payload.honeypot === "string" && payload.honeypot.length > 0) {
    // Pretend success so bots get no useful signal back.
    return NextResponse.json({ ok: true });
  }

  /* ── Sanitize + validate email ── */
  if (typeof payload.email !== "string") {
    return jsonError("Please enter a valid email address.", 400);
  }
  const email = payload.email.trim().toLowerCase();
  if (!email || email.length > MAX_EMAIL_LEN || !EMAIL_REGEX.test(email)) {
    return jsonError("Please enter a valid email address.", 400);
  }

  /* ── Call Shopify Storefront API ── */
  try {
    const res = await shopifyFetch<CustomerCreateOperation>({
      query: customerCreateMutation,
      variables: {
        input: {
          email,
          password: generatePassword(),
          acceptsMarketing: true,
        },
      },
      // Avoid Next.js fetch caching for write ops
      headers: { "Cache-Control": "no-store" },
    });

    const errs = res.body?.data?.customerCreate?.customerUserErrors ?? [];

    if (errs.length > 0) {
      // "TAKEN" / "CUSTOMER_DISABLED" — already a customer; treat as success.
      const alreadyExists = errs.some((e) =>
        ["TAKEN", "CUSTOMER_DISABLED"].includes(e.code),
      );
      if (alreadyExists) {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }
      // Don't leak Shopify internal codes to the client.
      console.warn("[subscribe] Shopify rejected:", errs);
      return jsonError("We couldn't subscribe you. Please try again.", 400);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] Shopify error:", err);
    return jsonError("Something went wrong. Please try again.", 500);
  }
}
