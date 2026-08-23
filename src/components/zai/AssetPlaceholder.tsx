'use client';

import React from 'react';

interface AssetPlaceholderProps {
  filename: string;
  ratio?: string;
  description?: string;
  brand?: 'zai' | 'beaute' | 'maison' | 'house';
  className?: string;
}

const brandThemes = {
  zai: {
    bg: 'bg-zai-charcoal',
    border: 'border-zai-gold/20',
    text: 'text-zai-ivory',
    muted: 'text-zai-sand/50',
    accent: 'text-zai-gold',
    icon: 'text-zai-gold/40',
  },
  beaute: {
    bg: 'bg-beaute-cobalt/20',
    border: 'border-beaute-chrome/15',
    text: 'text-beaute-chrome',
    muted: 'text-beaute-chrome/40',
    accent: 'text-beaute-chrome',
    icon: 'text-beaute-chrome/30',
  },
  maison: {
    bg: 'bg-maison-linen/10',
    border: 'border-maison-linen/15',
    text: 'text-zai-cream',
    muted: 'text-zai-cream/40',
    accent: 'text-zai-cream',
    icon: 'text-zai-cream/25',
  },
  house: {
    bg: 'bg-house-pearl/8',
    border: 'border-house-champagne/15',
    text: 'text-house-pearl',
    muted: 'text-house-pearl/40',
    accent: 'text-house-champagne',
    icon: 'text-house-champagne/25',
  },
} as const;

export default function AssetPlaceholder({
  filename,
  ratio,
  description,
  brand = 'zai',
  className = '',
}: AssetPlaceholderProps) {
  const theme = brandThemes[brand];

  const ratioPadding: Record<string, string> = {
    '16:9': 'pb-[56.25%]',
    '4:5': 'pb-[125%]',
    '1:1': 'pb-[100%]',
    '3:4': 'pb-[133.33%]',
    '9:16': 'pb-[177.78%]',
    '21:9': 'pb-[42.86%]',
  };

  const aspectClass = ratio ? ratioPadding[ratio] ?? '' : 'pb-[56.25%]';

  return (
    <div
      className={`relative ${className}`}
      role="img"
      aria-label={description ?? `Placeholder for ${filename}`}
    >
      <div className={`${aspectClass}`} />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 ${theme.bg} border ${theme.border} rounded-sm`}
      >
        {/* Diamond icon */}
        <svg
          className={`w-8 h-8 ${theme.icon}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2L2 12l10 10 10-10L12 2z" />
        </svg>

        {/* Filename */}
        <span
          className={`${theme.accent} font-body text-xs tracking-editorial uppercase text-center max-w-full break-all leading-relaxed`}
        >
          {filename}
        </span>

        {/* Ratio badge */}
        {ratio && (
          <span
            className={`${theme.muted} font-body text-[10px] tracking-editorial uppercase`}
          >
            {ratio}
          </span>
        )}

        {/* Description */}
        {description && (
          <span
            className={`${theme.muted} font-body text-[11px] text-center max-w-[80%] leading-relaxed`}
          >
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
