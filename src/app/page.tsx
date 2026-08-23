'use client';

import { useZaiStore } from '@/lib/store';
import Navigation from '@/components/zai/Navigation';
import MobileNavigation from '@/components/zai/MobileNavigation';
import OpeningSequence from '@/components/zai/OpeningSequence';
import HeroSection from '@/components/zai/HeroSection';
import WorldPortals from '@/components/zai/WorldPortals';
import ShopTheLook from '@/components/zai/ShopTheLook';
import FounderSection from '@/components/zai/FounderSection';
import ZaiMirror from '@/components/zai/ZaiMirror';
import BeauteSection from '@/components/zai/BeauteSection';
import MaisonSection from '@/components/zai/MaisonSection';
import HouseSection from '@/components/zai/HouseSection';
import ZainabSection from '@/components/zai/ZainabSection';
import JournalSection from '@/components/zai/JournalSection';
import SearchOverlay from '@/components/zai/SearchOverlay';
import Footer from '@/components/zai/Footer';

export default function Home() {
  const view = useZaiStore((s) => s.view);
  const mobileNavOpen = useZaiStore((s) => s.mobileNavOpen);

  return (
    <div className="min-h-screen flex flex-col bg-zai-black">
      {/* Desktop Navigation */}
      <Navigation />

      {/* Mobile Navigation Overlay */}
      <MobileNavigation />

      {/* Opening Cinematic Sequence */}
      <OpeningSequence />

      {/* Search Overlay */}
      <SearchOverlay />

      {/* Main Content */}
      <main className="flex-1">
        {view === 'mirror' ? (
          <ZaiMirror />
        ) : view === 'beaute' ? (
          <BeauteSection />
        ) : view === 'maison' ? (
          <MaisonSection />
        ) : view === 'house' ? (
          <HouseSection />
        ) : view === 'zainab' ? (
          <ZainabSection />
        ) : view === 'journal' ? (
          <JournalSection />
        ) : view === 'shop-the-look' ? (
          <ShopTheLook />
        ) : (
          <>
            <HeroSection />
            <ShopTheLook />
            <WorldPortals />
            <FounderSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
