'use client';

import React from 'react';
import { AlertTriangle, Zap, Shield, Cpu, MonitorCog, Wifi, Wrench, Gamepad2, Gem } from 'lucide-react';
import { AlertBox } from '@/components/ui/Blocks';

export default function HomeScreen() {
  return (
    <div>
      <PageTitle icon="⚡">OTIMIZE SEU PC</PageTitle>

      <p style={{ color: 'var(--text-muted)', marginBottom: 22, fontSize: 16, fontWeight: 500, lineHeight: 1.6 }}>
        Bem-vindo ao <strong style={{ color: 'var(--accent)' }}>Make It Now Easy</strong> — sua biblioteca
        completa de otimização de PC. Escolha uma categoria no menu ao lado e siga os passos detalhados.
      </p>

      <AlertBox type="warning">
        <AlertTriangle size={18} style={{ flexShrink: 0 }} />
        <span>
          <strong>ANTES DE QUALQUER COISA:</strong> Crie um Ponto de Restauração!
          Win + R → sysdm.cpl → Proteção do Sistema → Criar → dê um nome e confirme.
        </span>
      </AlertBox>

      {/* Quick navigation cards */}
      <h3 style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '24px 0 12px' }}>
        📚 BIBLIOTECA GRÁTIS
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {freeCards.map((c, i) => (
          <div key={i} style={navCard}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{c.emoji}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent)', marginBottom: 4 }}>{c.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.5 }}>{c.desc}</div>
            <div style={{ fontSize: 12, color: '#444', marginTop: 8, fontWeight: 700 }}>{c.count} dicas detalhadas</div>
          </div>
        ))}
      </div>

      {/* Premium teaser */}
      <div style={premiumTeaser}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <Gem size={20} color="var(--premium)" />
          <span style={{ color: 'var(--premium)', fontWeight: 900, fontSize: 16 }}>MODO PREMIUM</span>
        </div>
        <p style={{ fontSize: 14, color: '#aaa', fontWeight: 500, lineHeight: 1.6, marginBottom: 14 }}>
          Desbloqueie ajustes na BIOS, otimizações de CPU/RAM, configurações secretas de FPS,
          serviços do Windows para desativar e muito mais. Por apenas <strong style={{ color: 'var(--premium)' }}>R$ 5,00</strong> — pagamento único.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {premiumTags.map((t, i) => (
            <span key={i} style={tag}>{t}</span>
          ))}
        </div>
      </div>

      {/* Tips summary */}
      <h3 style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '28px 0 12px' }}>
        💡 DICAS RÁPIDAS DE OURO
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {quickTips.map((t, i) => (
          <div key={i} style={quickTipRow}>
            <span style={quickTipNum}>{i + 1}</span>
            <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.5 }}
              dangerouslySetInnerHTML={{ __html: t }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageTitle({ icon, children, premium }: {
  icon?: string; children: React.ReactNode; premium?: boolean;
}) {
  return (
    <div style={{ marginBottom: 30, position: 'relative' }}>
      <h2 style={{
        fontSize: 24, fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16,
        background: premium
          ? 'linear-gradient(90deg, #f0abfc, #e879f9, #c084fc)'
          : 'linear-gradient(90deg, #e0aaff, #c084fc, #a855f7)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        {icon && (
          <span style={{
            WebkitTextFillColor: 'initial',
            filter: premium ? 'drop-shadow(0 0 8px rgba(232,121,249,0.8))' : 'drop-shadow(0 0 8px rgba(168,85,247,0.8))',
            animation: 'floatIcon 3s ease-in-out infinite',
            display: 'inline-block',
          }}>
            {icon}
          </span>
        )}
        {children}
      </h2>
      {/* Glow underline */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: premium
          ? 'linear-gradient(90deg, rgba(232,121,249,0.7), rgba(168,85,247,0.3), transparent)'
          : 'linear-gradient(90deg, rgba(168,85,247,0.7), rgba(34,211,238,0.2), transparent)',
        boxShadow: premium ? '0 0 8px rgba(232,121,249,0.4)' : '0 0 8px rgba(168,85,247,0.4)',
      }} />
    </div>
  );
}

export function CardTitle({ icon, children, premium }: {
  icon?: React.ReactNode; children: React.ReactNode; premium?: boolean;
}) {
  return (
    <h3 style={{
      color: premium ? '#f0abfc' : '#d8b4fe',
      marginBottom: 10, display: 'flex', alignItems: 'center',
      gap: 10, fontSize: 16, fontWeight: 800, letterSpacing: '0.5px',
      textShadow: premium ? '0 0 10px rgba(232,121,249,0.5)' : '0 0 10px rgba(168,85,247,0.5)',
    }}>
      <span style={{ opacity: 0.9 }}>{icon}</span>{children}
    </h3>
  );
}

const freeCards = [
  { emoji: '🪟', title: 'Windows', desc: 'Inicialização, modo desempenho, limpeza, efeitos visuais e muito mais.', count: 7 },
  { emoji: '🔧', title: 'Drivers', desc: 'Sites oficiais, quando atualizar, instalação limpa com DDU.', count: 5 },
  { emoji: '🎮', title: 'Jogos / FPS', desc: 'Modo Jogo, taxa de atualização, configurações gráficas, FPS counter.', count: 7 },
  { emoji: '🛜', title: 'Rede / Lag', desc: 'Cabo vs Wi-Fi, DNS, roteador, diagnóstico de conexão.', count: 5 },
];

const premiumTags = ['⚙️ BIOS', '💾 XMP/EXPO', '🌡️ Temperatura', '🔧 Regedit', '🎮 NVIDIA Tweaks', '📡 TCP/IP', '🖥️ Serviços Windows'];

const quickTips = [
  '<strong style="color:var(--accent)">Reinicie o PC regularmente</strong> — não deixe no modo suspensão por dias. O reinício limpa a memória e resolve 80% dos travamentos.',
  '<strong style="color:var(--accent)">HD vs SSD faz toda a diferença</strong> — se o PC demora mais de 1 min para iniciar, trocar para SSD é o melhor upgrade possível.',
  '<strong style="color:var(--accent)">8GB de RAM é o mínimo para jogos</strong> — com 16GB você nota diferença real, especialmente em jogos modernos.',
  '<strong style="color:var(--accent)">Antivírus nativo é suficiente</strong> — o Windows Defender atual é excelente. AVG, Avast e similares gratuitos às vezes atrapalham mais do que ajudam.',
  '<strong style="color:var(--accent)">Temperatura importa mais que velocidade</strong> — um CPU que não superaquece sustenta o desempenho por mais tempo do que um superclockado mas quente.',
];

const navCard: React.CSSProperties = {
  background: 'var(--bg-card)', border: '1px solid var(--border)',
  borderRadius: 12, padding: '18px 20px', cursor: 'default',
  transition: 'border-color 0.2s',
};

const premiumTeaser: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1a1400 0%, #0f0f00 100%)',
  border: '1px solid rgba(255,215,0,0.3)',
  borderRadius: 12, padding: '20px 22px', marginTop: 20,
};

const tag: React.CSSProperties = {
  background: 'rgba(255,215,0,0.1)', color: 'var(--premium)',
  fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
  border: '1px solid rgba(255,215,0,0.2)',
};

const quickTipRow: React.CSSProperties = {
  display: 'flex', alignItems: 'flex-start', gap: 12,
  background: 'var(--bg-card)', borderRadius: 8, padding: '12px 16px',
  border: '1px solid var(--border)',
};

const quickTipNum: React.CSSProperties = {
  background: 'var(--accent)', color: '#000', borderRadius: '50%',
  width: 22, height: 22, minWidth: 22, display: 'flex',
  alignItems: 'center', justifyContent: 'center',
  fontSize: 11, fontWeight: 900, marginTop: 2,
};
