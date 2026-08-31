'use client';

import React, { useState, useCallback } from 'react';
import Image, { type ImageProps } from 'next/image';
import AssetPlaceholder from './AssetPlaceholder';

interface ZaiImageProps extends Omit<ImageProps, 'onError'> {
  filename?: string;
  brand?: 'zai' | 'beaute' | 'maison' | 'house';
  ratio?: string;
  description?: string;
  /** Called when the underlying <img> finishes loading successfully. */
  onImageLoad?: () => void;
  /** Called when the underlying <img> fails to load (before placeholder is shown). */
  onImageError?: () => void;
}

/**
 * Extracts the filename portion from a path string.
 * e.g. "/assets/zai/01_zainab/hero/zainab_hero_dark_desktop_01.webp"
 *  → "zainab_hero_dark_desktop_01.webp"
 */
export function extractFilename(src: string): string {
  const parts = src.split('/');
  return parts[parts.length - 1] ?? src;
}

export default function ZaiImage({
  src,
  filename,
  brand = 'zai',
  ratio,
  description,
  className,
  alt,
  onImageLoad,
  onImageError,
  ...rest
}: ZaiImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
    onImageError?.();
  }, [onImageError]);

  const handleLoad = useCallback(() => {
    onImageLoad?.();
  }, [onImageLoad]);

  if (hasError) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt ?? ''}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      unoptimized
      {...rest}
    />
  );
}
