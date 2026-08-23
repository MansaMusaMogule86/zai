'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useZaiStore } from '@/lib/store';
import { products, getShopUrl, type Product, type ProductShade } from '@/lib/products';
import { zaiAssets } from '@/lib/assets';
import ZaiImage from './ZaiImage';

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
      {/* Subtle cobalt radial glow top-right */}
      <div
        className="fixed top-0 right-0 w-[60vw] h-[60vh] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(27, 58, 92, 0.05), transparent 70%)',
        }}
      />

      {/* ═══ 1. BEAUTÉ HERO ═══════════════════════════════ */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] w-full overflow-hidden">
        <ZaiImage
          src={zaiAssets.beaute.heroDesktop}
          alt="ZAI Beauté campaign"
          brand="beaute"
          fill
          className="object-cover"
          priority
        />

        {/* Cobalt overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(27, 58, 92, 0.7) 0%, rgba(27, 58, 92, 0.2) 40%, transparent 70%)',
          }}
        />

        {/* Back button */}
        <motion.button
          onClick={() => setView('home')}
          className="absolute top-6 left-6 md:top-10 md:left-10 z-10 text-xs tracking-editorial text-zai-ivory/70 hover:text-zai-ivory transition-colors duration-300 flex items-center gap-2 cursor-pointer"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
          WORLD
        </motion.button>

        {/* Hero content */}
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20 z-10"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] max-w-3xl"
          >
            YOUR SKIN. YOUR SHADE.
            <br />
            YOUR ZAI.
          </motion.h1>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-8">
            <button onClick={scrollToProducts} className="btn-gold cursor-pointer">
              DISCOVER BEAUTÉ
            </button>
            <button onClick={() => setView('mirror')} className="btn-luxury cursor-pointer">
              FIND MY ZAI
            </button>
          </motion.div>
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
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-editorial text-zai-gold/50 font-body"
            >
              THE CAMPAIGN
            </motion.p>

            {/* Desktop: side by side */}
            <div className="hidden md:grid md:grid-cols-2 gap-3 mt-8">
              {[zaiAssets.beaute.campaignCloseup01, zaiAssets.beaute.campaignCloseup02].map(
                (src, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="relative aspect-[4/5] overflow-hidden rounded-sm"
                  >
                    <ZaiImage
                      src={src}
                      alt={`ZAI Beauté campaign ${i + 1}`}
                      brand="beaute"
                      fill
                      className="object-cover img-editorial"
                    />
                  </motion.div>
                ),
              )}
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="md:hidden -mx-6 mt-8">
              <div
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 pb-4"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {[zaiAssets.beaute.campaignCloseup01, zaiAssets.beaute.campaignCloseup02].map(
                  (src, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="snap-start shrink-0 w-[80vw] relative aspect-[4/5] overflow-hidden rounded-sm"
                    >
                      <ZaiImage
                        src={src}
                        alt={`ZAI Beauté campaign ${i + 1}`}
                        brand="beaute"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ),
                )}
              </div>
            </div>
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
