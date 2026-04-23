export type KpctyProduct = {
  id: string;
  handle: string;
  img: string;
  name: string;
  zh: string;
  pinyin: string;
  series: string;
  intent: string;
  intentZh: string;
  stones: string[];
  mantra: string;
  price: number;
  tag?: 'HOT' | 'NEW' | 'SOLD';
  collection: string;
  diameter: string;
  beads: number;
  lot: string;
  wish: string;
};

export type KpctyIntention = {
  key: string;
  pinyin: string;
  zh: string;
  ids: string[];
  desc: string;
};

export type KpctyCollection = {
  id: string;
  name: string;
  zh: string;
  count: number;
  desc: string;
};

export const KPCTY_PRODUCTS: KpctyProduct[] = [
  // 福 Luck (p01–p04)
  { id: 'p01', handle: 's1-01-hongfu', img: 'p01', name: 'Hóng Fú', zh: '鸿福', pinyin: 'hóng fú', series: 'S1·01', intent: 'Luck', intentZh: '福', stones: ['Red Jade', 'Gold Obsidian'], mantra: 'The door swings open when you stop reaching for the handle.', price: 188, tag: 'HOT', collection: 'jade', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.001', wish: 'To call luck in without pleading.' },
  { id: 'p02', handle: 's1-02-jixing', img: 'p02', name: 'Jí Xīng', zh: '吉星', pinyin: 'jí xīng', series: 'S1·02', intent: 'Luck', intentZh: '福', stones: ['Citrine', 'Brass'], mantra: 'A lucky star does not announce itself.', price: 168, collection: 'crystal', diameter: '8mm', beads: 21, lot: '0x9F·KPC·S1.002', wish: 'To be in the right room at the right time.' },
  { id: 'p03', handle: 's1-03-manyun', img: 'p03', name: 'Mǎn Yùn', zh: '满运', pinyin: 'mǎn yùn', series: 'S1·03', intent: 'Luck', intentZh: '福', stones: ['Green Aventurine', 'Copper'], mantra: 'Fortune fills the cup that is held steady.', price: 148, tag: 'NEW', collection: 'crystal', diameter: '8mm', beads: 21, lot: '0x9F·KPC·S1.003', wish: 'To receive what is owed to patience.' },
  { id: 'p04', handle: 's1-04-fuqi', img: 'p04', name: 'Fú Qì', zh: '福气', pinyin: 'fú qì', series: 'S1·04', intent: 'Luck', intentZh: '福', stones: ['Nephrite Jade', 'Cinnabar'], mantra: 'Good air moves through an open chest.', price: 218, tag: 'HOT', collection: 'jade', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.004', wish: 'To breathe with luck already inside.' },

  // 爱 Love (p05–p08)
  { id: 'p05', handle: 's1-05-changqing', img: 'p05', name: 'Cháng Qíng', zh: '长情', pinyin: 'cháng qíng', series: 'S1·05', intent: 'Love', intentZh: '爱', stones: ['Rose Quartz', 'Silver'], mantra: 'Long love is not loud. It is just still there.', price: 158, tag: 'HOT', collection: 'crystal', diameter: '8mm', beads: 21, lot: '0x9F·KPC·S1.005', wish: 'To love without running out.' },
  { id: 'p06', handle: 's1-06-shenjiao', img: 'p06', name: 'Shēn Jiāo', zh: '深交', pinyin: 'shēn jiāo', series: 'S1·06', intent: 'Love', intentZh: '爱', stones: ['Rhodonite', 'Black Onyx'], mantra: 'The friend who knows your name before you speak it.', price: 178, collection: 'crystal', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.006', wish: 'To be deeply known.' },
  { id: 'p07', handle: 's1-07-heli', img: 'p07', name: 'Hé Lì', zh: '合力', pinyin: 'hé lì', series: 'S1·07', intent: 'Love', intentZh: '爱', stones: ['Amethyst', 'Labradorite'], mantra: 'Two hands on the same rope go further.', price: 198, collection: 'crystal', diameter: '8mm', beads: 21, lot: '0x9F·KPC·S1.007', wish: 'To pull together with someone else.' },
  { id: 'p08', handle: 's1-08-qianmu', img: 'p08', name: 'Qiān Mù', zh: '牵木', pinyin: 'qiān mù', series: 'S1·08', intent: 'Love', intentZh: '爱', stones: ['Sandalwood', 'Red Coral'], mantra: 'Home is the smell of something familiar burning.', price: 168, tag: 'NEW', collection: 'agarwood', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.008', wish: 'To carry someone home in your nose.' },

  // 静 Calm (p09–p11)
  { id: 'p09', handle: 's1-09-anling', img: 'p09', name: 'Ān Líng', zh: '安灵', pinyin: 'ān líng', series: 'S1·09', intent: 'Calm', intentZh: '静', stones: ['White Jade', 'Silver'], mantra: 'A quiet mind is not an empty one.', price: 228, collection: 'jade', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.009', wish: 'To rest without stopping.' },
  { id: 'p10', handle: 's1-10-shui', img: 'p10', name: 'Shuǐ', zh: '水', pinyin: 'shuǐ', series: 'S1·10', intent: 'Calm', intentZh: '静', stones: ['Agarwood', 'Jade'], mantra: 'The lake does not try to be still. It simply is.', price: 248, tag: 'HOT', collection: 'agarwood', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.010', wish: 'Calm · to keep still' },
  { id: 'p11', handle: 's1-11-xijing', img: 'p11', name: 'Xī Jìng', zh: '息静', pinyin: 'xī jìng', series: 'S1·11', intent: 'Calm', intentZh: '静', stones: ['Blue Chalcedony', 'Sterling Silver'], mantra: 'Breathe out the noise. Keep the signal.', price: 188, collection: 'crystal', diameter: '8mm', beads: 21, lot: '0x9F·KPC·S1.011', wish: 'To find silence on a loud day.' },

  // 勇 Courage (p12–p14)
  { id: 'p12', handle: 's1-12-zhuangyuan', img: 'p12', name: 'Zhuàng Yuán', zh: '壮源', pinyin: 'zhuàng yuán', series: 'S1·12', intent: 'Courage', intentZh: '勇', stones: ['Red Tiger Eye', 'Hematite'], mantra: 'Courage does not roar. It walks forward anyway.', price: 168, collection: 'crystal', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.012', wish: 'To take the first step.' },
  { id: 'p13', handle: 's1-13-ganxing', img: 'p13', name: 'Gǎn Xíng', zh: '敢行', pinyin: 'gǎn xíng', series: 'S1·13', intent: 'Courage', intentZh: '勇', stones: ['Black Obsidian', 'Copper'], mantra: 'The path exists only after you begin.', price: 158, tag: 'NEW', collection: 'obsidian', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.013', wish: 'To move before the fear passes.' },
  { id: 'p14', handle: 's1-14-baogang', img: 'p14', name: 'Bào Gāng', zh: '豹钢', pinyin: 'bào gāng', series: 'S1·14', intent: 'Courage', intentZh: '勇', stones: ['Labradorite', 'Black Tourmaline'], mantra: 'Leopard moves quiet. Arrives sudden.', price: 198, collection: 'crystal', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.014', wish: 'To act before doubt can catch up.' },

  // 财 Wealth (p15–p18)
  { id: 'p15', handle: 's1-15-jucai', img: 'p15', name: 'Jù Cái', zh: '聚财', pinyin: 'jù cái', series: 'S1·15', intent: 'Wealth', intentZh: '财', stones: ['Pyrite', 'Yellow Tiger Eye'], mantra: 'Wealth pools where attention flows without desperation.', price: 178, tag: 'HOT', collection: 'crystal', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.015', wish: 'To let money stay.' },
  { id: 'p16', handle: 's1-16-kaimenghong', img: 'p16', name: 'Kāi Mén Hóng', zh: '开门红', pinyin: 'kāi mén hóng', series: 'S1·16', intent: 'Wealth', intentZh: '财', stones: ['Cinnabar', 'Red Coral'], mantra: 'A red door on a red morning.', price: 208, collection: 'cinnabar', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.016', wish: 'To start every deal with the wind at your back.' },
  { id: 'p17', handle: 's1-17-jinzhi', img: 'p17', name: 'Jīn Zhī', zh: '金枝', pinyin: 'jīn zhī', series: 'S1·17', intent: 'Wealth', intentZh: '财', stones: ['Gold Obsidian', 'Brass'], mantra: 'Grow slow and the roots go deep.', price: 188, collection: 'obsidian', diameter: '8mm', beads: 21, lot: '0x9F·KPC·S1.017', wish: 'To compound what you already have.' },
  { id: 'p18', handle: 's1-18-fengshui', img: 'p18', name: 'Fēng Shuǐ', zh: '风水', pinyin: 'fēng shuǐ', series: 'S1·18', intent: 'Wealth', intentZh: '财', stones: ['Green Jade', 'Bamboo Wood'], mantra: 'Let the current carry what heavy hands cannot.', price: 228, tag: 'NEW', collection: 'jade', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.018', wish: 'To position, not push.' },

  // 慧 Wisdom (p19–p21)
  { id: 'p19', handle: 's1-19-mingzhi', img: 'p19', name: 'Míng Zhì', zh: '明智', pinyin: 'míng zhì', series: 'S1·19', intent: 'Wisdom', intentZh: '慧', stones: ['Lapis Lazuli', 'Sterling Silver'], mantra: 'Seeing clearly is a kind of courage.', price: 238, tag: 'HOT', collection: 'crystal', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.019', wish: 'To know before deciding.' },
  { id: 'p20', handle: 's1-20-tongming', img: 'p20', name: 'Tōng Míng', zh: '通明', pinyin: 'tōng míng', series: 'S1·20', intent: 'Wisdom', intentZh: '慧', stones: ['Clear Quartz', 'Moonstone'], mantra: 'A clear stone shows what is already inside.', price: 198, collection: 'crystal', diameter: '8mm', beads: 21, lot: '0x9F·KPC·S1.020', wish: 'To cut through noise and find the signal.' },
  { id: 'p21', handle: 's1-21-guanyin', img: 'p21', name: 'Guān Yīn', zh: '观音', pinyin: 'guān yīn', series: 'S1·21', intent: 'Wisdom', intentZh: '慧', stones: ['White Jade', 'Turquoise'], mantra: 'She who perceives the sounds of the world.', price: 268, tag: 'NEW', collection: 'jade', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.021', wish: 'To listen before speaking.' },

  // 护 Protection (p22–p25)
  { id: 'p22', handle: 's1-22-pixiu', img: 'p22', name: 'Pí Xiū', zh: '貔貅', pinyin: 'pí xiū', series: 'S1·22', intent: 'Protection', intentZh: '护', stones: ['Black Obsidian', 'Gold Leaf'], mantra: 'Pixiu swallows evil and never lets it out.', price: 248, tag: 'HOT', collection: 'obsidian', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.022', wish: 'To keep harm from entering.' },
  { id: 'p23', handle: 's1-23-zhensha', img: 'p23', name: 'Zhèn Shā', zh: '镇煞', pinyin: 'zhèn shā', series: 'S1·23', intent: 'Protection', intentZh: '护', stones: ['Cinnabar', 'Black Tourmaline'], mantra: 'The ward does not ask permission.', price: 188, collection: 'cinnabar', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.023', wish: 'To press the bad luck flat before it rises.' },
  { id: 'p24', handle: 's1-24-hufu', img: 'p24', name: 'Hù Fú', zh: '护符', pinyin: 'hù fú', series: 'S1·24', intent: 'Protection', intentZh: '护', stones: ['Kyanite', 'Agarwood'], mantra: 'Every talisman is a conversation with something larger.', price: 218, collection: 'agarwood', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.024', wish: 'To carry a shield without the weight.' },
  { id: 'p25', handle: 's1-25-pingan', img: 'p25', name: 'Píng Ān', zh: '平安', pinyin: 'píng ān', series: 'S1·25', intent: 'Protection', intentZh: '护', stones: ['Green Jade', 'Seed Pearls'], mantra: 'Walk safe. Arrive whole.', price: 228, tag: 'NEW', collection: 'jade', diameter: '8mm', beads: 21, lot: '0x9F·KPC·S1.025', wish: 'To get there without incident.' },

  // 愿 Wish (p26–p29)
  { id: 'p26', handle: 's1-26-xuyuan', img: 'p26', name: 'Xǔ Yuàn', zh: '许愿', pinyin: 'xǔ yuàn', series: 'S1·26', intent: 'Wish', intentZh: '愿', stones: ['Amethyst', 'Moonstone'], mantra: 'Speak it softly once and then let it go.', price: 178, collection: 'crystal', diameter: '8mm', beads: 21, lot: '0x9F·KPC·S1.026', wish: 'To put a wish into the world and mean it.' },
  { id: 'p27', handle: 's1-27-chengxin', img: 'p27', name: 'Chéng Xīn', zh: '诚心', pinyin: 'chéng xīn', series: 'S1·27', intent: 'Wish', intentZh: '愿', stones: ['Blue Lace Agate', 'Sterling Silver'], mantra: 'What is asked sincerely is already half answered.', price: 158, tag: 'NEW', collection: 'crystal', diameter: '8mm', beads: 21, lot: '0x9F·KPC·S1.027', wish: 'To ask for what you actually want.' },
  { id: 'p28', handle: 's1-28-xingwen', img: 'p28', name: 'Xīng Wén', zh: '星纹', pinyin: 'xīng wén', series: 'S1·28', intent: 'Wish', intentZh: '愿', stones: ['Meteorite Bead', 'Brass'], mantra: 'Some wishes travel very far before landing.', price: 288, tag: 'HOT', collection: 'crystal', diameter: '10mm', beads: 19, lot: '0x9F·KPC·S1.028', wish: 'To reach something that feels impossible.' },
  { id: 'p29', handle: 's1-29-yuanman', img: 'p29', name: 'Yuán Mǎn', zh: '圆满', pinyin: 'yuán mǎn', series: 'S1·29', intent: 'Wish', intentZh: '愿', stones: ['Hetian Jade', 'Agarwood'], mantra: 'The last bead closes the circle. The wish is complete.', price: 298, tag: 'NEW', collection: 'jade', diameter: '12mm', beads: 19, lot: '0x9F·KPC·S1.029', wish: 'To finish what was started.' },
];

export const KPCTY_INTENTIONS: KpctyIntention[] = [
  { key: 'Luck',       pinyin: 'fú',   zh: '福', ids: ['p01','p02','p03','p04'],           desc: 'Call fortune in without forcing it. The oldest wish in the catalog.' },
  { key: 'Love',       pinyin: 'ài',   zh: '爱', ids: ['p05','p06','p07','p08'],           desc: 'For the long kind — the kind that stays after the excitement has passed.' },
  { key: 'Calm',       pinyin: 'jìng', zh: '静', ids: ['p09','p10','p11'],                 desc: 'Not emptiness. Stillness with something still in it.' },
  { key: 'Courage',    pinyin: 'yǒng', zh: '勇', ids: ['p12','p13','p14'],                 desc: 'For the move you keep putting off. The first step is the whole thing.' },
  { key: 'Wealth',     pinyin: 'cái',  zh: '财', ids: ['p15','p16','p17','p18'],           desc: 'Not a get-rich charm. A reminder to receive what you have already earned.' },
  { key: 'Wisdom',     pinyin: 'huì',  zh: '慧', ids: ['p19','p20','p21'],                 desc: 'Clarity before the decision. See it plain and choose well.' },
  { key: 'Protection', pinyin: 'hù',   zh: '护', ids: ['p22','p23','p24','p25'],           desc: 'Ward the door before anything arrives. Quiet armor.' },
  { key: 'Wish',       pinyin: 'yuàn', zh: '愿', ids: ['p26','p27','p28','p29'],           desc: "The one you have not said aloud yet. Say it with the bracelet first." },
];

export const KPCTY_COLLECTIONS: KpctyCollection[] = [
  { id: 'jade',     name: 'Jade',     zh: '玉石',  count: 7,  desc: 'Nephrite and jadeite from Hotan and Fujian. The oldest protection in the catalog.' },
  { id: 'agarwood', name: 'Agarwood', zh: '沉香',  count: 4,  desc: 'Oud resin beads from Vietnam and Hainan. Smell-memory in bead form.' },
  { id: 'crystal',  name: 'Crystal',  zh: '水晶',  count: 13, desc: 'Quartz, amethyst, lapis, citrine. The widest family — one for every mood.' },
  { id: 'obsidian', name: 'Obsidian', zh: '黑曜石', count: 3,  desc: 'Volcanic glass from the Changbai range. Absorbs what it touches.' },
  { id: 'cinnabar', name: 'Cinnabar', zh: '朱砂',  count: 2,  desc: 'Vermillion lacquer pressed into beads. Oldest ward against bad energy.' },
];
