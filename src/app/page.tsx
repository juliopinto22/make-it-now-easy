'use client';

import React, { useState } from 'react';
import Sidebar, { type ScreenId } from '@/components/Sidebar';
import AnimeBg from '@/components/AnimeBg';
import HomeScreen from '@/components/screens/HomeScreen';
import WindowsScreen from '@/components/screens/WindowsScreen';
import DriversScreen from '@/components/screens/DriversScreen';
import GamesScreen from '@/components/screens/GamesScreen';
import NetworkScreen from '@/components/screens/NetworkScreen';
import PremiumScreen from '@/components/screens/PremiumScreen';
import AdvancedScreen from '@/components/screens/AdvancedScreen';
import CopyrightScreen from '@/components/screens/CopyrightScreen';
import AntiBot from '@/components/AntiBot';

const SIDEBAR_WIDTH = 240;

const screens: Record<ScreenId, React.ReactNode> = {
  inicio:   <HomeScreen />,
  windows:  <WindowsScreen />,
  drivers:  <DriversScreen />,
  jogos:    <GamesScreen />,
  rede:     <NetworkScreen />,
  premium:  <PremiumScreen />,
  avancado: <AdvancedScreen />,
  direitos: <CopyrightScreen />,
};

export default function Home() {
  const [active, setActive] = useState<ScreenId>('inicio');
  const [verified, setVerified] = useState(false);

  if (!verified) return <AntiBot onVerified={() => setVerified(true)} />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-total)' }}>
      <AnimeBg />
      <Sidebar active={active} onSelect={setActive} />

      {/* Glow top-right corner */}
      <div style={{
        position: 'fixed', top: 0, right: 0, width: 350, height: 250, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at top right, rgba(232,121,249,0.1) 0%, transparent 65%)',
      }} />
      {/* Glow bottom-left (after sidebar) */}
      <div style={{
        position: 'fixed', bottom: 0, left: SIDEBAR_WIDTH, width: 300, height: 200, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at bottom left, rgba(34,211,238,0.06) 0%, transparent 65%)',
      }} />

      <main style={{
        marginLeft: SIDEBAR_WIDTH, padding: '40px 50px',
        flex: 1, minHeight: '100vh', overflowY: 'auto',
        position: 'relative', zIndex: 1,
      }}>
        <div key={active} style={{ animation: 'screenIn 0.28s ease' }}>
          {screens[active]}
        </div>
      </main>
    </div>
  );
}
