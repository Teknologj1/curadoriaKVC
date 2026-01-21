# CUradoria KVC — PWA Premium

**Curadoria Imobiliária Premium com Progressive Web App**

Dois modelos diferenciados: **Modelo A (Luxo Editorial)** e **Modelo B (Finder por Perfil)**.

---

## 🚀 Quick Start

### 1. Criar Projeto

```bash
# Criar projeto Next.js
npx create-next-app@latest curadoria-kvc --typescript --tailwind --app --no-src-dir

# Entrar na pasta
cd curadoria-kvc
```

### 2. Instalar Dependências

```bash
# Dependências PWA
npm install next-pwa idb

# Outras dependências (se necessário)
npm install
```

### 3. Copiar Arquivos

Copie todos os arquivos da documentação para o projeto:
- `app/` → pasta app completa
- `components/` → pasta components completa
- `lib/` → pasta lib completa
- `public/` → manifest, sw.js, offline.html, icons
- `styles/` → todos os CSS
- `next.config.mjs` → raiz
- `tsconfig.json` → raiz

### 4. Configurar

```bash
# Copiar .env.example
cp .env.example .env.local

# Editar .env.local com seus valores
```

### 5. Gerar Ícones PWA

Crie ícones 192x192, 512x512 e versões maskable em `public/icons/`

### 6. Executar

```bash
# Desenvolvimento
npm run dev

# Build produção
npm run build

# Iniciar produção
npm start
```

**Ver `SETUP_COMPLETO.md` para guia detalhado.**

### Dependências PWA

```bash
npm i next-pwa idb
```

---

## 📱 PWA Features

- ✅ **Instalável** (Android e iOS)
- ✅ **Offline inteligente** (App Shell + últimos imóveis)
- ✅ **Favoritos** (IndexedDB, persistência offline)
- ✅ **Cache otimizado** (Workbox strategies)
- ✅ **Push Notifications** (preparado para Fase 2)

---

## 📚 Documentação

### Estrutura Completa:

1. **Wireframes:** `WIREFRAMES.md`, `WIREFRAME_VISUAL.md`
2. **Design System:** `DESIGN_SYSTEM.md`
3. **Estrutura Técnica:** `ESTRUTURA_TECNICA.md`
4. **Spec Técnica:** `SPEC_TECNICA.md`
5. **Config + CMS:** `CONFIG_CMS_BLUEPRINT.md`
6. **Guia Editorial:** `GUIA_EDITORIAL.md`
7. **Templates:** `TEMPLATES_PRATICOS.md`, `TEMPLATES_CMS.md`
8. **PWA:** `PWA_IMPLEMENTATION.md`, `NEXTJS_PWA_SETUP.md`

### Índice Completo:

Ver `INDEX.md` para documentação completa.

---

## 🎯 Modelos

### Modelo A — Curadoria Editorial de Luxo

- **Tema:** Dark (luxo)
- **Foco:** Consultivo, editorial
- **Rota:** `/a`

### Modelo B — Finder por Perfil

- **Tema:** Light (clean)
- **Foco:** Rápido, funcional
- **Rota:** `/b`

---

## 💾 Favoritos

Sistema de favoritos com IndexedDB:

```tsx
import { SaveButton } from "@/components/pwa/SaveButton";

<SaveButton
  id={property.id}
  slug={property.slug}
  title={property.title}
  headline={property.headline}
  coverUrl={property.media.coverImage.url}
/>
```

Ver favoritos: `/salvos`

---

## 📱 Instalação PWA

O prompt de instalação aparece automaticamente após:
- 2ª visita, ou
- Salvar 1 favorito, ou
- Completar wizard (Modelo B)

---

## 🧪 Testes

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build
```

---

## 📦 Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **next-pwa** (Workbox)
- **idb** (IndexedDB)
- **CSS Modules** / **Tailwind** (opcional)

---

## 📄 Licença

Proprietário — KVC Curadoria

---

**Status:** Pronto para desenvolvimento  
**Versão:** 1.0.0
