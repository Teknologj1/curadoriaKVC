/**
 * Cria ícones placeholder simples usando Canvas (Node.js)
 * Execute: node scripts/create-simple-icons.js
 */

const fs = require('fs');
const path = require('path');

// Verificar se canvas está disponível
let canvas;
try {
  canvas = require('canvas');
} catch (e) {
  console.log('⚠️  Canvas não instalado. Criando instruções...');
  console.log('');
  console.log('✅ SOLUÇÃO RÁPIDA:');
  console.log('1. Acesse: https://realfavicongenerator.net/');
  console.log('2. Crie uma imagem simples (1024x1024px) com:');
  console.log('   - Fundo: #C9A24D (dourado)');
  console.log('   - Texto: "KVC" ou inicial');
  console.log('3. Upload e download');
  console.log('4. Extraia para public/icons/');
  console.log('');
  process.exit(0);
}

const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

function createIcon(size) {
  const canvasElement = canvas.createCanvas(size, size);
  const ctx = canvasElement.getContext('2d');

  // Fundo dourado
  ctx.fillStyle = '#C9A24D';
  ctx.fillRect(0, 0, size, size);

  // Texto "KVC"
  ctx.fillStyle = '#0E0E10';
  ctx.font = `bold ${size * 0.4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('KVC', size / 2, size / 2);

  return canvasElement.toBuffer('image/png');
}

const sizes = [192, 512];

console.log('🎨 Criando ícones placeholder...');

sizes.forEach(size => {
  const buffer = createIcon(size);
  const filename = `icon-${size}.png`;
  const filepath = path.join(iconsDir, filename);
  fs.writeFileSync(filepath, buffer);
  console.log(`✅ Criado: ${filename} (${size}x${size})`);
});

// Criar versões maskable (com padding)
sizes.forEach(size => {
  const canvasElement = canvas.createCanvas(size, size);
  const ctx = canvasElement.getContext('2d');

  // Fundo transparente
  ctx.clearRect(0, 0, size, size);

  // Padding de 20%
  const padding = size * 0.2;
  const innerSize = size - (padding * 2);

  // Fundo dourado (área segura)
  ctx.fillStyle = '#C9A24D';
  ctx.fillRect(padding, padding, innerSize, innerSize);

  // Texto "KVC" (menor para caber na área segura)
  ctx.fillStyle = '#0E0E10';
  ctx.font = `bold ${innerSize * 0.4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('KVC', size / 2, size / 2);

  const buffer = canvasElement.toBuffer('image/png');
  const filename = `maskable-${size}.png`;
  const filepath = path.join(iconsDir, filename);
  fs.writeFileSync(filepath, buffer);
  console.log(`✅ Criado: ${filename} (${size}x${size}, maskable)`);
});

console.log('');
console.log('✅ Ícones placeholder criados!');
console.log('⚠️  IMPORTANTE: Substitua por ícones reais antes do deploy final.');
console.log('   Use: https://realfavicongenerator.net/');



