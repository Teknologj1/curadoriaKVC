# 🎨 Ícones PWA - Instruções

## ⚠️ AÇÃO NECESSÁRIA

Coloque os seguintes arquivos nesta pasta:

```
public/icons/
├── icon-192.png          (192x192px) - OBRIGATÓRIO
├── icon-512.png          (512x512px) - OBRIGATÓRIO
├── maskable-192.png      (192x192px, com padding) - RECOMENDADO
└── maskable-512.png      (512x512px, com padding) - RECOMENDADO
```

---

## 🚀 Gerar Ícones (5 minutos)

### Opção 1: Online (Mais Fácil)

1. **Acesse:** https://realfavicongenerator.net/
2. **Upload:** Sua logo/imagem (1024x1024px ou maior)
3. **Configurações:**
   - ✅ Android Chrome
   - ✅ iOS
   - ✅ Favicon
4. **Download:** Baixe o pacote ZIP
5. **Extrair aqui:**
   - `android-chrome-192x192.png` → renomear para `icon-192.png`
   - `android-chrome-512x512.png` → renomear para `icon-512.png`
   - Para maskable: usar os mesmos ou criar com padding de 20%

### Opção 2: CLI

```bash
npm install -g pwa-asset-generator
pwa-asset-generator logo.png public/icons --icon-only
```

---

## ✅ Verificar

Após adicionar os ícones:

1. Verificar se arquivos existem
2. Verificar tamanhos (192x192, 512x512)
3. Testar build: `npm run build`
4. Verificar manifest: `/manifest.webmanifest`

---

## 📝 Notas

- **Maskable:** Versões maskable precisam ter padding (área segura) de ~20%
- **Formato:** PNG com fundo transparente ou sólido
- **Qualidade:** Alta resolução (não comprimir demais)
