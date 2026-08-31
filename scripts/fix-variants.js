const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/components/zai');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const variantNames = [
  'fadeUp', 'stagger', 'heroStagger', 'contentVariants', 
  'containerVariants', 'childVariants', 'menuVariants', 'itemVariants'
];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  for (const vName of variantNames) {
    const regex = new RegExp(`const ${vName} = {`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `const ${vName}: Variants = {`);
      changed = true;
    }
  }

  // Also catch generic variants like `const variants = {`
  const genericRegex = /const variants = {/g;
  if (genericRegex.test(content)) {
    content = content.replace(genericRegex, 'const variants: Variants = {');
    changed = true;
  }

  if (changed) {
    // Ensure Variants is imported
    if (!content.includes('Variants')) {
      const framerRegex = /import\s+{[^}]*}\s+from\s+['"]framer-motion['"];?/;
      if (framerRegex.test(content)) {
        content = content.replace(framerRegex, (match) => {
          if (!match.includes('Variants')) {
            return match.replace('{', '{ Variants,');
          }
          return match;
        });
      }
    } else {
        const framerRegex = /import\s+{([^}]*)}\s+from\s+['"]framer-motion['"];?/;
        const match = content.match(framerRegex);
        if (match && !match[1].includes('Variants')) {
            content = content.replace(framerRegex, (m) => m.replace('{', '{ Variants, '));
        }
    }
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
}
