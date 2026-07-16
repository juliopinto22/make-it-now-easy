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
        background: 'linear-gradient(180deg, #0e0e1e 0%, #080812 100%)',
        borderRight: '1px solid var(--border)',
        boxShadow: '2px 0 20px rgba(155,89,245,0.08)',
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
      <div
        style={{
          padding: '18px 20px 24px',
          fontSize: 15,
          fontWeight: 900,
          color: 'var(--accent)',
          textAlign: 'center',
          borderBottom: '1px solid var(--border)',
          marginBottom: 20,
          letterSpacing: '0.5px',
          lineHeight: 1.3,
        }}
      >
        MAKE IT NOW EASY 🚀
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
        background: isActive ? 'rgba(155, 89, 245, 0.15)' : 'transparent',
        border: 'none',
        borderLeft: `4px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
        boxShadow: isActive ? 'inset 0 0 20px rgba(155,89,245,0.05)' : 'none',
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
