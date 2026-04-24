"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  { k: "⊕ LIVE", v: "S1 · 29 pieces · shipping from Brooklyn" },
  { k: "⊕ NEW", v: "Code TIANYI — 15% off first stack · 新款" },
  { k: "⊕ LOT", v: "S1-017 · Shuǐ · last 1 of 1" },
];

export function Announce() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((x) => (x + 1) % MESSAGES.length), 3800);
    return () => clearInterval(t);
  }, []);

  const m = MESSAGES[idx]!;

  return (
    <div className="announce">
      <div
        className="kpcty-container announce__row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
        }}
      >
        <span
          className="announce__main"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "var(--fg-3)",
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <span className="dot" />
          <span style={{ color: "var(--cinnabar)" }}>{m.k}</span>
          <span style={{ color: "var(--fg)", overflow: "hidden", textOverflow: "ellipsis" }}>{m.v}</span>
        </span>
        <span className="announce__meta">
          <span>04·24·26 · 刻瓷 studio / Bushwick</span>
          <span>lat 40.69° · lon -73.93°</span>
        </span>
        <span className="announce__locale">
          <span>EN · 中</span>
          <span>USD $</span>
        </span>
      </div>
    </div>
  );
}
