'use client';

import { useState, useRef } from 'react';
import { Variants,  motion, AnimatePresence, useInView } from 'framer-motion';
import { useZaiStore } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';

// ── 5 Real Maison Process Stories ────────────────────────────

interface ProcessStory {
  id: string;
  step: string;
  title: string;
  quote: string;
  src: string;
  alt: string;
  objectPosition: string;
}

const processStories: ProcessStory[] = [
  {
    id: 'sketch',
    step: '01 / CONCEPT',
    title: 'THE SKETCH',
    quote: 'From the first line, a silhouette begins.',
    src: zaiAssets.maison.process.sketch,
    alt: 'ZAI Maison fashion sketches and design concepts',
    objectPosition: 'center 40%',
  },
  {
    id: 'fabric',
    step: '02 / MATERIAL',
    title: 'THE FABRIC',
    quote: 'Texture, movement and touch shape the direction.',
    src: zaiAssets.maison.process.fabric,
    alt: 'ZAI Maison curated fabric swatches',
    objectPosition: 'center center',
  },
  {
    id: 'pattern',
    step: '03 / ARCHITECTURE',
    title: 'THE PATTERN',
    quote: 'The idea is translated into proportion and form.',
    src: zaiAssets.maison.process.pattern,
    alt: 'ZAI Maison garment pattern development',
    objectPosition: 'center 35%',
  },
  {
    id: 'craft',
    step: '04 / TECHNIQUE',
    title: 'THE CRAFT',
    quote: 'Construction begins by hand.',
    src: zaiAssets.maison.process.craft,
    alt: 'ZAI Maison sewing and craftsmanship',
    objectPosition: 'center center',
  },
  {
    id: 'atelier',
    step: '05 / REFINEMENT',
    title: 'THE ATELIER',
    quote: 'Where every detail is refined.',
    src: zaiAssets.maison.process.atelier,
    alt: 'ZAI Maison atelier with dress forms',
    objectPosition: 'center 35%',
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function MaisonSection() {
  const setView = useZaiStore((s) => s.setView);
  const [formState, setFormState] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    country: '',
    style: '',
    consent: false,
  });

  const atelierRef = useRef<HTMLDivElement>(null);
  const atelierInView = useInView(atelierRef, { once: true, margin: '-10% 0px' });

  const campaignRef = useRef<HTMLDivElement>(null);
  const campaignInView = useInView(campaignRef, { once: true, margin: '-10% 0px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('confirmed');
  };

  const inputClass =
    'w-full bg-transparent border-b border-zai-ivory/10 focus:border-zai-gold/50 text-zai-ivory placeholder:text-zai-ivory/20 font-body text-sm pb-3 outline-none transition-colors duration-500';

  const [sketch, fabric, pattern, craft, atelier] = processStories;

  return (
    <section className="relative min-h-screen bg-zai-black">
      {/* Background Ambient Radial Glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(232,221,208,0.04) 0%, transparent 70%)',
        }}
      />

      {/* ── 1. Hero ────────────────────────────────────────── */}
      <div className="relative min-h-[60vh] md:min-h-[80vh] w-full overflow-hidden bg-black">
        <img
          src={zaiAssets.maison.heroDesktop}
          alt="ZAI Maison — Silhouette & Fashion"
          className="w-full h-full object-cover object-top"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={() => setView('home')}
          className="absolute top-6 left-6 md:top-10 md:left-10 text-xs tracking-editorial text-zai-ivory/60 hover:text-zai-ivory transition-colors duration-300 z-10"
        >
          ← WORLD
        </motion.button>
        <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-5xl md:text-7xl text-zai-ivory"
          >
            MAISON 001
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-3 text-sm tracking-editorial text-maison-linen/70 whitespace-pre-line"
          >
            {`AN IDEA BECOMES A LINE.\nA LINE BECOMES A SILHOUETTE.`}
          </motion.p>
        </div>
      </div>

      {/* ── 2. The Atelier / Process Section ──────────────── */}
      <div id="atelier" ref={atelierRef} className="scroll-mt-28 max-w-[1360px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
        {/* Section Intro */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={atelierInView ? 'visible' : 'hidden'}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <p className="text-xs tracking-editorial text-zai-gold/60 uppercase font-body mb-3">
            THE ATELIER
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-zai-ivory leading-tight">
            THE CRAFT OF SILHOUETTE
          </h2>
          <p className="mt-4 text-xs md:text-sm text-zai-ivory/60 font-body tracking-wide leading-relaxed">
            From first line to final form, each piece passes through a deliberate process of material, proportion and hand.
          </p>
        </motion.div>

        {/* ── Desktop Editorial Composition (Asymmetric 3-Row Architecture) ── */}
        <div className="hidden md:flex flex-col gap-6">
          {/* ROW 1: Large THE SKETCH (~60%) + THE FABRIC (~40%) */}
          <div className="grid grid-cols-12 gap-6 h-[480px] lg:h-[560px]">
            {/* The Sketch (60%) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={atelierInView ? 'visible' : 'hidden'}
              className="col-span-7 group relative overflow-hidden bg-[#070707] rounded-sm border border-zai-ivory/10"
            >
              <img
                src={sketch.src}
                alt={sketch.alt}
                loading="lazy"
                style={{ objectPosition: sketch.objectPosition }}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10 pointer-events-none">
                <span className="text-[10px] tracking-editorial text-zai-gold/80 uppercase font-body block mb-2">
                  {sketch.step}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl text-zai-ivory tracking-wide">
                  {sketch.title}
                </h3>
                <p className="text-xs lg:text-sm text-zai-ivory/70 font-body mt-2 max-w-md tracking-wide">
                  &ldquo;{sketch.quote}&rdquo;
                </p>
              </div>
            </motion.div>

            {/* The Fabric (40%) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={atelierInView ? 'visible' : 'hidden'}
              className="col-span-5 group relative overflow-hidden bg-[#070707] rounded-sm border border-zai-ivory/10"
            >
              <img
                src={fabric.src}
                alt={fabric.alt}
                loading="lazy"
                style={{ objectPosition: fabric.objectPosition }}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10 pointer-events-none">
                <span className="text-[10px] tracking-editorial text-zai-gold/80 uppercase font-body block mb-2">
                  {fabric.step}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl text-zai-ivory tracking-wide">
                  {fabric.title}
                </h3>
                <p className="text-xs lg:text-sm text-zai-ivory/70 font-body mt-2 max-w-xs tracking-wide">
                  &ldquo;{fabric.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          </div>

          {/* ROW 2: THE PATTERN (~40%) + Large THE CRAFT (~60%) */}
          <div className="grid grid-cols-12 gap-6 h-[480px] lg:h-[560px]">
            {/* The Pattern (40%) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={atelierInView ? 'visible' : 'hidden'}
              className="col-span-5 group relative overflow-hidden bg-[#070707] rounded-sm border border-zai-ivory/10"
            >
              <img
                src={pattern.src}
                alt={pattern.alt}
                loading="lazy"
                style={{ objectPosition: pattern.objectPosition }}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10 pointer-events-none">
                <span className="text-[10px] tracking-editorial text-zai-gold/80 uppercase font-body block mb-2">
                  {pattern.step}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl text-zai-ivory tracking-wide">
                  {pattern.title}
                </h3>
                <p className="text-xs lg:text-sm text-zai-ivory/70 font-body mt-2 max-w-xs tracking-wide">
                  &ldquo;{pattern.quote}&rdquo;
                </p>
              </div>
            </motion.div>

            {/* The Craft (60%) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={atelierInView ? 'visible' : 'hidden'}
              className="col-span-7 group relative overflow-hidden bg-[#070707] rounded-sm border border-zai-ivory/10"
            >
              <img
                src={craft.src}
                alt={craft.alt}
                loading="lazy"
                style={{ objectPosition: craft.objectPosition }}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10 pointer-events-none">
                <span className="text-[10px] tracking-editorial text-zai-gold/80 uppercase font-body block mb-2">
                  {craft.step}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl text-zai-ivory tracking-wide">
                  {craft.title}
                </h3>
                <p className="text-xs lg:text-sm text-zai-ivory/70 font-body mt-2 max-w-md tracking-wide">
                  &ldquo;{craft.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          </div>

          {/* ROW 3: Full-Width Visual Finale — THE ATELIER */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={atelierInView ? 'visible' : 'hidden'}
            className="w-full h-[460px] lg:h-[540px] group relative overflow-hidden bg-[#070707] rounded-sm border border-zai-ivory/10"
          >
            <img
              src={atelier.src}
              alt={atelier.alt}
              loading="lazy"
              style={{ objectPosition: atelier.objectPosition }}
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 z-10 pointer-events-none">
              <span className="text-[10px] tracking-editorial text-zai-gold/80 uppercase font-body block mb-2">
                {atelier.step}
              </span>
              <h3 className="font-display text-3xl lg:text-4xl text-zai-ivory tracking-wide">
                {atelier.title}
              </h3>
              <p className="text-xs lg:text-sm text-zai-ivory/70 font-body mt-2 max-w-lg tracking-wide">
                &ldquo;{atelier.quote}&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Mobile Layout (Dedicated Vertical Editorial Stack) ── */}
        <div className="flex flex-col gap-5 md:hidden">
          {processStories.map((item) => (
            <div
              key={item.id}
              className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-[#070707] border border-zai-ivory/10"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{ objectPosition: item.objectPosition }}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 pointer-events-none">
                <span className="text-[9px] tracking-editorial text-zai-gold/80 uppercase font-body block mb-1.5">
                  {item.step}
                </span>
                <h3 className="font-display text-2xl text-zai-ivory tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-zai-ivory/70 font-body mt-1.5 tracking-wide leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Private Access ──────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <div className="max-w-xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl md:text-5xl text-zai-ivory mb-4"
          >
            PRIVATE ACCESS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zai-ivory/40 text-sm mb-12"
          >
            Be among the first to enter ZAI Maison.
          </motion.p>

          <AnimatePresence mode="wait">
            {formState === 'form' ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-8 text-left"
              >
                <div>
                  <label className="sr-only" htmlFor="maison-name">Name</label>
                  <input id="maison-name" type="text" placeholder="NAME" required value={formData.name} onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className="sr-only" htmlFor="maison-email">Email</label>
                  <input id="maison-email" type="email" placeholder="EMAIL" required value={formData.email} onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className="sr-only" htmlFor="maison-whatsapp">WhatsApp</label>
                  <input id="maison-whatsapp" type="tel" placeholder="WHATSAPP" value={formData.whatsapp} onChange={(e) => setFormData((f) => ({ ...f, whatsapp: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className="sr-only" htmlFor="maison-country">Country</label>
                  <select
                    id="maison-country"
                    value={formData.country}
                    onChange={(e) => setFormData((f) => ({ ...f, country: e.target.value }))}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>COUNTRY</option>
                    <option value="kw">Kuwait</option>
                    <option value="ae">UAE</option>
                    <option value="sa">Saudi Arabia</option>
                    <option value="bh">Bahrain</option>
                    <option value="om">Oman</option>
                    <option value="qa">Qatar</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="sr-only" htmlFor="maison-style">Style Preferences</label>
                  <textarea id="maison-style" placeholder="STYLE PREFERENCES" rows={2} value={formData.style} onChange={(e) => setFormData((f) => ({ ...f, style: e.target.value }))} className={`${inputClass} resize-none`} />
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <span className="relative mt-0.5 flex-shrink-0">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData((f) => ({ ...f, consent: e.target.checked }))}
                      className="peer sr-only"
                    />
                    <span className="block w-4 h-4 border border-zai-ivory/20 transition-all duration-300 peer-checked:border-zai-gold/60 peer-checked:bg-zai-gold/10">
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-zai-gold">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </span>
                  </span>
                  <span className="text-xs text-zai-ivory/40 leading-relaxed group-hover:text-zai-ivory/60 transition-colors">
                    I agree to receive updates from ZAI Maison
                  </span>
                </label>

                <div className="pt-4">
                  <button type="submit" className="btn-gold w-full">
                    JOIN THE LIST
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="py-16"
              >
                <p className="font-display text-3xl md:text-4xl text-zai-ivory">
                  {"YOU ARE ON THE LIST"}{' '}<span className="text-gradient-gold">.</span>
                </p>
                <p className="mt-4 text-sm text-zai-ivory/40">
                  We will be in touch, {formData.name || 'dear one'}.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
