'use client';

import React, { useState } from 'react';
import { X, Info } from 'lucide-react';

export default function TopBanner() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botão pequeno canto esquerdo */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: 999,
          background: '#fff',
          color: '#111',
          border: 'none',
          borderRadius: 20,
          padding: '5px 12px',
          fontSize: 12,
          fontWeight: 700,
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <Info size={13} />
        Aviso
      </button>

      {/* Popup com motivo */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              background: '#111',
              border: '1px solid #333',
              borderRadius: 14,
              padding: '24px 22px',
              maxWidth: 360,
              width: '100%',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute', top: 12, right: 12,
                background: 'transparent', border: 'none',
                color: '#666', cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ fontSize: 22, marginBottom: 10 }}>🔧</div>
            <h3 style={{ color: '#fff', fontWeight: 900, fontSize: 16, marginBottom: 10 }}>
              Suporte temporariamente indisponível
            </h3>
            <p style={{ color: '#aaa', fontSize: 14, fontWeight: 500, lineHeight: 1.6 }}>
              Os moderadores estão trabalhando em melhorias e atualizações do site.
              Em breve o suporte estará disponível novamente. Obrigado pela paciência! 🙏
            </p>

            <button
              onClick={() => setOpen(false)}
              style={{
                marginTop: 18, width: '100%',
                background: '#fff', color: '#000',
                border: 'none', borderRadius: 8,
                padding: '10px', fontSize: 14,
                fontWeight: 800, cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
