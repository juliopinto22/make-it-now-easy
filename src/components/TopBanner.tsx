'use client';

import React from 'react';

export default function TopBanner() {
  return (
    <div style={{
      width: '100%',
      background: '#1a0000',
      borderBottom: '1px solid var(--danger)',
      padding: '10px 20px',
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 700,
      color: '#FF3333',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 999,
    }}>
      ⚠️ Não há suporte por enquanto. Em breve voltamos!
    </div>
  );
}
