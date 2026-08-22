'use client';

import React, { useState } from 'react';

type Section = 'inicio' | 'sistema' | 'jogos' | 'limpeza';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<Section>('inicio');

  const menuItems = [
    { id: 'inicio', label: 'Início', icon: '⚡' },
    { id: 'sistema', label: 'Otimizar Sistema', icon: '💻' },
    { id: 'jogos', label: 'Modo Gamer / FPS', icon: '🎮' },
    { id: 'limpeza', label: 'Limpeza Deep Dark', icon: '🧹' },
  ];

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#09070f',
      color: '#e2d9f3',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflowX: 'hidden'
    }}>
      {/* Background Anime/Gothic Glow Effects */}
      <div style={{
        position: 'fixed',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-10%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Sidebar Retrátil */}
      <aside style={{
        width: collapsed ? '70px' : '260px',
        backgroundColor: 'rgba(15, 11, 25, 0.9)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(147, 51, 234, 0.25)',
        padding: '20px 15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        zIndex: 10,
        boxShadow: '5px 0 25px rgba(0,0,0,0.5)'
      }}>
        <div>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            marginBottom: '40px',
            padding: '0 5px'
          }}>
            {!collapsed && (
              <span style={{
                fontSize: '18px',
                fontWeight: '900',
                letterSpacing: '2px',
                background: 'linear-gradient(135deg, #c084fc 0%, #f43f5e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 12px rgba(192, 132, 252, 0.4)'
              }}>
                SHADOW//OPT
              </span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                background: 'rgba(147, 51, 234, 0.2)',
                border: '1px solid rgba(147, 51, 234, 0.4)',
                color: '#c084fc',
                borderRadius: '8px',
                padding: '6px 10px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {collapsed ? '➔' : '⬅'}
            </button>
          </div>

          {/* Menu Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Section)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isActive 
                      ? 'linear-gradient(90deg, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.05) 100%)' 
                      : 'transparent',
                    color: isActive ? '#f3e8ff' : '#9ca3af',
                    boxShadow: isActive ? 'inset 3px 0 0 #c084fc' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    justifyContent: collapsed ? 'center' : 'flex-start'
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  {!collapsed && <span style={{ fontSize: '14px', fontWeight: '600' }}>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {!collapsed && (
          <div style={{
            padding: '12px',
            borderRadius: '10px',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '12px',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            v1.0 Gothic Edition ⛧
          </div>
        )}
      </aside>

      {/* Conteúdo Principal */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {activeTab === 'inicio' && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>
              SISTEMA PRONTO PARA ALTA PERFORMANCE 🛡️
            </h1>
            <p style={{ color: '#9ca3af', marginBottom: '35px' }}>
              Selecione os módulos góticos no menu lateral para otimizar o seu PC.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { title: 'Status do Registro', val: 'Otimizado', color: '#34d399' },
                { title: 'Plano de Energia', val: 'Shadow Boost', color: '#c084fc' },
                { title: 'Serviços Inúteis', val: 'Desativados', color: '#f43f5e' }
              ].map((card, i) => (
                <div key={i} style={{
                  background: 'rgba(23, 15, 38, 0.7)',
                  border: '1px solid rgba(147, 51, 234, 0.2)',
                  padding: '20px',
                  borderRadius: '14px'
                }}>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>{card.title}</span>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: card.color, marginTop: '5px' }}>
                    {card.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sistema' && (
          <div>
            <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '15px' }}>💻 Otimização de Sistema</h2>
            <p style={{ color: '#9ca3af' }}>Ajustes finos de registro e serviços do Windows.</p>
          </div>
        )}

        {activeTab === 'jogos' && (
          <div>
            <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '15px' }}>🎮 Modo Gamer & FPS</h2>
            <p style={{ color: '#9ca3af' }}>Reduza o input lag e aumente os quadros por segundo.</p>
          </div>
        )}

        {activeTab === 'limpeza' && (
          <div>
            <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '15px' }}>🧹 Limpeza Deep Dark</h2>
            <p style={{ color: '#9ca3af' }}>Elimine arquivos temporários e caches acumulados.</p>
          </div>
        )}
      </main>
    </div>
  );
}
