'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mono up" style={{ maxWidth: 560, margin: '0 auto', border: '1px solid var(--line-2)', padding: '18px 20px', fontSize: 11, letterSpacing: '0.18em', color: 'var(--cinnabar)' }}>
        ✓ You're on the list.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', maxWidth: 560, margin: '0 auto', border: '1px solid var(--line-2)' }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@late-night.email"
        required
        style={{
          flex: 1,
          padding: '18px 20px',
          border: 'none',
          background: 'transparent',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 13,
          outline: 'none',
          color: 'var(--fg)',
        }}
      />
      <button type="submit" className="btn btn--red" style={{ borderLeft: '1px solid var(--line-2)', flexShrink: 0 }}>
        Subscribe →
      </button>
    </form>
  );
}
