import { escapeHtml, jsonError, sendResendEmail } from "lib/email";
import { NextResponse } from "next/server";

/* Contact form endpoint.
 *
 * Hardening:
 * - Server-side validates every field (regex, length caps, allow-list for topic)
 * - Honeypot field traps bots
 * - Escapes HTML in the email body so user input can't inject markup
 * - Whitelists topic to a fixed enum
 *
 * Delivery is delegated to lib/email.ts. If RESEND_API_KEY is unset,
 * the client receives 503 + { configured: false } so it can fall back
 * to mailto: in development. */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_EMAIL_LEN = 254;

const TOPICS = ["general", "commission", "wholesale", "press", "care"] as const;
type Topic = (typeof TOPICS)[number];
const TOPIC_LABEL: Record<Topic, string> = {
  general: "General",
  commission: "Commission",
  wholesale: "Wholesale",
  press: "Press / Studio",
  care: "Care & Repair",
};

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

  const str = (v: unknown, max = 4000) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const email = str(payload.email, MAX_EMAIL_LEN).toLowerCase();
  const name = str(payload.name, 120);
  const wish = str(payload.wish, 140);
  const message = str(payload.message, 4000);
  const rawTopic = str(payload.topic, 32);
  const topic: Topic = (TOPICS as readonly string[]).includes(rawTopic)
    ? (rawTopic as Topic)
    : "general";

  if (!email || email.length > MAX_EMAIL_LEN || !EMAIL_REGEX.test(email)) {
    return jsonError("Please enter a valid email address.", 400);
  }
  if (!message) {
    return jsonError("Please write a message before sending.", 400);
  }

  const topicLabel = TOPIC_LABEL[topic];
  const subject = `KPCTY · ${topicLabel}${wish ? ` · ${wish}` : ""}`;

  const text = [
    `Topic:    ${topicLabel}`,
    name ? `From:     ${name}` : null,
    `Reply-to: ${email}`,
    wish ? `Wish:     ${wish}` : null,
    "",
    "─────────────────────────",
    message,
    "─────────────────────────",
    "",
    "Sent from kpcty.com / contact",
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  const html = `<!DOCTYPE html>
<html><body style="margin:0;background:#07070a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f4f3ee;">
  <div style="max-width:600px;margin:0 auto;padding:32px;background:#07070a;border:1px solid rgba(255,255,255,0.18);">
    <div style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.22em;color:#a78bfa;text-transform:uppercase;margin-bottom:20px;">⊕ KPCTY · New message</div>
    <div style="font-family:Georgia,serif;font-size:28px;line-height:1.2;margin-bottom:24px;color:#f4f3ee;">${escapeHtml(topicLabel)}${wish ? ` · <em style="color:#a78bfa;font-style:italic;">${escapeHtml(wish)}</em>` : ""}</div>
    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:16px;margin-bottom:20px;">
      <p style="font-family:ui-monospace,monospace;font-size:10px;color:#7a7873;letter-spacing:0.18em;text-transform:uppercase;margin:0;">From</p>
      <p style="font-size:14px;margin:6px 0 0;color:#c8c6bf;">${escapeHtml(name || "Anonymous")} &lt;${escapeHtml(email)}&gt;</p>
    </div>
    <div style="font-family:Georgia,serif;font-size:16px;line-height:1.6;white-space:pre-wrap;color:#f4f3ee;">${escapeHtml(message)}</div>
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.1);font-family:ui-monospace,monospace;font-size:10px;color:#7a7873;letter-spacing:0.18em;text-transform:uppercase;">Sent from kpcty.com</div>
  </div>
</body></html>`;

  const result = await sendResendEmail({ subject, text, html, replyTo: email });

  switch (result.status) {
    case "ok":
      return NextResponse.json({ ok: true });
    case "not-configured":
      console.warn(
        "[contact] RESEND_API_KEY not set — message captured but not delivered.",
      );
      return jsonError(
        "Email service isn't configured yet — opening your email client instead.",
        503,
        { configured: false },
      );
    case "rejected":
      console.error("[contact] Resend rejected:", result.httpStatus, result.body);
      return jsonError(
        "We couldn't send your message. Please try again or email us directly.",
        502,
      );
    case "network-error":
      console.error("[contact] Network error reaching Resend:", result.error);
      return jsonError("Network error. Please try again.", 500);
  }
}
