"use client";

import {
  getIntentZh as resolveProductIntentZh,
  parseList,
  resolveIntent,
} from "lib/intents";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

/* Resolve a single Chinese seal char for an intent value. Uses the fuzzy
 * lookup from lib/intents (exact → word-by-word → substring), so values
 * like "Heritage & Craft" / "Healing & Renewal" / "Mental Clarity" all
 * resolve via their root word ("heritage", "healing", "clarity"). */
function intentZh(key: string): string {
  return resolveIntent(key).zh;
}

/* Pull the first matching zh char from a product's intents list. */
function getIntentZh(p: Product): string {
  return resolveProductIntentZh(parseList(p.intents?.value));
}

function fmt(amount: string, code: string) {
  const n = parseFloat(amount);
  return code === "USD" ? `$${n.toFixed(0)}` : `${code} ${n.toFixed(0)}`;
}

type SortKey = "default" | "price-asc" | "price-desc";
type ViewKey = "grid" | "list";
type DropdownKey = "intent" | "material" | "sort" | null;

/* ── Reusable dropdown hook: close on outside click + Escape ── */
function useDropdown() {
  const [open, setOpen] = useState<DropdownKey>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Lock body scroll while any dropdown is open. Critical on mobile —
   * the panel becomes a bottom sheet with internal scroll, and we don't
   * want swipes to bleed through to the page underneath. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return { open, setOpen, ref };
}

export function ShopClient({ products }: { products: Product[] }) {
  const { open, setOpen, ref: barRef } = useDropdown();
  const searchParams = useSearchParams();

  const allMaterials = useMemo(() => {
    const s = new Set<string>();
    products.forEach((p) =>
      parseList(p.materials?.value).forEach((v) => s.add(v)),
    );
    return Array.from(s).sort();
  }, [products]);

  const allIntents = useMemo(() => {
    const s = new Set<string>();
    products.forEach((p) =>
      parseList(p.intents?.value).forEach((v) => s.add(v)),
    );
    return Array.from(s).sort();
  }, [products]);

  /* Match URL param case-insensitively against real intent values */
  const initialIntent = useMemo(() => {
    const q = searchParams.get("intent");
    if (!q) return "all";
    const hit = allIntents.find((v) => v.toLowerCase() === q.toLowerCase());
    return hit ?? "all";
  }, [searchParams, allIntents]);

  const initialMaterial = useMemo(() => {
    const q = searchParams.get("material");
    if (!q) return "all";
    const hit = allMaterials.find((v) => v.toLowerCase() === q.toLowerCase());
    return hit ?? "all";
  }, [searchParams, allMaterials]);

  const [matFilter, setMatFilter] = useState(initialMaterial);
  const [intentFilter, setIntentFilter] = useState(initialIntent);
  const [sort, setSort] = useState<SortKey>("default");
  const [view, setView] = useState<ViewKey>("grid");

  /* Sync if URL changes (e.g. clicking an intent card while already on /search) */
  useEffect(() => {
    setIntentFilter(initialIntent);
  }, [initialIntent]);
  useEffect(() => {
    setMatFilter(initialMaterial);
  }, [initialMaterial]);

  const filtered = useMemo(() => {
    let arr = [...products];
    if (matFilter !== "all")
      arr = arr.filter((p) =>
        parseList(p.materials?.value).includes(matFilter),
      );
    if (intentFilter !== "all")
      arr = arr.filter((p) =>
        parseList(p.intents?.value).includes(intentFilter),
      );
    if (sort === "price-asc")
      arr.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount),
      );
    if (sort === "price-desc")
      arr.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount),
      );
    return arr;
  }, [products, matFilter, intentFilter, sort]);

  const cntMat = (v: string) =>
    v === "all"
      ? products.length
      : products.filter((p) => parseList(p.materials?.value).includes(v))
          .length;
  const cntIntent = (v: string) =>
    v === "all"
      ? products.length
      : products.filter((p) => parseList(p.intents?.value).includes(v)).length;

  const intentLabel = intentFilter === "all" ? "Any" : intentFilter;
  const materialLabel = matFilter === "all" ? "All" : matFilter;
  const sortLabel =
    sort === "price-asc"
      ? "Price ↑"
      : sort === "price-desc"
        ? "Price ↓"
        : "Default";

  function toggle(key: DropdownKey) {
    setOpen((prev) => (prev === key ? null : key));
  }
  function close() {
    setOpen(null);
  }

  return (
    <div className="page-wrap">
      {/* Backdrop — closes any open dropdown */}
      {open && (
        <div onClick={close} className="shop-drop-backdrop" aria-hidden />
      )}

      {/* ── Header ── */}
      <div className="kpcty-container">
        <div className="shop-header">
          <div>
            <div className="mono up" style={{ fontSize: 11, opacity: 0.55 }}>
              § Shop · 店
            </div>
            <h1
              className="display"
              style={{
                fontSize: "clamp(52px,9vw,140px)",
                marginTop: 8,
                lineHeight: 0.92,
              }}
            >
              Season One{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                archive
              </em>
            </h1>
          </div>
          <div
            className="mono shop-header__meta"
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              textAlign: "right",
              opacity: 0.55,
              textTransform: "uppercase",
            }}
          >
            {products.length} pieces
            <br />5 families
            <br />
            Cut in Shanghai · Strung in Philadelphia
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div ref={barRef} className="kpcty-container shop-filter-bar">
        {/* Left: Intent + Material dropdowns */}
        <div className="shop-filter-left ">
          {/* Intent dropdown */}
          <div className="shop-drop" style={{ position: "relative" }}>
            <DropTrigger
              label="Intent · 意"
              value={intentLabel}
              active={intentFilter !== "all"}
              open={open === "intent"}
              onToggle={() => toggle("intent")}
              onClear={
                intentFilter !== "all"
                  ? () => {
                      setIntentFilter("all");
                      close();
                    }
                  : undefined
              }
            />
            {open === "intent" && (
              <DropPanel style={{ width: 340 }}>
                {/* "Any" row */}
                <DropOption
                  selected={intentFilter === "all"}
                  onClick={() => {
                    setIntentFilter("all");
                    close();
                  }}
                  count={products.length}
                  fullWidth
                >
                  Any wish · 任意
                </DropOption>
                {/* 2-column grid of intents (1-col on mobile via CSS) */}
                <div className="shop-drop-grid shop-drop-grid--intent">
                  {allIntents.map((key) => (
                    <DropOption
                      key={key}
                      selected={intentFilter === key}
                      onClick={() => {
                        setIntentFilter(key);
                        close();
                      }}
                      count={cntIntent(key)}
                    >
                      {intentZh(key) && (
                        <span
                          style={{
                            fontFamily: "Noto Serif SC, serif",
                            fontSize: 18,
                            color:
                              intentFilter === key
                                ? "var(--fg)"
                                : "var(--cinnabar)",
                            marginRight: 8,
                            lineHeight: 1,
                          }}
                        >
                          {intentZh(key)}
                        </span>
                      )}
                      {key}
                    </DropOption>
                  ))}
                </div>
              </DropPanel>
            )}
          </div>

          {/* Material dropdown */}
          <div className="shop-drop" style={{ position: "relative" }}>
            <DropTrigger
              label="Material · 料"
              value={materialLabel}
              active={matFilter !== "all"}
              open={open === "material"}
              onToggle={() => toggle("material")}
              onClear={
                matFilter !== "all"
                  ? () => {
                      setMatFilter("all");
                      close();
                    }
                  : undefined
              }
            />
            {open === "material" && (
              <DropPanel style={{ width: 400 }}>
                <DropOption
                  selected={matFilter === "all"}
                  onClick={() => {
                    setMatFilter("all");
                    close();
                  }}
                  count={products.length}
                  fullWidth
                >
                  All materials · 全部
                </DropOption>
                {/* 3-col grid of materials (collapses on mobile via CSS) */}
                <div className="shop-drop-grid shop-drop-grid--material">
                  {allMaterials.map((mat) => (
                    <DropOption
                      key={mat}
                      selected={matFilter === mat}
                      onClick={() => {
                        setMatFilter(mat);
                        close();
                      }}
                      count={cntMat(mat)}
                    >
                      {mat}
                    </DropOption>
                  ))}
                </div>
              </DropPanel>
            )}
          </div>

          {/* Active filter summary */}
          {(intentFilter !== "all" || matFilter !== "all") && (
            <span
              className="mono"
              style={{
                fontSize: 9.5,
                color: "var(--fg-4)",
                letterSpacing: "0.14em",
              }}
            >
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Right: Sort + View toggle */}
        <div className="shop-filter-right">
          {/* Sort dropdown */}
          <div className="shop-drop" style={{ position: "relative" }}>
            <DropTrigger
              label="Sort"
              value={sortLabel}
              active={sort !== "default"}
              open={open === "sort"}
              onToggle={() => toggle("sort")}
              onClear={
                sort !== "default"
                  ? () => {
                      setSort("default");
                      close();
                    }
                  : undefined
              }
            />
            {open === "sort" && (
              <DropPanel style={{ right: 0, left: "auto", width: 200 }}>
                {(["default", "price-asc", "price-desc"] as SortKey[]).map(
                  (s) => (
                    <DropOption
                      key={s}
                      selected={sort === s}
                      onClick={() => {
                        setSort(s);
                        close();
                      }}
                      fullWidth
                    >
                      {s === "default"
                        ? "Default"
                        : s === "price-asc"
                          ? "Price ↑ Low → High"
                          : "Price ↓ High → Low"}
                    </DropOption>
                  ),
                )}
              </DropPanel>
            )}
          </div>

          {/* Grid / List toggle */}
          {/* <div style={{ display: "flex", border: "1px solid var(--line-2)"}}>
            <ViewBtn active={view === "grid"} onClick={() => setView("grid")}>
              ⊞
            </ViewBtn>
            <ViewBtn
              active={view === "list"}
              onClick={() => setView("list")}
              borderLeft
            >
              ≡
            </ViewBtn>
          </div> */}
        </div>
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div style={{ padding: "80px 0", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Noto Serif SC, serif",
              fontSize: 64,
              color: "var(--cinnabar)",
              opacity: 0.25,
            }}
          >
            空
          </div>
          <div
            className="mono up"
            style={{
              marginTop: 16,
              fontSize: 11,
              color: "var(--fg-3)",
              letterSpacing: "0.2em",
            }}
          >
            No pieces match this filter.
          </div>
          <button
            onClick={() => {
              setIntentFilter("all");
              setMatFilter("all");
            }}
            className="btn btn--ghost"
            style={{ marginTop: 24 }}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ── Grid view ── */}
      {view === "grid" && filtered.length > 0 && (
        <div className="shop-grid">
          {filtered.map((p) => (
            <ShopifyCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* ── List / index view ── */}
      {view === "list" && filtered.length > 0 && (
        <div className="kpcty-container" style={{ padding: "20px 0 60px" }}>
          <div style={{ borderTop: "2px solid var(--line)" }}>
            {filtered.map((p) => {
              const price = fmt(
                p.priceRange.minVariantPrice.amount,
                p.priceRange.minVariantPrice.currencyCode,
              );
              const intentsArr = parseList(p.intents?.value);
              const materialsArr = parseList(p.materials?.value);
              return (
                <Link
                  key={p.id}
                  href={`/product/${p.handle}`}
                  className="lift shop-list-row"
                >
                  <div
                    style={{
                      aspectRatio: "1",
                      background: "var(--bg-2)",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {p.featuredImage?.url && (
                      <Image
                        src={p.featuredImage.url}
                        alt={p.featuredImage.altText || p.title}
                        width={72}
                        height={72}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      className="serif"
                      style={{
                        fontSize: 20,
                        lineHeight: 1.1,
                        color: "var(--fg)",
                      }}
                    >
                      {p.title}
                    </div>
                    {getIntentZh(p) && (
                      <div
                        className="serif-sc"
                        style={{
                          fontSize: 13,
                          color: "var(--cinnabar)",
                          marginTop: 4,
                        }}
                      >
                        {getIntentZh(p)}
                      </div>
                    )}
                  </div>
                  <div className="sm-hide">
                    {intentsArr.map((v) => (
                      <div
                        key={v}
                        className="mono"
                        style={{
                          fontSize: 9.5,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--fg-3)",
                          lineHeight: 1.8,
                        }}
                      >
                        ⊕ {v}
                      </div>
                    ))}
                  </div>
                  <div className="sm-hide">
                    {materialsArr.map((v) => (
                      <div
                        key={v}
                        className="mono"
                        style={{
                          fontSize: 9.5,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--fg-3)",
                          lineHeight: 1.8,
                        }}
                      >
                        ⦿ {v}
                      </div>
                    ))}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 13,
                      textAlign: "right",
                      color: "var(--fg)",
                      flexShrink: 0,
                    }}
                  >
                    {price}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Archive footnote ── */}
      <div
        style={{
          background: "var(--bg-2)",
          padding: "40px 0",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="kpcty-container shop-footnote">
          <div
            className="vert-zh serif-sc shop-footnote__side"
            style={{ fontSize: 24, color: "var(--cinnabar)" }}
          >
            尾声
          </div>
          <p
            className="serif"
            style={{
              fontSize: 18,
              lineHeight: 1.5,
              maxWidth: "52ch",
              textAlign: "center",
              color: "var(--fg-2)",
            }}
          >
            We make small things, slowly, for people who want to carry something
            meaningful into their days.
          </p>
          <div
            className="mono up shop-footnote__side"
            style={{ fontSize: 10, letterSpacing: "0.16em", opacity: 0.45 }}
          >
            END OF INDEX
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Product card ── */
function ShopifyCard({ product: p }: { product: Product }) {
  const intentZh = getIntentZh(p);
  const price = fmt(
    p.priceRange.minVariantPrice.amount,
    p.priceRange.minVariantPrice.currencyCode,
  );
  const tags = p.tags.map((t) => t.toLowerCase());
  const badge = !p.availableForSale
    ? "SOLD"
    : tags.includes("hot")
      ? "HOT"
      : tags.includes("new")
        ? "NEW"
        : null;
  const materials = parseList(p.materials?.value);

  return (
    <Link href={`/product/${p.handle}`} className="pcard lift">
      <div className="pcard__media">
        {p.featuredImage?.url ? (
          <Image
            src={p.featuredImage.url}
            alt={p.featuredImage.altText || p.title}
            width={600}
            height={600}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : null}
        {badge && <span className="pcard__tag">{badge}</span>}
        {intentZh && <div className="pcard__seal">{intentZh}</div>}
      </div>
      <div className="pcard__meta">
        <div>
          <div className="pcard__name">{p.title}</div>
          {p.description && (
            <div
              className="serif"
              style={{
                fontSize: 13,
                marginTop: 8,
                fontStyle: "italic",
                lineHeight: 1.35,
                color: "var(--fg-3)",
              }}
            >
              "{p.description.slice(0, 72)}
              {p.description.length > 72 ? "…" : ""}"
            </div>
          )}
          {materials.length > 0 && (
            <div className="pcard__stones">
              {materials.slice(0, 3).map((m) => (
                <span key={m} className="stone-dot">
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="pcard__price">{price}</div>
      </div>
    </Link>
  );
}

/* ── Dropdown trigger button ── */
function DropTrigger({
  label,
  value,
  active,
  open,
  onToggle,
  onClear,
}: {
  label: string;
  value: string;
  active: boolean;
  open: boolean;
  onToggle: () => void;
  onClear?: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="shop-drop-trigger"
      style={{
        border: `1px solid ${open || active ? "var(--cinnabar)" : "var(--line-2)"}`,
        color: active ? "var(--cinnabar)" : open ? "var(--fg)" : "var(--fg-3)",
      }}
    >
      <span className="shop-drop-trigger__label">{label}</span>
      <span
        className="shop-drop-trigger__value"
        style={{ color: active ? "var(--cinnabar)" : "var(--fg-2)" }}
      >
        · {value}
      </span>
      {onClear ? (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="shop-drop-trigger__clear"
          aria-label="Clear filter"
        >
          ×
        </span>
      ) : (
        <span className="shop-drop-trigger__caret">{open ? "▲" : "▼"}</span>
      )}
    </button>
  );
}

/* ── Dropdown panel ── */
function DropPanel({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="shop-drop-panel" style={style}>
      {children}
    </div>
  );
}

/* ── Option row inside a dropdown ── */
function DropOption({
  children,
  selected,
  onClick,
  count,
  fullWidth,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  count?: number;
  fullWidth?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`shop-drop-option${selected ? " is-selected" : ""}${fullWidth ? " shop-drop-option--full" : ""}`}
    >
      <span className="shop-drop-option__label">{children}</span>
      {count !== undefined && (
        <span className="shop-drop-option__count">[{count}]</span>
      )}
    </button>
  );
}

/* ── Grid / List view toggle ── */
function ViewBtn({
  active,
  onClick,
  children,
  borderLeft,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  borderLeft?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 12px",
        background: active ? "var(--cinnabar)" : "transparent",
        color: active ? "var(--fg)" : "var(--fg-3)",
        border: "none",
        borderLeft: borderLeft ? "1px solid var(--line-2)" : undefined,
        cursor: "pointer",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 12,
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </button>
  );
}
