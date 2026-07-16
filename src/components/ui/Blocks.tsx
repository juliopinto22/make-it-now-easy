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
        background: premium ? 'rgba(255, 215, 0, 0.05)' : 'var(--bg-card)',
        border: `1px solid ${premium ? 'var(--premium)' : 'var(--border)'}`,
        padding: 22,
        borderRadius: 12,
        marginBottom: 18,
        position: 'relative',
        overflow: 'hidden',
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
          background: premium ? 'var(--premium)' : 'var(--accent)',
          borderRadius: '12px 0 0 12px',
        }}
      />
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
