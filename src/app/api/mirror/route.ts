import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { products } from "@/lib/products";
import type { MirrorResult } from "@/lib/store";

function getDefaultRecommendation(answers: Record<string, string>): MirrorResult {
  const tone = answers["skinTone"] || "Medium";
  const undertone = answers["undertone"] || "Warm";
  const style = answers["style"] || "Natural Glam";

  const toneMap: Record<string, { foundation: { name: string; shade: string }; lip: { name: string; shade: string }; highlighter: { name: string; shade: string }; eye: { name: string; shade: string } }> = {
    Fair: {
      foundation: { name: "Beauty Booster Foundation", shade: "Pearl" },
      lip: { name: "Velvet Matt Lipstick", shade: "Nude Edit" },
      highlighter: { name: "Glozé Highlighter", shade: "Pearl Luxe" },
      eye: { name: "Brow Definer", shade: "Blonde" },
    },
    Light: {
      foundation: { name: "Beauty Booster Foundation", shade: "Sand" },
      lip: { name: "Velvet Matt Lipstick", shade: "Desert Rose" },
      highlighter: { name: "Glozé Highlighter", shade: "Champagne Pop" },
      eye: { name: "Brow Definer", shade: "Blonde" },
    },
    Medium: {
      foundation: { name: "Beauty Booster Foundation", shade: "Amber" },
      lip: { name: "Velvet Matt Lipstick", shade: "Mocha" },
      highlighter: { name: "Glozé Highlighter", shade: "Golden Hour" },
      eye: { name: "Precision Eyeliner", shade: "Noir" },
    },
    Deep: {
      foundation: { name: "Beauty Booster Foundation", shade: "Bronze" },
      lip: { name: "Velvet Matt Lipstick", shade: "Burgundy Luxe" },
      highlighter: { name: "Glozé Highlighter", shade: "Golden Hour" },
      eye: { name: "Precision Eyeliner", shade: "Noir" },
    },
  };

  const routineMap: Record<string, string[]> = {
    Minimal: [
      "Beauty Booster Foundation",
      "Glozé Highlighter",
      "Lash Booster Mascara",
    ],
    "Natural Glam": [
      "Beauty Booster Foundation",
      "Glozé Highlighter",
      "Brow Definer",
      "Velvet Matt Lipstick",
      "Lash Booster Mascara",
    ],
    "Full Glam": [
      "Beauty Booster Foundation",
      "Glozé Highlighter",
      "Precision Eyeliner",
      "Brow Definer",
      "Velvet Matt Lipstick",
      "Lip Pencil",
      "Lash Booster Mascara",
    ],
    Editorial: [
      "Beauty Booster Foundation",
      "Glozé Highlighter",
      "Precision Eyeliner",
      "Brow Definer",
      "Velvet Matt Lipstick",
      "Lip Pencil",
      "Lip & Cheek Tint",
      "Lash Booster Mascara",
    ],
  };

  const picks = toneMap[tone] || toneMap["Medium"];
  const routine = routineMap[style] || routineMap["Natural Glam"];

  return {
    foundation: picks.foundation,
    lip: picks.lip,
    highlighter: picks.highlighter,
    eye: picks.eye,
    routine,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const answers: Record<string, string> = body.answers ?? {};

    // Build product catalog string for the LLM
    const catalogStr = products
      .map((p) => {
        const shades = p.shades.map((s) => `    "${s.name}" (hex: ${s.hex}${s.skinTone ? `, skinTone: ${s.skinTone}` : ""})`).join("\n");
        return `  - ${p.name} (category: ${p.category}, price: ${p.price} ${p.currency})\n  Shades:\n${shades}`;
      })
      .join("\n\n");

    const systemPrompt = `You are the ZAI Beauty Concierge — a luxury beauty advisor for the brand ZAI by Zainab Al Alwan. You are knowledgeable, sophisticated, and always recommend products from the ZAI catalog.

You MUST return ONLY a valid JSON object (no markdown, no code fences, no extra text) with this exact shape:
{
  "foundation": { "name": "<product name>", "shade": "<shade name>" },
  "lip": { "name": "<product name>", "shade": "<shade name>" },
  "highlighter": { "name": "<product name>", "shade": "<shade name>" },
  "eye": { "name": "<product name>", "shade": "<shade name>" },
  "routine": ["<product name 1>", "<product name 2>", ...]
}

Rules:
- Use ONLY product names and shade names from the catalog below.
- Match the foundation shade to the user\'s skin tone and undertone.
- For lip, pick a shade that complements the skin tone and style.
- For highlighter, choose based on undertone (warm undertones → golden shades, cool → pearl).
- For eye, pick either a brow product, eyeliner, or mascara based on the user\'s style preference.
- The routine should be a list of product names in application order, appropriate for the user\'s style and occasion.
- Minimal style = 2-3 products, Natural Glam = 4-5, Full Glam = 6-7, Editorial = 7-8.

ZAI PRODUCT CATALOG:
${catalogStr}`;

    const userPrompt = `Here are my beauty preferences:
${Object.entries(answers)
  .map(([key, val]) => `  - ${key}: ${val}`)
  .join("\n")}

Based on these preferences, recommend my personalized ZAI beauty profile. Return ONLY the JSON object.`;

    const zai = await ZAI.create();
    const result = await zai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const content = result?.choices?.[0]?.message?.content ?? "";

    // Strip code fences if the LLM wraps in them
    let jsonStr = content.trim();
    const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      jsonStr = fenceMatch[1].trim();
    }

    try {
      const parsed = JSON.parse(jsonStr) as MirrorResult;
      // Validate basic structure
      if (parsed.foundation?.name && parsed.lip?.name && parsed.highlighter?.name && parsed.eye?.name && Array.isArray(parsed.routine)) {
        return NextResponse.json(parsed);
      }
    } catch {
      // fall through to default
    }

    // Fallback to defaults if LLM response is invalid
    return NextResponse.json(getDefaultRecommendation(answers));
  } catch {
    // On any error, return sensible defaults
    return NextResponse.json(getDefaultRecommendation({}));
  }
}
