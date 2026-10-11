'use client';

import React from 'react';
import { Variants, motion, AnimatePresence } from 'framer-motion';
import { useZaiStore, type ZaiView } from '@/lib/store';

const menuItems: { label: string; view: ZaiView }[] = [
  { label: 'World', view: 'home' },
  { label: 'Beauté', view: 'beaute' },
  { label: 'Maison', view: 'maison' },
  { label: 'House', view: 'house' },
  { label: 'Zainab', view: 'zainab' },
  { label: 'Journal', view: 'journal' },
];

/* Animation variants */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
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
          className="fixed inset-0 z-[60] bg-zai-black/90"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onClick={handleClose}
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
            className="flex h-full flex-col justify-center items-center px-8"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-6">
              {menuItems.map((item) => (
                <motion.div
                  key={item.view}
                  variants={itemVariants}
                >
                  <button
                    onClick={() => handleSelect(item.view)}
                    className="flex items-center"
                  >
                    <span
                      className={`font-display text-5xl xl:text-6xl tracking-luxe uppercase ${
                        // No active state needed; all same
                        'text-zai-ivory'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </motion.div>
              ))}
            </ul>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
