'use client';

import React, { useRef, useEffect } from 'react';

interface LuxuryPortraitVideoProps {
  src: string;
  posterDesktop: string;
  posterMobile?: string;
  className?: string;
  containerClassName?: string;
  preload?: 'auto' | 'metadata' | 'none';
  priority?: boolean;
}

/**
 * LuxuryPortraitVideo
 * Two-layer cinematic video presentation for portrait luxury footage:
 * - Background: duplicated video layer, object-fit cover, blurred (28px) & darkened (0.28 brightness), scaled 1.08
 * - Foreground: original video in full portrait composition, object-fit contain, centered, zero cropping
 */
export default function LuxuryPortraitVideo({
  src,
  posterDesktop,
  posterMobile,
  className = '',
  containerClassName = '',
  preload = 'metadata',
}: LuxuryPortraitVideoProps) {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = (v: HTMLVideoElement | null) => {
      if (!v) return;
      v.muted = true;
      v.defaultMuted = true;
      const promise = v.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay fallback to poster handled gracefully
        });
      }
    };

    playVideo(bgVideoRef.current);
    playVideo(fgVideoRef.current);
  }, []);

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#050505] flex items-center justify-center ${containerClassName}`}
    >
      {/* ── Background Layer: Ambient blurred cover fill ── */}
      <video
        ref={bgVideoRef}
        src={src}
        poster={posterDesktop}
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none filter blur-[28px] brightness-[0.28] scale-[1.08] transform-gpu"
      />

      {/* ── Foreground Layer: 100% uncropped original portrait composition ── */}
      <video
        ref={fgVideoRef}
        src={src}
        poster={posterDesktop}
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        className={`relative z-[2] max-h-full max-w-full w-auto h-full object-contain object-center pointer-events-none select-none ${className}`}
      />
    </div>
  );
}
