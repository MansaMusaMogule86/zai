'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useZaiStore, type ZaiView } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';

// ── Portal definitions ───────────────────────────────────────

interface PortalDef {
  id: ZaiView;
  image: string;
  brand: 'beaute' | 'maison' | 'house';
  label: string;
  tagline: string;
  overlayColor: string;
  glowColor: string;
  glowShadow: string;
}

const portals: PortalDef[] = [
  {
    id: 'beaute',
    image: zaiAssets.zainab.beautyCloseup01,
    brand: 'beaute',
    label: 'BEAUTÉ',
    tagline: 'Beauty becomes identity.',
    overlayColor: 'rgba(27, 58, 92, 0.45)',
    glowColor: 'rgba(27, 58, 92, 0.6)',
    glowShadow: 'rgba(27, 58, 92, 0.15)',
  },
  {
    id: 'maison',
    image: zaiAssets.maison.fashionFullbody01,
    brand: 'maison',
    label: 'MAISON',
    tagline: 'Fashion becomes expression.',
    overlayColor: 'rgba(15, 15, 15, 0.45)',
    glowColor: 'rgba(212, 175, 55, 0.5)',
    glowShadow: 'rgba(212, 175, 55, 0.12)',
  },
  {
    id: 'house',
    image: "/images/zai/house/house_of_zai_beauty_services_hero_desktop.png",
    brand: 'house',
    label: 'HOUSE',
    tagline: 'Ritual becomes experience.',
    overlayColor: 'rgba(20, 16, 12, 0.45)',
    glowColor: 'rgba(232, 213, 184, 0.5)',
    glowShadow: 'rgba(232, 213, 184, 0.12)',
  },
];

// ── Animation variants ───────────────────────────────────────

const headingContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const headingItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const portalContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const portalItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ── Component ────────────────────────────────────────────────

export default function WorldPortals() {
  const setView = useZaiStore((s) => s.setView);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.15 });

  return (
    <section
      id="world-portals"
      className="relative w-full bg-zai-black py-24 md:py-32"
      aria-label="World Portals"
    >
      <div className="px-6 md:px-12 lg:px-24 xl:px-32">
        {/* ── Heading ─────────────────────────────────────── */}
        <motion.div
          ref={headingRef}
          variants={headingContainer}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          className="text-center mb-12 md:mb-20"
        >
          <motion.p
            variants={headingItem}
            className="text-xs tracking-editorial text-zai-gold/50 font-body uppercase"
          >
            THE ECOSYSTEM
          </motion.p>
          <motion.h2
            variants={headingItem}
            className="font-display text-4xl md:text-6xl text-zai-ivory mt-4"
          >
            ONE VISION.
            <br />
            THREE EXPRESSIONS.
          </motion.h2>
        </motion.div>

        {/* ── Portals — Desktop (3 cols) ──────────────────── */}
        <motion.div
          ref={gridRef}
          variants={portalContainer}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className="hidden md:grid md:grid-cols-3 gap-6"
        >
          {portals.map((portal) => (
            <PortalDoor key={portal.id} portal={portal} onEnter={() => setView(portal.id)} />
          ))}
        </motion.div>

        {/* ── Portals — Mobile (horizontal scroll snap) ──── */}
        <div className="md:hidden -mx-6">
          <motion.div
            variants={portalContainer}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {portals.map((portal) => (
              <div key={portal.id} className="snap-start shrink-0 w-[84vw]">
                <PortalDoor portal={portal} onEnter={() => setView(portal.id)} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Portal Door ──────────────────────────────────────────────

function PortalDoor({ portal, onEnter }: { portal: PortalDef; onEnter: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={portalItem}
      onClick={onEnter}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative cursor-pointer overflow-hidden rounded-sm aspect-[3/4] border border-zai-ivory/10 bg-[#070707]"
      animate={{
        borderColor: hovered ? portal.glowColor : 'rgba(245, 240, 235, 0.1)',
        boxShadow: hovered
          ? `inset 0 0 40px ${portal.glowShadow}, 0 0 30px ${portal.glowShadow}`
          : 'inset 0 0 0px transparent, 0 0 0px transparent',
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      role="button"
      tabIndex={0}
      aria-label={`Enter ${portal.label}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onEnter();
        }
      }}
    >
      {/* Background real editorial image with smooth zoom on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <img
          src={portal.image}
          alt={`${portal.label} — ${portal.tagline}`}
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          loading="eager"
        />
      </motion.div>

      {/* Luxury Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, rgba(5, 5, 5, 0.88) 0%, rgba(5, 5, 5, 0.3) 50%, transparent 85%)`,
        }}
      />

      {/* Subtle brand tint on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 0.3 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ backgroundColor: portal.glowColor }}
      />

      {/* Bottom typography content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none z-10">
        <span className="text-[10px] tracking-editorial uppercase text-zai-gold/75 block mb-1.5 font-body">
          {portal.brand === 'beaute' ? 'Zai Beauté' : portal.brand === 'maison' ? 'Zai Maison' : 'House of Zai'}
        </span>
        <h3 className="font-display text-3xl md:text-4xl text-zai-ivory leading-tight">
          {portal.label}
        </h3>
        <p className="text-xs text-zai-ivory/70 mt-2 font-body tracking-wide">
          {portal.tagline}
        </p>
      </div>
    </motion.div>
  );
}
