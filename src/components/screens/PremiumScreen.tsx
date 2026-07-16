'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Lock } from 'lucide-react';
import { AlertBox } from '@/components/ui/Blocks';
import { PageTitle } from './HomeScreen';
import PixModal from '@/components/PixModal';

const benefits = [
  { icon: '⚙️', title: 'Ajustes avançados do Windows', desc: 'Registro, serviços, políticas de grupo e configurações ocultas passo a passo.' },
  { icon: '🔵', title: 'Configurações completas na BIOS', desc: 'XMP/EXPO para RAM, modos de energia, boot seguro, virtualização e muito mais.' },
  { icon: '🚀', title: 'Otimização extrema de CPU', desc: 'Como liberar núcleos, ajustar afinidade de processos e configurar TDP.' },
  { icon: '💾', title: 'Memória RAM ao máximo', desc: 'Como ativar XMP/EXPO, ajustar timings e verificar se a RAM está na velocidade certa.' },
  { icon: '🌡️', title: 'Temperatura e refrigeração', desc: 'Como monitorar, limpar e aplicar pasta térmica para evitar throttling.' },
  { icon: '🎮', title: 'Configurações secretas de FPS', desc: 'Tweaks avançados no regedit e nos painéis da NVIDIA/AMD para extrair mais performance.' },
  { icon: '🛜', title: 'Rede de alto nível', desc: 'Configurações avançadas de TCP/IP, QoS, latência e otimização de pacotes.' },
  { icon: '🔄', title: 'Atualizações constantes', desc: 'Novas dicas adicionadas sempre — uma vez comprado, acesso para sempre.' },
];

const lockedPreviews = [
  { title: 'Como ativar XMP/EXPO na BIOS', preview: 'A memória RAM geralmente opera abaixo da velocidade anunciada. Com XMP ativo...' },
  { title: 'Ajustar TDP do processador via throttlestop', preview: 'O throttling térmico pode reduzir seu CPU em até 40% do desempenho máximo...' },
  { title: 'Configurações TCP/IP para jogos online', preview: 'O Windows tem parâmetros de rede que podem ser ajustados via regedit para...' },
  { title: 'Como usar o Regedit para desativar telemetria', preview: 'O Windows envia dados em segundo plano constantemente. Para desativar...' },
];

export default function PremiumScreen() {
  const [pixOpen, setPixOpen] = useState(false);

  return (
    <div>
      <PixModal open={pixOpen} onClose={() => setPixOpen(false)} />
      <PageTitle icon="💎" premium>
        MODO PREMIUM COMPLETO
      </PageTitle>

      {/* Pricing box */}
      <div style={pricingBox}>
        <div style={{ fontSize: 13, color: '#888', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
          Acesso único e vitalício
        </div>
        <h3 style={{ fontSize: 24, color: 'var(--premium)', marginBottom: 4, fontWeight: 900 }}>
          TODAS AS FUNÇÕES LIBERADAS
        </h3>
        <p style={{ color: '#aaa', fontSize: 14, fontWeight: 500, marginBottom: 16 }}>
          Pague uma vez. Acesse para sempre. Sem assinatura.
        </p>

        <div style={{ fontSize: 42, fontWeight: 900, color: 'var(--premium)', lineHeight: 1 }}>
          R$ 5,00
        </div>
        <div style={{ fontSize: 13, color: '#666', fontWeight: 600, marginBottom: 22, marginTop: 4 }}>
          Pagamento único
        </div>

        <button
          style={btnStyle}
          onClick={() => setPixOpen(true)}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 25px rgba(255,215,0,0.5)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }}
        >
          💳 QUERO O PREMIUM AGORA
        </button>
      </div>

      {/* Benefits grid */}
      <h3 style={{ color: 'var(--premium)', fontWeight: 900, fontSize: 17, margin: '28px 0 14px' }}>
        O QUE VOCÊ VAI DESBLOQUEAR:
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {benefits.map((b, i) => (
          <div key={i} style={benefitCard}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{b.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--premium)', marginBottom: 4 }}>{b.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.5 }}>{b.desc}</div>
          </div>
        ))}
      </div>

      {/* Locked previews */}
      <h3 style={{ color: '#888', fontWeight: 900, fontSize: 17, margin: '28px 0 14px' }}>
        PRÉVIA DO CONTEÚDO BLOQUEADO:
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {lockedPreviews.map((lp, i) => (
          <div key={i} style={lockedCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Lock size={14} color="var(--premium)" />
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--premium)' }}>{lp.title}</span>
            </div>
            <p style={{ fontSize: 13, color: '#555', fontWeight: 500, lineHeight: 1.5, filter: 'blur(3px)', userSelect: 'none' }}>
              {lp.preview}
            </p>
            <div style={{ fontSize: 12, color: 'var(--premium)', fontWeight: 700, marginTop: 6 }}>
              🔒 Disponível no Premium
            </div>
          </div>
        ))}
      </div>

      <AlertBox type="danger">
        <AlertTriangle size={18} style={{ flexShrink: 0 }} />
        ATENÇÃO: Ajustes na BIOS são delicados! Siga os passos exatamente como indicado e apenas
        se tiver conhecimento básico. Alterações erradas podem afetar o funcionamento do computador.
      </AlertBox>
    </div>
  );
}

const pricingBox: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1A1A00 0%, #0a0a00 50%, #000 100%)',
  border: '2px solid var(--premium)',
  padding: '30px 30px 24px',
  borderRadius: 15,
  textAlign: 'center',
  margin: '0 0 8px',
  boxShadow: '0 0 40px rgba(255,215,0,0.08)',
};

const btnStyle: React.CSSProperties = {
  background: 'var(--premium)',
  color: '#000',
  border: 'none',
  padding: '15px 44px',
  fontSize: 16,
  fontWeight: 900,
  borderRadius: 8,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'all 0.2s ease',
  letterSpacing: '0.5px',
};

const benefitCard: React.CSSProperties = {
  background: 'rgba(255,215,0,0.04)',
  border: '1px solid rgba(255,215,0,0.2)',
  borderRadius: 10,
  padding: '16px 18px',
};

const lockedCard: React.CSSProperties = {
  background: '#0d0d0d',
  border: '1px solid #222',
  borderRadius: 10,
  padding: '14px 18px',
};
