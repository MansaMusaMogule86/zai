'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useZaiStore } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';
import ZaiImage from './ZaiImage';

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
  const { setView } = useZaiStore();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const scrollToPortals = () => {
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
        {/* Left — hero image with slow zoom */}
        <div className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: 'linear' }}
          >
            <ZaiImage
              src={zaiAssets.zainab.heroDesktop}
              alt="Zainab Al Alwan — hero portrait"
              brand="zai"
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>

          {/* Private digital concept label */}
          <span className="absolute bottom-4 left-4 text-[10px] tracking-editorial text-zai-ivory/15 font-body select-none">
            PRIVATE DIGITAL CONCEPT
          </span>
        </div>

        {/* Right — typography */}
        <div className="flex items-center justify-center px-12 xl:px-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            <motion.p
              variants={item}
              className="text-xs tracking-editorial text-zai-gold/50 font-body"
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
                onClick={scrollToPortals}
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
        {/* Hero image — top ~60vh with slow zoom */}
        <div className="relative h-[60vh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: 'linear' }}
          >
            <ZaiImage
              src={zaiAssets.zainab.heroMobile}
              alt="Zainab Al Alwan — hero portrait"
              brand="zai"
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>

          <span className="absolute bottom-4 left-4 text-[10px] tracking-editorial text-zai-ivory/15 font-body select-none">
            PRIVATE DIGITAL CONCEPT
          </span>
        </div>

        {/* Typography below image */}
        <div className="flex-1 flex items-center px-6 py-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-5 w-full"
          >
            <motion.p
              variants={item}
              className="text-xs tracking-editorial text-zai-gold/50 font-body"
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
              className="text-sm text-zai-ivory/50 font-body mt-1"
            >
              Created by Zainab Al Alwan
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-3 mt-4">
              <button
                onClick={scrollToPortals}
                className="btn-gold cursor-pointer text-center"
              >
                ENTER THE WORLD
              </button>
              <button
                onClick={() => setView('mirror')}
                className="btn-luxury cursor-pointer text-center"
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
