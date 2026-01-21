/**
 * Script para criar ícones placeholder temporários
 * Execute: node scripts/create-placeholder-icons.js
 * 
 * Requer: canvas (npm install canvas)
 * Ou use: https://realfavicongenerator.net/ (mais fácil)
 */

const fs = require('fs');
const path = require('path');

// Criar pasta se não existir
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('📝 Criando instruções para ícones...');
console.log('');
console.log('⚠️  Este script não gera imagens automaticamente.');
console.log('');
console.log('✅ SOLUÇÃO RÁPIDA:');
console.log('1. Acesse: https://realfavicongenerator.net/');
console.log('2. Upload uma imagem (1024x1024px recomendado)');
console.log('3. Download e extraia para public/icons/');
console.log('4. Renomeie:');
console.log('   - android-chrome-192x192.png → icon-192.png');
console.log('   - android-chrome-512x512.png → icon-512.png');
console.log('');
console.log('📁 Pasta criada: public/icons/');
console.log('');

// Criar arquivo README na pasta icons
const readmeContent = `# Ícones PWA

Coloque os seguintes arquivos aqui:

- icon-192.png (192x192px)
- icon-512.png (512x512px)
- maskable-192.png (192x192px, com padding)
- maskable-512.png (512x512px, com padding)

## Gerar ícones:

1. Acesse: https://realfavicongenerator.net/
2. Upload sua logo/imagem
3. Download e extraia aqui
4. Renomeie conforme acima
`;

fs.writeFileSync(path.join(iconsDir, 'README.md'), readmeContent);
console.log('✅ README.md criado em public/icons/');
console.log('');
console.log('🎯 Próximo passo: Gerar ícones usando RealFaviconGenerator');

