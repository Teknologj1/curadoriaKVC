# 🎨 Gerar Ícones PWA - Guia Rápido

## Opção 1: Online (Mais Fácil - 5 min)

### Passo a Passo:

1. **Acesse:** https://realfavicongenerator.net/
2. **Upload:** Sua logo/imagem (recomendado: 1024x1024px ou maior)
3. **Configurações:**
   - ✅ Android Chrome
   - ✅ iOS
   - ✅ Windows Metro
   - ✅ Favicon
4. **Download:** Baixe o pacote ZIP
5. **Extrair:** Coloque os arquivos em `public/icons/`

**Arquivos necessários:**
- `android-chrome-192x192.png` → renomear para `icon-192.png`
- `android-chrome-512x512.png` → renomear para `icon-512.png`
- Criar versões maskable (ou usar os mesmos)

---

## Opção 2: CLI (Automático - 2 min)

### Instalar:
```bash
npm install -g pwa-asset-generator
```

### Gerar:
```bash
# Se tiver logo.png na raiz
pwa-asset-generator logo.png public/icons --icon-only --favicon

# Ou especificar caminho completo
pwa-asset-generator ./assets/logo.png public/icons --icon-only
```

---

## Opção 3: Criar Manualmente (Placeholder)

Se não tiver logo ainda, pode usar placeholders temporários:

1. Criar imagem simples (quadrado) 1024x1024px
2. Cor de fundo: `#C9A24D` (dourado)
3. Texto: "KVC" ou inicial
4. Usar qualquer editor (Canva, Figma, Photoshop)
5. Exportar em PNG
6. Usar Opção 1 ou 2 acima

---

## Estrutura Final Esperada:

```
public/icons/
├── icon-192.png          (192x192)
├── icon-512.png          (512x512)
├── maskable-192.png      (192x192, com padding)
└── maskable-512.png      (512x512, com padding)
```

**Nota:** Versões maskable precisam ter padding (área segura) de ~20% ao redor do conteúdo.

---

## Verificar:

Após gerar, verificar se:
- ✅ Arquivos existem em `public/icons/`
- ✅ Manifest aponta corretamente (`/icons/icon-192.png`)
- ✅ Tamanhos corretos (192x192, 512x512)

