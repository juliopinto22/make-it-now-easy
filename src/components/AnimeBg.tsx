'use client';

import React, { useEffect, useRef } from 'react';

export default function AnimeBg() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <FloatingSymbols />
      <CornerDecorations />
    </div>
  );
}

function FloatingSymbols() {
  return <>{symbols.map((s, i) => <FloatItem key={i} {...s} />)}</>;
}

function FloatItem({ char, x, y, size, opacity, duration, delay, color }: SymbolItem) {
  return (
    <div style={{
      position: 'absolute',
      left: `${x}%`, top: `${y}%`,
      fontSize: size,
      color,
      opacity,
      animation: `floatAnime ${duration}s ease-in-out ${delay}s infinite`,
      textShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
      userSelect: 'none',
      fontWeight: 900,
    }}>
      {char}
    </div>
  );
}

function CornerDecorations() {
  return (
    <>
      {/* Tokyo Ghoul eye — top right */}
      <div style={cornerStyle('top', 'right')}>
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <ellipse cx="45" cy="45" rx="38" ry="28" stroke="rgba(168,85,247,0.25)" strokeWidth="1.5"/>
          <ellipse cx="45" cy="45" rx="22" ry="22" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.3)" strokeWidth="1"/>
          <circle cx="45" cy="45" r="10" fill="rgba(232,121,249,0.12)" stroke="rgba(232,121,249,0.4)" strokeWidth="1.5"/>
          <circle cx="45" cy="45" r="4" fill="rgba(168,85,247,0.5)"/>
          <line x1="7" y1="45" x2="83" y2="45" stroke="rgba(168,85,247,0.15)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Curse energy swirl — bottom left */}
      <div style={cornerStyle('bottom', 'left')}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <path d="M50 10 Q80 30 70 60 Q60 90 30 80 Q0 70 20 40 Q30 15 50 10Z"
            stroke="rgba(168,85,247,0.2)" strokeWidth="1.5" fill="rgba(168,85,247,0.04)"/>
          <path d="M50 20 Q70 35 62 58 Q52 80 35 72 Q15 62 28 42 Q36 22 50 20Z"
            stroke="rgba(232,121,249,0.15)" strokeWidth="1" fill="none"/>
          <circle cx="50" cy="50" r="8" stroke="rgba(168,85,247,0.35)" strokeWidth="1.5" fill="rgba(168,85,247,0.08)"/>
        </svg>
      </div>

      {/* Rengoku flame — bottom right */}
      <div style={cornerStyle('bottom', 'right')}>
        <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
          <path d="M40 95 Q10 70 20 45 Q25 30 15 15 Q35 30 30 50 Q45 35 38 10 Q60 30 55 55 Q70 40 65 20 Q80 45 60 70 Q70 85 40 95Z"
            fill="rgba(168,85,247,0.07)" stroke="rgba(232,121,249,0.2)" strokeWidth="1.5"/>
          <path d="M40 85 Q20 65 28 48 Q35 35 32 22 Q48 38 42 56 Q56 42 52 28 Q65 50 50 68 Q58 78 40 85Z"
            fill="rgba(168,85,247,0.05)" stroke="rgba(168,85,247,0.25)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Sukuna tattoo lines — top left */}
      <div style={cornerStyle('top', 'left')}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M5 40 Q20 20 40 15 Q60 10 70 30" stroke="rgba(168,85,247,0.25)" strokeWidth="1.5" fill="none"/>
          <path d="M5 50 Q25 35 45 32 Q65 28 72 45" stroke="rgba(168,85,247,0.15)" strokeWidth="1" fill="none"/>
          <circle cx="15" cy="15" r="3" fill="rgba(232,121,249,0.3)"/>
          <circle cx="65" cy="15" r="2" fill="rgba(168,85,247,0.3)"/>
          <path d="M30 5 L35 20 L40 5" stroke="rgba(232,121,249,0.2)" strokeWidth="1.5" fill="none"/>
          <path d="M50 8 L53 22 L56 8" stroke="rgba(168,85,247,0.2)" strokeWidth="1" fill="none"/>
        </svg>
      </div>
    </>
  );
}

function cornerStyle(v: 'top'|'bottom', h: 'left'|'right'): React.CSSProperties {
  return {
    position: 'absolute',
    [v]: 16, [h]: h === 'left' ? 256 : 16,
    opacity: 0.7,
  };
}

interface SymbolItem {
  char: string; x: number; y: number; size: number;
  opacity: number; duration: number; delay: number; color: string;
}

const symbols: SymbolItem[] = [
  { char: '呪', x: 8,  y: 15, size: 18, opacity: 0.12, duration: 7,  delay: 0,   color: '#a855f7' },
  { char: '滅', x: 85, y: 20, size: 16, opacity: 0.10, duration: 9,  delay: 1,   color: '#c084fc' },
  { char: '鬼', x: 15, y: 70, size: 20, opacity: 0.10, duration: 8,  delay: 2,   color: '#a855f7' },
  { char: '祓', x: 78, y: 65, size: 15, opacity: 0.09, duration: 11, delay: 0.5, color: '#e879f9' },
  { char: '域', x: 50, y: 10, size: 14, opacity: 0.08, duration: 10, delay: 3,   color: '#c084fc' },
  { char: '術', x: 92, y: 45, size: 16, opacity: 0.09, duration: 8,  delay: 1.5, color: '#a855f7' },
  { char: '廻', x: 5,  y: 45, size: 13, opacity: 0.08, duration: 12, delay: 2.5, color: '#e879f9' },
  { char: '霊', x: 60, y: 82, size: 17, opacity: 0.10, duration: 9,  delay: 4,   color: '#c084fc' },
  { char: '狂', x: 30, y: 88, size: 14, opacity: 0.08, duration: 10, delay: 1,   color: '#a855f7' },
  { char: '喰', x: 72, y: 8,  size: 15, opacity: 0.09, duration: 7,  delay: 3.5, color: '#e879f9' },
];
