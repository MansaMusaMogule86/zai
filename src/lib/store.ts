import { create } from "zustand";

export type ZaiView =
  | "home"
  | "beaute"
  | "maison"
  | "house"
  | "zainab"
  | "journal"
  | "search"
  | "mirror"
  | "shop-the-look";

interface ZaiState {
  // Navigation
  view: ZaiView;
  setView: (v: ZaiView) => void;
  prevView: ZaiView;

  // Opening
  hasSeenOpening: boolean;
  setHasSeenOpening: (v: boolean) => void;

  // Beauté Intro
  hasSeenBeauteIntro: boolean;
  setHasSeenBeauteIntro: (v: boolean) => void;

  // World Landing Entry (Cinematic hero mode vs normal navigation mode)
  hasEnteredWorld: boolean;
  setHasEnteredWorld: (v: boolean) => void;

  // Mobile nav
  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;

  // Search
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;

  // Mirror
  mirrorStep: number;
  setMirrorStep: (s: number) => void;
  mirrorAnswers: Record<string, string>;
  setMirrorAnswer: (q: string, a: string) => void;
  mirrorResult: MirrorResult | null;
  setMirrorResult: (r: MirrorResult | null) => void;

  // Shop the Look
  activeHotspot: string | null;
  setActiveHotspot: (h: string | null) => void;

  // House booking
  bookingStep: number;
  setBookingStep: (s: number) => void;
}

export interface MirrorResult {
  foundation: { name: string; shade: string };
  lip: { name: string; shade: string };
  highlighter: { name: string; shade: string };
  eye: { name: string; shade: string };
  routine: string[];
}

export const useZaiStore = create<ZaiState>((set) => ({
  view: "home",
  setView: (v) =>
    set((s) => ({ prevView: s.view, view: v })),
  prevView: "home",

  hasSeenOpening: false,
  setHasSeenOpening: (v) => set({ hasSeenOpening: v }),

  hasSeenBeauteIntro: false,
  setHasSeenBeauteIntro: (v) => set({ hasSeenBeauteIntro: v }),

  hasEnteredWorld: false,
  setHasEnteredWorld: (v) => {
    if (typeof window !== 'undefined' && v) {
      try {
        sessionStorage.setItem('zai_has_entered_world', 'true');
      } catch {}
    }
    set({ hasEnteredWorld: v });
  },

  mobileNavOpen: false,
  setMobileNavOpen: (v) => set({ mobileNavOpen: v }),

  searchOpen: false,
  setSearchOpen: (v) => set({ searchOpen: v }),

  mirrorStep: 0,
  setMirrorStep: (s) => set({ mirrorStep: s }),
  mirrorAnswers: {},
  setMirrorAnswer: (q, a) =>
    set((s) => ({ mirrorAnswers: { ...s.mirrorAnswers, [q]: a } })),
  mirrorResult: null,
  setMirrorResult: (r) => set({ mirrorResult: r }),

  activeHotspot: null,
  setActiveHotspot: (h) => set({ activeHotspot: h }),

  bookingStep: 0,
  setBookingStep: (s) => set({ bookingStep: s }),
}));
