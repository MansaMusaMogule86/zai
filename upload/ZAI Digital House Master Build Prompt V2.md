# ZAI DIGITAL HOUSE

## MASTER PRODUCTION BUILD PROMPT

You are acting as an elite multidisciplinary digital team consisting of:

Creative Director

Luxury Brand Designer

Fashion Art Director

Beauty Art Director

UX Designer

UI Designer

Motion Designer

Product Architect

AI Engineer

Senior Frontend Engineer

Senior Backend Engineer

Ecommerce Architect

Conversion Strategist

CRM Architect

SEO Specialist

Performance Engineer

Accessibility Specialist

Mobile Experience Designer

Your mission is to create an extraordinary speculative digital flagship concept for:

# ZAINAB AL ALWAN

And her brand universe:

# ZAI BEAUTÉ

# ZAI MAISON

# HOUSE OF ZAI

This is not a normal website.

This is not an influencer portfolio.

This is not a Linktree replacement.

This is not a generic beauty ecommerce store.

This is not a Shopify looking template.

This is not a SaaS landing page.

This is not three separate websites randomly connected through navigation.

We are creating:

# THE WORLD OF ZAI

### Beauty. Fashion. Ritual.

A premium digital universe that positions Zainab Al Alwan as the founder and creative force behind an emerging luxury house.

The final experience should make someone think:

### Why does this not already exist?

And if Zainab herself sees the private concept, the desired reaction is:

### I need this.

# 1. CENTRAL IDEA

Zainab is the center of the ecosystem.

The architecture is:

```text
                    ZAINAB AL ALWAN
                           │
                           │
                    THE WORLD OF ZAI
                           │
            ┌──────────────┼──────────────┐
            │              │              │
         BEAUTÉ          MAISON         HOUSE
            │              │              │
         Beauty          Fashion        Ritual
            │              │              │
            └──────────────┼──────────────┘
                           │
                     ZAI PASSPORT
                           │
                  CUSTOMER ECOSYSTEM
```

Every brand must have its own visual identity.

However they must clearly feel like members of one family.

# 2. PRIMARY POSITIONING

Main identity:

# ZAI

Supporting language:

THE WORLD OF ZAI

Beauty. Fashion. Ritual.

Created by Zainab Al Alwan.

Optional secondary language:

One vision. Three expressions.

Enter the World of ZAI.

Beauty becomes identity.

Fashion becomes expression.

Ritual becomes experience.

Use short powerful copy.

Avoid large paragraphs.

Luxury comes from confidence and restraint.

# 3. VISUAL STANDARD

The experience should feel comparable in ambition to world class luxury houses and contemporary beauty brands.

Take inspiration from the quality level of brands such as:

Dior

Jacquemus

Bottega Veneta

Rhode

Charlotte Tilbury

SKIMS

Aesop

Rare Beauty

High end fashion editorials

Luxury magazines

Do not copy layouts.

Do not copy components.

Do not imitate another brand identity.

Create a completely original ZAI visual world.

The website must feel:

Middle Eastern

International

Feminine

Powerful

Sensual

Modern

Editorial

Cinematic

Minimal

Expensive

Confident

# 4. ABSOLUTELY FORBIDDEN DESIGN PATTERNS

Never use generic purple AI gradients.

Never use random neon.

Never use generic SaaS cards.

Never use excessive glassmorphism.

Never use template testimonial sections.

Never use random floating blobs.

Never use generic stock women.

Never use fake luxury logos.

Never use giant rounded cards everywhere.

Never use default Tailwind aesthetics.

Never fill empty areas with meaningless gradients.

Never use cheesy AI robot graphics.

Never make the site look like a technology startup.

Never make it look like a Shopify theme.

Every screen must feel specifically designed for ZAI.

# 5. SITE STRUCTURE

Primary routes:

```text
/
 /world
 /beaute
 /beaute/products
 /beaute/products/[slug]
 /beaute/looks
 /beaute/mirror
 /maison
 /maison/collection
 /maison/private_access
 /house
 /house/services
 /house/book
 /zainab
 /journal
 /journal/[slug]
 /search
 /passport
 /privacy
 /terms
```

Arabic versions must support RTL properly.

Do not simply flip the page mechanically.

Typography, alignment, interaction direction, navigation and spacing must all feel intentionally designed for Arabic.

# 6. NAVIGATION

Desktop navigation:

ZAI

World

Beauté

Maison

House

Zainab

Journal

Search

Account

Language

Mobile navigation must be completely custom.

Do not use a boring white drawer.

Create a full screen editorial navigation environment.

Possible structure:

```text
ZAI

01 BEAUTÉ
02 MAISON
03 HOUSE
04 ZAINAB
05 JOURNAL

EN   AR

Instagram
TikTok
Contact
```

Use large editorial typography and selected imagery.

# 7. OPENING EXPERIENCE

The website begins almost completely black.

Very small typography appears:

ZAINAB AL ALWAN PRESENTS

Then controlled cinematic imagery begins.

Possible sequence:

Eyes

Skin

Lips

Beauty product

Fabric

Pattern

Fashion sketch

Hands

Mirror

Lashes

Nails

Dress movement

Zainab

Then reveal:

# ZAI

Followed by:

BEAUTY

FASHION

RITUAL

Then:

ENTER THE WORLD OF ZAI

The introduction should be beautiful but short.

Do not trap the visitor inside a ten second animation.

Allow immediate skipping if required.

The site must remain fast.

# 8. HERO ASSET REQUIREMENTS

The builder must never guess hero images.

Use these exact files.

## Z01

Filename:

`zainab_hero_dark_desktop_01.webp`

Path:

```text
/public/assets/zai/01_zainab/hero/zainab_hero_dark_desktop_01.webp
```

Recommended size:

2400 × 1350

Ratio:

16:9

Purpose:

Main desktop homepage hero.

Required image:

Strong editorial image of Zainab.

Prefer a darker environment.

Prefer strong fashion styling.

Prefer clear facial visibility.

Prefer negative space for typography.

Avoid selfies.

Avoid screenshots containing Instagram UI.

Avoid images with large existing text.

## Z02

Filename:

`zainab_hero_mobile_01.webp`

Path:

```text
/public/assets/zai/01_zainab/hero/zainab_hero_mobile_01.webp
```

Recommended size:

1350 × 1800 minimum.

Ratio:

3:4 or 4:5.

Purpose:

Mobile homepage hero.

This should ideally be a dedicated vertical image.

Do not blindly crop the desktop hero.

# 9. ASSET PLACEHOLDER SYSTEM

This requirement is mandatory.

Create a reusable component called:

`AssetPlaceholder`

Whenever an expected image does not exist, never display a broken image symbol.

Instead show an elegant placeholder.

Example:

```text
IMAGE REQUIRED

zainab_shop_the_look_01.webp

Recommended ratio 4:5

Full body editorial image of Zainab.
Face, makeup and outfit must all be visible.
```

The placeholder must inherit the visual style of the surrounding section.

For Beauté it can use cobalt and ivory.

For Maison it can use cream and black.

For House it can use pearl and champagne.

During development, the exact filename must remain visible.

This means the owner can immediately see what image must be replaced.

# 10. CENTRALIZED ASSET MANIFEST

Never scatter image paths randomly through components.

Create something similar to:

```typescript
export const zaiAssets = {
  zainab: {
    heroDesktop: "/assets/zai/01_zainab/hero/zainab_hero_dark_desktop_01.webp",
    heroMobile: "/assets/zai/01_zainab/hero/zainab_hero_mobile_01.webp",
    beautyCloseup: "/assets/zai/01_zainab/beauty/zainab_beauty_closeup_01.webp",
    shopTheLook: "/assets/zai/01_zainab/shop_the_look/zainab_shop_the_look_01.webp",
    founderPortrait: "/assets/zai/01_zainab/founder/zainab_founder_portrait_01.webp"
  }
}
```

Build the full asset manifest for every image listed in this specification.

# 11. REQUIRED DIRECTORY STRUCTURE

Create:

```text
/public/assets/zai/

01_zainab/
    hero/
    portraits/
    beauty/
    fashion/
    founder/
    shop_the_look/
    video/

02_zai_beaute/
    logos/
    hero/
    campaigns/
    products/
    swatches/
    textures/
    looks/
    video/

03_zai_maison/
    logos/
    hero/
    atelier/
    sketches/
    fabrics/
    patterns/
    garments/
    campaigns/
    video/

04_house_of_zai/
    logos/
    hero/
    interior/
    lashes/
    brows/
    nails/
    lips/
    treatments/
    team/
    before_after/
    video/

05_shared/
    press/
    editorial/
    textures/
    social/
    icons/
```

# 12. COMPLETE ZAINAB IMAGE MANIFEST

## Z03

Filename:

`zainab_beauty_closeup_01.webp`

Path:

```text
01_zainab/beauty/
```

Size:

1600 × 2000 minimum.

Ratio:

4:5.

Purpose:

Transition from the main world into ZAI Beauté.

Image needed:

Clean beauty portrait.

Face must be clearly visible.

Makeup must be visible.

Skin quality must be high.

## Z04

Filename:

`zainab_beauty_closeup_02.webp`

Path:

```text
01_zainab/beauty/
```

Ratio:

4:5.

Purpose:

ZAI Mirror opening.

Use a different beauty image from Z03.

## Z05

Filename:

`zainab_shop_the_look_01.webp`

Path:

```text
01_zainab/shop_the_look/
```

Recommended size:

1800 × 2250 minimum.

Ratio:

4:5.

Purpose:

SHOP ZAINAB'S LOOK.

THIS IMAGE IS CRITICAL.

Required:

Zainab must be clearly visible.

Face visible.

Lips visible.

Eye makeup visible.

Complexion visible.

Outfit visible.

Prefer full body or three quarter body.

Do not use a tight portrait.

We need space for interactive hotspots.

## Z06

Filename:

`zainab_shop_the_look_mobile_01.webp`

Path:

```text
01_zainab/shop_the_look/
```

Ratio:

3:4 or 4:5.

Purpose:

Dedicated mobile composition for Shop Zainab's Look.

## Z07

Filename:

`zainab_fashion_fullbody_01.webp`

Path:

```text
01_zainab/fashion/
```

Ratio:

4:5.

Purpose:

Maison transition.

Required:

Strong fashion image.

Full outfit visible.

## Z08

Filename:

`zainab_fashion_wide_01.webp`

Path:

```text
01_zainab/fashion/
```

Ratio:

16:9.

Purpose:

Wide editorial fashion spread.

## Z09

Filename:

`zainab_founder_portrait_01.webp`

Path:

```text
01_zainab/founder/
```

Ratio:

4:5.

Purpose:

Founder section.

Required:

Confident.

Elegant.

Professional editorial quality.

No casual selfie.

## Z10

Filename:

`zainab_founder_wide_01.webp`

Path:

```text
01_zainab/founder/
```

Ratio:

16:9.

Purpose:

Founder page hero.

## Z11

Filename:

`zainab_editorial_portrait_01.webp`

Path:

```text
01_zainab/portraits/
```

Ratio:

4:5.

Purpose:

Editorial content section.

## Z12

Filename:

`zainab_editorial_portrait_02.webp`

Path:

```text
01_zainab/portraits/
```

Ratio:

4:5.

Purpose:

Secondary editorial storytelling.

## Z13

Filename:

`zainab_editorial_wide_01.webp`

Path:

```text
01_zainab/portraits/
```

Ratio:

16:9.

Purpose:

Large full width editorial divider.

# 13. OPTIONAL ZAINAB VIDEO ASSETS

## ZV01

Filename:

`zainab_opening_film_desktop_01.mp4`

Path:

```text
01_zainab/video/
```

Purpose:

Homepage cinematic introduction.

Recommended duration:

3 to 8 seconds.

Muted by default.

No sound requirement.

## ZV02

Filename:

`zainab_opening_film_mobile_01.mp4`

Path:

```text
01_zainab/video/
```

Ratio:

9:16.

Purpose:

Mobile cinematic introduction.

If video is missing, automatically fall back to Z01 and Z02.

# 14. WORLD OF ZAI SECTION

After the hero introduce:

# ONE VISION.

# THREE EXPRESSIONS.

Then show three immersive worlds.

BEAUTÉ

MAISON

HOUSE

Do not create three generic cards.

Each world must feel like a portal.

Desktop can use large split screens.

Mobile can use controlled vertical or horizontal storytelling.

# 15. ZAI BEAUTÉ VISUAL DIRECTION

Primary visual language:

Cobalt blue

Ivory

Chrome

Controlled glass

Warm skin

Reflective surfaces

Liquid texture

Beauty macro photography

Minimal typography

Strong product photography

Products should feel like objects of desire.

# 16. ZAI BEAUTÉ HERO

Possible headline:

# YOUR SKIN.

# YOUR SHADE.

# YOUR ZAI.

Actions:

DISCOVER BEAUTÉ

FIND MY ZAI

Do not immediately show ecommerce grids.

First sell desire.

Then sell products.

# 17. ZAI BEAUTÉ IMAGE MANIFEST

## B01

Filename:

`zai_beaute_logo_primary.webp`

Path:

```text
02_zai_beaute/logos/
```

Purpose:

Official Beauté logo.

Use real supplied logo.

Never recreate automatically.

## B02

Filename:

`zai_beaute_hero_campaign_desktop_01.webp`

Path:

```text
02_zai_beaute/hero/
```

Size:

2400 × 1350 minimum.

Ratio:

16:9.

Purpose:

Beauté desktop hero.

Required:

Premium campaign image.

Prefer Zainab or authentic ZAI campaign imagery.

## B03

Filename:

`zai_beaute_hero_campaign_mobile_01.webp`

Path:

```text
02_zai_beaute/hero/
```

Ratio:

4:5.

Purpose:

Beauté mobile hero.

## B04

Filename:

`zai_beaute_campaign_closeup_01.webp`

Path:

```text
02_zai_beaute/campaigns/
```

Ratio:

4:5.

Purpose:

Beauty campaign editorial.

## B05

Filename:

`zai_beaute_campaign_closeup_02.webp`

Path:

```text
02_zai_beaute/campaigns/
```

Ratio:

4:5.

Purpose:

Secondary campaign editorial.

## B06

Filename:

`zai_beaute_product_foundation_01.webp`

Path:

```text
02_zai_beaute/products/
```

Ratio:

1:1 or 4:5.

Purpose:

Beauty Booster Foundation.

## B07

Filename:

`zai_beaute_product_lipstick_01.webp`

Path:

```text
02_zai_beaute/products/
```

Purpose:

Velvet Matt Lipstick.

## B08

Filename:

`zai_beaute_product_lip_pencil_01.webp`

Path:

```text
02_zai_beaute/products/
```

Purpose:

Lip Pencil.

## B09

Filename:

`zai_beaute_product_highlighter_01.webp`

Path:

```text
02_zai_beaute/products/
```

Purpose:

Glozé Highlighter.

## B10

Filename:

`zai_beaute_product_mascara_01.webp`

Path:

```text
02_zai_beaute/products/
```

Purpose:

Lash Booster Mascara.

## B11

Filename:

`zai_beaute_product_brow_01.webp`

Path:

```text
02_zai_beaute/products/
```

Purpose:

Brow product.

## B12

Filename:

`zai_beaute_product_eyeliner_01.webp`

Path:

```text
02_zai_beaute/products/
```

Purpose:

Eyeliner.

## B13

Filename:

`zai_beaute_product_tint_01.webp`

Path:

```text
02_zai_beaute/products/
```

Purpose:

Lip and cheek tint.

## B14

Filename:

`zai_beaute_product_group_01.webp`

Path:

```text
02_zai_beaute/products/
```

Ratio:

16:9 or 3:2.

Purpose:

Group product composition.

## B15

Filename:

`zai_beaute_foundation_swatches_01.webp`

Path:

```text
02_zai_beaute/swatches/
```

Purpose:

Foundation shade display.

## B16

Filename:

`zai_beaute_lip_swatches_01.webp`

Path:

```text
02_zai_beaute/swatches/
```

Purpose:

Lip colors.

## B17

Filename:

`zai_beaute_texture_foundation_01.webp`

Path:

```text
02_zai_beaute/textures/
```

Purpose:

Macro foundation texture.

## B18

Filename:

`zai_beaute_texture_lip_01.webp`

Path:

```text
02_zai_beaute/textures/
```

Purpose:

Lip product texture.

## B19

Filename:

`zai_beaute_look_01.webp`

Path:

```text
02_zai_beaute/looks/
```

Ratio:

4:5.

Purpose:

Complete ZAI beauty look.

## B20

Filename:

`zai_beaute_look_02.webp`

Path:

```text
02_zai_beaute/looks/
```

Ratio:

4:5.

Purpose:

Secondary beauty look.

# 18. SHOP ZAINAB'S LOOK

This is one of the most important experiences.

Headline:

# SHOP ZAINAB'S LOOK

Use:

`zainab_shop_the_look_01.webp`

Interactive hotspots can identify:

Lips

Complexion

Eyes

Outfit

Lashes

When the visitor selects an area, reveal its associated product.

Example:

LIPS

Velvet Matt Lipstick

Shade name

Price

VIEW PRODUCT

COMPLEXION

Beauty Booster Foundation

Shade name

FIND MY SHADE

OUTFIT

ZAI Maison

DISCOVER MAISON

LASHES

House of ZAI

BOOK THE LOOK

On mobile use a bottom sheet.

Never make users tap tiny dots.

# 19. ZAI MIRROR

Create:

# FIND YOUR ZAI

This should feel like a premium beauty concierge.

It is not a chatbot window.

Ask:

Skin tone

Undertone

Skin type

Coverage preference

Finish preference

Lip preference

Color preference

Occasion

Daily or evening

Beauty style

Then return:

# YOUR ZAI PROFILE

Recommended foundation.

Recommended shade.

Recommended lip combination.

Recommended highlight.

Recommended eye product.

Recommended routine.

Actions:

SHOP MY ROUTINE

SAVE MY PROFILE

SHARE MY LOOK

Use structured product logic.

Do not randomly generate recommendations.

If real AI vision is not connected, do not pretend to scan a face.

# 20. BEAUTÉ COMMERCE ARCHITECTURE

Do not make the website visually dependent on Boutiqaat.

The ZAI website owns:

Product discovery

Brand storytelling

Shade matching

Looks

Editorial

Recommendations

Wishlists

Customer preferences

Search

Campaign pages

Analytics

When direct checkout is not enabled, use:

SHOP ON BOUTIQAAT

Link to exact product where possible.

Build a configurable commerce provider system.

Example:

```typescript
commerceProvider = "boutiqaat"
```

Future possibilities:

```typescript
commerceProvider = "native"
commerceProvider = "shopify"
commerceProvider = "headless"
```

Switching provider must not require redesigning product components.

# 21. ZAI MAISON VISUAL DIRECTION

When entering Maison the visual world changes.

Use:

Warm ivory

Cream

Sand

Linen

Black

Paper

Pattern markings

Thread

Fabric

Mannequins

Fashion sketches

Soft shadows

Maison must feel like entering a private atelier.

Not a normal clothing shop.

# 22. ZAI MAISON HERO

Primary title:

# MAISON 001

Supporting line:

AN IDEA BECOMES A LINE.

A LINE BECOMES A SILHOUETTE.

Create a storytelling sequence:

Sketch

Fabric

Pattern

Cut

Fitting

Final piece

Campaign

# 23. ZAI MAISON IMAGE MANIFEST

## M01

Filename:

`zai_maison_logo_primary.webp`

Path:

```text
03_zai_maison/logos/
```

Purpose:

Real Maison logo.

## M02

Filename:

`zai_maison_hero_desktop_01.webp`

Path:

```text
03_zai_maison/hero/
```

Ratio:

16:9.

Purpose:

Main Maison hero.

Ideal image:

Atelier.

Fabric.

Mannequin.

Garment.

Fashion environment.

## M03

Filename:

`zai_maison_hero_mobile_01.webp`

Path:

```text
03_zai_maison/hero/
```

Ratio:

4:5.

Purpose:

Maison mobile hero.

## M04

Filename:

`zai_maison_atelier_01.webp`

Path:

```text
03_zai_maison/atelier/
```

Ratio:

4:5.

Purpose:

Atelier storytelling.

## M05

Filename:

`zai_maison_atelier_02.webp`

Path:

```text
03_zai_maison/atelier/
```

Ratio:

4:5.

Purpose:

Second atelier image.

## M06

Filename:

`zai_maison_sketch_01.webp`

Path:

```text
03_zai_maison/sketches/
```

Purpose:

Fashion sketch.

## M07

Filename:

`zai_maison_sketch_02.webp`

Path:

```text
03_zai_maison/sketches/
```

Purpose:

Second sketch.

## M08

Filename:

`zai_maison_fabric_01.webp`

Path:

```text
03_zai_maison/fabrics/
```

Purpose:

Fabric macro texture.

## M09

Filename:

`zai_maison_fabric_02.webp`

Path:

```text
03_zai_maison/fabrics/
```

Purpose:

Secondary fabric.

## M10

Filename:

`zai_maison_pattern_01.webp`

Path:

```text
03_zai_maison/patterns/
```

Purpose:

Pattern making visual.

## M11

Filename:

`zai_maison_garment_01.webp`

Path:

```text
03_zai_maison/garments/
```

Ratio:

4:5.

Purpose:

First finished garment when available.

If no garment exists, keep the explicit placeholder.

Do not invent official products.

## M12

Filename:

`zai_maison_garment_02.webp`

Path:

```text
03_zai_maison/garments/
```

Purpose:

Second finished garment when available.

## M13

Filename:

`zai_maison_campaign_01.webp`

Path:

```text
03_zai_maison/campaigns/
```

Ratio:

4:5.

Purpose:

Maison editorial campaign.

## M14

Filename:

`zai_maison_campaign_wide_01.webp`

Path:

```text
03_zai_maison/campaigns/
```

Ratio:

16:9.

Purpose:

Maison full width campaign.

# 24. MAISON PRIVATE ACCESS

Create:

# PRIVATE ACCESS

Supporting copy:

Be among the first to enter ZAI Maison.

Fields:

Name

Email

WhatsApp

Country

Preferred size

Style preferences

Consent

Confirmation:

# YOU ARE ON THE LIST.

Do not create fake queue numbers.

Do not pretend inventory exists.

# 25. HOUSE OF ZAI

House of ZAI should feel:

Warm

Sensual

Intimate

Premium

Personal

Use:

Pearl

Champagne

Soft ivory

Warm skin

Mirrors

Metal

Glass

Beauty macro photography

Primary statement:

# ENTER THE HOUSE

Categories can include only confirmed services.

Possible categories based on available public material:

Lashes

Brows

Nails

Lips

Beauty

Do not invent medical procedures.

# 26. HOUSE OF ZAI IMAGE MANIFEST

## H01

Filename:

`house_of_zai_logo_primary.webp`

Path:

```text
04_house_of_zai/logos/
```

Purpose:

Official logo.

## H02

Filename:

`house_of_zai_hero_desktop_01.webp`

Path:

```text
04_house_of_zai/hero/
```

Ratio:

16:9.

Purpose:

House main hero.

Ideal image:

Beautiful treatment closeup or premium interior.

## H03

Filename:

`house_of_zai_hero_mobile_01.webp`

Path:

```text
04_house_of_zai/hero/
```

Ratio:

4:5.

Purpose:

Mobile hero.

## H04

Filename:

`house_of_zai_interior_01.webp`

Path:

```text
04_house_of_zai/interior/
```

Ratio:

16:9.

Purpose:

Main salon environment.

## H05

Filename:

`house_of_zai_interior_02.webp`

Path:

```text
04_house_of_zai/interior/
```

Ratio:

4:5.

Purpose:

Interior detail.

## H06

Filename:

`house_of_zai_lashes_01.webp`

Path:

```text
04_house_of_zai/lashes/
```

Ratio:

4:5.

Purpose:

Lash service.

## H07

Filename:

`house_of_zai_lashes_02.webp`

Path:

```text
04_house_of_zai/lashes/
```

Purpose:

Lash result.

## H08

Filename:

`house_of_zai_brows_01.webp`

Path:

```text
04_house_of_zai/brows/
```

Purpose:

Brows.

## H09

Filename:

`house_of_zai_nails_01.webp`

Path:

```text
04_house_of_zai/nails/
```

Purpose:

Nail treatment.

## H10

Filename:

`house_of_zai_nails_02.webp`

Path:

```text
04_house_of_zai/nails/
```

Purpose:

Nail result.

## H11

Filename:

`house_of_zai_lips_01.webp`

Path:

```text
04_house_of_zai/lips/
```

Purpose:

Lip beauty imagery.

Only use imagery connected to real advertised services.

## H12

Filename:

`house_of_zai_treatment_01.webp`

Path:

```text
04_house_of_zai/treatments/
```

Purpose:

Hands performing a treatment.

## H13

Filename:

`house_of_zai_treatment_02.webp`

Path:

```text
04_house_of_zai/treatments/
```

Purpose:

Second service action.

## H14

Filename:

`house_of_zai_team_01.webp`

Path:

```text
04_house_of_zai/team/
```

Ratio:

16:9.

Purpose:

House team if available.

If unavailable, leave placeholder.

Never use fake employees.

## H15

Filename:

`house_of_zai_before_01.webp`

Path:

```text
04_house_of_zai/before_after/
```

Purpose:

Real before image.

## H16

Filename:

`house_of_zai_after_01.webp`

Path:

```text
04_house_of_zai/before_after/
```

Purpose:

Matching real after image.

Do not fabricate before and after results.

# 27. HOUSE BOOKING EXPERIENCE

Build a complete visual booking flow.

Step 1:

Choose service.

Step 2:

Choose optional artist.

Step 3:

Choose date.

Step 4:

Choose time.

Step 5:

Customer information.

Step 6:

Optional deposit.

Step 7:

Confirmation.

Support future integrations for:

WhatsApp

CRM

Calendar

Payments

Reminders

Cancellation

Rescheduling

Waitlist

Review requests

Rebooking

For the private prototype, no real appointments should be created unless explicitly connected later.

# 28. FOUNDER EXPERIENCE

Do not build a generic About page.

Build:

# ZAINAB AL ALWAN

FOUNDER.

CREATOR.

VISION.

Use:

`zainab_founder_portrait_01.webp`

And:

`zainab_founder_wide_01.webp`

Keep copy minimal.

Possible statement:

One vision expressed through beauty, fashion and ritual.

Sections can include:

Founder introduction

Creative philosophy

Brand ecosystem

Selected press

Campaigns

Partnership enquiries

Media enquiries

Only use verifiable factual claims.

# 29. ZAI PASSPORT

Create a future customer identity concept called:

# ZAI PASSPORT

Possible capabilities:

Beauty profile

Saved shades

Saved looks

Maison wishlist

Maison private access

House bookings

Birthday

Country

Language

Preferences

VIP access

Purchase history where supported

Possible future tiers:

Pearl

Noir

Icon

Treat these as concepts.

Do not fabricate rewards or balances.

# 30. PERSONALIZATION

If a visitor creates a profile, support future homepage personalization.

Examples:

Welcome back, Sara.

Your shade profile is ready.

Your saved ZAI look is waiting.

Maison has a new private preview.

Your House appointment is approaching.

Only show real stored data.

# 31. SEARCH

Create a beautiful full screen search.

Search should eventually understand:

Products

Shades

Looks

Services

Maison

Journal

Founder content

Example searches:

Red lipstick

Warm foundation

Zainab blue makeup

Lashes

Maison

Brows

Basic search must work without AI.

Semantic search can be layered later.

# 32. JOURNAL

Create:

# THE ZAI EDIT

Categories:

Beauty

Looks

Maison

Atelier

House

Zainab

Campaigns

Guides

It should feel like an editorial magazine.

Not a WordPress blog.

# 33. MOBILE FIRST

Assume a huge portion of traffic will come directly from Instagram and social media.

Mobile cannot be a smaller desktop layout.

It must be designed intentionally.

Requirements:

Perfect 390px experience.

Beautiful 430px experience.

Thumb friendly controls.

Full screen editorial imagery.

Native feeling bottom sheets.

Swipe interactions where appropriate.

No horizontal overflow.

No tiny text.

No broken hotspots.

No giant popups.

No fixed elements covering content.

Smooth touch behavior.

Fast loading.

Beautiful mobile navigation.

# 34. MOTION SYSTEM

Use motion with extreme restraint.

Possible technologies:

GSAP

Motion

WebGL

Three.js

CSS

Use Three.js only where it creates meaningful value.

Possible interactions:

Typography reveal.

Image masks.

Product rotation.

Subtle depth.

Controlled parallax.

Section transitions.

Brand color transformations.

Editorial image reveals.

Soft magnetic interactions.

Never add motion simply to show technical skill.

The result must feel expensive.

# 35. BRAND TRANSITIONS

Moving between worlds should feel like entering different rooms.

Beauté:

Black transforms into cobalt, chrome and ivory.

Maison:

Color transforms into cream, paper, linen and black.

House:

Color warms into pearl, champagne and skin.

Shared ZAI navigation remains consistent.

# 36. SOUND

Optional.

Muted by default.

Possible subtle effects:

Fabric movement.

Cosmetic click.

Room ambience.

Atelier texture.

Never autoplay loud audio.

Provide a visible sound control if sound exists.

# 37. TECHNOLOGY STACK

Recommended architecture:

Next.js current stable.

React.

TypeScript.

Tailwind CSS or a scalable token based CSS architecture.

Motion or GSAP.

Supabase if backend capabilities become necessary.

Headless CMS for production content.

Image optimization.

Modern analytics.

Strong security.

Use server components appropriately.

Keep client JavaScript under control.

Do not install unnecessary dependencies.

# 38. DATA ARCHITECTURE

Create structured models for:

Brand

Product

Product category

Product shade

Product collection

Product image

Look

Look item

Maison collection

Maison product

Maison variant

Service

Service category

Artist

Availability

Booking

Customer

Beauty profile

Customer preference

Wishlist

Saved look

Lead

Campaign

Article

Localization

SEO metadata

Outbound commerce event

Do not hardcode the entire website into component arrays.

# 39. CONTENT MANAGEMENT

Production architecture must eventually allow ZAI staff to edit:

Hero media

Campaigns

Products

Prices

Product links

Boutiqaat links

Maison collections

Maison content

House services

House pricing

Images

Journal content

Founder content

SEO

Launch messaging

Private access

Without editing source code.

# 40. ANALYTICS

Create a normalized analytics event layer.

Track:

Homepage entered.

Brand world opened.

Product viewed.

Shade selected.

Look opened.

Look product clicked.

ZAI Mirror started.

ZAI Mirror completed.

Recommendation selected.

Boutiqaat outbound clicked.

Maison access started.

Maison access completed.

House service viewed.

Booking started.

Booking completed.

Search used.

Saved look created.

Wishlist item added.

Language changed.

Country changed.

Do not claim sales attribution unless supported by the commerce integration.

# 41. SEO

The private speculative concept must NOT be indexed.

Use:

`noindex`

`nofollow`

For future production architecture prepare:

Semantic HTML.

Correct title structure.

One logical H1.

H2 and H3 hierarchy.

Canonical URLs.

Open Graph.

Structured data.

Product schema where valid.

Local Business schema where factual.

Person schema for Zainab where factual.

Article schema.

Breadcrumbs.

Sitemap.

Robots.

Image alt text.

# 42. ACCESSIBILITY

Support:

Keyboard navigation.

Visible focus states.

Semantic controls.

Accessible dialogs.

Reduced motion.

Sufficient contrast.

Proper labels.

Touch target sizing.

Screen reader friendly hierarchy.

Luxury cannot mean unusable.

# 43. PERFORMANCE

Luxury cannot mean slow.

Optimize:

Core Web Vitals.

Images.

Video.

Fonts.

JavaScript.

Route loading.

Layout shift.

Interaction latency.

Lazy loading.

Code splitting.

WebGL usage.

Use adaptive assets on mobile.

Do not send desktop quality 4K video to every phone.

# 44. CONCEPT SAFETY RULES

This project is initially a speculative private concept.

Therefore:

No real payments.

No fake orders.

No real customer data capture unless intentionally connected.

No claiming official partnership.

No claiming Zainab approved the site.

No fake press coverage.

No fake testimonials.

No fake reviews.

No fake sales numbers.

No fake product claims.

No invented products pretending to be real products.

No fake employees.

No fabricated before and after imagery.

No SEO indexing.

Place a discreet:

PRIVATE DIGITAL CONCEPT

marker where appropriate.

Do not let that marker destroy the luxury presentation.

# 45. IMAGE QUALITY RULES

All supplied images must be processed responsibly.

Never stretch an image.

Never distort a face.

Never over sharpen skin.

Never create ugly AI faces.

Never auto crop important garments.

Never crop a product logo unless intentional.

Never replace an actual person with generated imagery.

Prefer WebP or AVIF where appropriate.

Maintain high resolution originals separately.

Use responsive image sizes.

# 46. IMAGE REPLACEMENT WORKFLOW

The entire site should support this exact workflow:

Step 1:

Designer sees:

```text
IMAGE REQUIRED
zai_maison_campaign_01.webp
4:5
Maison editorial campaign
```

Step 2:

Designer finds the correct image.

Step 3:

Designer renames image:

```text
zai_maison_campaign_01.webp
```

Step 4:

Designer places it in:

```text
/public/assets/zai/03_zai_maison/campaigns/
```

Step 5:

Reload.

Image appears automatically.

No code editing.

This workflow must work for every asset.

# 47. COMPLETE INITIAL ASSET CHECKLIST

Before contacting the client, the following assets should ideally be populated.

Zainab:

1. Desktop dark hero.

2. Mobile hero.

3. Beauty closeup one.

4. Beauty closeup two.

5. Shop the Look main image.

6. Shop the Look mobile image.

7. Fashion full body image.

8. Fashion wide image.

9. Founder portrait.

10. Founder wide image.

11. Two editorial portraits.

12. One editorial wide image.

Beauté:

13. Official logo.

14. Desktop campaign hero.

15. Mobile campaign hero.

16. Two beauty campaign closeups.

17. Foundation product.

18. Lipstick product.

19. Lip pencil product.

20. Highlighter product.

21. Mascara product.

22. Brow product.

23. Eyeliner product.

24. Tint product.

25. Product group shot.

26. Foundation swatches.

27. Lip swatches.

28. Foundation texture.

29. Lip texture.

30. Two complete beauty looks.

Maison:

31. Official logo.

32. Desktop hero.

33. Mobile hero.

34. Two atelier images.

35. Two sketches.

36. Two fabric images.

37. Pattern image.

38. Garment image if available.

39. Second garment if available.

40. Campaign portrait.

41. Campaign wide image.

House:

42. Official logo.

43. Desktop hero.

44. Mobile hero.

45. Two interior images.

46. Two lash images.

47. Brow image.

48. Two nail images.

49. Lip image.

50. Two treatment action images.

51. Team image if available.

52. Real matching before and after.

You do NOT need all 52 assets before beginning.

The placeholder system exists specifically so the website can be built while images are collected.

# 48. DEVELOPMENT PRIORITIES

PHASE 1

Create architecture.

Create visual system.

Create typography.

Create color tokens.

Create asset manifest.

Create placeholder system.

Create routes.

Create mobile shell.

PHASE 2

Build the homepage.

Focus heavily on:

Opening sequence.

ZAI reveal.

World portals.

Mobile hero.

PHASE 3

Build:

SHOP ZAINAB'S LOOK.

This must be fully interactive.

PHASE 4

Build:

ZAI BEAUTÉ.

Hero.

Looks.

Products.

Product details.

PHASE 5

Build:

ZAI MIRROR.

Make questionnaire logic functional.

PHASE 6

Build:

ZAI MAISON.

Atelier story.

Private access.

Future commerce structure.

PHASE 7

Build:

HOUSE OF ZAI.

Services.

Booking experience.

PHASE 8

Build:

ZAINAB.

Journal.

Search.

Passport concept.

PHASE 9

Arabic.

RTL.

Responsive audit.

Performance.

Accessibility.

Analytics.

PHASE 10

Full QA.

# 49. CRITICAL FIRST VERSION RULE

Do not spend excessive time building hidden backend systems before the presentation experience is exceptional.

The first private version has one objective:

# WIN THE MEETING.

The highest priority is:

Homepage.

Mobile homepage.

Shop Zainab's Look.

ZAI Mirror.

Beauté transition.

Maison transition.

House transition.

Founder positioning.

Everything else can be expanded after client approval.

# 50. THREE NON NEGOTIABLE WOW MOMENTS

WOW MOMENT 1:

# THE WORLD OF ZAI OPENING.

The visitor must immediately feel they entered a luxury universe.

WOW MOMENT 2:

# SHOP ZAINAB'S LOOK.

The visitor interacts directly with a complete Zainab look and discovers Beauté, Maison and House from one image.

WOW MOMENT 3:

# ZAI MIRROR.

The visitor receives a personalized beauty identity and recommended ZAI routine.

These three experiences must be extraordinary.

# 51. MOBILE PRESENTATION TEST

Before declaring the private prototype ready, open it at 390px width.

Imagine Zainab receives this link inside an Instagram DM.

She taps it.

Within five seconds she must understand:

This is about her.

This is premium.

This connects her brands.

This is different from Boutiqaat.

This is different from Instagram.

This feels like something she owns.

If the experience does not communicate this instantly, continue improving it.

# 52. FOUNDER TEST

Ask:

Does Zainab look like the center of the universe?

Does she look like a founder?

Does Beauté look internationally competitive?

Does Maison feel mysterious and desirable?

Does House feel real and bookable?

Can a visitor understand the relationship between all brands?

Does the experience make someone want to explore?

Would someone screen record this?

Would someone send this website to a friend?

Would Zainab want to show this to her team?

If not, continue.

# 53. QUALITY CONTROL

Before completion verify:

No broken links.

No broken images.

No console errors.

No hydration warnings.

No placeholder Lorem Ipsum.

No template text.

No irrelevant icons.

No duplicated sections.

No fake metrics.

No broken mobile navigation.

No horizontal overflow.

No clipped typography.

No broken sticky sections.

No slow intro.

No oversized video loading.

No inaccessible controls.

No duplicated H1 tags.

No accidental indexing.

No fake customer data.

# 54. FINAL CREATIVE OBJECTIVE

The customer journey should emotionally progress through:

CURIOSITY

DESIRE

DISCOVERY

PERSONALIZATION

CONVERSION

BELONGING

The final emotion should be:

# I WANT TO BE INSIDE THIS WORLD.

# 55. FINAL BUSINESS OBJECTIVE

Do not build a website that competes with Boutiqaat by simply recreating a product grid.

Build something Boutiqaat cannot provide.

Zainab's identity.

ZAI storytelling.

Personalized discovery.

Shop Zainab's Look.

ZAI Mirror.

Maison storytelling.

House booking.

Owned audience intelligence.

Customer profiles.

Editorial.

Community.

Cross brand discovery.

A digital destination.

Boutiqaat can remain a commerce endpoint where required.

The ZAI experience must own everything that happens before that click.

Architect the site so native commerce can be activated later without rebuilding the front end.

# 56. FINAL STANDARD

Do not stop because the application compiles.

Do not stop because the homepage exists.

Do not stop because desktop looks good.

Do not stop because animations work.

Continue until the concept feels:

Intentional.

Original.

Cinematic.

Luxury.

Fast.

Responsive.

Commercially intelligent.

Emotionally memorable.

Technically credible.

Designed specifically for Zainab.

The final concept should not feel like:

A better website for Zainab.

It should feel like:

# THE BEGINNING OF THE DIGITAL ZAI HOUSE.

BUILD IT LIKE THE CLIENT HAS ALREADY SAID YES.

BUILD IT LIKE THE FIRST 30 SECONDS WILL DECIDE WHETHER WE GET THE MEETING.

BUILD THE WORLD OF ZAI.