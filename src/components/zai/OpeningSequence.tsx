'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZaiStore } from '@/lib/store';

// ── Phase timing (ms) ───────────────────────────────────────
const P2 = 1200; // Tagline appears
const P3 = 3000; // Begin exit
const DONE = 4000; // Fully complete

// ── Fade-only variants ──────────────────────────────────────

const wordmark = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.8, ease: 'easeIn' as const } },
};

const tagline = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeIn' as const } },
};

const skipBtn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
};

// ── Phase type ──────────────────────────────────────────────
type Phase = 1 | 2 | 3;

// ── Component ───────────────────────────────────────────────

export default function OpeningSequence() {
  const { hasSeenOpening, setHasSeenOpening } = useZaiStore();
  const [phase, setPhase] = useState<Phase>(1);
  const [exiting, setExiting] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const complete = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setExiting(true);
  }, []);

  // Phase machine
  useEffect(() => {
    if (hasSeenOpening || exiting) return;

    timers.current = [
      setTimeout(() => setPhase(2), P2),
      setTimeout(() => setPhase(3), P3),
      setTimeout(complete, DONE),
    ];

    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, [hasSeenOpening, exiting, complete]);

  // When exiting finishes, mark as seen
  useEffect(() => {
    if (exiting) {
      const t = setTimeout(() => setHasSeenOpening(true), 500);
      return () => clearTimeout(t);
    }
  }, [exiting, setHasSeenOpening]);

  if (hasSeenOpening) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="opening-overlay"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } }}
        aria-live="polite"
        role="dialog"
        aria-label="Opening sequence"
      >
        {/* ── Typography column ── */}
        <div className="flex flex-col items-center gap-5 md:gap-7">
          {/* ── ZAI wordmark ── */}
          <motion.h1
            variants={wordmark}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="font-display text-7xl md:text-9xl text-zai-ivory tracking-luxe select-none"
          >
            ZAI
          </motion.h1>

          {/* ── Tagline ── */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.p
                key="tagline"
                variants={tagline}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-sm tracking-editorial text-zai-gold/60 font-body select-none"
              >
                BEAUTY. FASHION. RITUAL.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* ── Skip ── */}
        <motion.button
          variants={skipBtn}
          initial="hidden"
          animate="visible"
          onClick={complete}
          className="absolute bottom-8 right-8 text-xs tracking-editorial text-zai-ivory/30 hover:text-zai-ivory/70 transition-colors duration-300 font-body cursor-pointer"
          aria-label="Skip opening"
        >
          SKIP
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
