const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let current = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(current.trim());
      if (row.some(field => field.length > 0)) {
        lines.push(row);
      }
      row = [];
      current = '';
    } else {
      current += char;
    }
  }
  if (current.length > 0 || row.length > 0) {
    row.push(current.trim());
    if (row.some(field => field.length > 0)) lines.push(row);
  }
  return lines;
}

const csvPath = path.join(__dirname, '..', 'public', 'images', 'zai', 'beaute', 'products', 'zai-beaute-products.csv');
const raw = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(raw);
const headers = rows[0];
console.log('CSV Headers:', headers);
console.log('Total data rows:', rows.length - 1);

const parsed = rows.slice(1).map((r, idx) => {
  const obj = {};
  headers.forEach((h, i) => obj[h] = r[i] || '');
  return { idx: idx + 1, ...obj };
});

// Audit inspection
parsed.forEach(p => {
  console.log(`[#${p.idx}] Name: "${p['product-name-plp-h3']}" | Price: ${p['new-price']} | UAE URL: ${p['product-img href']} | Swatches: ${p['plp-swatches'] || 'none'} | Badge: ${p['pro-badge'] || 'none'}`);
});
