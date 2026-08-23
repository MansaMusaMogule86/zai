'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZaiStore } from '@/lib/store';
import { journalArticles, type JournalArticle } from '@/lib/products';
import { zaiAssets } from '@/lib/assets';
import ZaiImage from './ZaiImage';

const categories = [
  'all',
  'beauty',
  'looks',
  'maison',
  'atelier',
  'house',
  'zainab',
  'campaigns',
  'guides',
] as const;

type Category = (typeof categories)[number];

/** Resolve an article's assetKey to an actual image path */
function getArticleImage(article: JournalArticle) {
  if (!article.assetKey) return null;
  const parts = article.assetKey.split('.');
  if (parts.length !== 2) return null;
  const section = zaiAssets[parts[0] as keyof typeof zaiAssets];
  if (!section) return null;
  const asset = (section as Record<string, string>)[parts[1]];
  return asset ?? null;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function JournalSection() {
  const setView = useZaiStore((s) => s.setView);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return journalArticles;
    return journalArticles.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const feature = activeCategory === 'all' ? filtered[0] : null;
  const remaining = feature ? filtered.slice(1) : filtered;

  return (
    <div className="min-h-screen bg-zai-black">
      {/* ── Hero ──────────────────────────────── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          onClick={() => setView('home')}
          className="text-xs tracking-editorial text-zai-ivory/50 hover:text-zai-ivory/80 transition-colors mb-12 block"
        >
          ← WORLD
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-5xl md:text-7xl text-zai-ivory"
        >
          THE ZAI EDIT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-sm text-zai-ivory/40 mt-4"
        >
          Stories from the World of ZAI
        </motion.p>
      </section>

      {/* ── Category Filter ──────────────────── */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedId(null);
              }}
              className={`text-xs tracking-editorial uppercase whitespace-nowrap transition-colors duration-300 pb-2 border-b ${
                activeCategory === cat
                  ? 'text-zai-gold border-zai-gold/40'
                  : 'text-zai-ivory/40 border-transparent hover:text-zai-ivory/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Articles ──────────────────────────── */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mt-12 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={stagger}
            transition={{ duration: 0.3 }}
          >
            {/* Feature Article (only when 'all') */}
            {feature && (
              <motion.article
                variants={fadeUp}
                className="mb-16 cursor-pointer"
                onClick={() => setExpandedId(expandedId === feature.id ? null : feature.id)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div className="overflow-hidden">
                    <ZaiImage
                      src={getArticleImage(feature) ?? zaiAssets.zainab.editorialPortrait01}
                      brand="zai"
                      alt={feature.title}
                      width={800}
                      height={1000}
                      className="w-full h-auto img-editorial"
                      style={{ aspectRatio: '4/5' }}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] tracking-luxe uppercase text-zai-gold/50 mb-4">
                      {feature.category}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl text-zai-ivory">
                      {feature.title}
                    </h2>
                    <p className="text-sm text-zai-ivory/40 mt-4 leading-relaxed">
                      {feature.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-6 text-xs text-zai-ivory/20 tracking-editorial">
                      <span>{formatDate(feature.date)}</span>
                      <span>·</span>
                      <span>{feature.readTime} READ</span>
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {expandedId === feature.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 mt-8 border-t border-zai-ivory/5">
                        <p className="text-sm text-zai-ivory/50 font-body leading-relaxed max-w-2xl">
                          {feature.excerpt}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )}

            {/* Remaining articles in editorial grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {remaining.map((article, i) => {
                const isEven = i % 2 === 0;
                const imgSrc = getArticleImage(article);
                const isExpanded = expandedId === article.id;

                return (
                  <motion.article
                    key={article.id}
                    variants={fadeUp}
                    className={`cursor-pointer ${!isEven ? 'md:mt-16' : ''}`}
                    onClick={() => setExpandedId(isExpanded ? null : article.id)}
                  >
                    {/* Image top for even, image left for odd on desktop */}
                    {isEven ? (
                      <>
                        {imgSrc && (
                          <div className="overflow-hidden mb-4">
                            <ZaiImage
                              src={imgSrc}
                              brand="zai"
                              alt={article.title}
                              width={600}
                              height={750}
                              className="w-full h-auto img-editorial"
                              style={{ aspectRatio: '4/5' }}
                            />
                          </div>
                        )}
                        <span className="text-[10px] tracking-luxe uppercase text-zai-gold/50">
                          {article.category}
                        </span>
                        <h3 className="font-display text-xl text-zai-ivory mt-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-zai-ivory/40 mt-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-zai-ivory/20 tracking-editorial">
                          <span>{formatDate(article.date)}</span>
                          <span>·</span>
                          <span>{article.readTime} READ</span>
                        </div>
                      </>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {imgSrc && (
                          <div className="overflow-hidden">
                            <ZaiImage
                              src={imgSrc}
                              brand="zai"
                              alt={article.title}
                              width={400}
                              height={500}
                              className="w-full h-auto img-editorial"
                              style={{ aspectRatio: '4/5' }}
                            />
                          </div>
                        )}
                        <div className="flex flex-col justify-center">
                          <span className="text-[10px] tracking-luxe uppercase text-zai-gold/50">
                            {article.category}
                          </span>
                          <h3 className="font-display text-xl text-zai-ivory mt-2">
                            {article.title}
                          </h3>
                          <p className="text-sm text-zai-ivory/40 mt-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-zai-ivory/20 tracking-editorial">
                            <span>{formatDate(article.date)}</span>
                            <span>·</span>
                            <span>{article.readTime} READ</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 mt-4 border-t border-zai-ivory/5">
                            <p className="text-sm text-zai-ivory/50 font-body leading-relaxed">
                              {article.excerpt}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
