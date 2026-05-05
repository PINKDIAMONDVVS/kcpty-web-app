import { NextResponse } from "next/server";

/* Shared transport for Resend-backed email handlers (currently
 * /api/contact and /api/notify-similar). Each route still owns its
 * own message text + HTML; this module owns the Resend POST,
 * env-var resolution, and the small JSON helpers both routes need. */

const DEFAULT_FROM_EMAIL = "KPCTY <contact@kpcty.com>";
const DEFAULT_TO_EMAIL = "contact@kpcty.com";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function jsonError(
  message: string,
  status: number,
  extra?: Record<string, unknown>,
): NextResponse {
  return NextResponse.json({ error: message, ...extra }, { status });
}

export type ResendResult =
  | { status: "ok" }
  | { status: "not-configured" }
  | { status: "rejected"; httpStatus: number; body: unknown }
  | { status: "network-error"; error: unknown };

export async function sendResendEmail(opts: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<ResendResult> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return { status: "not-configured" };

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
        reply_to: opts.replyTo,
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { status: "rejected", httpStatus: res.status, body };
    }

    return { status: "ok" };
  } catch (error) {
    return { status: "network-error", error };
  }
}
