'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useZaiStore, type ZaiView } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';
import ZaiImage from './ZaiImage';

// ── Portal definitions ───────────────────────────────────────

interface PortalDef {
  id: ZaiView;
  image: string;
  brand: 'zai' | 'beaute' | 'maison' | 'house';
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
    overlayColor: 'rgba(27, 58, 92, 0.35)',
    glowColor: 'rgba(27, 58, 92, 0.6)',
    glowShadow: 'rgba(27, 58, 92, 0.15)',
  },
  {
    id: 'maison',
    image: zaiAssets.zainab.fashionFullbody01,
    brand: 'maison',
    label: 'MAISON',
    tagline: 'Fashion becomes expression.',
    overlayColor: 'rgba(232, 221, 208, 0.25)',
    glowColor: 'rgba(232, 221, 208, 0.5)',
    glowShadow: 'rgba(232, 221, 208, 0.12)',
  },
  {
    id: 'house',
    image: zaiAssets.house.interior01,
    brand: 'house',
    label: 'HOUSE',
    tagline: 'Ritual becomes experience.',
    overlayColor: 'rgba(232, 213, 184, 0.25)',
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
            className="text-xs tracking-editorial text-zai-gold/50 font-body"
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
          className="hidden md:grid md:grid-cols-3 gap-3"
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
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {portals.map((portal) => (
              <div key={portal.id} className="snap-start shrink-0 w-[82vw]">
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
      className="group relative cursor-pointer overflow-hidden rounded-sm aspect-[3/4] md:aspect-[16/10] border border-zai-ivory/5"
      animate={{
        borderColor: hovered ? portal.glowColor : 'rgba(245, 240, 235, 0.05)',
        boxShadow: hovered
          ? `inset 0 0 40px ${portal.glowShadow}, 0 0 25px ${portal.glowShadow}`
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
      {/* Background image with zoom on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <ZaiImage
          src={portal.image}
          alt={`${portal.label} portal`}
          brand={portal.brand}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${portal.overlayColor}, transparent 60%)`,
        }}
      />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 pointer-events-none">
        <h3 className="font-display text-3xl md:text-5xl text-white leading-none">
          {portal.label}
        </h3>
        <p className="text-sm text-zai-ivory/60 mt-2 font-body">
          {portal.tagline}
        </p>
      </div>

      {/* Arrow — slides in on hover */}
      <motion.div
        className="absolute top-5 right-5 md:top-8 md:right-8 pointer-events-none"
        animate={
          hovered
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: -10, y: 10 }
        }
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 text-zai-ivory/90" strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
}
