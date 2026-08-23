'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZaiStore, type ZaiView } from '@/lib/store';
import { products, houseServices, journalArticles } from '@/lib/products';
import { X } from 'lucide-react';

type SearchResult = {
  name: string;
  category: string;
  type: 'product' | 'service' | 'article';
  view: ZaiView;
};

const trendingSearches = ['Red lipstick', 'Foundation', 'Lashes', 'Maison', 'Zainab'];

export default function SearchOverlay() {
  const searchOpen = useZaiStore((s) => s.searchOpen);

  return (
    <AnimatePresence>
      {searchOpen && <SearchContent key="search-overlay" />}
    </AnimatePresence>
  );
}

function SearchContent() {
  const setSearchOpen = useZaiStore((s) => s.setSearchOpen);
  const setView = useZaiStore((s) => s.setView);

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Escape key closes
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setSearchOpen]);

  const results = useCallback(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const out: {
      products: SearchResult[];
      services: SearchResult[];
      articles: SearchResult[];
    } = { products: [], services: [], articles: [] };

    for (const p of products) {
      if (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
        out.products.push({ name: p.name, category: p.category, type: 'product', view: 'beaute' });
      }
    }
    for (const s of houseServices) {
      if (s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)) {
        out.services.push({ name: s.name, category: s.category, type: 'service', view: 'house' });
      }
    }
    for (const a of journalArticles) {
      if (a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)) {
        out.articles.push({ name: a.title, category: a.category, type: 'article', view: 'journal' });
      }
    }
    return out;
  }, [query]);

  const searchResults = results();
  const hasResults =
    searchResults &&
    (searchResults.products.length > 0 ||
      searchResults.services.length > 0 ||
      searchResults.articles.length > 0);

  function handleResultClick(r: SearchResult) {
    setSearchOpen(false);
    setView(r.view);
  }

  function handleTrendingClick(term: string) {
    setQuery(term);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-zai-black/95 backdrop-blur-lg"
      role="dialog"
      aria-label="Search The World of ZAI"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-24 md:pt-32">
        {/* Top: Input + Close */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH THE WORLD OF ZAI"
            className="w-full bg-transparent font-display text-3xl md:text-5xl text-zai-ivory placeholder:text-zai-ivory/15 border-b-2 border-zai-ivory/10 focus:border-zai-gold/50 outline-none transition-colors duration-300 pb-4 pr-12"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute right-0 top-0 p-2 text-zai-ivory/40 hover:text-zai-ivory/80 transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Results / Trending */}
        <div className="mt-12 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {searchResults ? (
              hasResults ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {searchResults.products.length > 0 && (
                    <ResultSection title="PRODUCTS" items={searchResults.products} onClick={handleResultClick} />
                  )}
                  {searchResults.services.length > 0 && (
                    <ResultSection title="SERVICES" items={searchResults.services} onClick={handleResultClick} />
                  )}
                  {searchResults.articles.length > 0 && (
                    <ResultSection title="JOURNAL" items={searchResults.articles} onClick={handleResultClick} />
                  )}
                </motion.div>
              ) : (
                <motion.p
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-zai-ivory/30 mt-4"
                >
                  No results found.
                </motion.p>
              )
            ) : (
              <motion.div
                key="trending"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-xs tracking-editorial text-zai-gold/50 mb-6">TRENDING</p>
                <div className="flex flex-wrap gap-3">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleTrendingClick(term)}
                      className="text-sm tracking-editorial text-zai-ivory/50 border border-zai-ivory/10 px-4 py-2 hover:border-zai-gold/30 hover:text-zai-ivory/80 transition-all duration-300"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function ResultSection({
  title,
  items,
  onClick,
}: {
  title: string;
  items: SearchResult[];
  onClick: (r: SearchResult) => void;
}) {
  return (
    <div className="mb-8">
      <p className="text-[10px] tracking-luxe text-zai-gold/50 mb-4 uppercase">{title}</p>
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={`${item.type}-${item.name}`}
            onClick={() => onClick(item)}
            className="w-full text-left flex items-baseline justify-between gap-4 py-3 border-b border-zai-ivory/5 hover:border-zai-ivory/15 transition-colors duration-300 group"
          >
            <span className="text-lg font-display text-zai-ivory group-hover:text-zai-gold transition-colors duration-300">
              {item.name}
            </span>
            <span className="text-xs tracking-editorial text-zai-ivory/40 whitespace-nowrap">
              {item.category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
