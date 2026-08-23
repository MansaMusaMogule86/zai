'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZaiStore } from '@/lib/store';

// ── Phase timing (ms) ───────────────────────────────────────
const P2 = 1500; // Phase 2 start
const P3 = 3000; // Phase 3 start
const P4 = 4000; // Phase 4 — final fade
const DONE = 5000; // Fully complete

// ── Opacity-only variants ───────────────────────────────────

const presents = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.6, ease: 'easeIn' as const } },
};

const zai = {
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
type Phase = 1 | 2 | 3 | 4;

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
      setTimeout(() => setPhase(4), P4),
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
      {!exiting ? null : null}
      <motion.div
        key="opening-overlay"
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ background: '#0A0A0A' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } }}
        aria-live="polite"
        role="dialog"
        aria-label="Opening sequence"
      >
        <div className="relative flex flex-col items-center justify-center">
          {/* Phase 1 — Presents text */}
          <AnimatePresence mode="wait">
            {phase === 1 && (
              <motion.p
                key="presents"
                variants={presents}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-xs tracking-luxe text-zai-ivory/40 font-body select-none"
              >
                ZAINAB AL ALWAN PRESENTS
              </motion.p>
            )}
          </AnimatePresence>

          {/* Phase 2+ — ZAI logo with shimmer */}
          <AnimatePresence mode="wait">
            {phase >= 2 && (
              <motion.div
                key="zai-block"
                variants={zai}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center"
              >
                <h1 className="relative font-display text-7xl md:text-9xl text-zai-ivory tracking-luxe select-none">
                  ZAI
                  <span
                    className="absolute inset-0 animate-shimmer pointer-events-none"
                    aria-hidden
                  />
                </h1>

                {/* Phase 3 — Tagline */}
                <AnimatePresence>
                  {phase >= 3 && (
                    <motion.p
                      key="tagline"
                      variants={tagline}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="mt-6 text-sm tracking-editorial text-zai-gold/60 font-body select-none"
                    >
                      BEAUTY. FASHION. RITUAL.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Skip */}
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
