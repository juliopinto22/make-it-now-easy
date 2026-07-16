/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Bloqueia o site de ser embutido em iframes (clickjacking)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Impede o browser de adivinhar o tipo de conteúdo (MIME sniffing)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Força HTTPS por 1 ano
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // Controla informações do referrer
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Bloqueia acesso a câmera, microfone, geolocalização
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // Proteção XSS para browsers antigos
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Content Security Policy — bloqueia scripts externos não autorizados
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['phaser'],
  allowedDevOrigins: ['**.*.*'],
  env: {
    PROJECT_ID: process.env.HAPPYSEEDS_PROJECT_ID ?? '',
    REACTUS_BASE_URL: process.env.REACTUS_BASE_URL ?? '',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
