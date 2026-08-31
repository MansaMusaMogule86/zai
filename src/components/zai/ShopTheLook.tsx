'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZaiStore, type ZaiView } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';
import ZaiImage from './ZaiImage';
import { useIsMobile } from '@/hooks/use-mobile';
import { extractFilename } from './ZaiImage';

// ── Hotspot Data ──────────────────────────────────────────

interface HotspotData {
  id: string;
  label: string;
  /** Percentage-based position relative to the image container */
  desktop: { top: string; left: string };
  mobile: { top: string; left: string };
  title: string;
  shade?: string;
  price?: string;
  text?: string;
  buttonText: string;
  action: ZaiView | null;
}

const hotspots: HotspotData[] = [
  {
    id: 'lashes',
    label: 'LASHES',
    desktop: { top: '25%', left: '51%' },
    mobile: { top: '22%', left: '48%' },
    title: 'HOUSE OF ZAI',
    text: 'Lash Extensions & Lift',
    buttonText: 'BOOK THE LOOK',
    action: 'house',
  },
  {
    id: 'eyes',
    label: 'EYES',
    desktop: { top: '30%', left: '52%' },
    mobile: { top: '27%', left: '50%' },
    title: 'PRECISION EYELINER',
    shade: 'Noir',
    price: '14 KWD',
    buttonText: 'VIEW PRODUCT',
    action: 'beaute',
  },
  {
    id: 'complexion',
    label: 'COMPLEXION',
    desktop: { top: '35%', left: '48%' },
    mobile: { top: '33%', left: '46%' },
    title: 'BEAUTY BOOSTER FOUNDATION',
    shade: 'Honey',
    text: 'Find your perfect shade',
    buttonText: 'FIND MY ZAI',
    action: 'mirror',
  },
  {
    id: 'lips',
    label: 'LIPS',
    desktop: { top: '45%', left: '50%' },
    mobile: { top: '42%', left: '47%' },
    title: 'VELVET MATT LIPSTICK',
    shade: 'Desert Rose',
    price: '18 KWD',
    buttonText: 'VIEW PRODUCT',
    action: 'beaute',
  },
  {
    id: 'outfit',
    label: 'OUTFIT',
    desktop: { top: '70%', left: '50%' },
    mobile: { top: '75%', left: '50%' },
    title: 'ZAI MAISON',
    text: 'Coming Soon',
    buttonText: 'DISCOVER MAISON',
    action: 'maison',
  },
];

// ── Tooltip (Desktop) ─────────────────────────────────────

function HotspotTooltip({ data, onClose }: { data: HotspotData; onClose: () => void }) {
  const setView = useZaiStore((s) => s.setView);

  const handleAction = () => {
    if (data.action) {
      setView(data.action);
    }
  };

  const isLeftSide = parseFloat(data.desktop.left) > 60;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, x: isLeftSide ? 8 : -8 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.92, x: isLeftSide ? 8 : -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={
        'absolute z-30 w-56 p-5 bg-zai-dark/95 backdrop-blur-md ' +
        'border border-zai-gold/20 shadow-2xl shadow-black/40 ' +
        (isLeftSide ? 'right-0' : 'left-0')
      }
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        [isLeftSide ? 'right' : 'left']: '100%',
        marginLeft: isLeftSide ? undefined : '16px',
        marginRight: isLeftSide ? '16px' : undefined,
      }}
      onMouseLeave={onClose}
    >
      <span className="inline-block text-[10px] tracking-editorial uppercase text-zai-gold/50 mb-2">
        {data.label}
      </span>
      <h4 className="font-display text-sm text-zai-ivory leading-tight mb-1">
        {data.title}
      </h4>
      {data.shade && (
        <p className="text-xs text-zai-gold mb-0.5">{data.shade}</p>
      )}
      {data.price && (
        <p className="text-xs text-zai-ivory/60 mb-3">{data.price}</p>
      )}
      {data.text && (
        <p className="text-xs text-zai-ivory/60 mb-3">{data.text}</p>
      )}
      <button
        onClick={handleAction}
        className="btn-luxury text-[10px] px-5 py-2 w-full text-center"
      >
        {data.buttonText}
      </button>
    </motion.div>
  );
}

// ── Product Drawer / Bottom Sheet (Mobile) ─────────────────

function ProductDrawer({
  data,
  onClose,
}: {
  data: HotspotData | null;
  onClose: () => void;
}) {
  const setView = useZaiStore((s) => s.setView);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleAction = () => {
    if (data?.action) {
      setView(data.action);
    }
  };

  // Close on drag down past threshold
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
      if (info.offset.y > 80 || info.velocity.y > 500) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {data && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            ref={panelRef}
            key="drawer-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="fixed bottom-0 left-0 right-0 z-50 bg-zai-dark border-t border-zai-gold/20 rounded-t-2xl"
            role="dialog"
            aria-label={`${data.label} product details`}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-4">
              <div className="w-10 h-1 rounded-full bg-zai-gold/30" />
            </div>

            {/* Product content */}
            <div className="px-6 pb-8" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}>
              <span className="inline-block text-[10px] tracking-editorial uppercase text-zai-gold/50 mb-2">
                {data.label}
              </span>
              <h3 className="font-display text-xl text-zai-ivory mb-1">
                {data.title}
              </h3>
              {data.shade && (
                <p className="text-sm text-zai-gold mb-0.5">{data.shade}</p>
              )}
              {data.price && (
                <p className="text-sm text-zai-ivory/60 mb-4">{data.price}</p>
              )}
              {data.text && (
                <p className="text-sm text-zai-ivory/60 mb-6">{data.text}</p>
              )}
              <button
                onClick={handleAction}
                className="btn-luxury w-full text-center text-xs py-3.5"
              >
                {data.buttonText}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main Component ─────────────────────────────────────────

export default function ShopTheLook() {
  const isMobile = useIsMobile();
  const activeHotspot = useZaiStore((s) => s.activeHotspot);
  const setActiveHotspot = useZaiStore((s) => s.setActiveHotspot);

  // ── Image load gate ──
  // Hotspots are ONLY rendered after the real image has loaded.
  // If the image is still loading, errored, or missing, only the
  // placeholder (or loading state) is shown — zero hotspot markers.
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageErrored, setImageErrored] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageErrored(true);
  }, []);

  const showHotspots = imageLoaded && !imageErrored;

  const activeData = hotspots.find((h) => h.id === activeHotspot) ?? null;

  const handleHotspotTap = (id: string) => {
    if (isMobile) {
      setActiveHotspot(activeHotspot === id ? null : id);
    }
  };

  const handleHotspotEnter = (id: string) => {
    if (!isMobile) {
      setActiveHotspot(id);
    }
  };

  const handleHotspotLeave = () => {
    if (!isMobile) {
      setActiveHotspot(null);
    }
  };

  const handleCloseDrawer = () => {
    setActiveHotspot(null);
  };

  const imageSrc = isMobile
    ? zaiAssets.zainab.shopTheLookMobile01
    : zaiAssets.zainab.shopTheLook01;

  const imageFilename = extractFilename(imageSrc);
  const imageDescription =
    'Zainab Al Alwan full look — interactive shopping experience';

  return (
    <section
      id="shop-the-look"
      className="relative w-full bg-zai-charcoal py-24 md:py-32"
      aria-label="Shop Zainab's Look"
    >
      {/* ── Heading Area ── */}
      <div className="text-center mb-12 md:mb-16 px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="block text-xs tracking-editorial text-zai-gold/50 mb-4"
        >
          INTERACTIVE
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl text-zai-ivory"
        >
          SHOP ZAINAB&rsquo;S LOOK
        </motion.h2>
      </div>

      {/* ── Interactive Image Area ── */}
      <div className="relative w-full max-w-5xl mx-auto px-4 md:px-8">
        {/*
          Container: relative positioning anchor for both image and hotspots.
          The aspect ratio matches the image so percentage-based hotspot
          positions scale correctly across all breakpoints.
        */}
        <div className="relative w-full aspect-[3/4] md:aspect-[4/5]">
          {/*
            Main image — or placeholder if missing/failed.
            When the real image loads, onImageLoad fires → showHotspots becomes true.
            When it fails, onImageError fires → imageErrored true → hotspots stay hidden.
          */}
          <video
            src={zaiAssets.zainab.shopTheLookVideo01}
            poster={isMobile ? zaiAssets.zainab.shopTheLookMobile01 : zaiAssets.zainab.shopTheLook01}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={handleImageLoad}
            className="w-full h-full object-cover object-top select-none"
          />

          {/*
            ── Hotspots ──
            ONLY rendered after the real image has successfully loaded.
            Positioned as percentage of the image container (relative parent),
            so they stay aligned regardless of viewport width.
          */}
          {showHotspots && (
            <AnimatePresence>
              {hotspots.map((hotspot, index) => {
                const position = isMobile
                  ? hotspot.mobile
                  : hotspot.desktop;
                const isActive = activeHotspot === hotspot.id;

                return (
                  <motion.div
                    key={hotspot.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                      ease: 'easeOut',
                    }}
                    className="absolute z-20"
                    style={{
                      top: position.top,
                      left: position.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {/* Pulse ring */}
                    <motion.span
                      className={
                        'absolute rounded-full border border-zai-gold ' +
                        (isMobile
                          ? 'w-11 h-11'
                          : 'w-3 h-3')
                      }
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={
                        isActive
                          ? { scale: 1, opacity: 0.8 }
                          : { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }
                      }
                      transition={
                        isActive
                          ? { duration: 0.2 }
                          : {
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                      }
                    />

                    {/*
                      Core button — 44px touch target on mobile,
                      12px precision dot on desktop.
                    */}
                    <motion.button
                      className={
                        'relative rounded-full bg-zai-gold/80 border border-zai-gold ' +
                        'cursor-pointer focus:outline-none focus-visible:ring-2 ' +
                        'focus-visible:ring-zai-gold transition-colors duration-200 ' +
                        (isMobile
                          ? 'w-11 h-11'
                          : 'w-3 h-3') +
                        (isActive ? ' bg-zai-gold' : ' hover:bg-zai-gold')
                      }
                      onMouseEnter={() => handleHotspotEnter(hotspot.id)}
                      onMouseLeave={handleHotspotLeave}
                      onClick={() => handleHotspotTap(hotspot.id)}
                      onFocus={() => handleHotspotEnter(hotspot.id)}
                      onBlur={handleHotspotLeave}
                      aria-label={`${hotspot.label}: ${hotspot.title}`}
                      aria-expanded={isActive}
                    >
                      {/* Inner glow */}
                      <span className="absolute inset-1 rounded-full bg-zai-gold/60" />
                    </motion.button>

                    {/*
                      Mobile label — visible beside each tap target
                      so users know what each hotspot represents.
                    */}
                    {isMobile && (
                      <span
                        className={
                          'absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 ' +
                          'whitespace-nowrap text-[9px] tracking-editorial uppercase ' +
                          'text-zai-ivory/70 bg-zai-dark/70 backdrop-blur-sm ' +
                          'px-2 py-1 rounded-sm pointer-events-none'
                        }
                      >
                        {hotspot.label}
                      </span>
                    )}

                    {/* Desktop tooltip */}
                    {!isMobile && (
                      <AnimatePresence>
                        {isActive && (
                          <HotspotTooltip
                            key={hotspot.id}
                            data={hotspot}
                            onClose={handleHotspotLeave}
                          />
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* Hint text — only show when hotspots are visible */}
        {showHotspots && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-center"
          >
            <motion.span
              className="inline-flex items-center gap-2 text-xs tracking-editorial text-zai-ivory/30"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-zai-gold/40"
                aria-hidden="true"
              >
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                <circle cx="6" cy="6" r="2" fill="currentColor" />
              </svg>
              {isMobile ? 'TAP TO EXPLORE' : 'HOVER TO EXPLORE'}
            </motion.span>
          </motion.div>
        )}
      </div>

      {/* ── Mobile Product Drawer ── */}
      {isMobile && showHotspots && (
        <ProductDrawer data={activeData} onClose={handleCloseDrawer} />
      )}
    </section>
  );
}
