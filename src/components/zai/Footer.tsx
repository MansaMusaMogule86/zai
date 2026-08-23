'use client';

import { useZaiStore } from '@/lib/store';

export default function Footer() {
  const setView = useZaiStore((s) => s.setView);

  return (
    <footer className="w-full bg-zai-dark border-t border-zai-ivory/5 py-12 md:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Col 1: Brand */}
          <div>
            <p className="font-display text-2xl tracking-luxe text-zai-ivory">ZAI</p>
            <p className="text-[10px] tracking-editorial text-zai-ivory/30 mt-2">
              THE WORLD OF ZAI
            </p>
            <p className="text-[10px] tracking-editorial text-zai-ivory/20 mt-1">
              Beauty. Fashion. Ritual.
            </p>
          </div>

          {/* Col 2: Explore */}
          <div>
            <p className="text-[10px] tracking-luxe text-zai-gold/50 mb-4">
              EXPLORE
            </p>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation - Explore">
              <FooterLink onClick={() => setView('beaute')}>Beauté</FooterLink>
              <FooterLink onClick={() => setView('maison')}>Maison</FooterLink>
              <FooterLink onClick={() => setView('house')}>House</FooterLink>
              <FooterLink onClick={() => setView('zainab')}>Zainab</FooterLink>
              <FooterLink onClick={() => setView('journal')}>Journal</FooterLink>
            </nav>
          </div>

          {/* Col 3: Connect */}
          <div>
            <p className="text-[10px] tracking-luxe text-zai-gold/50 mb-4">
              CONNECT
            </p>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation - Connect">
              <FooterLink href="https://instagram.com" external>Instagram</FooterLink>
              <FooterLink href="https://tiktok.com" external>TikTok</FooterLink>
              <FooterLink href="mailto:hello@zai.world">Contact</FooterLink>
            </nav>
          </div>

          {/* Col 4: Legal */}
          <div>
            <p className="text-[10px] tracking-luxe text-zai-gold/50 mb-4">
              LEGAL
            </p>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation - Legal">
              <FooterLink href="#">Privacy</FooterLink>
              <FooterLink href="#">Terms</FooterLink>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold my-10" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[10px] tracking-editorial text-zai-ivory/15">
            PRIVATE DIGITAL CONCEPT
          </p>
          <p className="text-[10px] tracking-editorial text-zai-ivory/15">
            © 2025 ZAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  children,
  onClick,
  href,
  external,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="text-sm text-zai-ivory/40 hover:text-zai-ivory/80 transition-colors duration-300 text-left"
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-sm text-zai-ivory/40 hover:text-zai-ivory/80 transition-colors duration-300"
    >
      {children}
    </a>
  );
}
