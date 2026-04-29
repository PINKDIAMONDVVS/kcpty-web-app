"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const NAV = [
  { label: "Home",     zh: "家", href: "/" },
  { label: "Shop",     zh: "店", href: "/search" },
  { label: "Lookbook", zh: "册", href: "/lookbook" },
  { label: "Studio",   zh: "说", href: "/about" },
  { label: "Contact",  zh: "联", href: "/contact" },
];

const AUX = [
  { label: "Search", hint: "⌕", href: "/search" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* Close on route change */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Auto-close if the viewport grows past the mobile breakpoint */
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Portal target — wait until the client mounts so SSR doesn't touch document */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Drawer + backdrop, rendered into <body> via portal so they escape the
   * navbar's stacking + containing block (the nav has backdrop-filter, which
   * makes any `position: fixed` descendant resolve relative to the nav box
   * — that's why the drawer was being clipped to the header strip). */
  const drawer = (
    <>
      <div
        className={`mobile-menu__backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        id="mobile-nav-drawer"
        className={`mobile-menu${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-nav-drawer-title"
        aria-hidden={!open}
      >
        <div className="mobile-menu__head">
          <div
            id="mobile-nav-drawer-title"
            className="mono up"
            style={{
              fontSize: 10,
              color: "var(--cinnabar)",
              letterSpacing: "0.22em",
            }}
          >
            § Index · 目录
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="mobile-menu__close"
          >
            ×
          </button>
        </div>

        <nav className="mobile-menu__nav">
          {NAV.map((item, i) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-menu__link${active ? " is-active" : ""}`}
              >
                <span className="mobile-menu__link-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mobile-menu__link-label">{item.label}</span>
                <span className="mobile-menu__link-zh">{item.zh}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mobile-menu__aux">
          {AUX.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-menu__aux-link"
            >
              <span style={{ color: "var(--cinnabar)", marginRight: 8 }}>
                {item.hint}
              </span>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mobile-menu__foot">
          <div
            style={{
              fontFamily: "Noto Serif SC, serif",
              fontSize: 44,
              color: "var(--cinnabar)",
              opacity: 0.22,
              lineHeight: 1,
            }}
          >
            刻瓷
          </div>
          <div
            className="mono up"
            style={{
              fontSize: 9.5,
              color: "var(--fg-4)",
              letterSpacing: "0.22em",
              marginTop: 10,
            }}
          >
            Philadelphia · PA · S1 · Summer 2026
          </div>
        </div>
      </aside>
    </>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        className="nav__hamburger"
      >
        <span aria-hidden />
        <span aria-hidden />
        <span aria-hidden />
      </button>
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
