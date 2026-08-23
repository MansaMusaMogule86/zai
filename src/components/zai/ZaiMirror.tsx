'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useZaiStore, type MirrorResult } from '@/lib/store';
import { products } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';

/* ── helpers ────────────────────────────────────────────────── */

const TOTAL_STEPS = 7; // 0-6

function getShadeHex(productName: string, shadeName: string): string {
  const prod = products.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase(),
  );
  if (!prod) return '#C9A96E';
  const shade = prod.shades.find(
    (s) => s.name.toLowerCase() === shadeName.toLowerCase(),
  );
  return shade?.hex ?? '#C9A96E';
}

/* ── animation variants ─────────────────────────────────────── */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

const slideTransition = {
  x: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

/* ── option button ──────────────────────────────────────────── */

function OptBtn({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        'relative w-full py-5 md:py-6 px-6 text-left transition-all duration-300 cursor-pointer ' +
        'bg-zai-charcoal border rounded-sm ' +
        (selected
          ? 'border-zai-gold shadow-[0_0_20px_rgba(201,169,110,0.15)]'
          : 'border-zai-ivory/10 hover:border-zai-gold/40')
      }
    >
      <span
        className={
          'font-display text-lg md:text-xl tracking-editorial transition-colors duration-300 ' +
          (selected ? 'text-zai-gold' : 'text-zai-ivory/70')
        }
      >
        {label}
      </span>
      {selected && (
        <motion.span
          className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-zai-gold"
          layoutId="mirror-opt-dot"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
}

/* ── product result card ────────────────────────────────────── */

function ProductCard({
  label,
  name,
  shade,
}: {
  label: string;
  name: string;
  shade: string;
}) {
  const hex = getShadeHex(name, shade);
  return (
    <div className="bg-zai-charcoal border border-zai-ivory/10 p-5 flex items-center gap-4">
      <span
        className="w-10 h-10 md:w-12 md:h-12 rounded-full shrink-0 border border-zai-ivory/10"
        style={{ backgroundColor: hex }}
        aria-label={`${shade} swatch`}
      />
      <div className="min-w-0">
        <p className="text-[10px] tracking-editorial uppercase text-zai-gold/60 mb-1">
          {label}
        </p>
        <p className="font-display text-sm md:text-base text-zai-ivory truncate">
          {name}
        </p>
        <p className="text-xs text-zai-ivory/50 mt-0.5">{shade}</p>
      </div>
    </div>
  );
}

/* ── loading step ───────────────────────────────────────────── */

function LoadingStep() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <motion.div
          className="absolute inset-0 rounded-full border border-zai-gold/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border border-zai-gold/50"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-0 m-auto w-6 h-6 md:w-8 md:h-8 rounded-full bg-zai-gold"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="text-center">
        <p className="font-display text-xl md:text-2xl text-zai-ivory">
          Creating your ZAI profile...
        </p>
        <div className="mt-3 h-px w-48 mx-auto overflow-hidden bg-zai-ivory/10">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-zai-gold to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function ZaiMirror() {
  const {
    mirrorStep,
    setMirrorStep,
    mirrorAnswers,
    setMirrorAnswer,
    mirrorResult,
    setMirrorResult,
    setView,
  } = useZaiStore();
  const { toast } = useToast();
  const [direction, setDirection] = useState(1);
  const hasFetched = useRef(false);

  /* ── advance helpers ──────────────────────────────────────── */
  const pickAndAdvance = useCallback(
    (key: string, value: string) => {
      setMirrorAnswer(key, value);
      setTimeout(() => setMirrorStep(mirrorStep + 1), 300);
    },
    [mirrorStep, setMirrorAnswer, setMirrorStep],
  );

  // For dual-question steps: store answer, advance when both answered
  const pickDual = useCallback(
    (key: string, value: string, partnerKey: string, currentStep: number) => {
      setMirrorAnswer(key, value);
      // Check after a tick so the store has updated
      setTimeout(() => {
        const current = useZaiStore.getState().mirrorAnswers;
        if (current[partnerKey]) {
          setMirrorStep(currentStep + 1);
        }
      }, 300);
    },
    [setMirrorAnswer, setMirrorStep],
  );

  /* ── navigation ───────────────────────────────────────────── */
  const goBack = useCallback(() => {
    if (mirrorStep === 0) {
      setView('home');
    } else {
      setDirection(-1);
      setMirrorStep(mirrorStep - 1);
    }
  }, [mirrorStep, setMirrorStep, setView]);

  const goForward = useCallback(() => {
    setDirection(1);
    setMirrorStep(mirrorStep + 1);
  }, [mirrorStep, setMirrorStep]);

  /* ── fetch on step 5 ──────────────────────────────────────── */
  useEffect(() => {
    if (mirrorStep !== 5 || hasFetched.current) return;
    hasFetched.current = true;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch('/api/mirror', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: mirrorAnswers }),
        });
        const data: MirrorResult = await res.json();
        if (!cancelled) {
          setMirrorResult(data);
          setMirrorStep(6);
        }
      } catch {
        if (!cancelled) {
          const tone = mirrorAnswers['skinTone'] || 'Medium';
          const style = mirrorAnswers['style'] || 'Natural Glam';
          const fallback: MirrorResult = {
            foundation: {
              name: 'Beauty Booster Foundation',
              shade: tone === 'Fair' ? 'Pearl' : tone === 'Light' ? 'Sand' : tone === 'Deep' ? 'Bronze' : 'Amber',
            },
            lip: {
              name: 'Velvet Matt Lipstick',
              shade: tone === 'Fair' ? 'Nude Edit' : tone === 'Light' ? 'Desert Rose' : tone === 'Deep' ? 'Burgundy Luxe' : 'Mocha',
            },
            highlighter: { name: 'Glozé Highlighter', shade: 'Golden Hour' },
            eye: { name: 'Precision Eyeliner', shade: 'Noir' },
            routine:
              style === 'Minimal' || style === 'Natural Glam'
                ? ['Beauty Booster Foundation', 'Glozé Highlighter', 'Velvet Matt Lipstick', 'Lash Booster Mascara']
                : ['Beauty Booster Foundation', 'Glozé Highlighter', 'Precision Eyeliner', 'Brow Definer', 'Velvet Matt Lipstick', 'Lip Pencil', 'Lash Booster Mascara'],
          };
          setMirrorResult(fallback);
          setMirrorStep(6);
        }
      }
    })();

    return () => { cancelled = true; };
  }, [mirrorStep, mirrorAnswers, setMirrorResult, setMirrorStep]);

  /* ── reset ────────────────────────────────────────────────── */
  const resetMirror = useCallback(() => {
    setMirrorStep(0);
    setMirrorResult(null);
    useZaiStore.setState({ mirrorAnswers: {} });
    hasFetched.current = false;
  }, [setMirrorStep, setMirrorResult]);

  /* ── save toast ───────────────────────────────────────────── */
  const saveProfile = useCallback(() => {
    toast({
      title: 'Profile saved',
      description: 'Your ZAI beauty profile has been saved.',
    });
  }, [toast]);

  /* ── render ───────────────────────────────────────────────── */
  const visibleStep = mirrorStep >= 5 ? Math.min(mirrorStep, 6) : mirrorStep;
  const dots = Array.from({ length: TOTAL_STEPS }, (_, i) => i);

  return (
    <section
      className="relative min-h-screen bg-zai-black flex flex-col"
      role="dialog"
      aria-label="Find Your ZAI — Beauty Concierge"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 pt-6 pb-4 relative z-10">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-xs tracking-editorial text-zai-ivory/40 hover:text-zai-ivory/80 transition-colors duration-300 cursor-pointer"
          aria-label={mirrorStep === 0 ? 'Go back to home' : 'Go back'}
        >
          <ArrowLeft className="w-4 h-4" />
          BACK
        </button>
        <span className="text-xs tracking-editorial text-zai-gold/50">
          FIND YOUR ZAI
        </span>
        <div className="w-16" />
      </header>

      {/* ── Step dots ────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 px-6 pb-8">
        {dots.map((i) => (
          <div
            key={i}
            className={
              'h-1 rounded-full transition-all duration-500 ' +
              (i === visibleStep
                ? 'w-6 bg-zai-gold'
                : i < visibleStep
                  ? 'w-1.5 bg-zai-gold/40'
                  : 'w-1.5 bg-zai-ivory/15')
            }
          />
        ))}
      </div>

      {/* ── Step content ─────────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {/* ─── STEP 0: Welcome ────────────────────────────── */}
          {mirrorStep === 0 && (
            <motion.div
              key="s0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <h1 className="font-display text-5xl md:text-7xl text-zai-ivory tracking-luxe leading-tight">
                FIND YOUR
                <br />
                <span className="text-gradient-gold">ZAI</span>
              </h1>
              <p className="mt-4 text-zai-ivory/40 text-sm md:text-base">
                Your personalized beauty identity
              </p>
              <button onClick={goForward} className="btn-gold mt-12 w-full md:w-auto cursor-pointer">
                BEGIN
              </button>
            </motion.div>
          )}

          {/* ─── STEP 1: Skin Tone ──────────────────────────── */}
          {mirrorStep === 1 && (
            <motion.div
              key="s1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-2xl mx-auto w-full"
            >
              <p className="text-xs tracking-editorial uppercase text-zai-ivory/40 mb-6">
                What is your skin tone?
              </p>
              <div className="space-y-3">
                {['Fair', 'Light', 'Medium', 'Deep'].map((opt) => (
                  <OptBtn
                    key={opt}
                    label={opt}
                    selected={mirrorAnswers['skinTone'] === opt}
                    onClick={() => pickAndAdvance('skinTone', opt)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── STEP 2: Undertone ──────────────────────────── */}
          {mirrorStep === 2 && (
            <motion.div
              key="s2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-2xl mx-auto w-full"
            >
              <p className="text-xs tracking-editorial uppercase text-zai-ivory/40 mb-6">
                What is your undertone?
              </p>
              <div className="space-y-3">
                {['Cool', 'Warm', 'Neutral', 'Olive'].map((opt) => (
                  <OptBtn
                    key={opt}
                    label={opt}
                    selected={mirrorAnswers['undertone'] === opt}
                    onClick={() => pickAndAdvance('undertone', opt)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── STEP 3: Coverage + Finish ──────────────────── */}
          {mirrorStep === 3 && (
            <motion.div
              key="s3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="absolute inset-0 flex flex-col justify-start pt-20 px-6 md:px-12 lg:px-24 max-w-2xl mx-auto w-full gap-10 overflow-y-auto"
            >
              {/* Coverage */}
              <div>
                <p className="text-xs tracking-editorial uppercase text-zai-ivory/40 mb-3">
                  Coverage preference?
                </p>
                <div className="space-y-3">
                  {['Sheer', 'Light', 'Medium', 'Full'].map((opt) => (
                    <OptBtn
                      key={opt}
                      label={opt}
                      selected={mirrorAnswers['coverage'] === opt}
                      onClick={() => pickDual('coverage', opt, 'finish', 3)}
                    />
                  ))}
                </div>
              </div>
              {/* Finish */}
              <div>
                <p className="text-xs tracking-editorial uppercase text-zai-ivory/40 mb-3">
                  Finish preference?
                </p>
                <div className="space-y-3">
                  {['Dewy', 'Natural', 'Matte', 'Satin'].map((opt) => (
                    <OptBtn
                      key={opt}
                      label={opt}
                      selected={mirrorAnswers['finish'] === opt}
                      onClick={() => pickDual('finish', opt, 'coverage', 3)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 4: Style + Occasion ───────────────────── */}
          {mirrorStep === 4 && (
            <motion.div
              key="s4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="absolute inset-0 flex flex-col justify-start pt-20 px-6 md:px-12 lg:px-24 max-w-2xl mx-auto w-full gap-10 overflow-y-auto"
            >
              {/* Style */}
              <div>
                <p className="text-xs tracking-editorial uppercase text-zai-ivory/40 mb-3">
                  What is your beauty style?
                </p>
                <div className="space-y-3">
                  {['Minimal', 'Natural Glam', 'Full Glam', 'Editorial'].map((opt) => (
                    <OptBtn
                      key={opt}
                      label={opt}
                      selected={mirrorAnswers['style'] === opt}
                      onClick={() => pickDual('style', opt, 'occasion', 4)}
                    />
                  ))}
                </div>
              </div>
              {/* Occasion */}
              <div>
                <p className="text-xs tracking-editorial uppercase text-zai-ivory/40 mb-3">
                  When do you wear it most?
                </p>
                <div className="space-y-3">
                  {['Daily', 'Evening', 'Both'].map((opt) => (
                    <OptBtn
                      key={opt}
                      label={opt}
                      selected={mirrorAnswers['occasion'] === opt}
                      onClick={() => pickDual('occasion', opt, 'style', 4)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 5: Loading ────────────────────────────── */}
          {mirrorStep === 5 && (
            <motion.div
              key="s5"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="absolute inset-0"
            >
              <LoadingStep />
            </motion.div>
          )}

          {/* ─── STEP 6: Results ────────────────────────────── */}
          {mirrorStep === 6 && mirrorResult && (
            <motion.div
              key="s6"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="absolute inset-0 overflow-y-auto pb-32"
            >
              <div className="px-6 md:px-12 lg:px-24 max-w-2xl mx-auto w-full">
                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-center mb-10 pt-4"
                >
                  <h2 className="font-display text-4xl md:text-5xl text-zai-ivory tracking-luxe">
                    YOUR ZAI PROFILE
                  </h2>
                  <div className="divider-gold mt-6 mx-auto w-24" />
                </motion.div>

                {/* Product cards */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="space-y-4"
                >
                  <ProductCard label="FOUNDATION" name={mirrorResult.foundation.name} shade={mirrorResult.foundation.shade} />
                  <ProductCard label="LIP" name={mirrorResult.lip.name} shade={mirrorResult.lip.shade} />
                  <ProductCard label="HIGHLIGHTER" name={mirrorResult.highlighter.name} shade={mirrorResult.highlighter.shade} />
                  <ProductCard label="EYE" name={mirrorResult.eye.name} shade={mirrorResult.eye.shade} />
                </motion.div>

                {/* Routine */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mt-10"
                >
                  <p className="text-xs tracking-editorial uppercase text-zai-gold/60 mb-4">
                    RECOMMENDED ROUTINE
                  </p>
                  <div className="bg-zai-charcoal border border-zai-ivory/10 p-5">
                    <ol className="space-y-2">
                      {mirrorResult.routine.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="text-[10px] text-zai-gold/40 w-4">{String(i + 1).padStart(2, '0')}</span>
                          <span className="text-sm text-zai-ivory/70">{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-10 space-y-3 pb-8"
                >
                  <button onClick={() => setView('beaute')} className="btn-gold w-full cursor-pointer">
                    SHOP MY ROUTINE
                  </button>
                  <button onClick={saveProfile} className="btn-luxury w-full cursor-pointer">
                    SAVE MY PROFILE
                  </button>
                  <button
                    onClick={resetMirror}
                    className="w-full text-xs tracking-editorial text-zai-ivory/30 hover:text-zai-ivory/60 transition-colors duration-300 py-3 cursor-pointer"
                  >
                    START OVER
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
