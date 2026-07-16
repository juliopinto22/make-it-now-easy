'use client';

import React from 'react';

export function Card({
  children,
  premium,
  style,
}: {
  children: React.ReactNode;
  premium?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: premium
          ? 'linear-gradient(135deg, rgba(232,121,249,0.08) 0%, #0a0a1e 100%)'
          : 'linear-gradient(135deg, rgba(168,85,247,0.06) 0%, #0a0a1e 100%)',
        border: `1px solid ${premium ? 'rgba(232,121,249,0.35)' : 'rgba(168,85,247,0.2)'}`,
        padding: 22,
        borderRadius: 12,
        marginBottom: 18,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: premium
          ? '0 0 25px rgba(232,121,249,0.08), inset 0 1px 0 rgba(232,121,249,0.1)'
          : '0 0 20px rgba(168,85,247,0.06), inset 0 1px 0 rgba(168,85,247,0.08)',
        transition: 'all 0.2s ease',
        ...style,
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 5,
          height: '100%',
          background: premium
            ? 'linear-gradient(180deg, #f0abfc, #e879f9)'
            : 'linear-gradient(180deg, #c084fc, #a855f7)',
          borderRadius: '12px 0 0 12px',
          boxShadow: premium ? '0 0 10px var(--premium-glow)' : '0 0 8px var(--accent-glow)',
        }}
      />
      {/* Top neon line */}
      <div style={{
        position: 'absolute', top: 0, left: 5, right: 0, height: 1,
        background: premium
          ? 'linear-gradient(90deg, transparent, rgba(232,121,249,0.4), transparent)'
          : 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)',
      }} />
      <div style={{ paddingLeft: 4 }}>{children}</div>
    </div>
  );
}

export function StepList({ steps }: { steps: string[] }) {
  return (
    <ol
      style={{
        marginTop: 12,
        paddingLeft: 0,
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {steps.map((step, i) => (
        <li
          key={i}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            fontSize: 14,
            color: '#CCCCCC',
            lineHeight: 1.6,
            fontWeight: 500,
          }}
        >
          <span
            style={{
              background: 'var(--accent)',
              color: '#000',
              borderRadius: '50%',
              width: 22,
              height: 22,
              minWidth: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 900,
              marginTop: 2,
            }}
          >
            {i + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: step }} />
        </li>
      ))}
    </ol>
  );
}

export function AlertBox({
  type,
  children,
}: {
  type: 'warning' | 'danger';
  children: React.ReactNode;
}) {
  const isWarning = type === 'warning';
  return (
    <div
      style={{
        background: isWarning
          ? 'rgba(255, 204, 0, 0.1)'
          : 'rgba(255, 51, 51, 0.1)',
        borderLeft: `5px solid ${isWarning ? 'var(--accent)' : 'var(--danger)'}`,
        padding: '16px 18px',
        borderRadius: '0 10px 10px 0',
        margin: '20px 0',
        fontSize: 14,
        color: isWarning ? 'var(--accent)' : 'var(--danger)',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        lineHeight: 1.5,
      }}
    >
      {children}
    </div>
  );
}
