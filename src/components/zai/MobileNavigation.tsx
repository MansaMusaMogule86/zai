'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZaiStore, type ZaiView } from '@/lib/store';

const menuItems: { num: string; label: string; view: ZaiView }[] = [
  { num: '01', label: 'BEAUTÉ', view: 'beaute' },
  { num: '02', label: 'MAISON', view: 'maison' },
  { num: '03', label: 'HOUSE', view: 'house' },
  { num: '04', label: 'ZAINAB', view: 'zainab' },
  { num: '05', label: 'JOURNAL', view: 'journal' },
];

const footerLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'Contact', href: '#' },
];

/* Animation variants */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 0.5,
    },
  },
};

export default function MobileNavigation() {
  const { mobileNavOpen, setMobileNavOpen, setView } = useZaiStore();

  const handleSelect = (view: ZaiView) => {
    setView(view);
    setMobileNavOpen(false);
  };

  const handleClose = () => setMobileNavOpen(false);

  return (
    <AnimatePresence>
      {mobileNavOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-[60] bg-zai-black"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 z-10 text-zai-ivory/60 hover:text-zai-ivory transition-colors duration-300"
            aria-label="Close navigation"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>

          {/* Main nav items */}
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex h-full flex-col justify-center px-8"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <motion.li key={item.view} variants={itemVariants}>
                  <button
                    onClick={() => handleSelect(item.view)}
                    className="group flex items-baseline gap-4 w-full text-left"
                  >
                    <span className="font-body text-sm tracking-editorial text-zai-gold/60 group-hover:text-zai-gold transition-colors duration-300">
                      {item.num}
                    </span>
                    <span className="font-display text-4xl tracking-luxe text-zai-ivory group-hover:text-zai-gold transition-colors duration-500">
                      {item.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Footer links */}
          <motion.div
            variants={footerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-0 left-0 right-0 px-8 pb-8"
          >
            <div className="divider-gold mb-6" />
            <div className="flex flex-col gap-4">
              {/* Language toggle */}
              <div className="flex items-center gap-2 font-body text-xs tracking-editorial uppercase">
                <button className="text-zai-ivory">EN</button>
                <span className="text-zai-ivory/20" aria-hidden="true">/</span>
                <button className="text-zai-ivory/40 hover:text-zai-ivory/60 transition-colors duration-300">
                  AR
                </button>
              </div>

              {/* Social & contact links */}
              <div className="flex items-center gap-6">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-body text-xs tracking-editorial uppercase text-zai-ivory/50 hover:text-zai-ivory transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
