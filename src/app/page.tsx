'use client';

import React, { useState } from 'react';

type Section = 'inicio' | 'free' | 'sistema' | 'jogos' | 'limpeza';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<Section>('free');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const menuItems = [
    { id: 'inicio', label: 'Início', icon: '⚡' },
    { id: 'free', label: 'Otimizações Free (50+)', icon: '🎁' },
    { id: 'sistema', label: 'Otimizar Sistema', icon: '💻' },
    { id: 'jogos', label: 'Modo Gamer / FPS', icon: '🎮' },
    { id: 'limpeza', label: 'Limpeza Deep Dark', icon: '🧹' },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Lista de +50 Otimizações Gratuitas
  const freeOptimizations = [
    // REDE & PING
    { category: '🌐 Rede & Ping', title: 'Flush DNS', desc: 'Limpa o cache de rotas de IP e resolve problemas de conexão.', cmd: 'ipconfig /flushdns' },
    { category: '🌐 Rede & Ping', title: 'Renovar IP', desc: 'Solicita um novo endereço IP local ao seu roteador.', cmd: 'ipconfig /renew' },
    { category: '🌐 Rede & Ping', title: 'Resetar Winsock', desc: 'Restaura a pilha de protocolos TCP/IP do Windows.', cmd: 'netsh winsock reset' },
    { category: '🌐 Rede & Ping', title: 'Resetar Interface de IP', desc: 'Reseta todas as configurações de adaptador de rede.', cmd: 'netsh int ip reset' },
    { category: '🌐 Rede & Ping', title: 'Liberar IP Atual', desc: 'Desconecta o IP atual da sua rede local.', cmd: 'ipconfig /release' },
    { category: '🌐 Rede & Ping', title: 'Registrar DNS', desc: 'Força a atualização de registros de nomes de domínio.', cmd: 'ipconfig /registerdns' },
    { category: '🌐 Rede & Ping', title: 'Desativar Heurística de Janela', desc: 'Melhora a estabilidade na transferência de pacotes de jogos.', cmd: 'netsh int tcp set global autotuninglevel=normal' },
    { category: '🌐 Rede & Ping', title: 'Desativar Chimney Offload', desc: 'Reduz picos de latência durante jogos online.', cmd: 'netsh int tcp set global chimney=disabled' },
    { category: '🌐 Rede & Ping', title: 'Desativar RSS TCP', desc: 'Evita instabilidade de pacotes em placas de rede mais antigas.', cmd: 'netsh int tcp set global rss=enabled' },
    { category: '🌐 Rede & Ping', title: 'Ativar ECN Capability', desc: 'Avisa sobre congestionamento de rede sem descartar pacotes.', cmd: 'netsh int tcp set global ecncapability=enabled' },

    // JOGOS & FPS
    { category: '🎮 Jogos & FPS', title: 'Desativar Game Bar DVR', desc: 'Remove a gravação em segundo plano que rouba FPS.', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR" /v "AllowGameDVR" /t REG_DWORD /d 0 /f' },
    { category: '🎮 Jogos & FPS', title: 'Ativar Modo de Jogo', desc: 'Abre as configurações para garantir o Game Mode ativo.', cmd: 'start ms-settings:gaming-gamemode' },
    { category: '🎮 Jogos & FPS', title: 'Agendamento de GPU Hardware', desc: 'Abre painel para ativar HAGS e reduzir o Input Lag.', cmd: 'start ms-settings:display-advancedgraphics' },
    { category: '🎮 Jogos & FPS', title: 'Prioridade CPU de Processos', desc: 'Abre Gerenciador para definir afinidade e prioridade alta.', cmd: 'taskmgr' },
    { category: '🎮 Jogos & FPS', title: 'Desativar Fullscreen Optimizations', desc: 'Abre propriedades do jogo para tirar o atraso de exibição.', cmd: 'sysdm.cpl' },
    { category: '🎮 Jogos & FPS', title: 'Plano Desempenho Máximo', desc: 'Desbloqueia o perfil de energia oculta do Windows.', cmd: 'powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61' },
    { category: '🎮 Jogos & FPS', title: 'Plano Alto Desempenho', desc: 'Ativa o perfil de alto desempenho padrão.', cmd: 'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c' },
    { category: '🎮 Jogos & FPS', title: 'Desativar Hibernação', desc: 'Economiza espaço e reduz gravações desnecessárias no SSD.', cmd: 'powercfg /hibernate off' },
    { category: '🎮 Jogos & FPS', title: 'Painel de Controle DirectX', desc: 'Abre a ferramenta de diagnóstico de vídeos e GPU.', cmd: 'dxdiag' },
    { category: '🎮 Jogos & FPS', title: 'Configurações de Exibição', desc: 'Ajuste rápido da taxa de atualização (Hz) do monitor.', cmd: 'start ms-settings:display' },

    // LIMPEZA & MEMÓRIA
    { category: '🧹 Limpeza & RAM', title: 'Pasta Temp Global', desc: 'Abre a pasta temporária do sistema para apagar lixo.', cmd: 'temp' },
    { category: '🧹 Limpeza & RAM', title: 'Pasta Temp Usuário', desc: 'Abre os arquivos temporários criados pelos apps instalados.', cmd: 'shell:Local AppData\\Temp' },
    { category: '🧹 Limpeza & RAM', title: 'Cache Prefetch', desc: 'Abre a pasta de dados de pré-carregamento do Windows.', cmd: 'prefetch' },
    { category: '🧹 Limpeza & RAM', title: 'Limpeza de Disco Integrada', desc: 'Executa a ferramenta oficial de remoção de lixo.', cmd: 'cleanmgr' },
    { category: '🧹 Limpeza & RAM', title: 'Limpeza de Atualizações', desc: 'Executa a limpeza avançada selecionando a unidade C:.', cmd: 'cleanmgr /sagerun:1' },
    { category: '🧹 Limpeza & RAM', title: 'Esvaziar Lixeira', desc: 'Abre a lixeira diretamente para limpeza rápida.', cmd: 'explorer.exe shell:RecycleBinFolder' },
    { category: '🧹 Limpeza & RAM', title: 'Cache de Miniaturas (Thumbs)', desc: 'Força a reconstrução do cache de miniaturas de imagens.', cmd: 'ie4uinit.exe -show' },
    { category: '🧹 Limpeza & RAM', title: 'Limpar Store Cache', desc: 'Reseta o cache acumulado da Microsoft Store.', cmd: 'wsreset.exe' },
    { category: '🧹 Limpeza & RAM', title: 'Cache de Eventos do Windows', desc: 'Abre o Visualizador de Eventos para limpar logs.', cmd: 'eventvwr.msc' },
    { category: '🧹 Limpeza & RAM', title: 'Cache de Sombras VSS', desc: 'Abre o painel de restauração para apagar pontos antigos.', cmd: 'sysdm.cpl SystemPropertiesProtection' },

    // SISTEMA & DESEMPENHO
    { category: '⚙️ Sistema & Desempenho', title: 'Verificar Arquivos SFC', desc: 'Localiza e repara automaticamente arquivos do Windows corrompidos.', cmd: 'sfc /scannow' },
    { category: '⚙️ Sistema & Desempenho', title: 'Restaurar Imagem DISM', desc: 'Restaura a integridade da imagem do sistema operacional.', cmd: 'DISM /Online /Cleanup-Image /RestoreHealth' },
    { category: '⚙️ Sistema & Desempenho', title: 'Checar Disco (Chkdsk)', desc: 'Programa a verificação e correção de erros de disco.', cmd: 'chkdsk C: /f /r' },
    { category: '⚙️ Sistema & Desempenho', title: 'Desativar Telemetria', desc: 'Desativa o envio automático de dados para a Microsoft.', cmd: 'sc config "DiagTrack" start= disabled' },
    { category: '⚙️ Sistema & Desempenho', title: 'Desativar Experiências', desc: 'Desativa o serviço de rastreamento de experiência do usuário.', cmd: 'sc config "dmwappushservice" start= disabled' },
    { category: '⚙️ Sistema & Desempenho', title: 'Ajustar Efeitos Visuais', desc: 'Abre painel para selecionar "Ajustar para obter melhor desempenho".', cmd: 'SystemPropertiesPerformance' },
    { category: '⚙️ Sistema & Desempenho', title: 'Desfragmentar/Otimizar SSD', desc: 'Abre o utilitário de otimização de TRIM e discos.', cmd: 'dfrgui' },
    { category: '⚙️ Sistema & Desempenho', title: 'Aplicativos de Inicialização', desc: 'Gerencie programas que iniciam junto com o Windows.', cmd: 'msconfig' },
    { category: '⚙️ Sistema & Desempenho', title: 'Configurar Memória Virtual', desc: 'Abre o painel para definir o tamanho do Arquivo de Paginação.', cmd: 'SystemPropertiesAdvanced' },
    { category: '⚙️ Sistema & Desempenho', title: 'Serviços do Windows', desc: 'Abre a lista de serviços para desativar os não essenciais.', cmd: 'services.msc' },

    // PRIVACIDADE & SEGURANÇA
    { category: '🛡️ Privacidade & Atalhos', title: 'Desativar Cortana', desc: 'Desativa a assistente em segundo plano para poupar RAM.', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search" /v "AllowCortana" /t REG_DWORD /d 0 /f' },
    { category: '🛡️ Privacidade & Atalhos', title: 'Gerenciador de Dispositivos', desc: 'Atualize drivers de vídeo, áudio e rede rapidamente.', cmd: 'devmgmt.msc' },
    { category: '🛡️ Privacidade & Atalhos', title: 'Conexões de Rede', desc: 'Abre adaptadores para definir DNS manual (Google/Cloudflare).', cmd: 'ncpa.cpl' },
    { category: '🛡️ Privacidade & Atalhos', title: 'Adicionar/Remover Apps', desc: 'Abre o painel para desinstalar programas pesados.', cmd: 'appwiz.cpl' },
    { category: '🛡️ Privacidade & Atalhos', title: 'Firewall de Segurança', desc: 'Abre as regras avançadas do Firewall do Windows.', cmd: 'wf.msc' },
    { category: '🛡️ Privacidade & Atalhos', title: 'Gerenciador de Disco', desc: 'Verifique partições e saúde das suas unidades.', cmd: 'diskmgmt.msc' },
    { category: '🛡️ Privacidade & Atalhos', title: 'Painel de Controle', desc: 'Acesso às configurações legadas clássicas do Windows.', cmd: 'control' },
    { category: '🛡️ Privacidade & Atalhos', title: 'Informações do Sistema', desc: 'Exibe relatório completo do seu hardware e BIOS.', cmd: 'msinfo32' },
    { category: '🛡️ Privacidade & Atalhos', title: 'Monitor de Recursos', desc: 'Acompanhe o consumo de uso de CPU, Disco e Rede por app.', cmd: 'resmon' },
    { category: '🛡️ Privacidade & Atalhos', title: 'Monitor de Desempenho', desc: 'Analise o comportamento de hardware em tempo real.', cmd: 'perfmon' }
  ];

  const filteredOptimizations = freeOptimizations.filter(item => 
    item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

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
                { title: 'Otimizações Gratuitas', val: '50+ Disponíveis', color: '#34d399', desc: 'Comandos prontos para cópia rápida.' },
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '26px', color: '#fff', margin: '0 0 5px 0' }}>🎁 Otimizações Free ({filteredOptimizations.length})</h2>
                <p style={{ color: '#9ca3af', margin: 0 }}>Copie o comando e cole na tecla Windows + R (Executar) ou no CMD/PowerShell.</p>
              </div>

              {/* Barra de Pesquisa */}
              <input
                type="text"
                placeholder="🔍 Pesquisar otimização..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  background: 'rgba(18, 12, 28, 0.8)',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  color: '#fff',
                  outline: 'none',
                  minWidth: '250px'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '18px' }}>
              {filteredOptimizations.map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(18, 12, 28, 0.7)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  padding: '18px',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.2s, border-color 0.2s'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#a78bfa', fontWeight: 'bold' }}>{item.category}</span>
                      <span style={{
                        background: 'rgba(52, 211, 153, 0.15)',
                        border: '1px solid rgba(52, 211, 153, 0.4)',
                        color: '#34d399',
                        fontSize: '9px',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        borderRadius: '6px'
                      }}>FREE</span>
                    </div>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#fff' }}>{item.title}</h4>
                    <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: '#9ca3af', lineHeight: '1.4' }}>{item.desc}</p>
                  </div>

                  <div style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <code style={{ fontSize: '11px', color: '#c084fc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.cmd}</code>
                    <button
                      onClick={() => handleCopy(item.cmd)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        background: copiedText === item.cmd ? '#34d399' : 'rgba(168, 85, 247, 0.25)',
                        border: '1px solid rgba(168, 85, 247, 0.4)',
                        color: copiedText === item.cmd ? '#000' : '#c084fc',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: '0.2s'
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
          </div>
        )}

        {activeTab === 'jogos' && (
          <div>
            <h2 style={{ fontSize: '26px', color: '#fff', marginBottom: '8px' }}>🎮 Modo Gamer & FPS</h2>
            <p style={{ color: '#9ca3af', marginBottom: '25px' }}>Reduza o input lag e estabilize sua taxa de quadros.</p>
          </div>
        )}

        {activeTab === 'limpeza' && (
          <div>
            <h2 style={{ fontSize: '26px', color: '#fff', marginBottom: '8px' }}>🧹 Limpeza Deep Dark</h2>
            <p style={{ color: '#9ca3af', marginBottom: '25px' }}>Atalhos diretos para apagar arquivos desnecessários.</p>
          </div>
        )}
      </main>
    </div>
  );
}
