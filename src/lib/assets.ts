// ═══════════════════════════════════════════════════════════════
// ZAI CENTRALIZED ASSET MANIFEST
//
// CRITICAL BRAND ISOLATION RULES:
// ─────────────────────────────────────────────────────────────
// Each brand (WORLD / BEAUTÉ / MAISON / HOUSE / ZAINAB) owns
// its hero assets EXCLUSIVELY. Assignments are deterministic —
// never derived from a shared array, index, or fallback.
//
// HOUSE hero = /images/zai/beaute/products/ZAINAB_BEAUTY_CLOSEUP_01.webp
//   ↑ This is the APPROVED canonical House page hero.
//   ↑ Do NOT change this assignment without explicit instruction.
//   ↑ The Beauté product migration MUST NOT affect this path.
//   ↑ Do NOT inherit from World, Maison, or Founder assets.
//
// BEAUTÉ hero = /images/zai/beaute/hero/ZAI_BEAUTE_HERO_CAMPAIGN_DESKTOP_01.webp
// MAISON hero = /images/zai/maison/editorial/ZAINAB_FASHION_FULLBODY_01.webp
// WORLD hero  = /images/zai/hero/desktop/ZAINAB_HERO_DARK_DESKTOP_01.webp
// ═══════════════════════════════════════════════════════════════

export const BASE = "/assets/zai";

export const zaiAssets = {
  // ── ZAINAB ──────────────────────────────────────────────
  zainab: {
    heroDesktop: `/images/zai/hero/desktop/ZAINAB_HERO_DARK_DESKTOP_01.webp`,
    heroMobile: `/images/zai/hero/mobile/ZAINAB_HERO_DARK_MOBILE_01.webp`,
    heroVideo: `/images/zai/hero/video/ZAINAB_HERO_VIDEO_01.mp4`,
    beautyCloseup01: `/images/zai/beaute/products/ZAINAB_BEAUTY_CLOSEUP_01.webp`,
    beautyCloseup02: `${BASE}/01_zainab/beauty/zainab_beauty_closeup_02.webp`,
    shopTheLook01: `/images/zai/beaute/campaigns/ZAINAB_SHOP_THE_LOOK_DESKTOP_01.webp`,
    shopTheLookMobile01: `/images/zai/beaute/campaigns/ZAINAB_SHOP_THE_LOOK_MOBILE_01.webp`,
    shopTheLookVideo01: `/images/zai/beaute/video/ZAINAB_SHOP_THE_LOOK_01.mp4`,
    fashionFullbody01: `/images/zai/maison/editorial/ZAINAB_FASHION_FULLBODY_01.webp`,
    fashionWide01: `${BASE}/01_zainab/fashion/zainab_fashion_wide_01.webp`,
    founderPortrait01: `/images/zai/founder/portraits/ZAINAB_AL_ALWAN_FOUNDER_01.webp`,
    founderWide01: `/images/zai/founder/wide/ZAINAB_FOUNDER_WIDE_01.webp`,
    editorialPortrait01: `${BASE}/01_zainab/portraits/zainab_editorial_portrait_01.webp`,
    editorialPortrait02: `${BASE}/01_zainab/portraits/zainab_editorial_portrait_02.webp`,
    editorialWide01: `${BASE}/01_zainab/portraits/zainab_editorial_wide_01.webp`,
  },

  // ── ZAI BEAUTÉ ─────────────────────────────────────────
  beaute: {
    logoPrimary: `/images/zai/beaute/logos/ZAI_BEAUTE_LOGO_3D_TRANSPARENT_01.png`,
    heroDesktop: `/images/zai/beaute/hero/ZAI_BEAUTE_HERO_CAMPAIGN_DESKTOP_01.webp`,
    heroMobile: `/images/zai/beaute/hero/ZAI_BEAUTE_HERO_CAMPAIGN_MOBILE_01.webp`,
    campaignCloseup01: `/images/zai/beaute/products/ZAINAB_BEAUTY_CLOSEUP_01.webp`,
    campaignCloseup02: `${BASE}/02_zai_beaute/campaigns/zai_beaute_campaign_closeup_02.webp`,
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
    productGroup01: `${BASE}/02_zai_beaute/products/zai_beaute_product_group_01.webp`,
    swatchesFoundation: `${BASE}/02_zai_beaute/swatches/zai_beaute_foundation_swatches_01.webp`,
    swatchesLip: `${BASE}/02_zai_beaute/swatches/zai_beaute_lip_swatches_01.webp`,
    textureFoundation: `${BASE}/02_zai_beaute/textures/zai_beaute_texture_foundation_01.webp`,
    textureLip: `${BASE}/02_zai_beaute/textures/zai_beaute_texture_lip_01.webp`,
    look01: `/images/zai/beaute/campaigns/ZAINAB_SHOP_THE_LOOK_DESKTOP_01.webp`,
    look02: `/images/zai/beaute/campaigns/ZAINAB_SHOP_THE_LOOK_MOBILE_01.webp`,
  },

  // ── ZAI MAISON ──────────────────────────────────────────
  maison: {
    logoPrimary: `${BASE}/03_zai_maison/logos/zai_maison_logo_primary.webp`,
    fashionFullbody01: `/images/zai/maison/editorial/ZAINAB_FASHION_FULLBODY_01.webp`,
    heroDesktop: `/images/zai/maison/editorial/ZAINAB_FASHION_FULLBODY_01.webp`,
    heroMobile: `/images/zai/maison/editorial/ZAINAB_FASHION_FULLBODY_01.webp`,
    atelierHero01: `/images/zai/maison/ZAI_MAISON_ATELIER_HERO_01.webp`,
    moodboard01: `/images/zai/maison/ZAI_MAISON_MOODBOARD_01.webp`,
    patternStudio01: `/images/zai/maison/ZAI_MAISON_PATTERN_STUDIO_01.webp`,
    craft01: `/images/zai/maison/ZAI_MAISON_CRAFT_01.webp`,
    process: {
      sketch: `/images/zai/maison/sketches/ZAI_MAISON_PROCESS_SKETCH_01.webp`,
      fabric: `/images/zai/maison/fabrics/ZAI_MAISON_PROCESS_FABRIC_01.webp`,
      pattern: `/images/zai/maison/patterns/ZAI_MAISON_PROCESS_PATTERN_01.webp`,
      craft: `/images/zai/maison/atelier/ZAI_MAISON_PROCESS_CRAFT_01.webp`,
      atelier: `/images/zai/maison/atelier/ZAI_MAISON_PROCESS_ATELIER_01.webp`,
    },
    atelier01: `${BASE}/03_zai_maison/atelier/zai_maison_atelier_01.webp`,
    atelier02: `${BASE}/03_zai_maison/atelier/zai_maison_atelier_02.webp`,
    sketch01: `${BASE}/03_zai_maison/sketches/zai_maison_sketch_01.webp`,
    sketch02: `${BASE}/03_zai_maison/sketches/zai_maison_sketch_02.webp`,
    fabric01: `${BASE}/03_zai_maison/fabrics/zai_maison_fabric_01.webp`,
    fabric02: `${BASE}/03_zai_maison/fabrics/zai_maison_fabric_02.webp`,
    pattern01: `${BASE}/03_zai_maison/patterns/zai_maison_pattern_01.webp`,
    garment01: `${BASE}/03_zai_maison/garments/zai_maison_garment_01.webp`,
    garment02: `${BASE}/03_zai_maison/garments/zai_maison_garment_02.webp`,
    campaign01: `${BASE}/03_zai_maison/campaigns/zai_maison_campaign_01.webp`,
    campaignWide01: `${BASE}/03_zai_maison/campaigns/zai_maison_campaign_wide_01.webp`,
  },

  // ── HOUSE OF ZAI ────────────────────────────────────────
  // ⚠️  ASSET LOCK: heroDesktop/heroMobile must ALWAYS point to
  //     /images/zai/beaute/products/ZAINAB_BEAUTY_CLOSEUP_01.webp
  //     Do NOT change without explicit instruction.
  //     Do NOT derive from shared arrays, indexes, or fallbacks.
  //     Beauté product migrations must never affect this value.
  house: {
    logoPrimary: `${BASE}/04_house_of_zai/logos/house_of_zai_logo_primary.webp`,
    // ── HOUSE SALON COMPOSITE — beauty services editorial image
    ritual01: `/images/zai/house/HOUSE_OF_ZAI_RITUAL_01.webp`,
    // ── HOUSE PORTAL CARD — World page "HOUSE" card image
    portalCard01: `/images/zai/house/hero/HOUSE_OF_ZAI_BEAUTY_01.webp`,
    // ── LOCKED HOUSE HERO — approved Zainab beauty closeup ──
    heroDesktop: `/images/zai/beaute/products/ZAINAB_BEAUTY_CLOSEUP_01.webp`,
    heroMobile: `/images/zai/beaute/products/ZAINAB_BEAUTY_CLOSEUP_01.webp`,
    // ── HOUSE SERVICE RESULT IMAGES — Bahrain salon content ──
    brows01: `/images/zai/house/HOUSE_OF_ZAI_BROWS_01.webp`,
    lips01: `/images/zai/house/HOUSE_OF_ZAI_LIPS_01.webp`,
    lashes01: `/images/zai/house/HOUSE_OF_ZAI_LASHES_01.webp`,
    lashes02: `/images/zai/house/HOUSE_OF_ZAI_LASH_LIFT_01.webp`,
    nails01: `/images/zai/house/HOUSE_OF_ZAI_NAILS_01.webp`,
    interior01: `${BASE}/04_house_of_zai/interior/house_of_zai_interior_01.webp`,
    interior02: `${BASE}/04_house_of_zai/interior/house_of_zai_interior_02.webp`,
    nails02: `${BASE}/04_house_of_zai/nails/house_of_zai_nails_02.webp`,
    treatment01: `${BASE}/04_house_of_zai/treatments/house_of_zai_treatment_01.webp`,
    treatment02: `${BASE}/04_house_of_zai/treatments/house_of_zai_treatment_02.webp`,
    team01: `${BASE}/04_house_of_zai/team/house_of_zai_team_01.webp`,
    before01: `${BASE}/04_house_of_zai/before_after/house_of_zai_before_01.webp`,
    after01: `${BASE}/04_house_of_zai/before_after/house_of_zai_after_01.webp`,
  },
} as const;

export type AssetKey = typeof zaiAssets;
