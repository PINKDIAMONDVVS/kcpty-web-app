import { NextResponse } from "next/server";

/* Back-in-stock / "similar piece dropped" capture endpoint.
 *
 * Hardening:
 * - Validates email + product handle, caps lengths
 * - Honeypot field traps bots
 * - Escapes any user-supplied text in the email body
 *
 * Delivery:
 * - With RESEND_API_KEY set, emails CONTACT_TO_EMAIL with the captured
 *   address + the product the shopper was looking at, so the studio can
 *   match a future piece to a waiting buyer.
 * - Without RESEND_API_KEY, returns 503 + { configured: false } so the
 *   form can degrade gracefully in dev.
 *
 * NOTE: This is a lightweight v1 — every request fires one email. If
 * volume grows, swap in a database / mailing list (Klaviyo, Loops,
 * Shopify customer with a tag) and dedupe by email + handle.
 */

const DEFAULT_FROM_EMAIL = "KPCTY <contact@kpcty.com>";
const DEFAULT_TO_EMAIL = "contact@kpcty.com";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_EMAIL_LEN = 254;
const MAX_HANDLE_LEN = 200;
const MAX_TITLE_LEN = 240;

function jsonError(message: string, status: number, extra?: object) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    return jsonError("Invalid request.", 400);
  }

  /* Honeypot — silent OK so bots can't probe response shape. */
  if (typeof payload.honeypot === "string" && payload.honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const str = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const email = str(payload.email, MAX_EMAIL_LEN).toLowerCase();
  const productHandle = str(payload.productHandle, MAX_HANDLE_LEN);
  const productTitle = str(payload.productTitle, MAX_TITLE_LEN);

  if (!email || !EMAIL_REGEX.test(email)) {
    return jsonError("Please enter a valid email address.", 400);
  }
  if (!productHandle) {
    return jsonError("Missing product reference.", 400);
  }

  const subject = `KPCTY · Notify-when-similar · ${productTitle || productHandle}`;
  const text = [
    "New back-in-stock waitlist signup.",
    "",
    `Email:   ${email}`,
    `Product: ${productTitle || "(no title)"}`,
    `Handle:  ${productHandle}`,
    "",
    "Sent from kpcty.com / sold-out PDP",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html><body style="margin:0;background:#07070a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f4f3ee;">
  <div style="max-width:600px;margin:0 auto;padding:32px;background:#07070a;border:1px solid rgba(255,255,255,0.18);">
    <div style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.22em;color:#a78bfa;text-transform:uppercase;margin-bottom:20px;">⊕ KPCTY · Notify-when-similar</div>
    <div style="font-family:Georgia,serif;font-size:24px;line-height:1.2;margin-bottom:20px;color:#f4f3ee;">A shopper wants the next ${escapeHtml(productTitle || productHandle)}</div>
    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:16px;margin-bottom:12px;">
      <p style="font-family:ui-monospace,monospace;font-size:10px;color:#7a7873;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 6px;">Email</p>
      <p style="font-size:14px;margin:0;color:#c8c6bf;">${escapeHtml(email)}</p>
    </div>
    <div style="margin-bottom:12px;">
      <p style="font-family:ui-monospace,monospace;font-size:10px;color:#7a7873;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 6px;">Sold-out piece</p>
      <p style="font-size:14px;margin:0;color:#c8c6bf;">${escapeHtml(productTitle || "(no title)")}</p>
      <p style="font-family:ui-monospace,monospace;font-size:11px;margin:4px 0 0;color:#7a7873;">/${escapeHtml(productHandle)}</p>
    </div>
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.1);font-family:ui-monospace,monospace;font-size:10px;color:#7a7873;letter-spacing:0.18em;text-transform:uppercase;">Match them to the next similar piece.</div>
  </div>
</body></html>`;

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn(
      "[notify-similar] RESEND_API_KEY not set — capture skipped.\n" +
        "Set RESEND_API_KEY + CONTACT_TO_EMAIL in .env to enable.",
    );
    return jsonError(
      "Notifications aren't configured yet. Please email us directly.",
      503,
      { configured: false },
    );
  }

  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO_EMAIL;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      console.error("[notify-similar] Resend rejected:", res.status, errBody);
      return jsonError("Could not save your email right now.", 502);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[notify-similar] Network error reaching Resend:", err);
    return jsonError("Network error. Please try again.", 500);
  }
}
