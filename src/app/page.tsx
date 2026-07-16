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
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-total)', position: 'relative' }}>
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
        {/* Corner decoration top-right */}
        <div style={{
          position: 'fixed', top: 0, right: 0, width: 200, height: 200,
          background: 'radial-gradient(circle at top right, rgba(232,121,249,0.08) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
        {/* Corner decoration bottom-left */}
        <div style={{
          position: 'fixed', bottom: 0, left: 230, width: 300, height: 200,
          background: 'radial-gradient(circle at bottom left, rgba(0,212,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div key={active} style={{ animation: 'screenIn 0.3s ease', position: 'relative', zIndex: 1 }}>
          {screens[active]}
        </div>
      </main>

      <style>{`
        body { overflow-y: auto !important; overflow-x: hidden; }
        h2 { text-shadow: 0 0 20px var(--accent-glow) !important; }
      `}</style>
    </div>
  );
}
