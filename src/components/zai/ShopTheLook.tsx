'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZaiStore, type ZaiView } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';
import ZaiImage from './ZaiImage';
import { useIsMobile } from '@/hooks/use-mobile';

// ── Hotspot Data ──────────────────────────────────────────

interface HotspotData {
  id: string;
  label: string;
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

  // Position tooltip to the right of the hotspot by default
  const isLeftSide = parseFloat(data.desktop.left) > 60;
  const tooltipX = isLeftSide ? '-140%' : '140%';
  const originX = isLeftSide ? 'right' : 'left';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: originX === 'left' ? 8 : -8 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: originX === 'left' ? 8 : -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={
        'absolute z-30 w-56 p-5 bg-zai-dark/95 backdrop-blur-md ' +
        'border border-zai-gold/20 shadow-2xl shadow-black/40 ' +
        (isLeftSide ? 'right-0' : 'left-0')
      }
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        [originX]: '100%',
        marginLeft: isLeftSide ? undefined : '16px',
        marginRight: isLeftSide ? '16px' : undefined,
      }}
      onMouseLeave={onClose}
    >
      {/* Label chip */}
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

// ── Bottom Sheet (Mobile) ──────────────────────────────────

function BottomSheet({ data, onClose }: { data: HotspotData | null; onClose: () => void }) {
  const setView = useZaiStore((s) => s.setView);

  const handleAction = () => {
    if (data?.action) {
      setView(data.action);
    }
  };

  return (
    <AnimatePresence>
      {data && (
        <>
          {/* Overlay */}
          <motion.div
            key="sheet-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Panel */}
          <motion.div
            ref={sheetRef}
            key="sheet-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-zai-dark border-t border-zai-gold/20 rounded-t-2xl p-6 pb-10"
            role="dialog"
            aria-label={`${data.label} product details`}
          >
            {/* Drag handle */}
            <div className="flex justify-center mb-6">
              <div className="w-10 h-1 rounded-full bg-zai-gold/30" />
            </div>
            {/* Content */}
            <span className="inline-block text-[10px] tracking-editorial uppercase text-zai-gold/50 mb-2">
              {data.label}
            </span>
            <h3 className="font-display text-xl text-zai-ivory mb-1">{data.title}</h3>
            {data.shade && (
              <p className="text-sm text-zai-gold mb-0.5">{data.shade}</p>
            )}
            {data.price && (
              <p className="text-sm text-zai-ivory/60 mb-4">{data.price}</p>
            )}
            {data.text && (
              <p className="text-sm text-zai-ivory/60 mb-4">{data.text}</p>
            )}
            <button
              onClick={handleAction}
              className="btn-luxury w-full text-center text-xs py-3"
            >
              {data.buttonText}
            </button>
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
  const setView = useZaiStore((s) => s.setView);

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

  const handleCloseSheet = () => {
    setActiveHotspot(null);
  };

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
        <div className="relative w-full aspect-[3/4] md:aspect-[4/5]">
          {/* Main image */}
          <ZaiImage
            src={isMobile ? zaiAssets.zainab.shopTheLookMobile01 : zaiAssets.zainab.shopTheLook01}
            alt="Zainab Al Alwan full look — interactive shopping experience"
            brand="zai"
            fill
            className="object-cover object-top select-none"
            priority={false}
          />

          {/* Hotspots */}
          {hotspots.map((hotspot) => {
            const position = isMobile ? hotspot.mobile : hotspot.desktop;
            const isActive = activeHotspot === hotspot.id;
            const size = isMobile ? 'w-5 h-5' : 'w-3 h-3';

            return (
              <div
                key={hotspot.id}
                className="absolute z-20"
                style={{ top: position.top, left: position.left }}
              >
                {/* Pulse ring — only animate when not active */}
                <motion.span
                  className={`absolute inset-0 rounded-full border border-zai-gold ${size}`}
                  animate={
                    isActive
                      ? { scale: 1, opacity: 0.8 }
                      : {
                          scale: [1, 1.8, 1],
                          opacity: [0.6, 0, 0.6],
                        }
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
                  style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}
                />

                {/* Core dot */}
                <motion.button
                  className={`
                    relative ${size} rounded-full bg-zai-gold/80 border border-zai-gold
                    cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zai-gold
                    transition-colors duration-200
                    ${isActive ? 'bg-zai-gold' : 'hover:bg-zai-gold'}
                  `}
                  style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}
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
              </div>
            );
          })}
        </div>

        {/* Hint text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-center"
        >
          <motion.span
            className="inline-flex items-center gap-2 text-xs tracking-editorial text-zai-ivory/30"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
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
      </div>

      {/* ── Mobile Bottom Sheet ── */}
      {isMobile && <BottomSheet data={activeData} onClose={handleCloseSheet} />}
    </section>
  );
}
