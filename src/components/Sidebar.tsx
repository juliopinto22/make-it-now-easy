'use client';

import React from 'react';
import { Home, MonitorCog, Wrench, Gamepad2, Wifi, Gem, Settings2, Scale } from 'lucide-react';

export type ScreenId = 'inicio' | 'windows' | 'drivers' | 'jogos' | 'rede' | 'premium' | 'avancado' | 'direitos';

interface NavItem { id: ScreenId; label: string; icon: React.ReactNode; premium?: boolean; }

const freeItems: NavItem[] = [
  { id: 'inicio',   label: 'Início',   icon: <Home size={17} /> },
  { id: 'windows',  label: 'Windows',  icon: <MonitorCog size={17} /> },
  { id: 'drivers',  label: 'Drivers',  icon: <Wrench size={17} /> },
  { id: 'jogos',    label: 'Jogos',    icon: <Gamepad2 size={17} /> },
  { id: 'rede',     label: 'Rede',     icon: <Wifi size={17} /> },
  { id: 'direitos', label: 'Dir. Autorais', icon: <Scale size={17} /> },
];

const premiumItems: NavItem[] = [
  { id: 'premium',  label: 'Conhecer Premium',  icon: <Gem size={17} />,      premium: true },
  { id: 'avancado', label: 'Ajustes Avançados', icon: <Settings2 size={17} />, premium: true },
];

interface SidebarProps { active: ScreenId; onSelect: (id: ScreenId) => void; }

export default function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <nav style={navStyle}>
      {/* Neon inner line */}
      <div style={innerLine} />

      {/* ── LOGO ── */}
      <div style={logoWrap}>
        <div style={logoBgGlow} />

        {/* Top accent line */}
        <div style={logoTopLine} />

        <div style={{ animation: 'floatIcon 3s ease-in-out infinite', fontSize: 36, lineHeight: 1, marginBottom: 8, filter: 'drop-shadow(0 0 12px rgba(168,85,247,0.9))' }}>
          ⚡
        </div>

        <div style={logoMakeIt}>MAKE IT</div>

        <div style={logoNowEasy}>NOW EASY</div>

        <div style={logoBadge}>
          <span style={{ filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.8))' }}>🎮</span>
          GAMER EDITION
        </div>

        {/* Bottom accent line */}
        <div style={logoBottomLine} />
      </div>

      {/* ── FREE SECTION ── */}
      <SectionLabel>📚 Biblioteca Grátis</SectionLabel>
      {freeItems.map(item => (
        <NavBtn key={item.id} item={item} isActive={active === item.id} onClick={() => onSelect(item.id)} />
      ))}

      {/* ── PREMIUM SECTION ── */}
      <SectionLabel premium>⭐ Modo Premium</SectionLabel>
      {premiumItems.map(item => (
        <NavBtn key={item.id} item={item} isActive={active === item.id} onClick={() => onSelect(item.id)} />
      ))}
    </nav>
  );
}

function SectionLabel({ children, premium }: { children: React.ReactNode; premium?: boolean }) {
  return (
    <div style={{
      fontSize: 10, textTransform: 'uppercase', letterSpacing: '1.5px',
      color: premium ? 'rgba(232,121,249,0.7)' : 'rgba(168,85,247,0.6)',
      padding: '18px 20px 8px', fontWeight: 800,
    }}>
      {children}
    </div>
  );
}

function NavBtn({ item, isActive, onClick }: { item: NavItem; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 11,
        padding: '11px 18px', width: '100%',
        background: isActive
          ? 'linear-gradient(90deg, rgba(168,85,247,0.22) 0%, rgba(168,85,247,0.06) 100%)'
          : 'transparent',
        border: 'none',
        borderLeft: `3px solid ${isActive ? '#c084fc' : 'transparent'}`,
        color: isActive ? '#e0aaff' : item.premium ? '#e879f9' : '#c4b5d4',
        cursor: 'pointer', fontSize: 14, fontWeight: isActive ? 800 : 600,
        fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.18s ease',
        textShadow: isActive ? '0 0 10px rgba(168,85,247,0.7)' : 'none',
        boxShadow: isActive ? 'inset 0 0 20px rgba(168,85,247,0.06)' : 'none',
        borderRadius: '0 8px 8px 0',
        marginRight: 8,
      }}
      onMouseEnter={e => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(168,85,247,0.1)';
          (e.currentTarget as HTMLButtonElement).style.color = '#d8b4fe';
          (e.currentTarget as HTMLButtonElement).style.paddingLeft = '22px';
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          (e.currentTarget as HTMLButtonElement).style.color = item.premium ? '#e879f9' : '#c4b5d4';
          (e.currentTarget as HTMLButtonElement).style.paddingLeft = '18px';
        }
      }}
    >
      <span style={{ opacity: isActive ? 1 : 0.7, flexShrink: 0 }}>{item.icon}</span>
      <span>{item.label}</span>
      {item.premium && !isActive && <span style={{ marginLeft: 'auto', fontSize: 11 }}>⭐</span>}
      {isActive && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#c084fc', boxShadow: '0 0 8px #c084fc', flexShrink: 0 }} />}
    </button>
  );
}

/* ── STYLES ── */
const navStyle: React.CSSProperties = {
  width: 240, position: 'fixed', top: 0, left: 0, height: '100vh',
  background: 'linear-gradient(160deg, #0b0b1f 0%, #070714 60%, #050510 100%)',
  borderRight: '1px solid rgba(168,85,247,0.25)',
  boxShadow: '4px 0 40px rgba(168,85,247,0.1)',
  overflowY: 'auto', zIndex: 50, display: 'flex', flexDirection: 'column',
};
const innerLine: React.CSSProperties = {
  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
  background: 'linear-gradient(180deg, rgba(168,85,247,0.08) 0%, transparent 30%, transparent 70%, rgba(232,121,249,0.05) 100%)',
  pointerEvents: 'none',
};
const logoWrap: React.CSSProperties = {
  padding: '22px 20px 20px', textAlign: 'center',
  position: 'relative', overflow: 'hidden',
};
const logoBgGlow: React.CSSProperties = {
  position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
  width: 160, height: 120,
  background: 'radial-gradient(ellipse, rgba(168,85,247,0.2) 0%, transparent 70%)',
  pointerEvents: 'none',
};
const logoTopLine: React.CSSProperties = {
  position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
  background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.7), rgba(232,121,249,0.5), transparent)',
};
const logoMakeIt: React.CSSProperties = {
  fontSize: 10, fontWeight: 900, letterSpacing: '5px',
  color: 'rgba(200,180,255,0.5)', textTransform: 'uppercase', marginBottom: 2,
};
const logoNowEasy: React.CSSProperties = {
  fontSize: 22, fontWeight: 900, letterSpacing: '3px', textTransform: 'uppercase',
  background: 'linear-gradient(90deg, #c084fc 0%, #e879f9 50%, #a855f7 100%)',
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  animation: 'gradientShift 4s ease infinite',
  marginBottom: 10, lineHeight: 1.1,
};
const logoBadge: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  background: 'linear-gradient(90deg, rgba(168,85,247,0.2), rgba(232,121,249,0.15))',
  border: '1px solid rgba(168,85,247,0.5)',
  borderRadius: 20, padding: '3px 12px',
  fontSize: 10, fontWeight: 800, color: '#d8b4fe',
  letterSpacing: '1.5px', textTransform: 'uppercase',
  boxShadow: '0 0 12px rgba(168,85,247,0.2)',
};
const logoBottomLine: React.CSSProperties = {
  position: 'absolute', bottom: 0, left: '10%', right: '10%', height: 1,
  background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)',
};
