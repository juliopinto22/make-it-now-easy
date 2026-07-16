import { NextRequest, NextResponse } from 'next/server';

// ── Rate limiting em memória (por IP) ──────────────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 120;       // máx requisições
const RATE_WINDOW = 60_000;   // janela de 60 segundos

// ── User-agents de bots/scanners conhecidos ────────────────────
const BOT_PATTERNS = [
  /sqlmap/i, /nikto/i, /nmap/i, /masscan/i, /dirbuster/i,
  /zgrab/i, /nuclei/i, /acunetix/i, /burpsuite/i, /havij/i,
  /python-requests/i, /go-http-client/i, /curl\/[0-9]/i,
  /wget/i, /libwww/i, /scrapy/i, /phantomjs/i, /headless/i,
];

// ── Paths suspeitos que atacantes tentam ──────────────────────
const BLOCKED_PATHS = [
  /\.(php|asp|aspx|jsp|cgi|env|git|svn|htaccess|htpasswd|DS_Store)/i,
  /\/(admin|wp-admin|wp-login|phpmyadmin|cpanel|xmlrpc)/i,
  /(\.\.\/|%2e%2e|%252e)/i,   // path traversal
  /(<script|javascript:|vbscript:|data:text\/html)/i,  // XSS
  /(union.*select|drop.*table|insert.*into|exec\(|eval\()/i, // SQLi
];

export function middleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const ua = req.headers.get('user-agent') ?? '';
  const path = req.nextUrl.pathname + req.nextUrl.search;
  const now = Date.now();

  // 1. Bloqueia bots/scanners pelo User-Agent
  if (BOT_PATTERNS.some(p => p.test(ua))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 2. Bloqueia paths suspeitos
  if (BLOCKED_PATHS.some(p => p.test(path))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // 3. Rate limiting por IP
  const record = rateMap.get(ip);
  if (!record || now > record.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
  } else {
    record.count++;
    if (record.count > RATE_LIMIT) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: { 'Retry-After': '60' },
      });
    }
  }

  // 4. Força HTTPS em produção
  if (
    process.env.NODE_ENV === 'production' &&
    req.headers.get('x-forwarded-proto') === 'http'
  ) {
    return NextResponse.redirect(`https://${req.headers.get('host')}${req.nextUrl.pathname}`, 301);
  }

  const res = NextResponse.next();

  // 5. Remove headers que revelam tecnologia usada
  res.headers.delete('x-powered-by');
  res.headers.delete('server');

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
