import { NextResponse } from "next/server";

/* Contact form endpoint.
 *
 * Hardening:
 * - Server-side validates every field (regex, length caps, allow-list for topic)
 * - Honeypot field traps bots
 * - Escapes HTML in the email body so user input can't inject markup
 * - Whitelists topic to a fixed enum
 *
 * Delivery:
 * - If RESEND_API_KEY is set → posts to Resend's REST API (no SDK needed)
 * - If not → returns { configured: false } so the client can fall back
 *   to mailto:, which keeps the form usable in development. */

const TO_EMAIL = "contact@kpcty.com";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_EMAIL_LEN = 254;

const TOPICS = ["general", "commission", "wholesale", "press", "care"] as const;
type Topic = (typeof TOPICS)[number];
const TOPIC_LABEL: Record<Topic, string> = {
  general:    "General",
  commission: "Commission",
  wholesale:  "Wholesale",
  press:      "Press / Studio",
  care:       "Care & Repair",
};

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
  /* ── Parse body ── */
  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    return jsonError("Invalid request.", 400);
  }

  /* ── Honeypot ── */
  if (typeof payload.honeypot === "string" && payload.honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  /* ── Sanitize ── */
  const str = (v: unknown, max = 4000) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const email   = str(payload.email,   MAX_EMAIL_LEN).toLowerCase();
  const name    = str(payload.name,    120);
  const wish    = str(payload.wish,    140);
  const message = str(payload.message, 4000);
  const rawTopic = str(payload.topic,  32);
  const topic: Topic = (TOPICS as readonly string[]).includes(rawTopic)
    ? (rawTopic as Topic)
    : "general";

  /* ── Validate ── */
  if (!email || email.length > MAX_EMAIL_LEN || !EMAIL_REGEX.test(email)) {
    return jsonError("Please enter a valid email address.", 400);
  }
  if (!message) {
    return jsonError("Please write a message before sending.", 400);
  }

  /* ── Build email body ── */
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

  /* ── Resend delivery ── */
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn(
      "[contact] RESEND_API_KEY not set — message captured but not delivered.\n" +
        "Add RESEND_API_KEY (and optionally RESEND_FROM_EMAIL) to .env to enable delivery.",
    );
    return jsonError(
      "Email service isn't configured yet — opening your email client instead.",
      503,
      { configured: false },
    );
  }

  /* Resend requires a verified sending domain. Override via env var.
   * For dev with no verified domain, you can use 'onboarding@resend.dev'. */
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "KPCTY <contact@kpcty.com>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:     fromEmail,
        to:       [TO_EMAIL],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      console.error("[contact] Resend rejected:", res.status, errBody);
      return jsonError(
        "We couldn't send your message. Please try again or email us directly at " +
          TO_EMAIL,
        502,
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Network error reaching Resend:", err);
    return jsonError("Network error. Please try again.", 500);
  }
}
