/**
 * Asset integrity check
 * ─────────────────────────────────────────────────────────────
 * Verifies that every asset path referenced by src/lib/assets.ts
 * (the manifest) and every `assetKey` referenced by src/lib/products.ts
 * resolves to a real file inside /public.
 *
 * Usage:  npm run check:assets
 * Exits 1 when a reference is broken, so it can be wired into CI.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const manifestPath = join(root, 'src/lib/assets.ts');
const productsPath = join(root, 'src/lib/products.ts');

/** Parse the nested manifest object into { 'brand.key': '/path' } */
function readManifest(source) {
  const entries = new Map();
  let brand = null;
  for (const line of source.split(/\r?\n/)) {
    const brandMatch = line.match(/^\s{2}(\w+):\s*\{\s*$/);
    if (brandMatch) {
      brand = brandMatch[1];
      continue;
    }
    const keyMatch = line.match(/^\s{4}(\w+):\s*[`'"]([^`'"]+)[`'"]/);
    if (brand && keyMatch) entries.set(`${brand}.${keyMatch[1]}`, keyMatch[2]);
  }
  return entries;
}

const manifest = readManifest(readFileSync(manifestPath, 'utf8'));
const productsSource = readFileSync(productsPath, 'utf8');
const assetKeys = [...new Set([...productsSource.matchAll(/assetKey(?::| =)\s*"([^"]+)"/g)].map((m) => m[1]))];

const problems = [];

// 1. Every manifest path must exist on disk.
for (const [key, path] of manifest) {
  if (!path.startsWith('/')) {
    problems.push(`${key}: "${path}" is not an absolute /public path`);
  } else if (!existsSync(join(publicDir, path.replace(/^\//, '')))) {
    problems.push(`${key}: ${path} does not exist in /public`);
  }
}

// 2. Every assetKey used by product/journal data must resolve through the manifest.
for (const key of assetKeys) {
  if (!manifest.has(key)) problems.push(`assetKey "${key}" (src/lib/products.ts) is missing from the manifest`);
}

console.log(`manifest entries: ${manifest.size}`);
console.log(`assetKeys checked: ${assetKeys.length}`);

if (problems.length) {
  console.error(`\n✖ ${problems.length} broken asset reference(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log('\n✔ all asset references resolve');
