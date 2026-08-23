'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useZaiStore } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';
import ZaiImage from './ZaiImage';

const atelierSequence = [
  { src: zaiAssets.maison.sketch01, label: 'THE SKETCH' },
  { src: zaiAssets.maison.fabric01, label: 'THE FABRIC' },
  { src: zaiAssets.maison.pattern01, label: 'THE PATTERN' },
  { src: zaiAssets.maison.atelier01, label: 'THE ATELIER' },
  { src: zaiAssets.maison.atelier02, label: 'THE CRAFT' },
  { src: zaiAssets.maison.garment01, label: 'THE PIECE' },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
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

  return (
    <section className="relative min-h-screen bg-zai-black">
      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(232,221,208,0.05) 0%, transparent 70%)' }}
      />

      {/* Hero */}
      <div className="relative min-h-[60vh] md:min-h-[80vh] w-full overflow-hidden">
        <ZaiImage src={zaiAssets.maison.heroDesktop} alt="ZAI Maison Hero" brand="maison" fill className="object-cover" priority />
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

      {/* Atelier */}
      <div ref={atelierRef} className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={atelierInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-editorial text-zai-gold/50 mb-12"
        >
          THE ATELIER
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={atelierInView ? 'visible' : 'hidden'}
          className="hidden md:grid md:grid-cols-3 gap-4"
        >
          {atelierSequence.map((item, i) => (
            <motion.div key={item.label} custom={i} variants={fadeUp} className="relative aspect-[4/5] overflow-hidden group">
              <ZaiImage src={item.src} alt={item.label} brand="maison" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-xs tracking-editorial text-maison-linen/70">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div
          className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {atelierSequence.map((item, i) => (
            <motion.div key={item.label} custom={i} variants={fadeUp} initial="hidden" animate={atelierInView ? 'visible' : 'hidden'} className="relative flex-shrink-0 w-[75vw] aspect-[4/5] overflow-hidden snap-center">
              <ZaiImage src={item.src} alt={item.label} brand="maison" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-xs tracking-editorial text-maison-linen/70">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Private Access */}
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

      {/* Campaign */}
      <div ref={campaignRef} className="px-6 md:px-12 lg:px-24 pb-24 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={campaignInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-editorial text-zai-gold/50 mb-8"
        >
          THE CAMPAIGN
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={campaignInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden"
        >
          <div className="relative aspect-[4/5] md:aspect-video w-full">
            <ZaiImage src={zaiAssets.maison.campaign01} alt="ZAI Maison Campaign" brand="maison" fill className="object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
