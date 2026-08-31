'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZaiStore } from '@/lib/store';

// ── Timing constants (ms) ───────────────────────────────────
const GLOW_START = 150;
const ZAI_START = 300;
const BEAUTE_START = 750;
const DOT1_START = 950;
const MAISON_START = 1050;
const DOT2_START = 1250;
const HOUSE_START = 1350;
const FOUNDER_START = 1650;
const EXIT_START = 2500;
const TOTAL_DURATION = 3150; // includes 650ms fade out

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
    }, 650);
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
        complete();
        return;
      }
    }

    if (hasSeenOpening || exiting) return;

    // Sequence schedule
    timers.current = [
      setTimeout(() => setStep(1), GLOW_START),     // 0.15s: glow
      setTimeout(() => setStep(2), ZAI_START),      // 0.30s: Z A I
      setTimeout(() => setStep(3), BEAUTE_START),   // 0.75s: BEAUTÉ ink reveal
      setTimeout(() => setStep(4), DOT1_START),     // 0.95s: first dot
      setTimeout(() => setStep(5), MAISON_START),   // 1.05s: MAISON
      setTimeout(() => setStep(6), DOT2_START),     // 1.25s: second dot
      setTimeout(() => setStep(7), HOUSE_START),    // 1.35s: HOUSE
      setTimeout(() => setStep(8), FOUNDER_START),  // 1.65s: BY ZAINAB AL ALWAN
      setTimeout(complete, EXIT_START),             // 2.50s: cinematic dissolve
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
            transition: { duration: 0.65, ease: [0.4, 0.0, 0.2, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070707] select-none pointer-events-auto"
          role="dialog"
          aria-label="Welcome to ZAI"
        >
          {/* ── 0.15s Subtle warm-gold ambient back-glow ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: step >= 1 ? 0.85 : 0,
              scale: step >= 1 ? 1 : 0.8,
            }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.03) 40%, transparent 70%)',
            }}
          />

          {/* ── Core Visual Hierarchy ── */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* ── 1. Z A I (0.30s) ── */}
            <h1 className="font-display text-6xl sm:text-8xl md:text-9xl text-zai-ivory tracking-[0.25em] sm:tracking-[0.35em] pl-[0.25em] sm:pl-[0.35em] leading-none mb-8 sm:mb-10 flex items-center justify-center">
              {['Z', 'A', 'I'].map((char, i) => (
                <motion.span
                  key={char}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: step >= 2 ? (step >= 8 ? 0.9 : 1) : 0,
                    y: step >= 2 ? 0 : 10,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* ── 2. BEAUTÉ · MAISON · HOUSE (0.75s – 1.35s) ── */}
            <div className="flex items-center justify-center flex-nowrap gap-2 sm:gap-4 md:gap-6 mb-7 sm:mb-8">
              {/* BEAUTÉ with ink/mask reveal + subtle script flourish */}
              <div className="relative inline-flex flex-col items-center">
                <motion.span
                  initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
                  animate={{
                    opacity: step >= 3 ? 1 : 0,
                    clipPath: step >= 3 ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="font-body text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.28em] uppercase text-zai-gold/85 font-light"
                >
                  BEAUTÉ
                </motion.span>
                {/* Delicate handwritten ink underline flourish */}
                <svg
                  className="w-full h-1 mt-0.5 pointer-events-none"
                  viewBox="0 0 60 4"
                  fill="none"
                >
                  <motion.path
                    d="M 2 2 Q 30 3.5 58 2"
                    stroke="#D4AF37"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: step >= 3 ? 1 : 0,
                      opacity: step >= 3 ? 0.5 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15,
                      ease: 'easeInOut',
                    }}
                  />
                </svg>
              </div>

              {/* Dot 1 */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 4 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-zai-gold/40 text-xs sm:text-sm select-none"
                aria-hidden="true"
              >
                ·
              </motion.span>

              {/* MAISON */}
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{
                  opacity: step >= 5 ? 1 : 0,
                  y: step >= 5 ? 0 : 4,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="font-body text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.28em] uppercase text-zai-gold/85 font-light pb-1"
              >
                MAISON
              </motion.span>

              {/* Dot 2 */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 6 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-zai-gold/40 text-xs sm:text-sm select-none"
                aria-hidden="true"
              >
                ·
              </motion.span>

              {/* HOUSE */}
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{
                  opacity: step >= 7 ? 1 : 0,
                  y: step >= 7 ? 0 : 4,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="font-body text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.28em] uppercase text-zai-gold/85 font-light pb-1"
              >
                HOUSE
              </motion.span>
            </div>

            {/* ── 3. BY ZAINAB AL ALWAN (1.65s) ── */}
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{
                opacity: step >= 8 ? 0.6 : 0,
                y: step >= 8 ? 0 : 4,
              }}
              transition={{
                duration: 0.7,
                ease: 'easeOut',
              }}
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
