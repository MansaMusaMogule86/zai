'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZaiStore } from '@/lib/store';

// ── Strict sequence timings (ms) ────────────────────────────
// 0.00s: black screen
// 0.20s: Z appears
// 0.32s: A appears
// 0.44s: I appears
// 0.80s: BEAUTÉ appears
// 0.95s: MAISON appears (~150ms later)
// 1.10s: HOUSE appears (~150ms later)
// 1.35s: BY ZAINAB AL ALWAN fades in
// 1.90s: Begin cinematic dissolve
// 2.40s: Splash completely dissolved into WORLD hero (500ms transition)

const T_Z = 200;
const T_A = 320;
const T_I = 440;
const T_BEAUTE = 800;
const T_MAISON = 950;
const T_HOUSE = 1100;
const T_FOUNDER = 1350;
const T_DISSOLVE = 1900;

export default function OpeningSequence() {
  const { hasSeenOpening, setHasSeenOpening } = useZaiStore();
  const [step, setStep] = useState<number>(0);
  const [exiting, setExiting] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const complete = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setExiting(true);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('zai_global_splash_seen', 'true');
      } catch {}
    }
    setTimeout(() => {
      setHasSeenOpening(true);
    }, 500);
  }, [setHasSeenOpening]);

  useEffect(() => {
    // Check sessionStorage: only show once per browser session
    if (typeof window !== 'undefined') {
      try {
        if (sessionStorage.getItem('zai_global_splash_seen') === 'true') {
          setHasSeenOpening(true);
          return;
        }
      } catch {}

      // Respect prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setTimeout(complete, 0);
        return;
      }
    }

    if (hasSeenOpening || exiting) return;

    // Schedule sequence steps
    timers.current = [
      setTimeout(() => setStep(1), T_Z),        // 0.20s: Z
      setTimeout(() => setStep(2), T_A),        // 0.32s: A
      setTimeout(() => setStep(3), T_I),        // 0.44s: I
      setTimeout(() => setStep(4), T_BEAUTE),   // 0.80s: BEAUTÉ
      setTimeout(() => setStep(5), T_MAISON),   // 0.95s: MAISON
      setTimeout(() => setStep(6), T_HOUSE),    // 1.10s: HOUSE
      setTimeout(() => setStep(7), T_FOUNDER),  // 1.35s: BY ZAINAB AL ALWAN
      setTimeout(complete, T_DISSOLVE),         // 1.90s: dissolve (completes by 2.40s)
    ];

    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, [hasSeenOpening, exiting, complete, setHasSeenOpening]);

  if (hasSeenOpening) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="global-splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070707] select-none pointer-events-auto"
          role="dialog"
          aria-label="Welcome to ZAI"
        >
          {/* ── Center Container ── */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* ── 1. Z A I (0.20s – 0.44s) ── */}
            <h1 className="font-display text-6xl sm:text-8xl md:text-9xl text-zai-ivory tracking-[0.25em] sm:tracking-[0.35em] pl-[0.25em] sm:pl-[0.35em] leading-none mb-7 sm:mb-9 flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 1 ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="inline-block"
              >
                Z
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 2 ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="inline-block"
              >
                A
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 3 ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="inline-block"
              >
                I
              </motion.span>
            </h1>

            {/* ── 2. BEAUTÉ · MAISON · HOUSE (0.80s – 1.10s) ── */}
            <div className="flex items-center justify-center flex-nowrap gap-2.5 sm:gap-4 md:gap-6 mb-7 sm:mb-8">
              {/* BEAUTÉ */}
              <motion.span
                initial={{ opacity: 0, y: 3 }}
                animate={{
                  opacity: step >= 4 ? 1 : 0,
                  y: step >= 4 ? 0 : 3,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="font-body text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.28em] uppercase text-zai-gold/85 font-light"
              >
                BEAUTÉ
              </motion.span>

              {/* Dot 1 */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 5 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-zai-gold/40 text-xs sm:text-sm select-none"
                aria-hidden="true"
              >
                ·
              </motion.span>

              {/* MAISON */}
              <motion.span
                initial={{ opacity: 0, y: 3 }}
                animate={{
                  opacity: step >= 5 ? 1 : 0,
                  y: step >= 5 ? 0 : 3,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="font-body text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.28em] uppercase text-zai-gold/85 font-light"
              >
                MAISON
              </motion.span>

              {/* Dot 2 */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 6 ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-zai-gold/40 text-xs sm:text-sm select-none"
                aria-hidden="true"
              >
                ·
              </motion.span>

              {/* HOUSE */}
              <motion.span
                initial={{ opacity: 0, y: 3 }}
                animate={{
                  opacity: step >= 6 ? 1 : 0,
                  y: step >= 6 ? 0 : 3,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="font-body text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.28em] uppercase text-zai-gold/85 font-light"
              >
                HOUSE
              </motion.span>
            </div>

            {/* ── 3. BY ZAINAB AL ALWAN (1.35s) ── */}
            <motion.p
              initial={{ opacity: 0, y: 3 }}
              animate={{
                opacity: step >= 7 ? 0.6 : 0,
                y: step >= 7 ? 0 : 3,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-[10px] sm:text-[11px] font-body tracking-[0.32em] sm:tracking-[0.4em] uppercase text-zai-ivory/60 pl-[0.32em] sm:pl-[0.4em]"
            >
              BY ZAINAB AL ALWAN
            </motion.p>
          </div>

          {/* Discreet Luxury Skip Control */}
          <button
            onClick={complete}
            className="absolute bottom-8 right-8 text-[10px] tracking-editorial text-zai-ivory/25 hover:text-zai-ivory/70 transition-colors duration-300 font-body cursor-pointer uppercase"
            aria-label="Skip opening"
          >
            SKIP
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
