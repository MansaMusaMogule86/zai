'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useZaiStore, type ZaiView } from '@/lib/store';
import { zaiAssets } from '@/lib/assets';
import { ArrowRight } from 'lucide-react';
import LuxuryPortraitVideo from './LuxuryPortraitVideo';

// ── Curated Look Items Data ─────────────────────────────────

export interface LookProductItem {
  id: string;
  category: string;
  title: string;
  detail?: string;
  price?: string;
  buttonText: string;
  action: ZaiView;
}

export const lookProducts: LookProductItem[] = [
  {
    id: 'lashes',
    category: 'Lashes',
    title: 'Lash Extensions & Lift',
    detail: 'House of Zai Salon Treatment',
    buttonText: 'Book Treatment',
    action: 'house',
  },
  {
    id: 'eyes',
    category: 'Eyes',
    title: 'Precision Eyeliner',
    detail: 'Shade: Noir',
    price: '14 KWD',
    buttonText: 'View Eyeliner',
    action: 'beaute',
  },
  {
    id: 'complexion',
    category: 'Complexion',
    title: 'Beauty Booster Foundation',
    detail: 'Custom Shade Matching',
    buttonText: 'Find My Zai',
    action: 'mirror',
  },
  {
    id: 'lips',
    category: 'Lips',
    title: 'Velvet Matt Lipstick',
    detail: 'Shade: Desert Rose',
    price: '18 KWD',
    buttonText: 'View Lipstick',
    action: 'beaute',
  },
  {
    id: 'outfit',
    category: 'Maison',
    title: 'Sculpted Black Blazer',
    detail: 'Zai Maison Atelier',
    buttonText: 'Discover Maison',
    action: 'maison',
  },
];

export default function ShopTheLook() {
  const setView = useZaiStore((s) => s.setView);

  return (
    <section
      id="shop-the-look"
      className="relative w-full bg-zai-charcoal py-24 md:py-32"
      aria-label="Shop Zainab's Look"
    >
      {/* ── Heading Area ── */}
      <div className="text-center mb-12 md:mb-16 px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="block text-xs tracking-editorial text-zai-gold/50 mb-4 uppercase"
        >
          Curated Wardrobe & Beauty
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl text-zai-ivory"
        >
          SHOP ZAINAB&rsquo;S LOOK
        </motion.h2>
      </div>

      {/* ── Media Stage (Two-layer uncropped portrait video with blurred ambient background) ── */}
      <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="relative w-full h-[65vh] sm:h-[75vh] md:h-[82vh] overflow-hidden rounded-sm border border-zai-gold/15 shadow-2xl bg-[#050505]">
          <LuxuryPortraitVideo
            src={zaiAssets.zainab.shopTheLookVideo01}
            posterDesktop={zaiAssets.zainab.shopTheLook01}
            posterMobile={zaiAssets.zainab.shopTheLookMobile01}
            preload="metadata"
          />
        </div>

        {/* ── Editorial Products Strip Underneath Media ── */}
        <div className="mt-12 md:mt-16">
          <div className="flex items-center justify-between mb-6 px-1">
            <h3 className="text-xs tracking-editorial uppercase text-zai-gold/70 font-body">
              Pieces In This Look
            </h3>
            <span className="text-[11px] tracking-editorial text-zai-ivory/40 font-body">
              5 Key Elements
            </span>
          </div>

          {/* Grid of items underneath video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {lookProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => setView(item.action)}
                className="group cursor-pointer p-4 md:p-5 rounded-sm bg-zai-dark/80 border border-zai-ivory/5 hover:border-zai-gold/30 hover:bg-zai-dark transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] tracking-editorial text-zai-gold/60 uppercase font-body block mb-2">
                    {item.category}
                  </span>
                  <h4 className="font-display text-base text-zai-ivory leading-snug group-hover:text-zai-gold transition-colors duration-300">
                    {item.title}
                  </h4>
                  {item.detail && (
                    <p className="text-xs text-zai-ivory/50 mt-1 font-body">
                      {item.detail}
                    </p>
                  )}
                  {item.price && (
                    <p className="text-xs text-zai-gold font-body mt-1">
                      {item.price}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-zai-ivory/5 flex items-center justify-between text-[10px] tracking-editorial uppercase text-zai-ivory/70 group-hover:text-zai-gold transition-colors duration-300">
                  <span>{item.buttonText}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
