'use client';

import { useEffect, useState } from 'react';

const TO = 'contact@kpcty.com';

const TOPICS = [
  { id: 'general',    label: 'General',        zh: '问候' },
  { id: 'commission', label: 'Commission',     zh: '订制' },
  { id: 'wholesale',  label: 'Wholesale',      zh: '批发' },
  { id: 'press',      label: 'Press / Studio', zh: '媒体' },
  { id: 'care',       label: 'Care & Repair',  zh: '修复' },
] as const;

type TopicId = typeof TOPICS[number]['id'];

type FormState = {
  name:    string;
  email:   string;
  topic:   TopicId;
  message: string;
  wish:    string;
};

const EMPTY: FormState = {
  name:    '',
  email:   '',
  topic:   'general',
  message: '',
  wish:    '',
};

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [honeypot, setHoneypot] = useState(''); // bot trap
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  /* UTC clock — set after mount to dodge SSR hydration mismatch. */
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    setTime(new Date());
    const t = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  /* Build the mailto: fallback URL — used when the API isn't configured. */
  function buildMailto() {
    const topicLabel = TOPICS.find((t) => t.id === form.topic)?.label ?? 'General';
    const wish = form.wish.trim();
    const subject = `KPCTY · ${topicLabel}${wish ? ` · ${wish}` : ''}`;
    const body = [
      `Topic: ${topicLabel}`,
      form.name.trim()  ? `From: ${form.name.trim()}`     : null,
      form.email.trim() ? `Reply-to: ${form.email.trim()}` : null,
      wish              ? `Wish: ${wish}`                  : null,
      '',
      form.message.trim(),
      '',
      '— Sent from kpcty.com / contact',
    ]
      .filter((l): l is string => l !== null)
      .join('\n');
    return `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'sending') return;
    if (!form.email.trim() || !form.message.trim()) return;

    setState('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?:         boolean;
        error?:      string;
        configured?: boolean;
      };

      if (res.ok && data.ok) {
        setState('sent');
        return;
      }

      /* If the server says email isn't configured, fall back to mailto: */
      if (res.status === 503 && data.configured === false) {
        window.location.href = buildMailto();
        setState('sent');
        return;
      }

      setErrorMsg(data.error ?? 'Could not send your message. Please try again.');
      setState('error');
    } catch {
      setErrorMsg('Network error. Please try again.');
      setState('error');
    }
  }

  function reset() {
    setForm(EMPTY);
    setHoneypot('');
    setState('idle');
    setErrorMsg('');
  }

  const sending = state === 'sending';
  const sent    = state === 'sent';

  const utc =
    time
      ? `${String(time.getUTCHours()).padStart(2, '0')}:${String(time.getUTCMinutes()).padStart(2, '0')}`
      : '--:--';

  return (
    <>
      <div
        className="mono up"
        style={{ fontSize: 10.5, letterSpacing: '0.22em', color: 'var(--cinnabar)', marginBottom: 6 }}
      >
        ⦿ Send a message · 寄信
      </div>
      <div
        className="mono"
        style={{ fontSize: 10.5, color: 'var(--fg-3)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 24 }}
      >
        UTC {utc} · console
      </div>

      {sent ? (
        <div
          style={{
            padding: '48px 32px',
            border: '1px solid var(--cinnabar)',
            background: 'var(--bg-1)',
            position: 'relative',
          }}
        >
          <div
            className="mono up"
            style={{ fontSize: 10.5, letterSpacing: '0.24em', color: 'var(--cinnabar)', marginBottom: 14 }}
          >
            ✓ Message sealed · 已封缄
          </div>
          <div
            className="serif"
            style={{ fontSize: 36, fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 14 }}
          >
            Your wish is on the table.
          </div>
          <p style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.55, maxWidth: '44ch' }}>
            We've got it — we'll write back within 48 hours, usually faster,
            unless we're at the workshop. If you don't see a reply, check spam
            or write us directly at {TO}.
          </p>
          <button
            type="button"
            onClick={reset}
            className="btn-pill"
            style={{ marginTop: 24, color: 'var(--fg)', borderColor: 'var(--fg)' }}
          >
            Send another ▶
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }} noValidate>
          {/* Topic radio */}
          <div>
            <label
              className="mono up"
              style={{ fontSize: 10, letterSpacing: '0.22em', color: 'var(--fg-3)', display: 'block', marginBottom: 10 }}
            >
              ⦿ Topic · 主题
            </label>
            <div className="contact-topics">
              {TOPICS.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => update('topic', t.id)}
                  className={`contact-topic${form.topic === t.id ? ' is-active' : ''}`}
                >
                  {t.label}
                  <br />
                  <span className="contact-topic__zh">{t.zh}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name + Email */}
          <div className="contact-row-2">
            <Field
              label="Name · 名"
              num="01"
              value={form.name}
              onChange={(v) => update('name', v)}
              autoComplete="name"
              maxLength={120}
              required
            />
            <Field
              label="Email · 联系"
              num="02"
              type="email"
              value={form.email}
              onChange={(v) => update('email', v)}
              autoComplete="email"
              maxLength={254}
              required
            />
          </div>

          {/* Wish */}
          <Field
            label="Wish · 愿"
            num="03"
            value={form.wish}
            onChange={(v) => update('wish', v)}
            placeholder="e.g. calm, abundance, courage…"
            hint="What would you want this piece to hold for you?"
            maxLength={140}
          />

          {/* Message */}
          <Field
            label="Message · 信"
            num="04"
            value={form.message}
            onChange={(v) => update('message', v)}
            placeholder="Write as much or as little as you'd like."
            multiline
            maxLength={4000}
            required
          />

          {/* Honeypot — hidden from real users, magnet for bots */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            name="hp_co"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{
              position: 'absolute',
              left: '-9999px',
              top: 'auto',
              width: 1,
              height: 1,
              opacity: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Error message */}
          {state === 'error' && errorMsg && (
            <div
              role="alert"
              className="mono up"
              style={{
                fontSize: 10.5,
                letterSpacing: '0.18em',
                color: 'var(--cinnabar)',
                padding: '12px 14px',
                border: '1px solid var(--cinnabar)',
                background: 'var(--bg-1)',
              }}
            >
              ⊕ {errorMsg}
            </div>
          )}

          {/* Footer row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 8,
              borderTop: '1px dashed var(--line)',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <div
              className="mono up"
              style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--fg-3)' }}
            >
              {sending ? '⦿ Sealing…' : `⦿ Sent to ${TO}`}
            </div>
            <button
              type="submit"
              className="btn btn--red"
              disabled={sending || !form.email.trim() || !form.message.trim()}
              style={{ opacity: sending ? 0.6 : 1, cursor: sending ? 'wait' : 'pointer' }}
            >
              {sending ? 'Sending…' : 'Seal & send ▶'}
            </button>
          </div>
        </form>
      )}
    </>
  );
}

/* ── Reusable labeled field (matches reference's ContactField) ── */
function Field({
  label,
  num,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  hint = '',
  required = false,
  multiline = false,
  autoComplete,
  maxLength,
}: {
  label:        string;
  num:          string;
  value:        string;
  onChange:     (v: string) => void;
  type?:        'text' | 'email';
  placeholder?: string;
  hint?:        string;
  required?:    boolean;
  multiline?:   boolean;
  autoComplete?: string;
  maxLength?:   number;
}) {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-1)',
    border: '1px solid var(--line-2)',
    color: 'var(--fg)',
    padding: '14px 16px',
    fontFamily: 'inherit',
    fontSize: 13,
    outline: 'none',
    transition: 'border-color .15s',
  };

  return (
    <label style={{ display: 'block' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 6,
          gap: 12,
        }}
      >
        <span
          className="mono up"
          style={{ fontSize: 10, letterSpacing: '0.22em', color: 'var(--fg-3)' }}
        >
          <span style={{ color: 'var(--cinnabar)', marginRight: 8 }}>{num}</span>
          {label}
          {required && <span style={{ color: 'var(--cinnabar)' }}> *</span>}
        </span>
        {hint && (
          <span
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--fg-3)',
              letterSpacing: '0.06em',
              textTransform: 'none',
              fontStyle: 'italic',
            }}
          >
            {hint}
          </span>
        )}
      </div>
      {multiline ? (
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          style={{ ...inputStyle, lineHeight: 1.5, resize: 'vertical', minHeight: 140 }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          style={inputStyle}
        />
      )}
    </label>
  );
}
