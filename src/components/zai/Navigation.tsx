'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useZaiStore, type ZaiView } from '@/lib/store';

const navItems: { label: string; view: ZaiView }[] = [
  { label: 'World', view: 'home' },
  { label: 'Beauté', view: 'beaute' },
  { label: 'Maison', view: 'maison' },
  { label: 'House', view: 'house' },
  { label: 'Zainab', view: 'zainab' },
  { label: 'Journal', view: 'journal' },
];

export default function Navigation() {
  const {
    view,
    setView,
    setSearchOpen,
    setMobileNavOpen,
    hasEnteredWorld,
    setHasEnteredWorld,
  } = useZaiStore();
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');

  // Check sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if (sessionStorage.getItem('zai_has_entered_world') === 'true') {
          setHasEnteredWorld(true);
        }
      } catch {}
    }
  }, [setHasEnteredWorld]);

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 40;
    setScrolled(isScrolled);
    // Automatically activate normal navigation mode when user scrolls past initial hero
    if (window.scrollY > 80 && !hasEnteredWorld) {
      setHasEnteredWorld(true);
    }
  }, [hasEnteredWorld, setHasEnteredWorld]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleLang = () => setLang((l) => (l === 'EN' ? 'AR' : 'EN'));

  // Logic:
  // Internal world pages (Zainab, Beauté, Maison, House, Journal) ALWAYS show full nav.
  // Initial World landing displays cinematic mode (only minimal wordmark) until ENTER THE WORLD or scroll.
  const showFullNav = view !== 'home' || hasEnteredWorld;

  return (
    <header
      role="banner"
      className="fixed inset-x-0 top-0 z-[1000] transition-[background,_backdrop-filter] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        backgroundColor: scrolled ? 'rgba(5,5,5,0.92)' : 'rgba(5,5,5,0.55)',
        backdropFilter: scrolled
          ? 'blur(20px) saturate(120%)'
          : 'blur(16px) saturate(120%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        height: '80px',
      }}
    >
      <nav
        className="flex h-full items-center justify-between px-6 lg:px-10 max-w-[1400px] mx-auto"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Minimal ZAI Wordmark */}
        <div className="flex-shrink-0 pl-6 lg:pl-10">
          <button
            onClick={() => setView('home')}
            className="flex items-center"
            aria-label="Return to World"
          >
            <span className="font-display text-2xl lg:text-3xl tracking-[0.05em] font-normal text-zai-ivory">
              ZAI
            </span>
          </button>
        </div>

        {/* Center nav items - revealed only after entering world or on internal routes */}
        <div className="flex-1 flex justify-center">
          <AnimatePresence>
            {showFullNav && (
              <motion.ul
                key="center-nav"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="hidden lg:flex items-center gap-[40px]"
              >
                {navItems.map((item) => {
                  const isActive = view === item.view;
                  return (
                    <motion.li
                      key={item.view}
                      initial={{ opacity: 0.68 }}
                      animate={isActive ? { opacity: 1 } : { opacity: 0.68 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => setView(item.view)}
                        className="flex flex-col items-center gap-2"
                      >
                        <span
                          className={`font-body text-xs tracking-[0.17em] uppercase ${
                            isActive ? 'text-white' : 'text-[rgba(255,255,255,0.68)]'
                          } hover:text-[rgba(255,255,255,1)]`}
                        >
                          {item.label}
                        </span>
                        {isActive && (
                          <motion.span
                            className="w-[20px] h-[1px] bg-[rgba(232,213,184,0.8)] self-center"
                            initial={{ width: 0 }}
                            animate={isActive ? { width: 20 } : { width: 0 }}
                            whileHover={{ width: 24 }}
                            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Right side controls - revealed only after entering world or on internal routes */}
        <div className="flex items-center gap-4 hidden sm:flex">
          <AnimatePresence>
            {showFullNav && (
              <motion.div
                key="right-controls"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex items-center gap-4"
              >
                {/* Search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-[rgba(255,255,255,0.68)] hover:text-[rgba(255,255,255,1)] transition-colors duration-200 cursor-pointer"
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5" strokeWidth={1.5} />
                </button>

                {/* Language toggle */}
                <div className="flex items-center gap-2 text-xs tracking-[0.17em] uppercase">
                  <button
                    onClick={toggleLang}
                    className={`
                      transition-colors duration-200
                      ${lang === 'EN' ? 'text-white' : 'text-[rgba(255,255,255,0.42)]'}
                    `}
                    aria-label="Switch to English"
                  >
                    EN
                  </button>
                  <span className="text-[rgba(255,255,255,0.30)]">
                    /
                  </span>
                  <button
                    onClick={toggleLang}
                    className={`
                      transition-colors duration-200
                      ${lang === 'AR' ? 'text-white' : 'text-[rgba(255,255,255,0.42)]'}
                    `}
                    aria-label="Switch to Arabic"
                  >
                    AR
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile hamburger (always visible) */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="lg:hidden text-[rgba(255,255,255,0.68)] hover:text-[rgba(255,255,255,1)] transition-colors duration-200 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
