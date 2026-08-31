'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useZaiStore } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';
import LuxuryPortraitVideo from './LuxuryPortraitVideo';

// ── Stagger container ───────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const item = {
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
      className="relative min-h-screen w-full bg-zai-black"
      aria-label="Hero"
    >
      {/* Desktop: split layout ─────────────────────────── */}
      <div className="hidden md:grid md:grid-cols-[60%_40%] min-h-screen">
        {/* Left — cinematic beach video panel (two-layer contain + blurred cover) */}
        <div className="relative w-full h-full min-h-screen overflow-hidden bg-[#050505]">
          <LuxuryPortraitVideo
            src={zaiAssets.zainab.heroVideo}
            posterDesktop={zaiAssets.zainab.heroDesktop}
            posterMobile={zaiAssets.zainab.heroMobile}
            preload="auto"
            priority
          />

          {/* Private digital concept label */}
          <span className="absolute bottom-4 left-4 z-10 text-[10px] tracking-editorial text-zai-ivory/20 font-body select-none pointer-events-none">
            PRIVATE DIGITAL CONCEPT
          </span>
        </div>

        {/* Right — luxury typography panel */}
        <div className="flex items-center justify-center px-12 xl:px-20 bg-zai-black">
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
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
      </div>

      {/* Mobile: stacked layout ──────────────────────────── */}
      <div className="flex flex-col md:hidden">
        {/* Mobile beach video — top ~65vh container with two-layer contain */}
        <div className="relative h-[65vh] overflow-hidden bg-[#050505]">
          <LuxuryPortraitVideo
            src={zaiAssets.zainab.heroVideo}
            posterDesktop={zaiAssets.zainab.heroDesktop}
            posterMobile={zaiAssets.zainab.heroMobile}
            preload="auto"
          />

          <span className="absolute bottom-4 left-4 z-10 text-[10px] tracking-editorial text-zai-ivory/20 font-body select-none pointer-events-none">
            PRIVATE DIGITAL CONCEPT
          </span>
        </div>

        {/* Typography below image */}
        <div className="flex-1 flex items-center px-6 py-12 bg-zai-black">
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-5 w-full"
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
                  className="font-display text-5xl text-zai-ivory tracking-wide leading-[1.1]"
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

            <motion.div variants={item} className="flex flex-wrap gap-3 mt-4">
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
      </div>
    </section>
  );
}
