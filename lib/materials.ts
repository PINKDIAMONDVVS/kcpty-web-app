/* ────────────────────────────────────────────────────────────
   Material → Chinese / pinyin / copy mapping + fuzzy resolver.
   Same shape as lib/intents.ts; used by the home page
   "By material" grid and any product surface that needs
   a one-character material seal.
   ──────────────────────────────────────────────────────────── */

export const MATERIAL_ZH: Record<string, string> = {
  // ── Jade family ──
  jade: '玉', nephrite: '玉', jadeite: '玉', hetian: '玉', khotan: '玉',
  lavender: '紫', serpentine: '蛇',
  jasper: '碧', unakite: '碧',
  aventurine: '东',
  // ── Wood ──
  agarwood: '沉', oud: '沉', qinan: '沉', aloeswood: '沉',
  sandalwood: '檀', sandal: '檀',
  rosewood: '梨', hualee: '梨', huanghuali: '梨',
  ebony: '乌',
  walnut: '核',
  bamboo: '竹',
  teak: '柚',
  blackwood: '乌',
  // ── Amber family ──
  amber: '珀', honey: '蜡', beeswax: '蜡', succinite: '珀', burmite: '珀',
  // ── Cinnabar & reds ──
  cinnabar: '砂', vermilion: '砂',
  coral: '珊',
  carnelian: '玖',
  // ── Obsidian & dark stones ──
  obsidian: '曜', snowflake: '曜', rainbow: '曜',
  onyx: '玛',
  agate: '玛', chalcedony: '髓',
  jet: '煤',
  shungite: '碳',
  // ── Turquoise family ──
  turquoise: '绿',
  chrysocolla: '硅',
  // ── Tiger / hawk / cat eye ──
  tiger: '虎', tigers: '虎', tigereye: '虎',
  hawk: '鹰', hawkeye: '鹰',
  cat: '猫', cateye: '猫',
  // ── Amazonite / river stones ──
  amazonite: '河', tianhe: '河',
  // ── Quartz / crystal family ──
  quartz: '晶', crystal: '晶',
  rose: '粉',
  smoky: '茶', smokey: '茶',
  rutilated: '发', rutile: '发',
  phantom: '幽', ghost: '幽',
  strawberry: '莓',
  clear: '白',
  opalite: '乳',
  // ── Chrysoprase / prehnite ──
  chrysoprase: '绿',
  prehnite: '葡',
  // ── Lapis / sodalite / azurite ──
  lapis: '青', lazuli: '青',
  sodalite: '钠',
  azurite: '蓝',
  kyanite: '蓝',
  // ── Labradorite / spectrolite ──
  labradorite: '拉',
  spectrolite: '拉',
  // ── Pearl family ──
  pearl: '珠', freshwater: '珠', tahitian: '珠',
  mother: '贝', shell: '贝', nacre: '贝',
  // ── Bodhi / seeds ──
  bodhi: '菩', pu: '菩', puti: '菩', putizi: '菩', seed: '菩',
  xingyue: '星', dragon: '眼', longyan: '眼',
  // ── Metals ──
  gold: '金', silver: '银', copper: '铜', bronze: '铜',
  platinum: '铂', titanium: '钛', steel: '钢', iron: '铁',
  // ── Misc organics ──
  ivory: '骨', bone: '骨', horn: '角', antler: '角',
  leather: '革',
  // ── Earth stones ──
  malachite: '孔',
  hematite: '铁',
  magnetite: '磁',
  pyrite: '黄',
  // ── Garnet family ──
  garnet: '榴', pomegranate: '榴',
  spessartine: '榴',
  // ── Aqua / water blues ──
  aquamarine: '海',
  topaz: '托', blue: '蓝',
  // ── Moonstone / sunstone ──
  moonstone: '月', sunstone: '阳',
  // ── Yellow / violet / green crystals ──
  citrine: '黄',
  amethyst: '紫',
  peridot: '橄', olivine: '橄',
  emerald: '翠',
  // ── Tourmaline / watermelon ──
  tourmaline: '玺', watermelon: '西',
  // ── Apatite / fluorite / spinel ──
  apatite: '磷',
  fluorite: '萤',
  spinel: '尖',
  // ── Opal / opalescent ──
  opal: '欧',
  // ── Larimar / rhodonite ──
  larimar: '拉',
  rhodonite: '蔷', rhodochrosite: '蔷',
  // ── Porcelain / ceramic (KPCTY's namesake range) ──
  porcelain: '瓷', ceramic: '瓷',
  clay: '陶', stoneware: '陶',
  // ── Fabrics / cord ──
  silk: '丝', cord: '丝', thread: '丝', cotton: '棉',
  // ── Generic catch-all used by resolver when nothing else hits ──
  material: '物', stone: '石', gem: '宝', mineral: '矿',
};

export const MATERIAL_PINYIN: Record<string, string> = {
  jade: 'yù',       nephrite: 'yù',    jadeite: 'yù',    hetian: 'yù',    khotan: 'yù',
  lavender: 'zǐ',   serpentine: 'shé',
  jasper: 'bì',     unakite: 'bì',
  aventurine: 'dōng',
  agarwood: 'chén', oud: 'chén',       qinan: 'chén',    aloeswood: 'chén',
  sandalwood: 'tán', sandal: 'tán',
  rosewood: 'lí',   hualee: 'lí',      huanghuali: 'lí',
  ebony: 'wū',      blackwood: 'wū',
  walnut: 'hé',
  bamboo: 'zhú',
  teak: 'yòu',
  amber: 'pò',      honey: 'là',       beeswax: 'là',    succinite: 'pò', burmite: 'pò',
  cinnabar: 'shā',  vermilion: 'shā',
  coral: 'shān',
  carnelian: 'jiǔ',
  obsidian: 'yào',  snowflake: 'yào',  rainbow: 'yào',
  onyx: 'mǎ',
  agate: 'mǎ',      chalcedony: 'suǐ',
  jet: 'méi',
  shungite: 'tàn',
  turquoise: 'lǜ',
  chrysocolla: 'guī',
  tiger: 'hǔ',      tigers: 'hǔ',      tigereye: 'hǔ',
  hawk: 'yīng',     hawkeye: 'yīng',
  cat: 'māo',       cateye: 'māo',
  amazonite: 'hé',  tianhe: 'hé',
  quartz: 'jīng',   crystal: 'jīng',
  rose: 'fěn',
  smoky: 'chá',     smokey: 'chá',
  rutilated: 'fà',  rutile: 'fà',
  phantom: 'yōu',   ghost: 'yōu',
  strawberry: 'méi',
  clear: 'bái',
  opalite: 'rǔ',
  chrysoprase: 'lǜ',
  prehnite: 'pú',
  lapis: 'qīng',    lazuli: 'qīng',
  sodalite: 'nà',
  azurite: 'lán',
  kyanite: 'lán',
  labradorite: 'lā',
  spectrolite: 'lā',
  pearl: 'zhū',     freshwater: 'zhū', tahitian: 'zhū',
  mother: 'bèi',    shell: 'bèi',      nacre: 'bèi',
  bodhi: 'pú',      pu: 'pú',          puti: 'pú',       putizi: 'pú',    seed: 'pú',
  xingyue: 'xīng',  dragon: 'yǎn',     longyan: 'yǎn',
  gold: 'jīn',      silver: 'yín',     copper: 'tóng',   bronze: 'tóng',
  platinum: 'bó',   titanium: 'tài',   steel: 'gāng',    iron: 'tiě',
  ivory: 'gǔ',      bone: 'gǔ',        horn: 'jiǎo',     antler: 'jiǎo',
  leather: 'gé',
  malachite: 'kǒng',
  hematite: 'tiě',
  magnetite: 'cí',
  pyrite: 'huáng',
  garnet: 'liú',    pomegranate: 'liú', spessartine: 'liú',
  aquamarine: 'hǎi',
  topaz: 'tuō',     blue: 'lán',
  moonstone: 'yuè', sunstone: 'yáng',
  citrine: 'huáng',
  amethyst: 'zǐ',
  peridot: 'gǎn',   olivine: 'gǎn',
  emerald: 'cuì',
  tourmaline: 'xǐ', watermelon: 'xī',
  apatite: 'lín',
  fluorite: 'yíng',
  spinel: 'jiān',
  opal: 'ōu',
  larimar: 'lā',
  rhodonite: 'qiáng', rhodochrosite: 'qiáng',
  porcelain: 'cí',  ceramic: 'cí',
  clay: 'táo',      stoneware: 'táo',
  silk: 'sī',       cord: 'sī',        thread: 'sī',     cotton: 'mián',
  material: 'wù',   stone: 'shí',      gem: 'bǎo',       mineral: 'kuàng',
};

export const MATERIAL_DESC: Record<string, string> = {
  jade:        'Cold to the touch. Warms with time.',
  jasper:      'Rooted. Untheatrical.',
  agarwood:    'Resin the forest made while it was dying.',
  sandalwood:  'A temple smell you can wear on a wrist.',
  rosewood:    'A grain you feel with your thumb in meetings.',
  amber:       'Sap that kept a secret for fifty million years.',
  honey:       'Gold that took a hundred years to cool.',
  beeswax:     'Gold that took a hundred years to cool.',
  cinnabar:    'The first red. Still the loudest.',
  vermilion:   'The first red. Still the loudest.',
  coral:       'Built, not grown.',
  obsidian:    'Lava that cooled before anyone was watching.',
  onyx:        "A band for every year you didn't know you were counting.",
  agate:       "A band for every year you didn't know you were counting.",
  turquoise:   'Sky-color pressed into stone.',
  tiger:       'The light moves when you do.',
  amazonite:   'The green of a river at late afternoon.',
  quartz:      'Clear things, clearly.',
  crystal:     'Clear things, clearly.',
  rose:        'Pink the way a cheek is pink.',
  lapis:       'Ultramarine before ultramarine had a name.',
  pearl:       'A grain of sand with a long apology.',
  bodhi:       'Seeds that outlive the trees that dropped them.',
  gold:        'Soft metal. Hard century.',
  silver:      'Moon metal. Cool on the pulse.',
  copper:      'The first metal we learned to love.',
  ivory:       'Heirloom, not trophy.',
  malachite:   'Green with a clock inside it.',
  hematite:    'Heavy as a decision.',
  garnet:      'A red that keeps to itself.',
  aquamarine:  'Seawater with a spine.',
  moonstone:   'A little weather on the wrist.',
  sunstone:    'Dawn, pocket-sized.',
  citrine:     'The colour of slow afternoons.',
  amethyst:    'Violet, but the patient kind.',
  peridot:     'Spring, in the form of a bead.',
  topaz:       'Gold without the weight.',
  porcelain:   "The studio's own medium.",
  ceramic:     "The studio's own medium.",
  silk:        'What holds everything else together.',
  cord:        'What holds everything else together.',
};

export type ResolvedMaterial = {
  zh:      string;
  pinyin:  string;
  desc:    string;
  rootKey: string | null;
};

/* Generic seal used when a material label doesn't match anything
 * in MATERIAL_ZH. Reads as "wù" (thing / material) — looks deliberate,
 * never leaves a card blank. */
const FALLBACK: ResolvedMaterial = {
  zh:      '物',
  pinyin:  'wù',
  desc:    'One of the stones we work with.',
  rootKey: null,
};

export function resolveMaterial(raw: string): ResolvedMaterial {
  const normalized = raw.trim().toLowerCase();
  const tryKey = (k: string | null): ResolvedMaterial | null =>
    k && MATERIAL_ZH[k]
      ? {
          zh:      MATERIAL_ZH[k],
          pinyin:  MATERIAL_PINYIN[k] ?? '',
          desc:    MATERIAL_DESC[k]   ?? 'One of the stones we work with.',
          rootKey: k,
        }
      : null;

  const exact = tryKey(normalized);
  if (exact) return exact;

  for (const word of normalized.split(/[\s,&/_\-]+/).filter(Boolean)) {
    const hit = tryKey(word);
    if (hit) return hit;
  }
  for (const k of Object.keys(MATERIAL_ZH)) {
    if (normalized.includes(k)) return tryKey(k)!;
  }
  return FALLBACK;
}
