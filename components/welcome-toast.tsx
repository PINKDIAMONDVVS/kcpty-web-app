"use client";

import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    /* Ignore short viewports and users who've already dismissed. */
    if (window.innerHeight < 650) return;
    if (document.cookie.includes("kpcty-welcome=1")) return;

    toast(
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          letterSpacing: "0.02em",
        }}
      >
        <span
          style={{
            color: "var(--cinnabar)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          § 一新
        </span>
        <span
          style={{
            color: "var(--fg)",
            fontSize: 13,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Season One is open.
        </span>
      </div>,
      {
        id: "kpcty-welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "kpcty-welcome=1; max-age=31536000; path=/";
        },
        onAutoClose: () => {
          document.cookie = "kpcty-welcome=1; max-age=31536000; path=/";
        },
        description: (
          <div
            className="serif"
            style={{
              fontSize: 14,
              fontStyle: "italic",
              lineHeight: 1.5,
              color: "var(--fg-2)",
              marginTop: 6,
            }}
          >
            Spiritual gemstone bracelets, cut in Shanghai and strung in
            Philadelphia. Once a piece is gone, the stones we bought for it are
            already older than the re-order button.{" "}
            <Link
              href="/search"
              style={{
                color: "var(--cinnabar)",
                textDecoration: "none",
                fontFamily: '"JetBrains Mono", monospace',
                fontStyle: "normal",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                marginLeft: 4,
              }}
            >
              Enter →
            </Link>
          </div>
        ),
        style: {
          background: "rgba(11,11,16,0.88)",
          border: "1px solid var(--line-2)",
          borderRadius: 0,
          color: "var(--fg)",
          backdropFilter: "blur(14px) saturate(160%)",
          WebkitBackdropFilter: "blur(14px) saturate(160%)",
          padding: "18px 20px",
        },
      },
    );
  }, []);

  return null;
}
