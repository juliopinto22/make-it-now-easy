'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, QrCode } from 'lucide-react';

// ── dados internos — nunca exibidos na tela ────────────────────────────────
const PIX_KEY     = 'juliocesarserafim1234565@gmail.com';
const PIX_AMOUNT  = '5.00';
const WA_NUMBER   = '5511995289506';
const WA_MSG      = encodeURIComponent(
  'Olá! Acabei de fazer o PIX de R$ 5,00 para o Premium do Make It Now Easy. Segue o comprovante!'
);
// ──────────────────────────────────────────────────────────────────────────

interface Props { open: boolean; onClose: () => void; }

export default function PixModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <QrCode size={20} color="var(--premium)" />
            <span style={{ fontSize: 17, fontWeight: 900, color: 'var(--premium)' }}>
              PAGUE COM PIX
            </span>
          </div>
          <button onClick={onClose} style={closeBtn}><X size={20} /></button>
        </div>

        {/* Amount */}
        <div style={amountBox}>
          <div style={{ fontSize: 12, color: '#888', fontWeight: 700, marginBottom: 4, letterSpacing: 1 }}>
            VALOR
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: 'var(--premium)', lineHeight: 1 }}>
            R$ {PIX_AMOUNT}
          </div>
          <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
            pagamento único · acesso vitalício
          </div>
        </div>

        {/* QR Code */}
        <div style={qrBox}>
          <div style={qrFrame}>
            <QRCodeSVG
              value={PIX_KEY}
              size={190}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
            />
          </div>
          <p style={{ fontSize: 13, color: '#888', marginTop: 12, fontWeight: 500 }}>
            Escaneie com o app do seu banco
          </p>
        </div>

        {/* Steps */}
        <div style={stepsBox}>
          {steps.map((s, i) => (
            <div key={i} style={stepRow}>
              <span style={stepNum}>{i + 1}</span>
              <span
                style={{ fontSize: 13, color: '#bbb', fontWeight: 500, lineHeight: 1.5 }}
                dangerouslySetInnerHTML={{ __html: s }}
              />
            </div>
          ))}
        </div>

        {/* Notice */}
        <div style={notice}>
          ✅ Após o pagamento, envie o comprovante pelo WhatsApp para liberar o acesso na hora!
        </div>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          style={waBtn}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
        >
          <WaIcon />
          Enviar comprovante no WhatsApp
        </a>

        <button onClick={onClose} style={doneBtn}>Fechar</button>
      </div>
    </div>
  );
}

function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const steps = [
  'Abra o app do seu banco e vá em <strong>Pix → Pagar com QR Code</strong>',
  'Aponte a câmera para o QR Code acima',
  'Confirme o valor de <strong>R$ 5,00</strong> e finalize o pagamento',
  'Envie o comprovante pelo WhatsApp logo abaixo',
];

const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 9999, padding: 20,
};
const modal: React.CSSProperties = {
  background: '#0f0f0f', border: '2px solid var(--premium)',
  borderRadius: 16, width: '100%', maxWidth: 440,
  boxShadow: '0 0 60px rgba(255,215,0,0.15)',
  display: 'flex', flexDirection: 'column',
};
const header: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '16px 20px 14px', borderBottom: '1px solid #1a1a00',
};
const closeBtn: React.CSSProperties = {
  background: 'transparent', border: 'none', color: '#666',
  cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center',
};
const amountBox: React.CSSProperties = {
  textAlign: 'center', padding: '20px 20px 16px',
  background: 'linear-gradient(135deg,#1a1400,#0a0a00)',
  borderBottom: '1px solid #1a1a00',
};
const qrBox: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  padding: '22px 20px 14px', borderBottom: '1px solid #1a1a00',
};
const qrFrame: React.CSSProperties = {
  background: '#fff', borderRadius: 12, padding: 12,
  boxShadow: '0 0 30px rgba(255,215,0,0.2)',
};
const stepsBox: React.CSSProperties = {
  padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10,
  borderBottom: '1px solid #1a1a00',
};
const stepRow: React.CSSProperties = { display: 'flex', alignItems: 'flex-start', gap: 10 };
const stepNum: React.CSSProperties = {
  background: 'var(--accent)', color: '#000', borderRadius: '50%',
  width: 20, height: 20, minWidth: 20, display: 'flex',
  alignItems: 'center', justifyContent: 'center',
  fontSize: 11, fontWeight: 900, marginTop: 2,
};
const notice: React.CSSProperties = {
  margin: '12px 20px 0', background: 'rgba(255,204,0,0.08)',
  border: '1px solid rgba(255,204,0,0.2)', borderRadius: 8,
  padding: '12px 14px', fontSize: 13, color: 'var(--accent)',
  fontWeight: 600, lineHeight: 1.5,
};
const waBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  margin: '12px 20px 0', background: '#25D366', color: '#fff',
  borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 800,
  textDecoration: 'none', transition: 'opacity 0.2s', fontFamily: 'inherit',
};
const doneBtn: React.CSSProperties = {
  margin: '10px 20px 20px', background: 'transparent',
  border: '1px solid #333', borderRadius: 8, color: '#666',
  padding: '10px', fontSize: 14, fontWeight: 700,
  cursor: 'pointer', fontFamily: 'inherit',
};
