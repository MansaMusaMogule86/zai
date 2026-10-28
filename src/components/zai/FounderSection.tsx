'use client';

import { useRef } from 'react';
import { Variants, motion, useInView } from 'framer-motion';
import { useZaiStore } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';
import ZaiImage from './ZaiImage';

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function FounderSection() {
  const setView = useZaiStore((s) => s.setView);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="w-full py-24 md:py-32 bg-zai-black">
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        {/* Section Label */}
        <motion.p
          variants={fadeUp}
          className="text-center text-xs tracking-editorial text-zai-gold/50 mb-16"
        >
          THE FOUNDER
        </motion.p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Founder Portrait */}
          <motion.div variants={fadeUp} className="overflow-hidden">
            <ZaiImage
              src={zaiAssets.zainab.founderPortrait01}
              brand="zai"
              alt="Zainab Al Alwan — Founder Portrait"
              width={600}
              height={750}
              className="w-full h-auto img-editorial"
              style={{ aspectRatio: '4/5' }}
            />
          </motion.div>

          {/* Right: Content column */}
          <motion.div
            variants={stagger}
            className="flex flex-col justify-center"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl text-zai-ivory"
            >
              ZAINAB AL ALWAN
            </motion.h2>

            <motion.div variants={fadeUp} className="divider-gold my-6" />

            <motion.p
              variants={fadeUp}
              className="font-display text-2xl text-zai-gold/60 leading-relaxed"
            >
              FOUNDER.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-display text-2xl text-zai-gold/60 leading-relaxed"
            >
              CREATOR.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-display text-2xl text-zai-gold/60 leading-relaxed"
            >
              VISION.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-sm text-zai-ivory/50 font-body leading-relaxed max-w-md mt-6"
            >
              One vision expressed through beauty, fashion and ritual. Zainab Al
              Alwan is the creative force behind an emerging luxury house — where
              Middle Eastern heritage meets international modernity.
            </motion.p>

          </motion.div>
        </div>


        {/* CTA Button */}
        <motion.div variants={fadeUp} className="flex justify-center mt-16">
          <button
            onClick={() => setView('zainab')}
            className="btn-luxury"
          >
            VIEW FULL PROFILE
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
