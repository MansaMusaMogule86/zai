'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useZaiStore } from '@/lib/store';
import { products, getShopUrl, type Product, type ProductShade } from '@/lib/products';
import { zaiAssets } from '@/lib/assets';
import ZaiImage from './ZaiImage';

import BeauteIntro from './BeauteIntro';

// ── Asset lookup ─────────────────────────────────────────────

const beauteAssets = zaiAssets.beaute as Record<string, string>;

function getProductImage(assetKey: string): string {
  const parts = assetKey.split('.');
  if (parts[0] === 'beaute' && parts[1] && beauteAssets[parts[1]]) {
    return beauteAssets[parts[1]];
  }
  return beauteAssets.productGroup01 ?? '';
}

// ── Category filters ─────────────────────────────────────────

type FilterKey = 'ALL' | 'FACE' | 'LIPS' | 'EYES';

const filters: FilterKey[] = ['ALL', 'FACE', 'LIPS', 'EYES'];

const categoryMap: Record<string, Product['category'][]> = {
  ALL: [],
  FACE: ['foundation', 'highlighter', 'tint'],
  LIPS: ['lipstick', 'lip-pencil', 'tint'],
  EYES: ['mascara', 'brow', 'eyeliner'],
};

function filterProducts(key: FilterKey): Product[] {
  if (key === 'ALL') return products;
  const cats = categoryMap[key];
  return products.filter((p) => cats.includes(p.category));
}

// ── Animation variants ───────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const heroStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

// ── Component ────────────────────────────────────────────────

export default function BeauteSection() {
  const { setView } = useZaiStore();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedShade, setSelectedShade] = useState<string | null>(null);
  const campaignRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const looksRef = useRef<HTMLDivElement>(null);
  const campaignInView = useInView(campaignRef, { once: true, amount: 0.2 });
  const productsInView = useInView(productsRef, { once: true, amount: 0.1 });
  const looksInView = useInView(looksRef, { once: true, amount: 0.2 });

  const scrollToProducts = useCallback(() => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const filteredProducts = filterProducts(activeFilter);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
    setSelectedShade(null);
  }, []);

  return (
    <div className="relative min-h-screen bg-zai-black">
      {/* 3D Logo Intro Sequence */}
      <BeauteIntro />

      {/* Subtle cobalt radial glow top-right */}
      <div
        className="fixed top-0 right-0 w-[60vw] h-[60vh] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(27, 58, 92, 0.05), transparent 70%)',
        }}
      />

      {/* ═══ 1. BEAUTÉ HERO ═══════════════════════════════ */}
      <section className="relative min-h-[75vh] md:min-h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Responsive campaign picture */}
        <picture className="absolute inset-0 w-full h-full">
          <source
            media="(max-width: 768px)"
            srcSet={zaiAssets.beaute.heroMobile}
          />
          <source
            media="(min-width: 769px)"
            srcSet={zaiAssets.beaute.heroDesktop}
          />
          <img
            src={zaiAssets.beaute.heroDesktop}
            alt="ZAI Beauté — Your skin. Your shade. Your Zai."
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
        </picture>

        {/* Subtle dark transition gradient at the very bottom into the next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(10, 10, 10, 0.85) 0%, transparent 100%)',
          }}
        />

        {/* Back button */}
        <motion.button
          onClick={() => setView('home')}
          className="absolute top-20 left-6 md:top-20 md:left-10 z-10 text-xs tracking-editorial text-zai-ivory/80 hover:text-zai-ivory transition-colors duration-300 flex items-center gap-2 cursor-pointer bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
          WORLD
        </motion.button>

        {/* Accessible heading for SEO (branding and copy is embedded in high-res artwork) */}
        <h1 className="sr-only">ZAI Beauté — Your skin. Your shade. Your Zai.</h1>

        {/* Hero actions positioned cleanly at the bottom without covering model or text */}
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="relative mt-auto p-6 md:p-12 lg:p-20 z-10 flex flex-wrap gap-3 items-end"
        >
          <button onClick={scrollToProducts} className="btn-gold cursor-pointer">
            DISCOVER BEAUTÉ
          </button>
          <button onClick={() => setView('mirror')} className="btn-luxury cursor-pointer">
            FIND MY ZAI
          </button>
        </motion.div>
      </section>

      {/* ═══ 2. CAMPAIGN EDITORIALS ════════════════════════ */}
      <section ref={campaignRef} className="w-full py-20 md:py-28">
        <div className="px-6 md:px-12 lg:px-24 xl:px-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={campaignInView ? 'visible' : 'hidden'}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <motion.p
                  variants={fadeUp}
                  className="text-xs tracking-editorial text-zai-gold/50 font-body uppercase"
                >
                  THE CAMPAIGN
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="font-display text-3xl md:text-5xl text-zai-ivory mt-2"
                >
                  RADIANCE & FORM
                </motion.h2>
              </div>
              <motion.p
                variants={fadeUp}
                className="text-xs tracking-editorial text-zai-ivory/40 font-body max-w-sm"
              >
                Skin-true texture, sculptural warmth and effortless light.
              </motion.p>
            </div>

            {/* Single strong oversized editorial card */}
            <motion.div
              variants={fadeUp}
              className="relative max-w-4xl mx-auto aspect-[4/5] sm:aspect-[16/10] overflow-hidden rounded-sm border border-zai-gold/15 shadow-2xl"
            >
              <img
                src={zaiAssets.beaute.campaignCloseup01}
                alt="ZAI Beauté Campaign Editorial — Gloss Profile"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
                <p className="text-[10px] tracking-editorial text-zai-gold/70 uppercase mb-1">
                  EDITORIAL NO. 01
                </p>
                <p className="font-display text-lg md:text-2xl text-zai-ivory">
                  GLOSS PROFILE
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="divider-gold" />
      </div>

      {/* ═══ 3. PRODUCTS GRID ═════════════════════════════ */}
      <section ref={productsRef} className="w-full py-20 md:py-28">
        <div className="px-6 md:px-12 lg:px-24 xl:px-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={productsInView ? 'visible' : 'hidden'}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-editorial text-zai-gold/50 font-body"
            >
              THE COLLECTION
            </motion.p>

            {/* Filter bar */}
            <motion.div
              variants={fadeUp}
              className="flex gap-6 mt-6 mb-10 border-b border-zai-ivory/5 pb-4"
            >
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setActiveFilter(f);
                    setExpandedId(null);
                  }}
                  className={`text-xs tracking-editorial font-body cursor-pointer transition-colors duration-300 pb-2 relative ${
                    activeFilter === f
                      ? 'text-zai-gold'
                      : 'text-zai-ivory/60 hover:text-zai-ivory/80'
                  }`}
                >
                  {f}
                  {activeFilter === f && (
                    <motion.div
                      layoutId="beaute-filter-underline"
                      className="absolute bottom-0 left-0 right-0 h-px bg-zai-gold"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </motion.div>

            {/* Product grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isExpanded={expandedId === product.id}
                    selectedShade={selectedShade}
                    onToggle={() => toggleExpand(product.id)}
                    onSelectShade={setSelectedShade}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="divider-gold" />
      </div>

      {/* ═══ 4. BEAUTY LOOKS ══════════════════════════════ */}
      <section ref={looksRef} className="w-full py-20 md:py-28">
        <div className="px-6 md:px-12 lg:px-24 xl:px-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={looksInView ? 'visible' : 'hidden'}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-editorial text-zai-gold/50 font-body"
            >
              THE LOOKS
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[zaiAssets.beaute.look01, zaiAssets.beaute.look02].map((src, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                    <ZaiImage
                      src={src}
                      alt={`ZAI Beauté look ${String(i + 1).padStart(2, '0')}`}
                      brand="beaute"
                      fill
                      className="object-cover img-editorial"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xs tracking-editorial text-zai-gold/60 font-body">
                      LOOK {String(i + 1).padStart(2, '0')}
                    </p>
                    <button
                      onClick={scrollToProducts}
                      className="text-xs tracking-editorial text-zai-ivory/50 hover:text-zai-ivory/80 transition-colors duration-300 cursor-pointer font-body"
                    >
                      VIEW PRODUCTS
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ── Product Card ─────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
  isExpanded: boolean;
  selectedShade: string | null;
  onToggle: () => void;
  onSelectShade: (id: string | null) => void;
}

function ProductCard({ product, isExpanded, selectedShade, onToggle, onSelectShade }: ProductCardProps) {
  const imgSrc = getProductImage(product.assetKey);
  const selectedShadeObj = product.shades.find((s) => s.id === selectedShade);

  return (
    <motion.div
      layout
      className="bg-zai-dark border border-zai-ivory/5 overflow-hidden rounded-sm"
    >
      {/* Collapsed view */}
      <motion.div layout="position" onClick={onToggle} className="cursor-pointer">
        {/* Product image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <ZaiImage
            src={imgSrc}
            alt={product.name}
            brand="beaute"
            fill
            className="object-cover"
          />
        </div>

        {/* Product info */}
        <div className="p-4">
          <h3 className="font-display text-lg text-zai-ivory leading-tight">{product.name}</h3>
          <p className="text-sm text-zai-ivory/50 mt-1 font-body">
            {product.price} {product.currency}
          </p>

          {/* Shade swatches (collapsed: first 5) */}
          <div className="flex gap-1.5 mt-3">
            {product.shades.slice(0, 5).map((shade) => (
              <span
                key={shade.id}
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: shade.hex }}
              />
            ))}
            {product.shades.length > 5 && (
              <span className="text-[10px] text-zai-ivory/30 font-body leading-2">
                +{product.shades.length - 5}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Expanded view */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-zai-ivory/5 p-4 flex flex-col gap-4">
              {/* Larger image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <ZaiImage
                  src={imgSrc}
                  alt={product.name}
                  brand="beaute"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Description */}
              <p className="text-sm text-zai-ivory/60 font-body leading-relaxed">
                {product.description}
              </p>

              {/* All shade swatches — selectable */}
              <div>
                <p className="text-xs tracking-editorial text-zai-ivory/40 mb-3 font-body">
                  SELECT SHADE
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.shades.map((shade) => (
                    <button
                      key={shade.id}
                      onClick={() => onSelectShade(shade.id === selectedShade ? null : shade.id)}
                      className="relative cursor-pointer group"
                      aria-label={shade.name}
                    >
                      <span
                        className={`block w-8 h-8 rounded-full transition-all duration-200 ${
                          selectedShade === shade.id
                            ? 'ring-2 ring-zai-gold ring-offset-2 ring-offset-zai-dark'
                            : 'ring-1 ring-zai-ivory/10 hover:ring-zai-ivory/30'
                        }`}
                        style={{ backgroundColor: shade.hex }}
                      />
                      {/* Shade name tooltip */}
                      <AnimatePresence>
                        {selectedShade === shade.id && (
                          <motion.span
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-editorial text-zai-gold whitespace-nowrap font-body"
                          >
                            {shade.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
                {selectedShadeObj && (
                  <p className="text-xs text-zai-ivory/50 mt-6 font-body">
                    Selected: <span className="text-zai-ivory">{selectedShadeObj.name}</span>
                  </p>
                )}
              </div>

              {/* Shop button */}
              <button
                onClick={() => window.open(getShopUrl(product), '_blank', 'noopener')}
                className="btn-luxury cursor-pointer text-center mt-2"
              >
                SHOP ON BOUTIQAAT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
