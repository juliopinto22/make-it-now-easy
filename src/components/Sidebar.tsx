'use client';

import React from 'react';
import {
  Home,
  MonitorCog,
  Wrench,
  Gamepad2,
  Wifi,
  Gem,
  Settings2,
} from 'lucide-react';

export type ScreenId =
  | 'inicio'
  | 'windows'
  | 'drivers'
  | 'jogos'
  | 'rede'
  | 'premium'
  | 'avancado';

interface NavItem {
  id: ScreenId;
  label: string;
  icon: React.ReactNode;
  premium?: boolean;
}

const freeItems: NavItem[] = [
  { id: 'inicio', label: 'Início', icon: <Home size={18} /> },
  { id: 'windows', label: 'Windows', icon: <MonitorCog size={18} /> },
  { id: 'drivers', label: 'Drivers', icon: <Wrench size={18} /> },
  { id: 'jogos', label: 'Jogos', icon: <Gamepad2 size={18} /> },
  { id: 'rede', label: 'Rede', icon: <Wifi size={18} /> },
];

const premiumItems: NavItem[] = [
  { id: 'premium', label: 'Conhecer Premium', icon: <Gem size={18} />, premium: true },
  { id: 'avancado', label: 'Ajustes Avançados', icon: <Settings2 size={18} />, premium: true },
];

interface SidebarProps {
  active: ScreenId;
  onSelect: (id: ScreenId) => void;
}

export default function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <nav
      style={{
        width: 230,
        background: 'linear-gradient(180deg, #08081e 0%, #05050f 100%)',
        borderRight: '1px solid var(--border-glow)',
        boxShadow: '2px 0 30px rgba(168,85,247,0.12), inset -1px 0 0 rgba(168,85,247,0.1)',
        padding: '20px 0',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        overflowY: 'auto',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <div style={{
        padding: '20px 16px 22px',
        textAlign: 'center',
        borderBottom: '1px solid var(--border-glow)',
        marginBottom: 20,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow blob */}
        <div style={{
          position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 80,
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Icon */}
        <div style={{
          fontSize: 32,
          marginBottom: 6,
          filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.8))',
          animation: 'neonPulse 2.5s ease-in-out infinite',
          display: 'inline-block',
        }}>
          ⚡
        </div>

        {/* MAKE IT */}
        <div style={{
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: '4px',
          color: '#8888aa',
          textTransform: 'uppercase',
          marginBottom: 2,
        }}>
          MAKE IT
        </div>

        {/* NOW EASY */}
        <div style={{
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg, #c084fc, #e879f9, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          lineHeight: 1.1,
          marginBottom: 8,
        }}>
          NOW EASY
        </div>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: 'rgba(168,85,247,0.15)',
          border: '1px solid rgba(168,85,247,0.4)',
          borderRadius: 20,
          padding: '2px 10px',
          fontSize: 10,
          fontWeight: 800,
          color: 'var(--accent-bright)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          🎮 GAMER EDITION
        </div>
      </div>

      {/* Free section label */}
      <SectionLabel>📚 BIBLIOTECA GRÁTIS</SectionLabel>

      {freeItems.map((item) => (
        <NavButton
          key={item.id}
          item={item}
          isActive={active === item.id}
          onClick={() => onSelect(item.id)}
        />
      ))}

      {/* Premium section label */}
      <SectionLabel style={{ marginTop: 24, color: 'var(--premium)' }}>
        ⭐ MODO PREMIUM
      </SectionLabel>

      {premiumItems.map((item) => (
        <NavButton
          key={item.id}
          item={item}
          isActive={active === item.id}
          onClick={() => onSelect(item.id)}
        />
      ))}
    </nav>
  );
}

function SectionLabel({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        fontSize: 11,
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        padding: '0 20px 10px',
        fontWeight: 700,
        letterSpacing: '0.5px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function NavButton({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '13px 20px',
        width: '100%',
        background: isActive
          ? 'linear-gradient(90deg, rgba(168,85,247,0.2) 0%, transparent 100%)'
          : 'transparent',
        border: 'none',
        borderLeft: `3px solid ${isActive ? 'var(--accent-bright)' : 'transparent'}`,
        boxShadow: isActive ? '0 0 15px rgba(168,85,247,0.15)' : 'none',
        textShadow: isActive ? '0 0 8px var(--accent-glow)' : 'none',
        color: isActive
          ? 'var(--accent)'
          : item.premium
          ? 'var(--premium)'
          : 'var(--text)',
        cursor: 'pointer',
        fontSize: 15,
        fontWeight: isActive ? 800 : 700,
        fontFamily: 'inherit',
        textAlign: 'left',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background =
            'rgba(155, 89, 245, 0.08)';
          (e.currentTarget as HTMLButtonElement).style.paddingLeft = '25px';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          (e.currentTarget as HTMLButtonElement).style.paddingLeft = '20px';
        }
      }}
    >
      {item.icon}
      <span>{item.label}</span>
      {item.premium && !isActive && (
        <span style={{ marginLeft: 'auto', fontSize: 13 }}>⭐</span>
      )}
    </button>
  );
}
