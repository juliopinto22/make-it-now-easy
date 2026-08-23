'use client';

import React, { useState } from 'react';

type Section = 'inicio' | 'free' | 'sistema' | 'jogos' | 'limpeza';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<Section>('inicio');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const menuItems = [
    { id: 'inicio', label: 'Início', icon: '⚡' },
    { id: 'free', label: 'Otimizações Free', icon: '🎁' },
    { id: 'sistema', label: 'Otimizar Sistema', icon: '💻' },
    { id: 'jogos', label: 'Modo Gamer / FPS', icon: '🎮' },
    { id: 'limpeza', label: 'Limpeza Deep Dark', icon: '🧹' },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#07050a',
      color: '#e2d9f3',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflowX: 'hidden'
    }}>
      {/* Background Glows estilo Anime/Gótico */}
      <div style={{
        position: 'fixed',
        top: '-15%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        bottom: '-15%',
        left: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Sidebar Retrátil */}
      <aside style={{
        width: collapsed ? '75px' : '270px',
        backgroundColor: 'rgba(12, 9, 20, 0.92)',
        backdropFilter: 'blur(16px)',
        borderRight: '1px solid rgba(168, 85, 247, 0.25)',
        padding: '25px 15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 10,
        boxShadow: '10px 0 30px rgba(0,0,0,0.8)'
      }}>
        <div>
          {/* Topo / Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            marginBottom: '35px',
            padding: '0 5px'
          }}>
            {!collapsed && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '900',
                  letterSpacing: '3px',
                  background: 'linear-gradient(135deg, #c084fc 0%, #f43f5e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 15px rgba(192, 132, 252, 0.5)'
                }}>
                  SHADOW//OPT
                </span>
                <span style={{ fontSize: '10px', color: '#a855f7', letterSpacing: '1px', marginTop: '-2px' }}>
                  GOTHIC EDITION ⛧
                </span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                background: 'rgba(168, 85, 247, 0.15)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                color: '#c084fc',
                borderRadius: '8px',
                padding: '6px 10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: '0.2s'
              }}
            >
              {collapsed ? '➔' : '⬅'}
            </button>
          </div>

          {/* Menu de Navegação */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                    borderRadius: '12px',
                    border: isActive ? '1px solid rgba(192, 132, 252, 0.4)' : '1px solid transparent',
                    background: isActive 
                      ? 'linear-gradient(90deg, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.05) 100%)' 
                      : 'transparent',
                    color: isActive ? '#fff' : '#9ca3af',
                    boxShadow: isActive ? '0 0 15px rgba(168, 85, 247, 0.2)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    justifyContent: collapsed ? 'center' : 'flex-start'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  {!collapsed && <span style={{ fontSize: '14px', fontWeight: '600' }}>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Rodapé Sidebar */}
        {!collapsed && (
          <div style={{
            padding: '12px',
            borderRadius: '10px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            fontSize: '11px',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            Status: <span style={{ color: '#34d399', fontWeight: 'bold' }}>● Sistema Ativo</span>
          </div>
        )}
      </aside>

      {/* Conteúdo Principal */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', zIndex: 1 }}>
        {activeTab === 'inicio' && (
          <div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(23, 15, 38, 0.9) 0%, rgba(10, 7, 16, 0.9) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '20px',
              padding: '30px',
              marginBottom: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#fff', margin: '0 0 10px 0' }}>
                BEM-VINDO AO SHADOW//OPT 🔮
              </h1>
              <p style={{ color: '#a78bfa', margin: 0, fontSize: '15px' }}>
                Sua central sombria para otimização de alta performance, ajustes de sistema e eliminação de lag.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
              {[
                { title: 'Otimização Global', val: 'Pronta', color: '#34d399', desc: 'Sua máquina está pronta para ajustes.' },
                { title: 'Plano de Energia', val: 'Shadow Boost', color: '#c084fc', desc: 'Foco total em performance de CPU.' },
                { title: 'Processos de Fundo', val: 'Limpeza Ativa', color: '#f43f5e', desc: 'Reduza o consumo de memória RAM.' }
              ].map((card, i) => (
                <div key={i} style={{
                  background: 'rgba(18, 12, 28, 0.7)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  padding: '22px',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <span style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>{card.title}</span>
                  <div style={{ fontSize: '22px', fontWeight: 'bold', color: card.color, margin: '8px 0 4px 0' }}>
                    {card.val}
                  </div>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{card.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'free' && (
          <div>
            <h2 style={{ fontSize: '26px', color: '#fff', marginBottom: '8px' }}>🎁 Otimizações Free</h2>
            <p style={{ color: '#9ca3af', marginBottom: '25px' }}>Recursos e ajustes 100% gratuitos para melhorar o seu PC agora mesmo.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[
                {
                  title: 'Flush DNS (Limpar Cache de Rede)',
                  desc: 'Remove rotas antigas de internet e melhora a conexão.',
                  cmd: 'ipconfig /flushdns',
                  badge: 'GRÁTIS'
                },
                {
                  title: 'Limpeza do Cache DNS do Navegador',
                  desc: 'Libera espaço em disco e acelera o carregamento de sites.',
                  cmd: 'ipconfig /registerdns',
                  badge: 'GRÁTIS'
                },
                {
                  title: 'Resetar Winsock de Rede',
                  desc: 'Restaura as configurações originais de rede do Windows.',
                  cmd: 'netsh winsock reset',
                  badge: 'GRÁTIS'
                },
                {
                  title: 'Verificar Arquivos do Sistema',
                  desc: 'Encontra e repara arquivos corrompidos no Windows.',
                  cmd: 'sfc /scannow',
                  badge: 'GRÁTIS'
                }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(18, 12, 28, 0.7)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  padding: '20px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>{item.title}</h4>
                      <span style={{
                        background: 'rgba(52, 211, 153, 0.15)',
                        border: '1px solid rgba(52, 211, 153, 0.4)',
                        color: '#34d399',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}>{item.badge}</span>
                    </div>
                    <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#9ca3af' }}>{item.desc}</p>
                  </div>

                  <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '10px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <code style={{ fontSize: '12px', color: '#c084fc' }}>{item.cmd}</code>
                    <button
                      onClick={() => handleCopy(item.cmd)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: copiedText === item.cmd ? '#34d399' : 'rgba(168, 85, 247, 0.2)',
                        border: '1px solid rgba(168, 85, 247, 0.4)',
                        color: copiedText === item.cmd ? '#000' : '#c084fc',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      {copiedText === item.cmd ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sistema' && (
          <div>
            <h2 style={{ fontSize: '26px', color: '#fff', marginBottom: '8px' }}>💻 Otimização de Sistema</h2>
            <p style={{ color: '#9ca3af', marginBottom: '25px' }}>Ajustes essenciais para dar mais fluidez ao Windows.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {[
                { title: 'Ativar Plano de Desempenho Máximo', desc: 'Desbloqueia o perfil de energia de alta performance oculto do Windows.' },
                { title: 'Desativar Efeitos Visuais Desnecessários', desc: 'Aumenta a velocidade de resposta das janelas e menus.' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(18, 12, 28, 0.7)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  padding: '20px',
                  borderRadius: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#f3e8ff' }}>{item.title}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>{item.desc}</p>
                  </div>
                  <button style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                    border: 'none',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}>
                    Ajustar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'jogos' && (
          <div>
            <h2 style={{ fontSize: '26px', color: '#fff', marginBottom: '8px' }}>🎮 Modo Gamer & FPS</h2>
            <p style={{ color: '#9ca3af', marginBottom: '25px' }}>Reduza o input lag e estabilize sua taxa de quadros.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{
                background: 'rgba(18, 12, 28, 0.7)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                padding: '20px',
                borderRadius: '16px'
              }}>
                <h3 style={{ color: '#c084fc', marginTop: 0 }}>Modo de Jogo do Windows</h3>
                <p style={{ fontSize: '14px', color: '#9ca3af' }}>Garanta que o Windows priorize a CPU e a placa de vídeo para os seus jogos favoritos.</p>
              </div>
              <div style={{
                background: 'rgba(18, 12, 28, 0.7)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                padding: '20px',
                borderRadius: '16px'
              }}>
                <h3 style={{ color: '#f43f5e', marginTop: 0 }}>Otimização de GPU</h3>
                <p style={{ fontSize: '14px', color: '#9ca3af' }}>Configure a taxa de atualização máxima e desative a sincronização vertical no painel do driver.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'limpeza' && (
          <div>
            <h2 style={{ fontSize: '26px', color: '#fff', marginBottom: '8px' }}>🧹 Limpeza Deep Dark</h2>
            <p style={{ color: '#9ca3af', marginBottom: '25px' }}>Copie os atalhos abaixo para abrir as pastas de cache do Windows e apagar o lixo acumulado:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { cmd: 'temp', label: 'Pasta Temp (Arquivos Temporários)' },
                { cmd: '%temp%', label: 'Pasta Temp do Usuário' },
                { cmd: 'prefetch', label: 'Cache de Inicialização (Prefetch)' },
                { cmd: 'cleanmgr', label: 'Limpeza de Disco Integrada' }
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(18, 12, 28, 0.7)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>{item.label}</span>
                    <div style={{ fontSize: '12px', color: '#c084fc', fontFamily: 'monospace', marginTop: '2px' }}>Comando: {item.cmd}</div>
                  </div>
                  <button
                    onClick={() => handleCopy(item.cmd)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      background: copiedText === item.cmd ? '#34d399' : 'rgba(168, 85, 247, 0.2)',
                      border: '1px solid rgba(168, 85, 247, 0.4)',
                      color: copiedText === item.cmd ? '#000' : '#c084fc',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: '0.2s'
                    }}
                  >
                    {copiedText === item.cmd ? 'Copiado!' : 'Copiar Comando'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
