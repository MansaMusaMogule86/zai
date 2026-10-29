// ═══════════════════════════════════════════════════════════════
// ZAI BEAUTÉ PRODUCT CATALOG
// Structured product data for Beauté commerce
// ═══════════════════════════════════════════════════════════════

export interface ProductShade {
  id: string;
  name: string;
  hex: string;
 skinTone?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "foundation" | "lipstick" | "lip-pencil" | "highlighter" | "mascara" | "brow" | "eyeliner" | "tint" | "sun-mist" | "blush" | "body-oil" | "lip-oil";
  tagline: string;
  description: string;
  price: number;
  currency: string;
  assetKey: string;
  shades: ProductShade[];
  boutiqaatUrl?: string;
}

export const products: Product[] = [
  {
    id: "p1",
    slug: "beauty-booster-foundation",
    name: "Beauty Booster Foundation",
    category: "foundation",
    tagline: "SPF 30 · Skin Glow Protector",
    description: "Radiant coverage with a natural glow. SPF 30 skin glow protector formulated for Middle Eastern skin tones with premium light-reflecting pigments.",
    price: 42,
    currency: "KWD",
    assetKey: "beaute.productFoundation",
    shades: [
      { id: "f1", name: "N00 Porcelain", hex: "#F5E6D3", skinTone: "fair" },
      { id: "f2", name: "N01 Sand", hex: "#E8C9A0", skinTone: "light" },
      { id: "f3", name: "N02 Honey", hex: "#D4A574", skinTone: "medium-light" },
      { id: "f4", name: "N03 Amber", hex: "#C08B5C", skinTone: "medium" },
      { id: "f5", name: "N04 Caramel", hex: "#A0704A", skinTone: "medium-deep" },
      { id: "f6", name: "N05 Bronze", hex: "#8B5E3C", skinTone: "deep" },
      { id: "f7", name: "N06 Espresso", hex: "#6B4226", skinTone: "deep" },
      { id: "f8", name: "N07 Noir", hex: "#4A2C17", skinTone: "very deep" },
    ],
  },
  {
    id: "p2",
    slug: "velvet-matt-lipstick",
    name: "Velvet Matt Lipstick",
    category: "lipstick",
    tagline: "Bold. Velvety. Unforgettable.",
    description: "A long-wearing matte lipstick with intense color payoff and a velvet-smooth finish. One swipe is all you need.",
    price: 18,
    currency: "KWD",
    assetKey: "beaute.productLipstick",
    shades: [
      { id: "l1", name: "Paris", hex: "#C41E3A" },
      { id: "l2", name: "Desert Rose", hex: "#C27C6B" },
      { id: "l3", name: "Nude ZAI", hex: "#D4A574" },
      { id: "l4", name: "Mocha", hex: "#7B5B4C" },
      { id: "l5", name: "Cherry Velvet", hex: "#9B1B30" },
      { id: "l6", name: "Burgundy Luxe", hex: "#5C0A1A" },
      { id: "l7", name: "Coral Dusk", hex: "#E8836B" },
      { id: "l8", name: "Nude Edit", hex: "#C9A88A" },
    ],
  },
  {
    id: "p3",
    slug: "velvet-veil",
    name: "Velvet Veil",
    category: "lipstick",
    tagline: "Liquid luxury for lips.",
    description: "A velvet-finish liquid lipstick with rich color payoff and all-day wear. Lightweight formula that glides on effortlessly.",
    price: 16,
    currency: "KWD",
    assetKey: "beaute.productVelvetVeil",
    shades: [
      { id: "vv1", name: "N01 Rose Nude", hex: "#C9A88A" },
      { id: "vv2", name: "N02 Dusty Pink", hex: "#C27C8A" },
      { id: "vv3", name: "N03 Mauve", hex: "#9B6B7A" },
      { id: "vv4", name: "N04 Berry Mood", hex: "#8B3A6B" },
    ],
  },
  {
    id: "p4",
    slug: "gloze-highlighter",
    name: "Glozè Highlighter",
    category: "highlighter",
    tagline: "Primed with Aloe Vera · Cashmere",
    description: "A finely milled highlighter primed with aloe vera for a luminous, cashmere-soft glow. Lit from within.",
    price: 22,
    currency: "KWD",
    assetKey: "beaute.productHighlighter",
    shades: [
      { id: "h1", name: "Cashmere", hex: "#D4E8D0" },
      { id: "h2", name: "Champagne Pop", hex: "#F5D6A8" },
      { id: "h3", name: "Golden Hour", hex: "#E8C36A" },
    ],
  },
  {
    id: "p5",
    slug: "lash-booster-mascara",
    name: "Lash Booster Mascara",
    category: "mascara",
    tagline: "Volume. Length. Power.",
    description: "A volumizing and lengthening mascara that coats every lash with jet-black intensity. Smudge-proof, long-wearing formula.",
    price: 16,
    currency: "KWD",
    assetKey: "beaute.productMascara",
    shades: [
      { id: "m1", name: "N01 Noir", hex: "#0A0A0A" },
    ],
  },
  {
    id: "p6",
    slug: "fastline-liquid-eyeliner",
    name: "Fastline Liquid Eyeliner",
    category: "eyeliner",
    tagline: "One stroke. Complete control.",
    description: "A precision liquid eyeliner with an ultra-fine tip for razor-sharp lines and effortless winged looks. Waterproof.",
    price: 14,
    currency: "KWD",
    assetKey: "beaute.productEyeliner",
    shades: [
      { id: "e1", name: "N01 Black", hex: "#0A0A0A" },
    ],
  },
  {
    id: "p7",
    slug: "color-bloom-lip-oil",
    name: "Color Bloom pH Reactor Lip Oil",
    category: "lip-oil",
    tagline: "Color-changing & long wearing.",
    description: "A pH-reactive lip oil that adapts to your natural lip chemistry, creating a unique color bloom. Long-wearing and deeply hydrating.",
    price: 15,
    currency: "KWD",
    assetKey: "beaute.productLipOil",
    shades: [
      { id: "lo1", name: "Bloom", hex: "#F0A0B0" },
    ],
  },
  {
    id: "p8",
    slug: "illuminate-shield-sun-mist",
    name: "Illuminate Shield Sun Mist",
    category: "sun-mist",
    tagline: "SPF50+ · Setting Spray",
    description: "A multifunctional sun mist with SPF50+ protection. Setting spray with skin-refreshing and radiance-boosting actives.",
    price: 28,
    currency: "KWD",
    assetKey: "beaute.productSunMist",
    shades: [
      { id: "sm1", name: "Universal", hex: "#E8E0D8" },
    ],
  },
  {
    id: "p9",
    slug: "blush-bronzer-duo",
    name: "Blush & Bronzer Duo",
    category: "blush",
    tagline: "Sculpt. Flush. Glow.",
    description: "A perfectly paired blush and bronzer duo for effortless warmth and dimension. Buildable and blendable.",
    price: 24,
    currency: "KWD",
    assetKey: "beaute.productBlushBronzer",
    shades: [
      { id: "bb1", name: "N01 Sunset", hex: "#E07070" },
    ],
  },
  {
    id: "p10",
    slug: "bronze-body-oil",
    name: "Bronze Body Oil",
    category: "body-oil",
    tagline: "Shimmer. Hydrate. Glow.",
    description: "A luxurious bronze body oil that gives skin a sun-kissed shimmer and deep hydration. 50ml of liquid radiance.",
    price: 30,
    currency: "KWD",
    assetKey: "beaute.productBodyOil",
    shades: [
      { id: "bo1", name: "Bronze", hex: "#C8923C" },
    ],
  },
];

export const commerceProvider = "boutiqaat" as const;

export function getShopUrl(product: Product): string {
  if (commerceProvider === "boutiqaat") {
    return `https://www.boutiqaat.com/en/search?q=${encodeURIComponent(product.name)}`;
  }
  return "#";
}

// ── HOUSE OF ZAI SERVICES ────────────────────────────────────

export interface HouseService {
  id: string;
  name: string;
  category: "lashes" | "brows" | "nails" | "lips" | "beauty";
  description: string;
  duration: string;
  priceRange: string;
  assetKey?: string;
}

export const houseServices: HouseService[] = [
  {
    id: "s1",
    name: "Lash Extensions",
    category: "lashes",
    description: "Custom lash extensions for a naturally voluminous, eye-opening effect.",
    duration: "90 min",
    priceRange: "25-45 KWD",
    assetKey: "house.lashes01",
  },
  {
    id: "s2",
    name: "Lash Lift & Tint",
    category: "lashes",
    description: "A semi-permanent lift and tint treatment that enhances your natural lashes.",
    duration: "60 min",
    priceRange: "18-28 KWD",
    assetKey: "house.lashes02",
  },
  {
    id: "s3",
    name: "Brow Sculpting",
    category: "brows",
    description: "Expert brow shaping and tinting for a perfectly framed face.",
    duration: "45 min",
    priceRange: "12-20 KWD",
    assetKey: "house.brows01",
  },
  {
    id: "s4",
    name: "Gel Nail Art",
    category: "nails",
    description: "Custom gel manicure with luxury nail art designed to your preference.",
    duration: "75 min",
    priceRange: "15-35 KWD",
    assetKey: "house.nails01",
  },
  {
    id: "s5",
    name: "Lip Blush Treatment",
    category: "lips",
    description: "A semi-permanent lip tint for naturally enhanced, perfectly pigmented lips.",
    duration: "120 min",
    priceRange: "40-65 KWD",
    assetKey: "house.lips01",
  },
];

// ── JOURNAL ARTICLES ──────────────────────────────────────────

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "beauty" | "looks" | "maison" | "atelier" | "house" | "zainab" | "campaigns" | "guides";
  date: string;
  readTime: string;
  assetKey?: string;
}

export const journalArticles: JournalArticle[] = [
  {
    id: "j1",
    slug: "the-zai-philosophy",
    title: "The ZAI Philosophy",
    excerpt: "One vision expressed through beauty, fashion, and ritual. Discover the creative force behind the brand.",
    category: "zainab",
    date: "2025-01-15",
    readTime: "5 min",
    assetKey: "zainab.editorialPortrait01",
  },
  {
    id: "j2",
    slug: "finding-your-foundation",
    title: "Finding Your Foundation",
    excerpt: "A guide to matching your perfect shade. Because beauty starts with the base.",
    category: "guides",
    date: "2025-01-10",
    readTime: "4 min",
    assetKey: "beaute.campaignCloseup01",
  },
  {
    id: "j3",
    slug: "maison-001-behind-the-atelier",
    title: "MAISON 001: Behind the Atelier",
    excerpt: "An idea becomes a line. A line becomes a silhouette. The making of the first collection.",
    category: "atelier",
    date: "2025-01-05",
    readTime: "6 min",
    assetKey: "maison.atelier01",
  },
  {
    id: "j4",
    slug: "lash-ritual-the-house-experience",
    title: "The Lash Ritual: Inside House of ZAI",
    excerpt: "What happens when beauty becomes a ceremony. Enter the House.",
    category: "house",
    date: "2024-12-28",
    readTime: "4 min",
    assetKey: "house.interior01",
  },
  {
    id: "j5",
    slug: "the-summer-glow-ritual",
    title: "The Summer Glow Ritual",
    excerpt: "Sun-kissed shimmer meets SPF protection. Our guide to the ultimate summer beauty routine with ZAI Beauté essentials.",
    category: "beauty",
    date: "2025-01-20",
    readTime: "3 min",
    assetKey: "beaute.heroDesktop",
  },
  {
    id: "j6",
    slug: "the-velvet-lip-edit",
    title: "The Velvet Lip Edit",
    excerpt: "From nude to noir — the definitive guide to ZAI Beauté's lip collection. Four textures, endless expression.",
    category: "looks",
    date: "2025-01-18",
    readTime: "4 min",
    assetKey: "beaute.look01",
  },
  {
    id: "j7",
    slug: "silhouette-and-heritage",
    title: "Silhouette & Heritage",
    excerpt: "How ZAI Maison translates Middle Eastern craft into contemporary fashion — from sketch to runway.",
    category: "maison",
    date: "2025-01-12",
    readTime: "5 min",
    assetKey: "maison.fabric01",
  },
  {
    id: "j8",
    slug: "radiance-and-form-the-campaign",
    title: "Radiance & Form: The Campaign",
    excerpt: "Behind the lens of ZAI Beauté's debut campaign — a visual story of light, texture, and skin-true beauty.",
    category: "campaigns",
    date: "2025-01-08",
    readTime: "3 min",
    assetKey: "beaute.campaignCloseup01",
  },
];
