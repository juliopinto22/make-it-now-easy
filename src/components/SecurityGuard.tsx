'use client';

import { useEffect } from 'react';

export default function SecurityGuard() {
  useEffect(() => {
    // 1. Desativa clique direito
    const noContext = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', noContext);

    // 2. Bloqueia atalhos de DevTools e view-source
    const noShortcuts = (e: KeyboardEvent) => {
      const blocked =
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 'S') ||
        (e.ctrlKey && e.key === 'A' && (e.target as HTMLElement)?.tagName !== 'INPUT');
      if (blocked) e.preventDefault();
    };
    document.addEventListener('keydown', noShortcuts);

    // 3. Detecta DevTools aberto por tamanho da janela
    const detectDevTools = () => {
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        document.body.innerHTML = '';
        window.location.reload();
      }
    };
    const devToolsInterval = setInterval(detectDevTools, 1500);

    // 4. Proteção contra console
    const noop = () => undefined;
    const safeConsole = () => {
      try {
        Object.defineProperty(window, 'console', {
          get: () => ({ log: noop, warn: noop, error: noop, info: noop, debug: noop }),
          configurable: false,
        });
      } catch { /* já definido */ }
    };
    safeConsole();

    // 5. Bloqueia scripts injetados dinamicamente (observa o DOM)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeName === 'SCRIPT') {
            const src = (node as HTMLScriptElement).src || '';
            const allowed = [window.location.origin, 'vercel', 'happyseeds'];
            if (src && !allowed.some(a => src.includes(a))) {
              node.parentNode?.removeChild(node);
            }
          }
        });
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // 6. Desativa seleção de texto fora de inputs
    const noSelect = (e: Event) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT' ||
          (e.target as HTMLElement)?.tagName === 'TEXTAREA') return;
      e.preventDefault();
    };
    document.addEventListener('selectstart', noSelect);

    return () => {
      document.removeEventListener('contextmenu', noContext);
      document.removeEventListener('keydown', noShortcuts);
      document.removeEventListener('selectstart', noSelect);
      clearInterval(devToolsInterval);
      observer.disconnect();
    };
  }, []);

  return null;
}
