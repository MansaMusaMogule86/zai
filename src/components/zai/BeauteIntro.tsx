'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useZaiStore } from '@/lib/store';

const LOGO_SRC = '/images/zai/beaute/ZAI_BEAUTE_LOGO_3D_TRANSPARENT_01.png';
const INTRO_DURATION = 2200; // ms

export default function BeauteIntro() {
  const hasSeenBeauteIntro = useZaiStore((s) => s.hasSeenBeauteIntro);
  const setHasSeenBeauteIntro = useZaiStore((s) => s.setHasSeenBeauteIntro);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const complete = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setExiting(true);
    setTimeout(() => {
      setHasSeenBeauteIntro(true);
    }, 500);
  }, [setHasSeenBeauteIntro]);

  useEffect(() => {
    if (hasSeenBeauteIntro) return;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setHasSeenBeauteIntro(true);
        return;
      }
    }

    timerRef.current = setTimeout(complete, INTRO_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hasSeenBeauteIntro, complete, setHasSeenBeauteIntro]);

  if (hasSeenBeauteIntro) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="beaute-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070707]"
          role="dialog"
          aria-label="ZAI Beauté Introduction"
        >
          {/* Subtle golden ambient glow in center */}
          <div
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
            }}
          />

          {/* 3D Logo Animated Stack */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            {/* Layer 1: ZAI & Diamond Mark (top 45%) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              style={{
                clipPath: 'inset(0% 0% 55% 0%)',
              }}
            >
              <img
                src={LOGO_SRC}
                alt="ZAI"
                className="w-full h-full object-contain"
                draggable={false}
              />
            </motion.div>

            {/* Layer 2: Beauté Script (middle, mask reveals from left to right) */}
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(38% 100% 14% 0%)' }}
              animate={{ opacity: 1, clipPath: 'inset(38% 0% 14% 0%)' }}
              transition={{ duration: 0.95, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <img
                src={LOGO_SRC}
                alt="Beauté"
                className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.2)]"
                draggable={false}
              />
            </motion.div>

            {/* Layer 3: Brand Signature (bottom 16%) */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15, ease: 'easeOut' }}
              className="absolute inset-0"
              style={{
                clipPath: 'inset(84% 0% 0% 0%)',
              }}
            >
              <img
                src={LOGO_SRC}
                alt="by Zainab Al Alwan"
                className="w-full h-full object-contain"
                draggable={false}
              />
            </motion.div>
          </div>

          {/* Discreet Skip Button */}
          <button
            onClick={complete}
            className="absolute bottom-8 right-8 text-[11px] tracking-editorial text-zai-ivory/30 hover:text-zai-ivory/80 transition-colors duration-300 font-body cursor-pointer uppercase"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
