// ═══════════════════════════════════════════════════════════════
// ZAI CENTRALIZED ASSET MANIFEST
//
// CRITICAL BRAND ISOLATION RULES:
// ─────────────────────────────────────────────────────────────
// Each brand (WORLD / BEAUTÉ / MAISON / HOUSE / ZAINAB) owns
// its hero assets EXCLUSIVELY. Assignments are deterministic —
// never derived from a shared array, index, or fallback.
//
// HOUSE hero = /images/zai/house/treatments/HOUSE_OF_ZAI_RITUAL_01.webp
//
// BEAUTÉ hero = /images/zai/beaute/hero/ZAI_BEAUTE_HERO_CAMPAIGN_DESKTOP_01.webp
// MAISON hero = /images/zai/maison/editorial/ZAINAB_FASHION_FULLBODY_01.webp
// WORLD hero  = /images/zai/hero/desktop/ZAINAB_HERO_DARK_DESKTOP_01.webp
//
// Every path in this manifest MUST resolve to a real file inside /public.
// Run `npm run check:assets` (scripts/check-assets.mjs) after editing.
// ═══════════════════════════════════════════════════════════════

export const zaiAssets = {
  // ── ZAINAB ──────────────────────────────────────────────
  zainab: {
    heroDesktop: `/images/zai/hero/desktop/ZAINAB_HERO_DARK_DESKTOP_01.webp`,
    heroMobile: `/images/zai/hero/mobile/ZAINAB_HERO_DARK_MOBILE_01.webp`,
    heroVideo: `/images/zai/hero/video/ZAINAB_HERO_VIDEO_01.mp4`,
    beautyCloseup01: `/images/zai/beaute/products/ZAINAB_BEAUTY_CLOSEUP_01.webp`,
    shopTheLook01: `/images/zai/beaute/campaigns/ZAINAB_SHOP_THE_LOOK_DESKTOP_01.webp`,
    shopTheLookMobile01: `/images/zai/beaute/campaigns/ZAINAB_SHOP_THE_LOOK_MOBILE_01.webp`,
    shopTheLookVideo01: `/images/zai/beaute/video/ZAINAB_SHOP_THE_LOOK_01.mp4`,
    fashionFullbody01: `/images/zai/maison/editorial/ZAINAB_FASHION_FULLBODY_01.webp`,
    founderPortrait01: `/images/zai/founder/portraits/ZAINAB_AL_ALWAN_FOUNDER_01.webp`,
    founderWide01: `/images/zai/founder/wide/ZAINAB_FOUNDER_WIDE_01.webp`,
    // ── Editorial trio — FounderSection + Journal ──────────
    editorialPortrait01: `/images/zai/maison/editorial/zai_maison_black_coat_editorial_desktop.webp`,
    editorialPortrait02: `/images/zai/hero/desktop/ZAINAB_HERO_DARK_DESKTOP_01.webp`,
    editorialWide01: `/images/zai/founder/wide/ZAINAB_FOUNDER_WIDE_01.webp`,
  },

  // ── ZAI BEAUTÉ ─────────────────────────────────────────
  beaute: {
    logoPrimary: `/images/zai/beaute/logos/ZAI_BEAUTE_LOGO_3D_TRANSPARENT_01.png`,
    heroDesktop: `/images/zai/beaute/hero/ZAI_BEAUTE_HERO_CAMPAIGN_DESKTOP_01.webp`,
    heroMobile: `/images/zai/beaute/hero/ZAI_BEAUTE_HERO_CAMPAIGN_MOBILE_01.webp`,
    campaignCloseup01: `/images/zai/beaute/products/ZAINAB_BEAUTY_CLOSEUP_01.webp`,
    productFoundation: `/images/zai/beaute/products/ZAI_BEAUTE_BEAUTY_BOOSTER_FOUNDATION_N00_01.webp`,
    productLipstick: `/images/zai/beaute/products/ZAI_BEAUTE_VELVET_MATT_LIPSTICK_PARIS_01.webp`,
    productHighlighter: `/images/zai/beaute/products/ZAI_BEAUTE_GLOZE_HIGHLIGHTER_01.webp`,
    productMascara: `/images/zai/beaute/products/ZAI_BEAUTE_LASH_BOOSTER_MASCARA_N01_01.webp`,
    productEyeliner: `/images/zai/beaute/products/ZAI_BEAUTE_FASTLINE_LIQUID_EYELINER_N01_01.webp`,
    productSunMist: `/images/zai/beaute/products/ZAI_BEAUTE_ILLUMINATE_SHIELD_SUN_MIST_01.webp`,
    productBlushBronzer: `/images/zai/beaute/products/ZAI_BEAUTE_BLUSH_BRONZER_DUO_N01_SUNSET_01.webp`,
    productBodyOil: `/images/zai/beaute/products/ZAI_BEAUTE_BRONZE_BODY_OIL_01.webp`,
    productLipOil: `/images/zai/beaute/products/ZAI_BEAUTE_COLOR_BLOOM_PH_REACTOR_LIP_OIL_01.webp`,
    productVelvetVeil: `/images/zai/beaute/products/ZAI_BEAUTE_VELVET_VEIL_N04_BERRY_MOOD_01.webp`,
    // ── Product grid fallback (used by BeauteSection.getProductImage) ──
    productGroup01: `/images/zai/beaute/products/ZAI_BEAUTE_BEAUTY_BOOSTER_FOUNDATION_N00_01.webp`,
    look01: `/images/zai/beaute/campaigns/ZAINAB_SHOP_THE_LOOK_DESKTOP_01.webp`,
    look02: `/images/zai/beaute/campaigns/ZAINAB_SHOP_THE_LOOK_MOBILE_01.webp`,
  },

  // ── ZAI MAISON ──────────────────────────────────────────
  maison: {
    fashionFullbody01: `/images/zai/maison/editorial/ZAINAB_FASHION_FULLBODY_01.webp`,
    heroDesktop: `/images/zai/maison/editorial/zai_maison_black_coat_editorial_desktop.webp`,
    heroMobile: `/images/zai/maison/editorial/zai_maison_black_coat_editorial_desktop.webp`,
    campaign01: `/images/zai/maison/editorial/zai_maison_black_coat_editorial_desktop.webp`,
    atelierHero01: `/images/zai/maison/atelier/ZAI_MAISON_PROCESS_ATELIER_01.webp`,
    moodboard01: `/images/zai/maison/sketches/ZAI_MAISON_PROCESS_SKETCH_01.webp`,
    patternStudio01: `/images/zai/maison/patterns/ZAI_MAISON_PROCESS_PATTERN_01.webp`,
    craft01: `/images/zai/maison/atelier/ZAI_MAISON_PROCESS_CRAFT_01.webp`,
    process: {
      sketch: `/images/zai/maison/sketches/ZAI_MAISON_PROCESS_SKETCH_01.webp`,
      fabric: `/images/zai/maison/fabrics/ZAI_MAISON_PROCESS_FABRIC_01.webp`,
      pattern: `/images/zai/maison/patterns/ZAI_MAISON_PROCESS_PATTERN_01.webp`,
      craft: `/images/zai/maison/atelier/ZAI_MAISON_PROCESS_CRAFT_01.webp`,
      atelier: `/images/zai/maison/atelier/ZAI_MAISON_PROCESS_ATELIER_01.webp`,
    },
    atelier01: `/images/zai/maison/atelier/ZAI_MAISON_PROCESS_ATELIER_01.webp`,
    atelier02: `/images/zai/maison/atelier/ZAI_MAISON_PROCESS_CRAFT_01.webp`,
    sketch01: `/images/zai/maison/sketches/ZAI_MAISON_PROCESS_SKETCH_01.webp`,
    fabric01: `/images/zai/maison/fabrics/ZAI_MAISON_PROCESS_FABRIC_01.webp`,
    pattern01: `/images/zai/maison/patterns/ZAI_MAISON_PROCESS_PATTERN_01.webp`,
  },

  // ── HOUSE OF ZAI ────────────────────────────────────────
  house: {
    ritual01: `/images/zai/house/treatments/HOUSE_OF_ZAI_RITUAL_01.webp`,
    portalCard01: `/images/zai/house/hero/HOUSE_OF_ZAI_BEAUTY_01.webp`,
    heroDesktop: `/images/zai/house/treatments/HOUSE_OF_ZAI_RITUAL_01.webp`,
    heroMobile: `/images/zai/house/treatments/HOUSE_OF_ZAI_RITUAL_01.webp`,
    // ── HOUSE SERVICE RESULT IMAGES ──
    brows01: `/images/zai/house/brows/HOUSE_OF_ZAI_BROWS_01.webp`,
    lips01: `/images/zai/house/lips/HOUSE_OF_ZAI_LIPS_01.webp`,
    lashes01: `/images/zai/house/lashes/HOUSE_OF_ZAI_LASHES_01.webp`,
    lashes02: `/images/zai/house/lashes/HOUSE_OF_ZAI_LASH_LIFT_01.webp`,
    nails01: `/images/zai/house/nails/HOUSE_OF_ZAI_NAILS_01.webp`,
    // ── HOUSE SALON INTERIOR ──
    interior01: `/images/zai/house/hero/house_of_zai_beauty_services_hero_desktop.webp`,
  },
} as const;

export type AssetKey = typeof zaiAssets;
