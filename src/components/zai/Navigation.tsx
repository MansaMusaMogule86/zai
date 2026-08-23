'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  const { view, setView, setSearchOpen, setMobileNavOpen } = useZaiStore();
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleLang = () => setLang((l) => (l === 'EN' ? 'AR' : 'EN'));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-zai-black/80 backdrop-blur-md border-b border-zai-gold/20'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          onClick={() => setView('home')}
          className="font-display text-2xl tracking-luxe text-zai-ivory hover:text-zai-gold transition-colors duration-500"
          aria-label="Return to World"
        >
          ZAI
        </button>

        {/* Center nav items - desktop only */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = view === item.view;
            return (
              <li key={item.view}>
                <button
                  onClick={() => setView(item.view)}
                  className={`relative font-body text-xs tracking-editorial uppercase transition-colors duration-300 ${
                    isActive
                      ? 'text-zai-ivory'
                      : 'text-zai-ivory/70 hover:text-zai-ivory'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {/* Gold underline */}
                  <motion.span
                    className="absolute -bottom-1 left-1/2 h-px bg-zai-gold -translate-x-1/2"
                    initial={false}
                    animate={{
                      width: isActive ? '100%' : '0%',
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    aria-hidden="true"
                  />
                  {/* Hover underline */}
                  <motion.span
                    className="absolute -bottom-1 left-1/2 h-px bg-zai-gold/50 -translate-x-1/2"
                    initial={{ width: '0%', opacity: 0 }}
                    whileHover={{ width: '100%', opacity: 1 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    aria-hidden="true"
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="text-zai-ivory/70 hover:text-zai-ivory transition-colors duration-300"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </button>

          {/* Language toggle */}
          <div className="hidden sm:flex items-center gap-1 font-body text-[10px] tracking-editorial uppercase">
            <button
              onClick={toggleLang}
              className={`transition-colors duration-300 ${
                lang === 'EN' ? 'text-zai-ivory' : 'text-zai-ivory/40 hover:text-zai-ivory/60'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <span className="text-zai-ivory/20" aria-hidden="true">
              /
            </span>
            <button
              onClick={toggleLang}
              className={`transition-colors duration-300 ${
                lang === 'AR' ? 'text-zai-ivory' : 'text-zai-ivory/40 hover:text-zai-ivory/60'
              }`}
              aria-label="Switch to Arabic"
            >
              AR
            </button>
          </div>

          {/* Mobile hamburger - lg only shows nav, below lg show hamburger */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="lg:hidden text-zai-ivory/70 hover:text-zai-ivory transition-colors duration-300"
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
        </div>
      </nav>
    </header>
  );
}
