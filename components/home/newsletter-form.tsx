'use client';

import { useState } from 'react';

type State = 'idle' | 'sending' | 'ok' | 'error';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState(''); // hidden trap field
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'sending') return;
    const trimmed = email.trim();
    if (!trimmed) return;

    setState('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
      };

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error ?? 'Could not subscribe. Try again.');
        setState('error');
        return;
      }
      setState('ok');
    } catch {
      setErrorMsg('Network error. Please try again.');
      setState('error');
    }
  }

  if (state === 'ok') {
    return (
      <div
        className="mono up"
        style={{
          maxWidth: 560,
          margin: '0 auto',
          border: '1px solid var(--line-2)',
          padding: '18px 20px',
          fontSize: 11,
          letterSpacing: '0.18em',
          color: 'var(--cinnabar)',
          textAlign: 'center',
        }}
      >
        ✓ You're on the list.
      </div>
    );
  }

  const sending = state === 'sending';

  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', border: '1px solid var(--line-2)', position: 'relative' }}
        noValidate
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@late-night.email"
          required
          maxLength={254}
          autoComplete="email"
          inputMode="email"
          disabled={sending}
          style={{
            flex: 1,
            padding: '18px 20px',
            border: 'none',
            background: 'transparent',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13,
            outline: 'none',
            color: 'var(--fg)',
            minWidth: 0,
          }}
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

        <button
          type="submit"
          className="btn btn--red"
          disabled={sending}
          style={{
            borderLeft: '1px solid var(--line-2)',
            flexShrink: 0,
            opacity: sending ? 0.6 : 1,
            cursor: sending ? 'wait' : 'pointer',
          }}
        >
          {sending ? 'Sending…' : 'Subscribe →'}
        </button>
      </form>

      {state === 'error' && errorMsg && (
        <p
          className="mono up"
          role="alert"
          style={{
            marginTop: 12,
            fontSize: 10.5,
            letterSpacing: '0.18em',
            color: 'var(--cinnabar)',
            textAlign: 'center',
          }}
        >
          ⊕ {errorMsg}
        </p>
      )}
    </div>
  );
}
