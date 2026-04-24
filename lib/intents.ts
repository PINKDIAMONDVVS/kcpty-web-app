/* ────────────────────────────────────────────────────────────
   Intent → Chinese / pinyin / copy mapping + fuzzy resolver.
   Used by the home page intentions grid and any product card
   that needs to surface an intent seal.
   ──────────────────────────────────────────────────────────── */

export const INTENT_ZH: Record<string, string> = {
  // Luck / Fortune
  luck: '福', fortune: '福', fortunate: '福', lucky: '福',
  // Love / Romance
  love: '爱', loved: '爱', romance: '爱', romantic: '爱',
  // Calm / Serenity
  calm: '静', calmness: '静', serenity: '静', serene: '静', tranquility: '静',
  // Courage / Bravery
  courage: '勇', brave: '勇', bravery: '勇', fearless: '勇',
  // Wealth / Abundance
  wealth: '财', wealthy: '财', abundance: '财', rich: '财',
  // Wisdom
  wisdom: '慧', wise: '慧',
  // Protection / Safety
  protection: '护', protected: '护', safety: '护', safe: '护', guard: '护',
  // Wish / Hope
  wish: '愿', wishes: '愿', hope: '愿', hopeful: '愿',
  // Health / Wellness
  health: '康', healthy: '康', wellness: '康', wellbeing: '康',
  // Harmony / Balance
  harmony: '和', harmonious: '和', balance: '和', balanced: '和',
  // Peace
  peace: '安', peaceful: '安', rest: '安',
  // Joy / Happiness
  joy: '乐', joyful: '乐', happiness: '乐', happy: '乐', bliss: '乐',
  // Strength / Power
  strength: '强', strong: '强', power: '强', powerful: '强', resilience: '强',
  // Insight / Awareness
  insight: '悟', awareness: '悟', awakening: '悟', enlightenment: '悟',
  // Clarity / Focus
  clarity: '澈', clear: '澈', focus: '澈', focused: '澈', mind: '澈',
  // Prosperity / Success
  prosperity: '昌', prosperous: '昌', success: '昌', successful: '昌', growth: '昌',
  // Creativity / Inspiration
  creativity: '创', creative: '创', inspiration: '创', inspired: '创',
  // Gratitude
  gratitude: '恩', grateful: '恩', thanks: '恩',
  // Longevity
  longevity: '寿', long: '寿',
  // Friendship / Connection
  friendship: '友', friend: '友', connection: '友',
  // Heritage / Craft / Tradition / Legacy
  heritage: '承', tradition: '承', legacy: '承', ancestry: '承', roots: '承',
  craft: '艺', crafted: '艺', craftsmanship: '艺', artisan: '艺', art: '艺', skill: '艺',
  // Healing / Renewal / Recovery
  healing: '愈', heal: '愈', recovery: '愈', restore: '愈', mend: '愈',
  renewal: '新', renew: '新', rebirth: '新', fresh: '新', reset: '新',
};

export const INTENT_PINYIN: Record<string, string> = {
  luck: 'fú',      fortune: 'fú',    fortunate: 'fú',   lucky: 'fú',
  love: 'ài',      loved: 'ài',      romance: 'ài',     romantic: 'ài',
  calm: 'jìng',    calmness: 'jìng', serenity: 'jìng',  serene: 'jìng',   tranquility: 'jìng',
  courage: 'yǒng', brave: 'yǒng',    bravery: 'yǒng',   fearless: 'yǒng',
  wealth: 'cái',   wealthy: 'cái',   abundance: 'cái',  rich: 'cái',
  wisdom: 'huì',   wise: 'huì',
  protection: 'hù', protected: 'hù', safety: 'hù',      safe: 'hù',       guard: 'hù',
  wish: 'yuàn',    wishes: 'yuàn',   hope: 'yuàn',      hopeful: 'yuàn',
  health: 'kāng',  healthy: 'kāng',  wellness: 'kāng',  wellbeing: 'kāng',
  harmony: 'hé',   harmonious: 'hé', balance: 'hé',     balanced: 'hé',
  peace: 'ān',     peaceful: 'ān',   rest: 'ān',
  joy: 'lè',       joyful: 'lè',     happiness: 'lè',   happy: 'lè',      bliss: 'lè',
  strength: 'qiáng', strong: 'qiáng', power: 'qiáng',   powerful: 'qiáng', resilience: 'qiáng',
  insight: 'wù',   awareness: 'wù',  awakening: 'wù',   enlightenment: 'wù',
  clarity: 'chè',  clear: 'chè',     focus: 'chè',      focused: 'chè',   mind: 'chè',
  prosperity: 'chāng', prosperous: 'chāng', success: 'chāng', successful: 'chāng', growth: 'chāng',
  creativity: 'chuàng', creative: 'chuàng', inspiration: 'chuàng', inspired: 'chuàng',
  gratitude: 'ēn',  grateful: 'ēn',   thanks: 'ēn',
  longevity: 'shòu', long: 'shòu',
  friendship: 'yǒu', friend: 'yǒu',   connection: 'yǒu',
  heritage: 'chéng', tradition: 'chéng', legacy: 'chéng', ancestry: 'chéng', roots: 'chéng',
  craft: 'yì',      crafted: 'yì',     craftsmanship: 'yì', artisan: 'yì',    art: 'yì',       skill: 'yì',
  healing: 'yù',    heal: 'yù',        recovery: 'yù',     restore: 'yù',    mend: 'yù',
  renewal: 'xīn',   renew: 'xīn',      rebirth: 'xīn',     fresh: 'xīn',     reset: 'xīn',
};

export const INTENT_DESC: Record<string, string> = {
  luck:       'For the door that has not yet opened.',
  love:       'For the ones you have — and the ones you will find.',
  calm:       'For the breath between two emails.',
  courage:    'For the subway ride that is about to change everything.',
  wealth:     'Not for greed — for freedom to say no.',
  wisdom:     'For the questions you are still learning how to ask.',
  protection: 'A small wall between you and the noise.',
  wish:       'For whatever you need it to mean today.',
  health:     'For the body that carries everything else.',
  harmony:    'For the rooms you want to walk back into.',
  peace:      'For the nights that need to end softly.',
  joy:        'For the mornings that deserve company.',
  strength:   'For the weeks that ask too much.',
  insight:    'For the answer you already know.',
  clarity:    'For when the line between yes and no is thin.',
  prosperity: 'For the long game — not the flash.',
  creativity: 'For the idea that keeps tapping on the window.',
  gratitude:  'For what you already have, before you ask for more.',
  longevity:  'For slow years and steady hands.',
  friendship: 'For the people who pick up on the first ring.',
  heritage:   'For the hands that came before yours.',
  craft:      'For the hands that came before yours.',
  healing:    'For the season of coming back.',
  renewal:    'For the season of coming back.',
};

/* Parse a Shopify list-type metafield value (JSON-encoded string). */
export function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  try { return JSON.parse(value) as string[]; } catch { return []; }
}

export type ResolvedIntent = {
  zh:      string;
  pinyin:  string;
  desc:    string;
  rootKey: string | null;
};

/* Fuzzy-resolve a raw intent string to its zh / pinyin / desc.
 * Tries: exact match → each word in split → substring of any mapped key. */
export function resolveIntent(raw: string): ResolvedIntent {
  const normalized = raw.trim().toLowerCase();
  const tryKey = (k: string | null): ResolvedIntent | null =>
    k && INTENT_ZH[k]
      ? {
          zh:      INTENT_ZH[k],
          pinyin:  INTENT_PINYIN[k] ?? '',
          desc:    INTENT_DESC[k]   ?? 'Pieces chosen for this wish.',
          rootKey: k,
        }
      : null;

  const exact = tryKey(normalized);
  if (exact) return exact;

  for (const word of normalized.split(/[\s,&/_\-]+/).filter(Boolean)) {
    const hit = tryKey(word);
    if (hit) return hit;
  }
  for (const k of Object.keys(INTENT_ZH)) {
    if (normalized.includes(k)) return tryKey(k)!;
  }
  return { zh: '', pinyin: '', desc: 'Pieces chosen for this wish.', rootKey: null };
}

/* Shortcut: resolve the first Chinese char from a product-style
 * `intents` list, falling back to an empty string. */
export function getIntentZh(intentValues: string[]): string {
  for (const v of intentValues) {
    const { zh } = resolveIntent(v);
    if (zh) return zh;
  }
  return '';
}
