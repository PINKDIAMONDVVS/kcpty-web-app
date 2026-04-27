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
  /* Shopify caps passwords at 40 chars and requires at least 5.
   * 32 hex chars = 128 bits of entropy — way more than needed and
   * comfortably under the limit. Never returned to the client. */
  return crypto.randomUUID().replace(/-/g, "");
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
      /* Print the exact Shopify response so you can see what's failing.
       * Shopify returns code + field + human-readable message — most useful
       * codes here are TAKEN / CUSTOMER_DISABLED (already a customer),
       * BAD_DOMAIN (email blocklisted), INVALID, BLANK. */
      console.warn(
        "[subscribe] Shopify customerUserErrors:",
        JSON.stringify(errs, null, 2),
      );

      // These all effectively mean "you're already known to us" — treat as success.
      const alreadyExists = errs.some((e) =>
        ["TAKEN", "CUSTOMER_DISABLED", "ALREADY_ENABLED"].includes(e.code),
      );
      if (alreadyExists) {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }

      // Pick the most informative message Shopify returned for the user.
      const firstMsg = errs[0]?.message ?? "We couldn't subscribe you.";
      const code = errs[0]?.code ?? "UNKNOWN";

      // Friendlier copy for the common ones; raw message otherwise so you can
      // see exactly what Shopify is complaining about while debugging.
      let userMsg = firstMsg;
      if (code === "BAD_DOMAIN") userMsg = "That email domain isn't accepted.";
      if (code === "INVALID")    userMsg = "Please enter a valid email address.";
      if (code === "BLANK")      userMsg = "Please enter your email.";

      return NextResponse.json(
        { error: userMsg, code, debug: errs },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] Shopify network/transport error:", err);
    const message =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: unknown }).message)
        : "Network error reaching Shopify.";
    return NextResponse.json(
      { error: "Something went wrong. Please try again.", debug: message },
      { status: 500 },
    );
  }
}
