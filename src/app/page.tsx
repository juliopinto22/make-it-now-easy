'use client';

import React, { useState } from 'react';
import Sidebar, { type ScreenId } from '@/components/Sidebar';
import HomeScreen from '@/components/screens/HomeScreen';
import WindowsScreen from '@/components/screens/WindowsScreen';
import DriversScreen from '@/components/screens/DriversScreen';
import GamesScreen from '@/components/screens/GamesScreen';
import NetworkScreen from '@/components/screens/NetworkScreen';
import PremiumScreen from '@/components/screens/PremiumScreen';
import AdvancedScreen from '@/components/screens/AdvancedScreen';

const SIDEBAR_WIDTH = 230;

const screens: Record<ScreenId, React.ReactNode> = {
  inicio: <HomeScreen />,
  windows: <WindowsScreen />,
  drivers: <DriversScreen />,
  jogos: <GamesScreen />,
  rede: <NetworkScreen />,
  premium: <PremiumScreen />,
  avancado: <AdvancedScreen />,
};

export default function Home() {
  const [active, setActive] = useState<ScreenId>('inicio');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-total)' }}>
      <Sidebar active={active} onSelect={setActive} />

      <main
        style={{
          marginLeft: SIDEBAR_WIDTH,
          padding: '35px 45px',
          flex: 1,
          minHeight: '100vh',
          overflowY: 'auto',
        }}
      >
        <div
          key={active}
          style={{
            animation: 'screenIn 0.3s ease',
          }}
        >
          {screens[active]}
        </div>
      </main>

      <style>{`
        @keyframes screenIn {
          from { opacity: 0; transform: translateX(15px); }
          to { opacity: 1; transform: translateX(0); }
        }
        body { overflow-y: auto !important; overflow-x: hidden; }
      `}</style>
    </div>
  );
}
