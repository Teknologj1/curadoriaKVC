import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const nextConfig = withPWA({
  dest: "public",
  disable: isDev, // Desabilita PWA em desenvolvimento
  register: true,
  skipWaiting: true,

  // Fallback offline
  fallbacks: {
    document: "/offline"
  },

  // Workbox runtime caching
  runtimeCaching: [
    // 1) HTML/rotas: NetworkFirst (evita conteúdo velho)
    {
      urlPattern: ({ request }) => request.mode === "navigate",
      handler: "NetworkFirst",
      options: {
        cacheName: "pages",
        networkTimeoutSeconds: 3,
        expiration: { 
          maxEntries: 60, 
          maxAgeSeconds: 24 * 60 * 60 // 24 horas
        }
      }
    },

    // 2) API/CMS: StaleWhileRevalidate com TTL curto
    {
      urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "api",
        expiration: { 
          maxEntries: 200, 
          maxAgeSeconds: 60 * 30 // 30 min
        }
      }
    },

    // 3) Imagens: CacheFirst com expiração
    {
      urlPattern: ({ request }) => request.destination === "image",
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: { 
          maxEntries: 300, 
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 dias
        }
      }
    },

    // 4) CSS/JS/fonts: StaleWhileRevalidate
    {
      urlPattern: ({ request }) =>
        ["style", "script", "worker", "font"].includes(request.destination),
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "assets",
        expiration: { 
          maxEntries: 200, 
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 dias
        }
      }
    },

    // 5) CMS externo (se aplicável)
    {
      urlPattern: ({ url }) => 
        url.origin === "https://cms.seusite.com" || 
        url.origin === "https://api.sanity.io",
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "cms-external",
        expiration: { 
          maxEntries: 200, 
          maxAgeSeconds: 60 * 15 // 15 min
        }
      }
    }
  ]
})({
  // Next config normal
  reactStrictMode: true,
  swcMinify: true,
  
  // Otimizações
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
});

export default nextConfig;

