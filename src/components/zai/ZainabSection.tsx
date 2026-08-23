'use client';

import { motion } from 'framer-motion';
import { useZaiStore } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';
import ZaiImage from './ZaiImage';

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const ecosystemItems = [
  {
    label: 'ZAI BEAUTÉ',
    description: 'Luxury cosmetics crafted for Middle Eastern skin tones.',
    view: 'beaute' as const,
  },
  {
    label: 'ZAI MAISON',
    description: 'Fashion atelier where heritage meets modern silhouette.',
    view: 'maison' as const,
  },
  {
    label: 'HOUSE OF ZAI',
    description: 'A private sanctuary where beauty becomes ritual.',
    view: 'house' as const,
  },
];

export default function ZainabSection() {
  const setView = useZaiStore((s) => s.setView);

  return (
    <div className="min-h-screen bg-zai-black">
      {/* ── 1. Hero ──────────────────────────────── */}
      <section className="relative w-full min-h-[70vh]">
        {/* Desktop hero */}
        <div className="hidden md:block relative w-full h-[70vh]">
          <ZaiImage
            src={zaiAssets.zainab.founderWide01}
            brand="zai"
            alt="Zainab Al Alwan — Wide Portrait"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Mobile hero */}
        <div className="md:hidden relative w-full" style={{ aspectRatio: '3/4' }}>
          <ZaiImage
            src={zaiAssets.zainab.founderWide01}
            brand="zai"
            alt="Zainab Al Alwan — Portrait"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16 pb-16 md:pb-20"
        >
          <motion.button
            variants={fadeUp}
            onClick={() => setView('home')}
            className="self-start text-xs tracking-editorial text-zai-ivory/50 hover:text-zai-ivory/80 transition-colors mb-8"
          >
            ← WORLD
          </motion.button>
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl text-zai-ivory"
          >
            ZAINAB AL ALWAN
          </motion.h1>
        </motion.div>
      </section>

      {/* ── 2. Philosophy ─────────────────────────── */}
      <section className="py-24 md:py-32 max-w-4xl mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-editorial text-zai-gold/50 mb-12 text-center"
        >
          THE PHILOSOPHY
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display italic text-2xl md:text-4xl text-zai-ivory/80 text-center leading-relaxed"
        >
          &ldquo;Beauty is not what you put on. It is what you reveal.&rdquo;
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-zai-ivory/40 mt-6 text-center tracking-editorial"
        >
          — Zainab Al Alwan
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="divider-gold mt-12"
        />
      </section>

      {/* ── 3. Brand Ecosystem ────────────────────── */}
      <section className="py-24 md:py-32 max-w-6xl mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-editorial text-zai-gold/50 mb-16 text-center"
        >
          THE ECOSYSTEM
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {ecosystemItems.map((item) => (
            <motion.button
              key={item.label}
              variants={fadeUp}
              onClick={() => setView(item.view)}
              className="text-left group"
            >
              <h3 className="font-display text-2xl md:text-3xl text-zai-ivory group-hover:text-zai-gold transition-colors duration-500">
                {item.label}
              </h3>
              <p className="text-sm text-zai-ivory/40 mt-3 leading-relaxed">
                {item.description}
              </p>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* ── 4. Partnership ────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-zai-ivory/5">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-editorial text-zai-gold/50 mb-8"
          >
            FOR PARTNERSHIPS & MEDIA
          </motion.p>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            href="mailto:partnerships@zai.world"
            className="font-display text-xl md:text-2xl text-zai-gold hover:text-zai-cream transition-colors duration-300"
          >
            partnerships@zai.world
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="divider-gold my-12"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs tracking-editorial text-zai-gold/50 mb-8"
          >
            FOR PRESS ENQUIRIES
          </motion.p>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: 0.5 }}
            href="mailto:press@zai.world"
            className="font-display text-xl md:text-2xl text-zai-gold hover:text-zai-cream transition-colors duration-300"
          >
            press@zai.world
          </motion.a>
        </div>
      </section>
    </div>
  );
}
