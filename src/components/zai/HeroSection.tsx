'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useZaiStore } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';

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
      className="w-full bg-zai-black"
      aria-label="Hero"
    >
      {/* Video — full width, below navbar, shows entire video */}
      <div className="w-full pt-20">
        <video
          src={zaiAssets.zainab.heroVideo}
          poster={zaiAssets.zainab.heroDesktop}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-auto max-h-[75vh] object-cover object-top"
        />
      </div>

      {/* Text — centered below the video */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex flex-col items-center text-center gap-5 md:gap-6 px-6 py-12 md:py-16"
      >
        <motion.p
          variants={item}
          className="text-xs tracking-editorial text-zai-gold/50 font-body uppercase"
        >
          THE WORLD OF ZAI
        </motion.p>

        <motion.div variants={item} className="divider-gold w-12" />

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
    </section>
  );
}
