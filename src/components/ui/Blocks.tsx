'use client';

import React from 'react';

export function Card({ children, premium, style }: {
  children: React.ReactNode; premium?: boolean; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      background: premium
        ? 'linear-gradient(135deg, rgba(232,121,249,0.09) 0%, rgba(12,12,32,0.95) 100%)'
        : 'linear-gradient(135deg, rgba(168,85,247,0.07) 0%, rgba(10,10,28,0.97) 100%)',
      border: `1px solid ${premium ? 'rgba(232,121,249,0.3)' : 'rgba(168,85,247,0.22)'}`,
      padding: '20px 22px',
      borderRadius: 14,
      marginBottom: 16,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: premium
        ? '0 4px 30px rgba(232,121,249,0.08), inset 0 1px 0 rgba(232,121,249,0.1)'
        : '0 4px 25px rgba(168,85,247,0.07), inset 0 1px 0 rgba(168,85,247,0.09)',
      transition: 'all 0.2s ease',
      ...style,
    }}>
      {/* Left neon bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 4, height: '100%',
        background: premium
          ? 'linear-gradient(180deg, #f0abfc 0%, #e879f9 50%, #c084fc 100%)'
          : 'linear-gradient(180deg, #e0aaff 0%, #a855f7 50%, #7c3aed 100%)',
        boxShadow: premium ? '0 0 12px rgba(232,121,249,0.7)' : '0 0 10px rgba(168,85,247,0.6)',
      }} />
      {/* Top shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: 4, right: 0, height: 1,
        background: premium
          ? 'linear-gradient(90deg, rgba(232,121,249,0.4), transparent 60%)'
          : 'linear-gradient(90deg, rgba(168,85,247,0.35), transparent 60%)',
      }} />
      <div style={{ paddingLeft: 6 }}>{children}</div>
    </div>
  );
}

export function StepList({ steps }: { steps: string[] }) {
  return (
    <ol style={{ marginTop: 14, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
      {steps.map((step, i) => (
        <li key={i} style={{
          display: 'flex', alignItems: 'flex-start', gap: 14,
          fontSize: 13, color: '#c4b0e0', lineHeight: 1.65, fontWeight: 500,
          padding: '10px 12px', borderRadius: 10, marginBottom: 6,
          background: 'rgba(168,85,247,0.04)',
          border: '1px solid rgba(168,85,247,0.12)',
          transition: 'all 0.2s',
        }}>
          {/* número destacado */}
          <span style={{
            minWidth: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 900, flexShrink: 0, marginTop: 1,
            boxShadow: '0 0 12px rgba(168,85,247,0.7), 0 2px 8px rgba(0,0,0,0.4)',
            letterSpacing: '-0.5px',
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            {i + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: step }} style={{ paddingTop: 4 }} />
        </li>
      ))}
    </ol>
  );
}

export function AlertBox({ type, children }: { type: 'warning' | 'danger'; children: React.ReactNode }) {
  const isWarning = type === 'warning';
  return (
    <div style={{
      background: isWarning ? 'rgba(168,85,247,0.08)' : 'rgba(255,68,68,0.08)',
      borderLeft: `4px solid ${isWarning ? '#a855f7' : '#ff4444'}`,
      padding: '14px 18px', borderRadius: '0 10px 10px 0',
      margin: '18px 0', fontSize: 13,
      color: isWarning ? '#d8b4fe' : '#ff8080',
      fontWeight: 700, display: 'flex', alignItems: 'flex-start',
      gap: 10, lineHeight: 1.5,
      boxShadow: isWarning ? 'inset 0 0 20px rgba(168,85,247,0.04)' : 'inset 0 0 20px rgba(255,68,68,0.04)',
    }}>
      {children}
    </div>
  );
}
