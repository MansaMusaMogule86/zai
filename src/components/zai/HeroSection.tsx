'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useZaiStore } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';

// ── Stagger container ───────────────────────────────────────

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ── Component ───────────────────────────────────────────────

export default function HeroSection() {
  const { setView, setHasEnteredWorld } = useZaiStore();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleEnterWorld = () => {
    setHasEnteredWorld(true);
    document.getElementById('world-portals')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative h-screen max-h-[900px] w-full bg-zai-black"
      aria-label="Hero"
    >
      {/* Full-screen video background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          src={zaiAssets.zainab.heroVideo}
          poster={zaiAssets.zainab.heroDesktop}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-16 xl:px-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-5 md:gap-6 mt-20 md:mt-0"
        >
          <motion.p
            variants={item}
            className="text-xs tracking-editorial text-zai-gold/50 font-body uppercase"
          >
            THE WORLD OF ZAI
          </motion.p>

          <motion.div variants={item} className="divider-gold" />

          <div className="flex flex-col gap-1">
            {['BEAUTY.', 'FASHION.', 'RITUAL.'].map((word) => (
              <motion.h2
                key={word}
                variants={item}
                className="font-display text-5xl xl:text-7xl text-zai-ivory tracking-wide leading-[1.1]"
              >
                {word}
              </motion.h2>
            ))}
          </div>

          <motion.p
            variants={item}
            className="text-sm text-zai-ivory/50 font-body mt-2"
          >
            Created by Zainab Al Alwan
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleEnterWorld}
              className="btn-gold cursor-pointer"
            >
              ENTER THE WORLD
            </button>
            <button
              onClick={() => setView('mirror')}
              className="btn-luxury cursor-pointer"
            >
              FIND MY ZAI
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Private digital concept label */}
      <span className="absolute bottom-4 left-4 z-10 text-[10px] tracking-editorial text-zai-ivory/20 font-body select-none pointer-events-none">
        PRIVATE DIGITAL CONCEPT
      </span>
    </section>
  );
}
