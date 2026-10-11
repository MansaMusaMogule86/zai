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
        backgroundColor: 'rgba(10,10,10,0.72)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        height: '80px',
      }}
    >
      <nav
        className="flex h-full items-center justify-between px-6 lg:px-10 max-w-[1400px] mx-auto"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Minimal ZAI Wordmark */}
        <div className="flex-shrink-0 lg:pl-10">
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
                    <li key={item.view}>
                      <button
                        onClick={() => setView(item.view)}
                        aria-current={isActive ? 'page' : undefined}
                        className="group relative flex flex-col items-center bg-transparent p-0 outline-none"
                      >
                        <span
                          className={`font-body text-xs tracking-[0.17em] uppercase transition-colors duration-200 ease-in-out ${
                            isActive
                              ? 'text-white'
                              : 'text-[rgba(255,255,255,0.58)] group-hover:text-[rgba(255,255,255,0.95)]'
                          }`}
                        >
                          {item.label}
                        </span>
                        {isActive && (
                          <motion.span
                            className="mt-2 h-[1px] w-[22px] bg-[#b89a62] self-center"
                            initial={{ width: 0 }}
                            animate={{ width: 22 }}
                            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </li>
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
          className="lg:hidden -mr-2 p-2 text-[rgba(255,255,255,0.68)] hover:text-[rgba(255,255,255,1)] transition-colors duration-200 cursor-pointer"
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
