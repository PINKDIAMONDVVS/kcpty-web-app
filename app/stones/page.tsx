import Footer from "components/layout/footer";
import { resolveMaterial } from "lib/materials";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stones · 石谱",
  description:
    "An almanac of every stone we work with — twenty-seven small wishes, sorted by what each is for. Find yours by birth month, by intent, or by name. Cut from named mountains, knotted by hand in Philadelphia.",
  alternates: { canonical: "/stones" },
  openGraph: {
    title: "Stones · The KPCTY almanac",
    description:
      "Twenty-seven stones, six wishes, twelve months. Find the piece that matches yours.",
    url: `${baseUrl}/stones`,
  },
};

/* ── Page data ──────────────────────────────────────────────────────
 * Every stone is a record: its EN name, the resolver key (used to look
 * up zh / pinyin / KPCTY-voice copy in lib/materials.ts via
 * resolveMaterial), a Tailwind-free CSS color for the swatch, and an
 * override `wish` line for stones whose copy isn't in MATERIAL_DESC.
 *
 * The resolver gives us automatic continuity with home page material
 * cards + product seal stamps — same source of truth, same voice. */

type Stone = {
  en: string;
  zh: string;            // explicit since some stones share a resolver key
  resolveKey: string;    // passed through resolveMaterial()
  searchKey: string;     // value Shopify metafields use; powers the /search?material= link
  swatch: string;        // CSS background fallback shown while the image loads (or if missing)
  wish?: string;         // override when MATERIAL_DESC has nothing or wrong tone
};

/* Convert "Titanium Quartz" → "titanium-quartz" so each stone resolves
 * to /public/stones/<slug>.png. Kept inline so adding new stones never
 * requires touching a separate filename column. */
const slug = (en: string) =>
  en.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

/* Sections are now intent-based, not colour-based. Each family maps
 * 1:1 to an intent key in lib/intents.ts (the same vocabulary the
 * search filter and product metafields use), so a shopper who reads
 * "For Courage · 勇" can tap the section header and land on every
 * piece in the catalogue tagged with that intent — not just the 4–5
 * we feature in the section. The ZH seal char on each section is
 * pulled from INTENT_ZH so the page shares one source of truth for
 * intent → seal mapping. */
const FAMILIES: {
  id: string;
  n: string;
  en: string;
  zh: string;
  intentKey: string;
  lead: string;
  stones: Stone[];
}[] = [
  {
    id: "courage",
    n: "02",
    en: "For Courage",
    zh: "勇",
    intentKey: "courage",
    lead:
      "Stones for the days that ask too much — for the meeting you didn't ask for, the climb you don't need to announce. Some you carry into the fight; some you wear as the wall behind you. Either way, they're for keeping your shape.",
    stones: [
      {
        en: "Garnet",
        zh: "石榴石",
        resolveKey: "garnet",
        searchKey: "garnet",
        swatch: "linear-gradient(135deg, #6e1422 0%, #b32a3a 100%)",
      },
      {
        en: "Tiger Eye",
        zh: "虎睛石",
        resolveKey: "tiger",
        searchKey: "tiger eye",
        swatch: "linear-gradient(135deg, #8a5a25 0%, #c98c3c 50%, #6e3f17 100%)",
      },
      {
        en: "Yellow Chalcedony",
        zh: "黄玉髓",
        resolveKey: "chalcedony",
        searchKey: "yellow chalcedony",
        swatch: "linear-gradient(135deg, #f0c34a 0%, #d99a2c 100%)",
        wish: "For climbs that don't need to be loud about themselves.",
      },
      {
        en: "Black Tourmaline",
        zh: "黑碧玺",
        resolveKey: "tourmaline",
        searchKey: "black tourmaline",
        swatch: "linear-gradient(135deg, #1a1a20 0%, #3a3a45 100%)",
        wish: "A small wall between you and the noise. Worn at the wrist where it counts.",
      },
      {
        en: "Obsidian",
        zh: "黑曜石",
        resolveKey: "obsidian",
        searchKey: "obsidian",
        swatch: "linear-gradient(135deg, #0a0a0e 0%, #2a2a35 100%)",
      },
    ],
  },
  {
    id: "heart",
    n: "03",
    en: "For the Heart",
    zh: "爱",
    intentKey: "love",
    lead:
      "For the people who pick up on the first ring. For the ones you stay up writing letters to. The soft kind of certainty — sweet without performing it, warm without insisting.",
    stones: [
      {
        en: "Rose Quartz",
        zh: "粉水晶",
        resolveKey: "rose",
        searchKey: "rose quartz",
        swatch: "linear-gradient(135deg, #f6c8d6 0%, #e8a3b9 100%)",
      },
      {
        en: "Rhodochrosite",
        zh: "红纹石",
        resolveKey: "rhodochrosite",
        searchKey: "rhodochrosite",
        swatch: "linear-gradient(135deg, #d63d6d 0%, #f08abf 100%)",
        wish: "For the people you stay up writing letters to. Even now.",
      },
      {
        en: "Rhodonite",
        zh: "蔷薇石",
        resolveKey: "rhodonite",
        searchKey: "rhodonite",
        swatch: "linear-gradient(135deg, #c64a73 0%, #6f2842 100%)",
        wish: "Beauty as warmth, not as performance.",
      },
      {
        en: "Strawberry Quartz",
        zh: "草莓晶",
        resolveKey: "strawberry",
        searchKey: "strawberry quartz",
        swatch: "linear-gradient(135deg, #e6a4a4 0%, #c25a64 100%)",
        wish: "Sweet without performing it. The soft kind of certainty.",
      },
    ],
  },
  {
    id: "breath",
    n: "04",
    en: "For the Breath",
    zh: "静",
    intentKey: "calm",
    lead:
      "For the breath between two emails. For the night that needs to end softly. For waiting well — for being the most patient version of yourself, even when you don't feel like it.",
    stones: [
      {
        en: "Amethyst",
        zh: "紫水晶",
        resolveKey: "amethyst",
        searchKey: "amethyst",
        swatch: "linear-gradient(135deg, #8a6fc4 0%, #5f3d9a 100%)",
      },
      {
        en: "Aquamarine",
        zh: "海蓝宝",
        resolveKey: "aquamarine",
        searchKey: "aquamarine",
        swatch: "linear-gradient(135deg, #8fcfd6 0%, #4a9aa8 100%)",
      },
      {
        en: "Moonstone",
        zh: "月光石",
        resolveKey: "moonstone",
        searchKey: "moonstone",
        swatch: "linear-gradient(135deg, #ecf0f5 0%, #c0c8d4 60%, #8d96a4 100%)",
      },
      {
        en: "Blue Chalcedony",
        zh: "蓝玉髓",
        resolveKey: "chalcedony",
        searchKey: "blue chalcedony",
        swatch: "linear-gradient(135deg, #b3d3e0 0%, #6a9cb5 100%)",
        wish: "Clean lines. Clean answers. The opposite of a long meeting.",
      },
      {
        en: "Smoky Quartz",
        zh: "茶晶",
        resolveKey: "smoky",
        searchKey: "smoky quartz",
        swatch: "linear-gradient(135deg, #5b3a26 0%, #8a5d3e 60%, #2f1d12 100%)",
        wish: "Brown like dusk-water. Grounding without insisting.",
      },
    ],
  },
  {
    id: "fortune",
    n: "05",
    en: "For Fortune Built",
    zh: "财",
    intentKey: "wealth",
    lead:
      "Wealth measured in years, not viral months. For fortune you forge — not the kind you wait on. The slow money: enough, with some left over.",
    stones: [
      {
        en: "Citrine",
        zh: "黄水晶",
        resolveKey: "citrine",
        searchKey: "citrine",
        swatch: "linear-gradient(135deg, #ffd966 0%, #f4b22a 100%)",
      },
      {
        en: "Green Phantom Quartz",
        zh: "绿幽灵",
        resolveKey: "phantom",
        searchKey: "green phantom",
        swatch: "linear-gradient(135deg, #3a7a4a 0%, #6fbf85 60%, #1f4a2a 100%)",
        wish: "Wealth that grows the way moss grows. Slowly. Completely.",
      },
      {
        en: "Aventurine",
        zh: "东陵玉",
        resolveKey: "aventurine",
        searchKey: "aventurine",
        swatch: "linear-gradient(135deg, #82b88a 0%, #4a8253 100%)",
        wish: "Plenty, in the old sense — enough, with some left over.",
      },
      {
        en: "Peridot",
        zh: "橄榄石",
        resolveKey: "peridot",
        searchKey: "peridot",
        swatch: "linear-gradient(135deg, #a8c63d 0%, #5e8a1f 100%)",
      },
      {
        en: "Titanium Quartz",
        zh: "钛晶",
        resolveKey: "rutilated",
        searchKey: "titanium quartz",
        swatch: "linear-gradient(135deg, #d6a647 0%, #f4c84a 60%, #b08326 100%)",
        wish: "Threads of gold caught inside clear water. For fortune you forge — not the kind you wait on.",
      },
    ],
  },
  {
    id: "question",
    n: "06",
    en: "For the Question",
    zh: "慧",
    intentKey: "wisdom",
    lead:
      "For careers that take their time. For the questions you're still learning to ask. For the answer you already know but haven't said out loud yet.",
    stones: [
      {
        en: "Lapis Lazuli",
        zh: "青金石",
        resolveKey: "lapis",
        searchKey: "lapis lazuli",
        swatch: "linear-gradient(135deg, #1c3a8e 0%, #3556c2 60%, #0a1e57 100%)",
      },
      {
        en: "Kyanite",
        zh: "蓝晶石",
        resolveKey: "kyanite",
        searchKey: "kyanite",
        swatch: "linear-gradient(135deg, #2855a3 0%, #527fc8 100%)",
        wish: "For the questions you're still learning how to ask.",
      },
      {
        en: "Fluorite",
        zh: "萤石",
        resolveKey: "fluorite",
        searchKey: "fluorite",
        swatch: "linear-gradient(135deg, #7fc2a8 0%, #b894d6 100%)",
        wish: "Bright the way fluorescent things are bright — late, sudden, and for free.",
      },
      {
        en: "Clear Quartz",
        zh: "白水晶",
        resolveKey: "quartz",
        searchKey: "clear quartz",
        swatch: "linear-gradient(135deg, #f4f3ee 0%, #c8c6bf 100%)",
      },
    ],
  },
  {
    id: "return",
    n: "07",
    en: "For Coming Back",
    zh: "愈",
    intentKey: "healing",
    lead:
      "For the season of returning. For the body that carries everything else. For the rooms you want to walk back into, for the long thaw after a hard year.",
    stones: [
      {
        en: "Malachite",
        zh: "孔雀石",
        resolveKey: "malachite",
        searchKey: "malachite",
        swatch: "linear-gradient(135deg, #1f6b3d 0%, #4ca56a 50%, #0e3b1f 100%)",
      },
      {
        en: "Amazonite",
        zh: "天河石",
        resolveKey: "amazonite",
        searchKey: "amazonite",
        swatch: "linear-gradient(135deg, #6cc4b0 0%, #3a8a78 100%)",
      },
      {
        en: "Turquoise",
        zh: "绿松石",
        resolveKey: "turquoise",
        searchKey: "turquoise",
        swatch: "linear-gradient(135deg, #4ec0bc 0%, #2a8a85 100%)",
      },
      {
        en: "Agate",
        zh: "玛瑙",
        resolveKey: "agate",
        searchKey: "agate",
        swatch: "linear-gradient(135deg, #c95a2c 0%, #f4a06b 50%, #7c3017 100%)",
      },
    ],
  },
];

const TOTAL = FAMILIES.reduce((n, f) => n + f.stones.length, 0);

/* ── Twelve months — storytelling, by birthday ─────────────────────
 * Each month gets a small editorial paragraph that weaves together
 * the Western birthstone tradition AND the zodiac sign whose date
 * range begins in that month. Where the traditional birthstone isn't
 * in our 27 (Diamond, Emerald, Pearl, Ruby, Sapphire, Topaz,
 * Tanzanite), we name the substitute we actually work with — and
 * explain the swap in the narrative itself. That honesty IS the
 * brand: we don't link to stones we don't make.
 *
 * `primary` is the slug whose bead photo we display at the top of
 * each card. `narrative` is a JSX fragment so stone names can be
 * rendered inline as italic links via the <S> helper. */

/* `stones` lists every catalogue stone referenced in the narrative,
 * in narrative order. Renders as a row of pill-shaped shop buttons
 * at the bottom of each month card so the inline narrative italics
 * are reinforced by an explicit shop-this-stone CTA. `k` is the
 * Shopify metafield material value passed to /search?material=... */
type StoneRef = { en: string; k: string };
type Month = {
  n: string;
  en: string;
  zodiac: { en: string; zh: string; range: string };
  primary: string;             // slug of the stone whose bead photo this card features
  stones: StoneRef[];
  narrative: React.ReactNode;
};

/* Inline stone link — italic, accent on hover. searchKey passed as
 * the `m` prop to keep narrative JSX visually compact. */
function S({ m, children }: { m: string; children: React.ReactNode }) {
  return (
    <Link
      href={`/search?material=${encodeURIComponent(m)}`}
      className="month-card__inline"
    >
      <em>{children}</em>
    </Link>
  );
}

const MONTHS: Month[] = [
  {
    n: "01",
    en: "January",
    zodiac: { en: "Aquarius", zh: "水瓶座", range: "Jan 20 — Feb 18" },
    primary: "garnet",
    stones: [
      { en: "Garnet", k: "garnet" },
      { en: "Rose Quartz", k: "rose quartz" },
      { en: "Strawberry Quartz", k: "strawberry quartz" },
    ],
    narrative: (
      <>
        January arrives quiet — the year still folded, the inbox almost
        empty. Tradition gives this month to <S m="garnet">Garnet</S>: a
        red that keeps to itself, the colour of dried wine, the way an
        old friendship reads. Born under Aquarius? Carry pink instead —{" "}
        <S m="rose quartz">Rose Quartz</S> for being remembered in
        rooms, or <S m="strawberry quartz">Strawberry Quartz</S> for
        sweetness that doesn't perform.
      </>
    ),
  },
  {
    n: "02",
    en: "February",
    zodiac: { en: "Pisces", zh: "双鱼座", range: "Feb 19 — Mar 20" },
    primary: "amethyst",
    stones: [
      { en: "Amethyst", k: "amethyst" },
      { en: "Agate", k: "agate" },
    ],
    narrative: (
      <>
        February is the shortest month and the most patient. Its stone
        is <S m="amethyst">Amethyst</S> — violet, but the patient kind.
        The colour of a long Sunday afternoon, of waiting well. Pisces
        shares the same pull, sometimes alongside <S m="agate">Agate</S>{" "}
        — a band for every year you didn't know you were counting.
      </>
    ),
  },
  {
    n: "03",
    en: "March",
    zodiac: { en: "Aries", zh: "白羊座", range: "Mar 21 — Apr 20" },
    primary: "aquamarine",
    stones: [
      { en: "Aquamarine", k: "aquamarine" },
      { en: "Amethyst", k: "amethyst" },
      { en: "Garnet", k: "garnet" },
    ],
    narrative: (
      <>
        March is a month of small bravery — the first warm afternoon,
        the first walk without a coat. Carry{" "}
        <S m="aquamarine">Aquamarine</S>: seawater with a spine, the
        blue of shallow tropical water in a country that hasn't yet
        earned its spring. Aries types reach for the same calm,
        sometimes paired with <S m="amethyst">Amethyst</S> for clarity
        or <S m="garnet">Garnet</S> for grounding.
      </>
    ),
  },
  {
    n: "04",
    en: "April",
    zodiac: { en: "Taurus", zh: "金牛座", range: "Apr 21 — May 20" },
    primary: "clear-quartz",
    stones: [
      { en: "Clear Quartz", k: "clear quartz" },
      { en: "Aquamarine", k: "aquamarine" },
    ],
    narrative: (
      <>
        April traditionally lands on diamond — clear, hard, expensive.
        We don't work in diamonds. <S m="clear quartz">Clear Quartz</S>{" "}
        is the closest piece we make: glassy, lucid, the first stone,
        the one to begin with. Born under Taurus, late April through
        May? <S m="aquamarine">Aquamarine</S> is your zodiac match —
        seawater, again.
      </>
    ),
  },
  {
    n: "05",
    en: "May",
    zodiac: { en: "Gemini", zh: "双子座", range: "May 21 — Jun 21" },
    primary: "peridot",
    stones: [
      { en: "Peridot", k: "peridot" },
      { en: "Fluorite", k: "fluorite" },
      { en: "Citrine", k: "citrine" },
    ],
    narrative: (
      <>
        May is for emerald in the old calendar — green, lush, expensive.
        We work instead in <S m="peridot">Peridot</S>: spring, in the
        form of a bead, the same vivid olive without the price tag.
        Geminis born in late May or June reach for the lit kind of
        green: <S m="fluorite">Fluorite</S> for openness,{" "}
        <S m="citrine">Citrine</S> for slow afternoons.
      </>
    ),
  },
  {
    n: "06",
    en: "June",
    zodiac: { en: "Cancer", zh: "巨蟹座", range: "Jun 22 — Jul 22" },
    primary: "moonstone",
    stones: [
      { en: "Moonstone", k: "moonstone" },
      { en: "Agate", k: "agate" },
    ],
    narrative: (
      <>
        June asks for pearl in tradition — a grain of sand with a long
        apology. We don't string pearls, but we string{" "}
        <S m="moonstone">Moonstone</S>: a little weather on the wrist,
        pearly with a soft blue flash. Cancers, born late June through
        July, also pair this with <S m="agate">Agate</S> — bands of a
        year inside a stone.
      </>
    ),
  },
  {
    n: "07",
    en: "July",
    zodiac: { en: "Leo", zh: "狮子座", range: "Jul 23 — Aug 22" },
    primary: "garnet",
    stones: [
      { en: "Garnet", k: "garnet" },
      { en: "Citrine", k: "citrine" },
      { en: "Moonstone", k: "moonstone" },
    ],
    narrative: (
      <>
        July traditionally pairs with ruby — a red that wants to be
        seen. We work the closer cousin: <S m="garnet">Garnet</S>, a
        red that keeps to itself. For Leos born late July through
        August, carry it alongside <S m="citrine">Citrine</S> for the
        long career, not the viral month — or{" "}
        <S m="moonstone">Moonstone</S> for the kind of softness strong
        people sometimes need.
      </>
    ),
  },
  {
    n: "08",
    en: "August",
    zodiac: { en: "Virgo", zh: "处女座", range: "Aug 23 — Sep 22" },
    primary: "peridot",
    stones: [
      { en: "Peridot", k: "peridot" },
      { en: "Citrine", k: "citrine" },
      { en: "Aquamarine", k: "aquamarine" },
    ],
    narrative: (
      <>
        August belongs cleanly to <S m="peridot">Peridot</S> in both
        calendars — spring in the form of a bead, vivid olive-green,
        jewel-clear. Virgos, born through late August into September,
        often add <S m="citrine">Citrine</S> for steady warmth or{" "}
        <S m="aquamarine">Aquamarine</S> for the questions they're
        already learning to ask.
      </>
    ),
  },
  {
    n: "09",
    en: "September",
    zodiac: { en: "Libra", zh: "天秤座", range: "Sep 23 — Oct 22" },
    primary: "lapis-lazuli",
    stones: [
      { en: "Lapis Lazuli", k: "lapis lazuli" },
      { en: "Amethyst", k: "amethyst" },
      { en: "Aquamarine", k: "aquamarine" },
    ],
    narrative: (
      <>
        September traditionally pairs with sapphire — a blue with
        reputation. We work in <S m="lapis lazuli">Lapis Lazuli</S>:
        ultramarine before ultramarine had a name, scattered with tiny
        pyrite stars. Libras, balanced through October, reach also for{" "}
        <S m="amethyst">Amethyst</S> and{" "}
        <S m="aquamarine">Aquamarine</S> — careers that take their
        time, decisions you've already made.
      </>
    ),
  },
  {
    n: "10",
    en: "October",
    zodiac: { en: "Scorpio", zh: "天蝎座", range: "Oct 23 — Nov 21" },
    primary: "black-tourmaline",
    stones: [
      { en: "Black Tourmaline", k: "black tourmaline" },
      { en: "Garnet", k: "garnet" },
      { en: "Moonstone", k: "moonstone" },
    ],
    narrative: (
      <>
        October is tourmaline in the modern birthstone list — usually
        pink, opal, or watermelon. We work the deepest version:{" "}
        <S m="black tourmaline">Black Tourmaline</S>, a small wall
        between you and the noise. Scorpios pair it with{" "}
        <S m="garnet">Garnet</S> for grounding or{" "}
        <S m="moonstone">Moonstone</S> for what slips through.
      </>
    ),
  },
  {
    n: "11",
    en: "November",
    zodiac: { en: "Sagittarius", zh: "射手座", range: "Nov 22 — Dec 21" },
    primary: "citrine",
    stones: [
      { en: "Citrine", k: "citrine" },
      { en: "Amethyst", k: "amethyst" },
      { en: "Rose Quartz", k: "rose quartz" },
    ],
    narrative: (
      <>
        November belongs to topaz — usually golden, sometimes blue.{" "}
        <S m="citrine">Citrine</S> is the piece we make in the same key:
        gold without the weight, the colour of slow afternoons.
        Sagittarius types, late November into December, also carry{" "}
        <S m="amethyst">Amethyst</S> for clarity and{" "}
        <S m="rose quartz">Rose Quartz</S> for the people they love but
        don't write to enough.
      </>
    ),
  },
  {
    n: "12",
    en: "December",
    zodiac: { en: "Capricorn", zh: "摩羯座", range: "Dec 22 — Jan 19" },
    primary: "aquamarine",
    stones: [
      { en: "Aquamarine", k: "aquamarine" },
      { en: "Amethyst", k: "amethyst" },
    ],
    narrative: (
      <>
        December pairs with tanzanite or turquoise — both blue, both
        rare. The piece we make most often is{" "}
        <S m="aquamarine">Aquamarine</S>: seawater with a spine, soft
        enough for the year's quietest days. Capricorns also reach for{" "}
        <S m="amethyst">Amethyst</S> — patient violet, end-of-year
        colour.
      </>
    ),
  },
];

export default function StonesPage() {
  return (
    <>
      <main className="page-wrap stones-page">
        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="kpcty-container stones-hero">
          <div className="mono up stones-hero__kicker">§ Stones · 石谱</div>
          <h1 className="display stones-hero__title">
            Stones we{" "}
            <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
              string
            </em>
            .
          </h1>
          <span
            className="brush"
            aria-hidden
            style={{ display: "inline-block", width: 180, marginTop: 28 }}
          />
          <p className="serif stones-hero__lead">
            Every KPCTY piece begins with a single decision: which stone, for
            which wish. The almanac below holds {TOTAL} of them — cut from
            named mountains, sorted by what they're for, and knotted onto
            silk by hand in Philadelphia.
          </p>
          <p className="serif stones-hero__lead stones-hero__lead--small">
            Find yours by the month you were born, by the wish you're
            carrying, or by the stone you already love.
          </p>

          {/* ── Section index — quick-jump ── */}
          <nav className="stones-toc" aria-label="Sections">
            <a href="#months" className="stones-toc__link">
              <span className="mono up stones-toc__num">§ 01</span>
              <span className="serif stones-toc__label">By the Month</span>
              <span className="serif-sc stones-toc__zh">月</span>
              <span className="mono up stones-toc__count">[12]</span>
            </a>
            {FAMILIES.map((f) => (
              <a key={f.id} href={`#${f.id}`} className="stones-toc__link">
                <span className="mono up stones-toc__num">§ {f.n}</span>
                <span className="serif stones-toc__label">{f.en}</span>
                <span className="serif-sc stones-toc__zh">{f.zh}</span>
                <span className="mono up stones-toc__count">
                  [{f.stones.length}]
                </span>
              </a>
            ))}
          </nav>
        </section>

        {/* ── § 01 — By the Month ──────────────────────────────────
         * Storytelling-first entry into the page: each shopper finds
         * their birth month, reads a small editorial paragraph that
         * weaves together both birthstone traditions, and clicks
         * straight into the catalogue. The "primary" bead photo at
         * the top of each card is the stone we actually carry for
         * that month — the one their click resolves to. */}
        <section id="months" className="kpcty-container stones-family stones-months">
          <header className="sec-head stones-family__head">
            <div className="sec-head__num">§ 01 — By the Month · 月</div>
            <h2 className="display sec-head__title">
              Twelve months,{" "}
              <em
                className="serif-sc"
                style={{ color: "var(--cinnabar)", fontStyle: "italic" }}
              >
                two
              </em>{" "}
              traditions.
            </h2>
            <div className="sec-head__meta">birthstones · zodiac stones</div>
          </header>

          <p className="serif stones-family__lead">
            The Western birthstone calendar was fixed by Polish merchants in
            the early 1900s; the Chinese reading of zodiac stones is older,
            and quieter. They disagree more often than not — which is the
            gift of having both. Find the month you were born, or the sign
            you were born under. Take whichever feels truer.
          </p>

          <div className="stones-months-grid">
            {MONTHS.map((m) => (
              <article key={m.n} className="month-card lift">
                <div className="month-card__bead-wrap">
                  {/* Each month has its own atmospherically-lit bead photo
                   * at /public/stones/months/<month>.png — distinct from
                   * the clinical family-section bead at /stones/<slug>.png.
                   * Filename matches the lowercase EN month name. */}
                  <Image
                    src={`/stones/months/${m.en.toLowerCase()}.png?v=4`}
                    alt={`The bead we feature for ${m.en}`}
                    width={300}
                    height={300}
                    sizes="(max-width: 640px) 140px, 180px"
                    unoptimized
                    className="month-card__bead"
                  />
                </div>
                <header className="month-card__head">
                  <div className="mono up month-card__num">§ {m.n}</div>
                  <h3 className="display month-card__name">{m.en}</h3>
                  <div className="mono up month-card__zodiac">
                    {m.zodiac.en}
                    <span className="serif-sc">{m.zodiac.zh}</span>
                  </div>
                  <div className="mono month-card__dates">{m.zodiac.range}</div>
                </header>
                <p className="serif month-card__narrative">{m.narrative}</p>
                {/* Explicit shop CTAs — one pill per stone the
                 * narrative references, in the same order. The
                 * narrative italics still link inline; these pills
                 * are the obvious shop-this-stone affordance for
                 * users who scan rather than read. */}
                <div className="month-card__shop">
                  {m.stones.map((s) => (
                    <Link
                      key={s.en}
                      href={`/search?material=${encodeURIComponent(s.k)}`}
                      className="month-card__shop-pill"
                    >
                      <span className="month-card__shop-arrow" aria-hidden>
                        →
                      </span>
                      {s.en}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Family sections ─────────────────────────────────────── */}
        {FAMILIES.map((family) => (
          <section
            key={family.id}
            id={family.id}
            className="kpcty-container stones-family"
          >
            <header className="sec-head stones-family__head">
              <div className="sec-head__num">
                § {family.n} — {family.en} · {family.zh}
              </div>
              <h2 className="display sec-head__title">
                {family.en}{" "}
                <em
                  className="serif-sc"
                  style={{ color: "var(--cinnabar)", fontStyle: "italic" }}
                >
                  {family.zh}
                </em>
              </h2>
              <div className="sec-head__meta">
                {family.stones.length} stone
                {family.stones.length === 1 ? "" : "s"}
              </div>
            </header>

            <p className="serif stones-family__lead">{family.lead}</p>

            {/* Section-level CTA — links to the catalogue filtered by
             * intent. Complements the per-stone CTAs (which filter by
             * material): a shopper can either tap one stone they
             * already want, or tap "browse all" to see every piece
             * tagged with this intent (which may include stones we
             * don't feature on this page). */}
            <Link
              href={`/search?intent=${encodeURIComponent(family.intentKey)}`}
              className="mono up stones-family__cta"
            >
              Browse all pieces for {family.en.replace(/^For /, "").toLowerCase()} →
            </Link>

            <div className="stones-grid">
              {family.stones.map((s) => {
                const resolved = resolveMaterial(s.resolveKey);
                const wish = s.wish ?? resolved.desc;
                return (
                  <article key={s.en} className="stone-card lift">
                    <div className="stone-card__swatch">
                      {/* `unoptimized` bypasses Next.js's _next/image
                       * pipeline so the raw PNG is served. Plus a
                       * cache-bust query string so browsers, dev
                       * server, and any CDN re-fetch instead of
                       * holding a stale optimized version. Bumping
                       * the version suffix forces a fresh fetch. */}
                      <Image
                        src={`/stones/${slug(s.en)}.png?v=3`}
                        alt={`${s.en} — polished bead`}
                        width={200}
                        height={200}
                        unoptimized
                        className="stone-card__bead"
                      />
                    </div>
                    <div className="stone-card__body">
                      <div className="mono up stone-card__pinyin">
                        {resolved.pinyin}
                      </div>
                      <div className="serif-sc stone-card__zh">{s.zh}</div>
                      <div
                        className="serif stone-card__name"
                        style={{ fontStyle: "italic" }}
                      >
                        {s.en}
                      </div>
                      <p className="serif stone-card__wish">{wish}</p>
                      <Link
                        href={`/search?material=${encodeURIComponent(s.searchKey)}`}
                        className="mono up stone-card__cta"
                      >
                        Pieces with {s.en.toLowerCase()} →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        {/* ── Closing CTA ─────────────────────────────────────────── */}
        <section className="stones-closing">
          <div className="kpcty-container stones-closing__inner">
            <div className="mono up stones-closing__kicker">
              ⊕ Find your stone · 寻
            </div>
            <h2 className="display stones-closing__title">
              Pick the stone
              <br />
              that matches{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                the week
              </em>{" "}
              you're in.
            </h2>
            <p className="serif stones-closing__lead">
              The right piece usually picks you back. Browse by birth month,
              by what you're carrying it for, or by the stone you already
              love. If none of those quite fits, write to us — we'll match
              a stone to your wish.
            </p>
            <div className="stones-closing__cta">
              <Link href="/search" className="btn btn--red">
                Browse the archive →
              </Link>
              <Link href="/contact" className="btn btn--ghost">
                Tell us your wish
              </Link>
            </div>
            <div
              className="serif-sc stones-closing__zh"
              aria-hidden
              style={{ color: "var(--cinnabar)", opacity: 0.18 }}
            >
              石
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
