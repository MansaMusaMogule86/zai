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
  category: "foundation" | "lipstick" | "lip-pencil" | "highlighter" | "mascara" | "brow" | "eyeliner" | "tint";
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
    tagline: "Your skin. Your shade. Your ZAI.",
    description: "A weightless, buildable foundation that enhances your natural radiance. Formulated for Middle Eastern skin tones with premium light-reflecting pigments.",
    price: 42,
    currency: "KWD",
    assetKey: "beaute.productFoundation",
    shades: [
      { id: "f1", name: "Pearl", hex: "#F5E6D3", skinTone: "fair" },
      { id: "f2", name: "Sand", hex: "#E8C9A0", skinTone: "light" },
      { id: "f3", name: "Honey", hex: "#D4A574", skinTone: "medium-light" },
      { id: "f4", name: "Amber", hex: "#C08B5C", skinTone: "medium" },
      { id: "f5", name: "Caramel", hex: "#A0704A", skinTone: "medium-deep" },
      { id: "f6", name: "Bronze", hex: "#8B5E3C", skinTone: "deep" },
      { id: "f7", name: "Espresso", hex: "#6B4226", skinTone: "deep" },
      { id: "f8", name: "Noir", hex: "#4A2C17", skinTone: "very deep" },
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
      { id: "l1", name: "Sabbath", hex: "#8B0000" },
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
    slug: "lip-pencil",
    name: "Lip Pencil",
    category: "lip-pencil",
    tagline: "Precision meets pigment.",
    description: "A creamy, long-wearing lip pencil that defines and shapes with effortless precision. Pairs perfectly with Velvet Matt Lipstick.",
    price: 10,
    currency: "KWD",
    assetKey: "beaute.productLipPencil",
    shades: [
      { id: "lp1", name: "Nude", hex: "#C9A88A" },
      { id: "lp2", name: "Rose", hex: "#B5676E" },
      { id: "lp3", name: "Berry", hex: "#7B3B4E" },
      { id: "lp4", name: "Spice", hex: "#9B6B4A" },
    ],
  },
  {
    id: "p4",
    slug: "gloze-highlighter",
    name: "Glozé Highlighter",
    category: "highlighter",
    tagline: "Lit from within.",
    description: "A finely milled, ultra-blendable highlighter that delivers a luminous, lit-from-within glow without glitter.",
    price: 22,
    currency: "KWD",
    assetKey: "beaute.productHighlighter",
    shades: [
      { id: "h1", name: "Champagne Pop", hex: "#F5D6A8" },
      { id: "h2", name: "Golden Hour", hex: "#E8C36A" },
      { id: "h3", name: "Pearl Luxe", hex: "#F0E6E0" },
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
      { id: "m1", name: "Noir", hex: "#0A0A0A" },
      { id: "m2", name: "Brown", hex: "#3B2F2F" },
    ],
  },
  {
    id: "p6",
    slug: "brow-definer",
    name: "Brow Definer",
    category: "brow",
    tagline: "Architectural brows.",
    description: "A precision brow pencil with a spoolie tip for naturally defined, perfectly shaped brows.",
    price: 12,
    currency: "KWD",
    assetKey: "beaute.productBrow",
    shades: [
      { id: "b1", name: "Blonde", hex: "#A08868" },
      { id: "b2", name: "Brunette", hex: "#5C4033" },
      { id: "b3", name: "Dark", hex: "#3B2F2F" },
    ],
  },
  {
    id: "p7",
    slug: "precision-eyeliner",
    name: "Precision Eyeliner",
    category: "eyeliner",
    tagline: "One stroke. Complete control.",
    description: "A waterproof liquid eyeliner with an ultra-fine tip for razor-sharp lines and effortless winged looks.",
    price: 14,
    currency: "KWD",
    assetKey: "beaute.productEyeliner",
    shades: [
      { id: "e1", name: "Noir", hex: "#0A0A0A" },
      { id: "e2", name: "Brown", hex: "#3B2F2F" },
    ],
  },
  {
    id: "p8",
    slug: "lip-cheek-tint",
    name: "Lip & Cheek Tint",
    category: "tint",
    tagline: "One tint. Endless possibility.",
    description: "A multi-use tint for lips and cheeks that delivers a natural, buildable flush of color. Lightweight and long-lasting.",
    price: 14,
    currency: "KWD",
    assetKey: "beaute.productTint",
    shades: [
      { id: "t1", name: "Petal", hex: "#D4878F" },
      { id: "t2", name: "Coral", hex: "#E08070" },
      { id: "t3", name: "Berry", hex: "#9B4A5C" },
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
];
