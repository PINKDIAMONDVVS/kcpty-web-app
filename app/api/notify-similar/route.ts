import { escapeHtml, jsonError, sendResendEmail } from "lib/email";
import { NextResponse } from "next/server";

/* Back-in-stock / "similar piece dropped" capture endpoint.
 *
 * Hardening:
 * - Validates email + product handle, caps lengths
 * - Honeypot field traps bots
 * - Escapes any user-supplied text in the email body
 *
 * Delivery is delegated to lib/email.ts.
 *
 * NOTE: This is a lightweight v1 — every request fires one email. If
 * volume grows, swap in a database / mailing list (Klaviyo, Loops,
 * Shopify customer with a tag) and dedupe by email + handle. */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_EMAIL_LEN = 254;
const MAX_HANDLE_LEN = 200;
const MAX_TITLE_LEN = 240;

export async function POST(req: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    return jsonError("Invalid request.", 400);
  }

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

  const result = await sendResendEmail({ subject, text, html, replyTo: email });

  switch (result.status) {
    case "ok":
      return NextResponse.json({ ok: true });
    case "not-configured":
      console.warn(
        "[notify-similar] RESEND_API_KEY not set — capture skipped.",
      );
      return jsonError(
        "Notifications aren't configured yet. Please email us directly.",
        503,
        { configured: false },
      );
    case "rejected":
      console.error(
        "[notify-similar] Resend rejected:",
        result.httpStatus,
        result.body,
      );
      return jsonError("Could not save your email right now.", 502);
    case "network-error":
      console.error(
        "[notify-similar] Network error reaching Resend:",
        result.error,
      );
      return jsonError("Network error. Please try again.", 500);
  }
}
