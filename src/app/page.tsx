'use client';

import React from 'react';
import GameWrapper from '../components/GameWrapper';
import HUD from '../ui/HUD';

export default function Home() {
  return (
    <main className="game-container block relative w-full h-screen overflow-hidden bg-black select-none">
      <GameWrapper />
      <HUD />
    </main>
  );
}
