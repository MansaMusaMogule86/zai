'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useZaiStore, ZaiView } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const universe: { number: string; view: ZaiView; name: string; subtitle: string }[] = [
  { number: '01', view: 'beaute', name: 'ZAI BEAUTÉ', subtitle: 'The Art of Beauty' },
  { number: '02', view: 'maison', name: 'ZAI MAISON', subtitle: 'The Art of Dressing' },
  { number: '03', view: 'house', name: 'HOUSE OF ZAI', subtitle: 'The Art of Experience' },
];

export default function HeroSection() {
  const { setView, setHasEnteredWorld } = useZaiStore();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const animate = isInView ? 'visible' : 'hidden';

  const handleEnterWorld = () => {
    setHasEnteredWorld(true);
    document.getElementById('world-portals')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative w-full bg-zai-black pt-20 lg:grid lg:min-h-screen lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:overflow-hidden lg:pb-16"
      aria-label="Hero"
    >
      {/* Video — full-width on mobile, contained on desktop; centre column on lg */}
      <div className="w-full flex justify-center md:px-8 lg:relative lg:isolate lg:col-start-2 lg:row-start-1 lg:px-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-12%] inset-y-[-6%] -z-10 hidden bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.14),transparent_65%)] lg:block"
        />
        <video
          src={zaiAssets.zainab.heroVideo}
          poster={zaiAssets.zainab.heroDesktop}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-auto object-cover md:w-auto md:h-[80vh] md:max-w-full md:object-contain rounded-none md:rounded-sm lg:h-[min(80vh,calc(100svh-9rem))]"
        />
      </div>

      {/* Editorial text — centred below the video on mobile; left column on lg */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={animate}
        className="flex flex-col items-center text-center gap-5 md:gap-6 px-6 py-12 md:py-16 lg:col-start-1 lg:row-start-1 lg:items-start lg:justify-self-end lg:gap-7 lg:px-0 lg:py-0 lg:pr-10 lg:text-left xl:pr-16"
      >
        <motion.p
          variants={item}
          className="text-xs tracking-editorial text-zai-gold/50 font-body uppercase lg:text-zai-gold"
        >
          THE WORLD OF ZAI
        </motion.p>

        <motion.div variants={item} className="w-12 lg:w-28">
          <div className="divider-gold lg:origin-left lg:animate-[growLine_1.6s_ease-out_0.3s_both]" />
        </motion.div>

        <div className="flex flex-col gap-1 lg:gap-2">
          {['BEAUTY.', 'FASHION.', 'RITUAL.'].map((word) => (
            <motion.h2
              key={word}
              variants={item}
              className="font-display text-5xl xl:text-6xl 2xl:text-7xl text-zai-ivory tracking-wide leading-[1.1]"
            >
              {word}
            </motion.h2>
          ))}
        </div>

        <motion.p
          variants={item}
          className="hidden text-base text-zai-ivory/70 font-body italic lg:block"
        >
          One Vision. Three Expressions.
        </motion.p>

        <motion.p
          variants={item}
          className="text-sm text-zai-ivory/50 font-body mt-2 lg:mt-0"
        >
          Created by Zainab Al Alwan
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap justify-center gap-4 mt-4 lg:mt-2 lg:justify-start">
          <button
            onClick={handleEnterWorld}
            className="btn-gold cursor-pointer"
          >
            ENTER THE WORLD
          </button>
          <button
            onClick={() => setView('mirror')}
            className="btn-luxury cursor-pointer"
          >
            FIND MY ZAI
          </button>
        </motion.div>
      </motion.div>

      {/* Desktop only: explore the ZAI universe */}
      <motion.nav
        aria-label="Explore the ZAI universe"
        variants={container}
        initial="hidden"
        animate={animate}
        className="hidden lg:col-start-3 lg:row-start-1 lg:block lg:justify-self-start lg:pl-10 xl:pl-16 lg:w-full lg:max-w-md"
      >
        <motion.p variants={item} className="text-xs tracking-editorial text-zai-gold font-body uppercase">
          EXPLORE THE UNIVERSE
        </motion.p>

        <ul className="mt-8 border-t border-zai-gold/15">
          {universe.map(({ number, view, name, subtitle }) => (
            <motion.li key={view} variants={item} className="border-b border-zai-gold/15">
              <button
                type="button"
                onClick={() => setView(view)}
                className="group relative flex w-full cursor-pointer items-center gap-6 py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zai-gold focus-visible:ring-offset-4 focus-visible:ring-offset-zai-black"
              >
                <span className="font-display text-sm tracking-editorial text-zai-gold">{number}</span>

                <span className="flex-1">
                  <span className="block font-display text-2xl xl:text-3xl uppercase tracking-[0.12em] text-zai-ivory transition-transform duration-500 ease-out group-hover:translate-x-2">
                    {name}
                  </span>
                  <span className="mt-2 block text-sm text-zai-ivory/50 font-body transition-transform duration-500 ease-out group-hover:translate-x-2">
                    {subtitle}
                  </span>
                </span>

                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="h-5 w-5 text-zai-gold transition-transform duration-500 ease-out group-hover:translate-x-1"
                />

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-zai-gold transition-transform duration-700 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* Desktop only: scroll discovery cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-1/2 hidden h-8 w-px -translate-x-1/2 overflow-hidden bg-zai-gold/15 motion-reduce:hidden lg:block"
      >
        <span className="block h-1/2 w-full bg-zai-gold animate-[scrollCue_2.4s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
