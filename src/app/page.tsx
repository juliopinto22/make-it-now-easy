'use client';

import React, { useState } from 'react';

type Section = 'free' | 'premium';

export default function App() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<Section>('free');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  // Estados do VIP
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [vipKeyInput, setVipKeyInput] = useState('');
  const [keyError, setKeyError] = useState(false);

  // CHAVE VIP DE ACESSO
  const VALID_KEY = 'KANEKI-VIP-590';
  
  // CHAVE PIX COPIA E COLA (Exemplo)
  const PIX_PASTE = '00020126580014br.gov.bcb.pix0136suachavepixaqui@email.com52040000530398654045.905802BR5915OptimizerKaneki6009Sao Paulo62070503***6304E2CA';

  // Imagem enviada pelo usuário
  const KANEKI_AVATAR = '/kaneki.jpg';
  const KANEKI_BG = 'https://images.alphacoders.com/605/thumb-1920-605782.png';

  const handleVerify = () => {
    if (!acceptedTerms) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1200);
  };

  const handleUnlockVip = (e: React.FormEvent) => {
    e.preventDefault();
    if (vipKeyInput.trim() === VALID_KEY) {
      setIsUnlocked(true);
      setKeyError(false);
    } else {
      setKeyError(true);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1800);
  };

  // ---------------- OTIMIZAÇÕES FREE ----------------
  const freeOptimizations = [
    { category: 'NETWORK', title: 'Flush DNS', desc: 'Limpa rotas e cache de IP acumulados.', cmd: 'ipconfig /flushdns' },
    { category: 'NETWORK', title: 'Renovar IP Local', desc: 'Solicita um novo IP para a placa de rede.', cmd: 'ipconfig /renew' },
    { category: 'NETWORK', title: 'Resetar Winsock', desc: 'Restaura a biblioteca de conexões do Windows.', cmd: 'netsh winsock reset' },
    { category: 'NETWORK', title: 'Reset TCP/IP', desc: 'Reseta o protocolo de rede padrão.', cmd: 'netsh int ip reset' },
    { category: 'NETWORK', title: 'Desativar Chimney', desc: 'Elimina picos de latência em jogos.', cmd: 'netsh int tcp set global chimney=disabled' },
    { category: 'GAMING', title: 'Desativar GameDVR', desc: 'Remove o gravador em segundo plano do Windows.', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR" /v "AllowGameDVR" /t REG_DWORD /d 0 /f' },
    { category: 'GAMING', title: 'Modo de Jogo UI', desc: 'Abre a central para ativar a prioridade de GPU.', cmd: 'start ms-settings:gaming-gamemode' },
    { category: 'GAMING', title: 'Plano Desempenho Máximo', desc: 'Habilita o perfil oculto de energia no sistema.', cmd: 'powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61' },
    { category: 'GAMING', title: 'Desativar Hibernação', desc: 'Economiza espaço e reduz leituras no SSD.', cmd: 'powercfg /hibernate off' },
    { category: 'GAMING', title: 'Painel DirectX', desc: 'Diagnóstico rápido da placa de vídeo.', cmd: 'dxdiag' },
    { category: 'CLEAN', title: 'Pasta Temp Global', desc: 'Abre o diretório temporário do sistema.', cmd: 'temp' },
    { category: 'CLEAN', title: 'Pasta Temp Usuário', desc: 'Abre o cache temporário de programas.', cmd: 'shell:Local AppData\\Temp' },
    { category: 'CLEAN', title: 'Prefetch Cache', desc: 'Abre a pasta de pré-inicialização do Windows.', cmd: 'prefetch' },
    { category: 'CLEAN', title: 'Limpeza de Disco', desc: 'Executa a ferramenta oficial de remoção de lixo.', cmd: 'cleanmgr' },
    { category: 'CLEAN', title: 'Reset Store Cache', desc: 'Limpa o cache acumulado da Microsoft Store.', cmd: 'wsreset.exe' },
    { category: 'SYSTEM', title: 'Reparar Arquivos SFC', desc: 'Corrige arquivos corrompidos do sistema.', cmd: 'sfc /scannow' },
    { category: 'SYSTEM', title: 'Imagem DISM', desc: 'Restaura a imagem base do Windows.', cmd: 'DISM /Online /Cleanup-Image /RestoreHealth' },
    { category: 'SYSTEM', title: 'Efeitos Visuais', desc: 'Abre o painel de ajuste de desempenho visual.', cmd: 'SystemPropertiesPerformance' },
    { category: 'SYSTEM', title: 'Programas de Início', desc: 'Gerencie apps que iniciam com o PC.', cmd: 'msconfig' },
    { category: 'SYSTEM', title: 'Serviços do Windows', desc: 'Abre a lista de serviços para otimização manual.', cmd: 'services.msc' }
  ];

  // ---------------- OTIMIZAÇÕES PREMIUM ----------------
  const premiumOptimizations = [
    { category: 'REGISTRY', title: 'Prioridade Absoluta CPU', desc: 'Força o agendamento de processos em jogos na CPU.', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" /v "Win32PrioritySeparation" /t REG_DWORD /d 38 /f' },
    { category: 'REGISTRY', title: 'MMCSS Games Priority', desc: 'Força áudio e GPU com prioridade máxima no registro.', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "GPU Priority" /t REG_DWORD /d 8 /f' },
    { category: 'REGISTRY', title: 'MMCSS Games Priority CPU', desc: 'Define a prioridade de CPU para tarefas de jogos no MMCSS.', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "Priority" /t REG_DWORD /d 6 /f' },
    { category: 'REGISTRY', title: 'MMCSS Scheduling Category', desc: 'Muda a categoria de agendamento do MMCSS para High.', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "Scheduling Category" /t REG_SZ /d "High" /f' },
    { category: 'REGISTRY', title: 'SFIO Priority High', desc: 'Define prioridade de E/S de jogos para High.', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "SFIO Priority" /t REG_SZ /d "High" /f' },
    { category: 'REGISTRY', title: 'Desativar Nagle Algorithm', desc: 'Desativa o delay de pacotes TCP na placa de rede.', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces" /v "TcpAckFrequency" /t REG_DWORD /d 1 /f' },
    { category: 'REGISTRY', title: 'TCPNoDelay Force', desc: 'Envia dados de jogos instantaneamente sem agrupamento.', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces" /v "TCPNoDelay" /t REG_DWORD /d 1 /f' },
    { category: 'REGISTRY', title: 'Desativar Network Throttling', desc: 'Remove o limite de velocidade de rede do Windows.', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v "NetworkThrottlingIndex" /t REG_DWORD /d 4294967295 /f' },
    { category: 'REGISTRY', title: 'SystemResponsiveness 0%', desc: 'Aloca 100% do poder do sistema para apps em primeiro plano.', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v "SystemResponsiveness" /t REG_DWORD /d 0 /f' },
    { category: 'REGISTRY', title: 'Desativar Sticky Keys Popup', desc: 'Evita janelas pop-up ao apertar SHIFT várias vezes em jogos.', cmd: 'reg add "HKCU\\Control Panel\\Accessibility\\StickyKeys" /v "Flags" /t REG_SZ /d "506" /f' },
    { category: 'MEMORY', title: 'Forçar Descarregamento DLLs', desc: 'Ejeta bibliotecas não utilizadas da memória RAM.', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "AlwaysUnloadDLL" /t REG_DWORD /d 1 /f' },
    { category: 'MEMORY', title: 'Desativar Memory Paging Executive', desc: 'Força os drivers e kernel a ficarem gravados na RAM e não no HD/SSD.', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "DisablePagingExecutive" /t REG_DWORD /d 1 /f' },
    { category: 'MEMORY', title: 'Aumentar System Cache Size', desc: 'Aumenta a alocação de cache interno de leitura para a RAM.', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "LargeSystemCache" /t REG_DWORD /d 1 /f' },
    { category: 'MEMORY', title: 'Limpar Memória de Paged Pool', desc: 'Reduz o acúmulo de cache no pool paginado da RAM.', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "ClearPageFileAtShutdown" /t REG_DWORD /d 0 /f' },
    { category: 'NETWORK_EX', title: 'Max User Port TCP', desc: 'Expande a quantidade máxima de conexões TCP simultâneas.', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v "MaxUserPort" /t REG_DWORD /d 65534 /f' },
    { category: 'NETWORK_EX', title: 'TcpTimedWaitDelay Minimum', desc: 'Reduz o tempo de espera de fechamento de pacotes na rede.', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v "TcpTimedWaitDelay" /t REG_DWORD /d 30 /f' },
    { category: 'NETWORK_EX', title: 'Default TTL Gaming Optim', desc: 'Ajusta o TTL para padrão de alta resposta em roteadores.', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v "DefaultTTL" /t REG_DWORD /d 64 /f' },
    { category: 'SERVICES', title: 'Desativar Telemetria', desc: 'Muda a coleta de dados da Microsoft em segundo plano para zero.', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f' },
    { category: 'SERVICES', title: 'Desativar Maps Broker Service', desc: 'Desativa o serviço invisível de download de mapas do Windows.', cmd: 'sc config MapsBroker start= disabled' },
    { category: 'SERVICES', title: 'Desativar Windows Search Index', desc: 'Para o consumo constante de disco do indexador do Windows.', cmd: 'sc config WSearch start= disabled' },
    { category: 'SERVICES', title: 'Desativar Telemetria DiagTrack', desc: 'Para o serviço de rastreamento de diagnósticos em segundo plano.', cmd: 'sc config DiagTrack start= disabled' },
    { category: 'SERVICES', title: 'Desativar Serviço dmwappushservice', desc: 'Desativa o serviço de envio de dados de rastreio corporativo.', cmd: 'sc config dmwappushservice start= disabled' },
    { category: 'FULL_FPS', title: 'Desativar Fullscreen Optimizations', desc: 'Remove o overlay do Windows em jogos para menor Input Lag.', cmd: 'reg add "HKCU\\System\\GameConfigStore" /v "GameDVR_FSEBehaviorMode" /t REG_DWORD /d 2 /f' },
    { category: 'FULL_FPS', title: 'Desativar GameBar Overlay', desc: 'Desliga a barra flutuante da Xbox Game Bar completamente.', cmd: 'reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f' },
    { category: 'FULL_FPS', title: 'Habilitar Agendamento GPU HAGS', desc: 'Ativa o controle de memória direto da Placa de Vídeo.', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v "HwSchMode" /t REG_DWORD /d 2 /f' },
    { category: 'FULL_FPS', title: 'Forçar Renderização GPU', desc: 'Força aceleração de hardware do Direct3D em segundo plano.', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\DirectX" /v "MaxPreRenderedFrames" /t REG_DWORD /d 1 /f' }
  ];

  const currentList = activeTab === 'free' ? freeOptimizations : premiumOptimizations;

  const filtered = currentList.filter(i => 
    i.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    i.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  if (!verified) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url(${KANEKI_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(10, 10, 10, 0.9)',
          border: '1px solid rgba(220, 38, 38, 0.4)',
          padding: '30px',
          borderRadius: '16px',
          textAlign: 'center',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 0 30px rgba(220, 38, 38, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            width: '75px',
            height: '75px',
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto 15px auto',
            border: '2px solid #dc2626',
            boxShadow: '0 0 15px rgba(220,38,38,0.5)'
          }}>
            <img src={KANEKI_AVATAR} alt="Kaneki" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '2px', marginBottom: '4px', color: '#fff' }}>
            OPTIMIZER KANEKI
          </h2>
          <p style={{ fontSize: '11px', color: '#888', marginBottom: '20px' }}>
            Verificação de Segurança & Termos
          </p>

          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '11px',
            color: '#a3a3a3',
            textAlign: 'left',
            lineHeight: '1.4',
            maxHeight: '110px',
            overflowY: 'auto',
            marginBottom: '15px'
          }}>
            <strong style={{ color: '#dc2626' }}>AVISO DE DIREITOS AUTORAIS E ISENÇÃO:</strong><br />
            1. As imagens e referências pertencem a Sui Ishida / Tokyo Ghoul.<br />
            2. Este projeto é de uso educacional e informativo.<br />
            3. Os comandos fornecidos utilizam recursos nativos do sistema operacional. Use por sua conta e risco.
          </div>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#ccc',
            marginBottom: '20px',
            cursor: 'pointer',
            textAlign: 'left'
          }}>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              style={{ accentColor: '#dc2626', cursor: 'pointer' }}
            />
            Li e concordo com os termos e avisos.
          </label>

          <button
            onClick={handleVerify}
            disabled={!acceptedTerms || verifying}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              background: !acceptedTerms ? '#222' : (verifying ? '#333' : '#dc2626'),
              border: 'none',
              color: !acceptedTerms ? '#555' : '#fff',
              fontWeight: 'bold',
              fontSize: '13px',
              letterSpacing: '1px',
              cursor: !acceptedTerms ? 'not-allowed' : (verifying ? 'wait' : 'pointer'),
              transition: '0.2s',
              boxShadow: !acceptedTerms ? 'none' : '0 0 15px rgba(220, 38, 38, 0.4)'
            }}
          >
            {verifying ? 'VERIFICANDO...' : 'ACESSAR PAINEL'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#e5e5e5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Sidebar Retrátil */}
      <aside style={{
        width: collapsed ? '70px' : '230px',
        backgroundColor: '#050505',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px 12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.25s ease',
        zIndex: 10
      }}>
        <div>
          {/* Header Sidebar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '30px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            paddingLeft: collapsed ? '0' : '5px'
          }}>
            <img
              src={KANEKI_AVATAR}
              alt="Kaneki"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid #dc2626',
                objectFit: 'cover'
              }}
            />
            {!collapsed && (
              <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1px', color: '#fff' }}>
                OPTIMIZER <span style={{ color: '#dc2626' }}>KANEKI</span>
              </span>
            )}
          </div>

          {/* Navegação */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('free')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'free' ? 'rgba(220, 38, 38, 0.15)' : 'transparent',
                color: activeTab === 'free' ? '#dc2626' : '#737373',
                fontWeight: activeTab === 'free' ? '700' : '500',
                fontSize: '13px',
                cursor: 'pointer',
                justifyContent: collapsed ? 'center' : 'flex-start',
                transition: '0.15s'
              }}
            >
              <span style={{ fontSize: '16px' }}>⚡</span>
              {!collapsed && <span>Otimizações Free</span>}
            </button>

            <button
              onClick={() => setActiveTab('premium')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: activeTab === 'premium' ? '1px solid #dc2626' : '1px solid rgba(220, 38, 38, 0.2)',
                background: activeTab === 'premium' ? 'linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(0,0,0,0.8) 100%)' : 'rgba(220, 38, 38, 0.05)',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
                justifyContent: collapsed ? 'center' : 'flex-start',
                boxShadow: activeTab === 'premium' ? '0 0 12px rgba(220,38,38,0.3)' : 'none',
                transition: '0.15s'
              }}
            >
              <span style={{ fontSize: '16px' }}>👑</span>
              {!collapsed && (
                <span style={{ color: '#dc2626', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  PREMIUM R$ 5,90
                  {!isUnlocked && <span style={{ fontSize: '10px', opacity: 0.7 }}>🔒</span>}
                </span>
              )}
            </button>
          </nav>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#a3a3a3',
            borderRadius: '6px',
            padding: '8px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          {collapsed ? '➔' : '⬅ Recolher'}
        </button>
      </aside>

      {/* Conteúdo Principal */}
      <main style={{ flex: 1, padding: '35px 40px', overflowY: 'auto' }}>
        {/* CASO A ABA PREMIUM ESTEJA BLOQUEADA */}
        {activeTab === 'premium' && !isUnlocked ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '75vh',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#050505',
              border: '1px solid rgba(220, 38, 38, 0.4)',
              borderRadius: '16px',
              padding: '30px 35px',
              maxWidth: '460px',
              boxShadow: '0 0 35px rgba(220, 38, 38, 0.2)'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>👑</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: '0 0 6px 0' }}>
                DESBLOQUEAR PREMIUM VIP (FULL FPS)
              </h2>
              <p style={{ fontSize: '12px', color: '#a3a3a3', marginBottom: '20px', lineHeight: '1.4' }}>
                Escaneie o QR Code abaixo para pagar via PIX por apenas <strong style={{ color: '#dc2626' }}>R$ 5,90</strong> e digite sua Chave de Acesso.
              </p>

              {/* QR CODE PIX */}
              <div style={{
                backgroundColor: '#fff',
                padding: '12px',
                borderRadius: '12px',
                display: 'inline-block',
                marginBottom: '15px',
                boxShadow: '0 0 15px rgba(255,255,255,0.1)'
              }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(PIX_PASTE)}`}
                  alt="QR Code PIX R$ 5,90"
                  style={{ width: '160px', height: '160px', display: 'block' }}
                />
              </div>

              {/* PIX COPIA E COLA */}
              <div style={{ marginBottom: '20px' }}>
                <button
                  onClick={() => handleCopy(PIX_PASTE)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                >
                  {copiedText === PIX_PASTE ? '✓ PIX COPIADO!' : '📋 COPIAR PIX COPIA E COLA (R$ 5,90)'}
                </button>
              </div>

              {/* FORMULÁRIO DA CHAVE VIP */}
              <form onSubmit={handleUnlockVip} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Cole sua Chave VIP recebida..."
                  value={vipKeyInput}
                  onChange={(e) => setVipKeyInput(e.target.value)}
                  style={{
                    padding: '11px',
                    borderRadius: '8px',
                    border: keyError ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: '12px',
                    outline: 'none'
                  }}
                />
                {keyError && (
                  <span style={{ fontSize: '11px', color: '#ef4444' }}>Chave incorreta. Tente novamente.</span>
                )}

                <button
                  type="submit"
                  style={{
                    padding: '11px',
                    borderRadius: '8px',
                    background: '#dc2626',
                    border: 'none',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                  }}
                >
                  ATIVAR ACESSO VIP
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* EXIBIÇÃO DA LISTA LIBERADA */
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {activeTab === 'free' ? 'Otimizações Padrão' : 'Ajustes Extremos Registro & FPS (Premium VIP)'}
                  {activeTab === 'premium' && (
                    <span style={{ fontSize: '10px', background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: '4px', letterSpacing: '1px' }}>
                      DESBLOQUEADO
                    </span>
                  )}
                </h1>
                <p style={{ fontSize: '13px', color: '#525252', margin: '4px 0 0 0' }}>
                  {activeTab === 'free' 
                    ? 'Comandos nativos básicos e manutenção de rotina' 
                    : 'Alterações profundas de registro (reg add) para maximizar o FPS do seu PC'}
                </p>
              </div>

              <input
                type="text"
                placeholder="Filtrar ajuste..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  backgroundColor: '#0a0a0a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none',
                  width: '200px'
                }}
              />
            </div>

            {/* Grid dos Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
              {filtered.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#050505',
                    border: activeTab === 'premium' ? '1px solid rgba(220, 38, 38, 0.25)' : '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '16px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '10px', color: '#dc2626', fontWeight: 'bold', letterSpacing: '1px' }}>
                        {item.category}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#fff', margin: '0 0 4px 0' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#666', margin: 0, lineHeight: '1.4' }}>
                      {item.desc}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#000',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.04)'
                  }}>
                    <code style={{ fontSize: '10px', color: '#a3a3a3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '170px' }}>
                      {item.cmd}
                    </code>
                    <button
                      onClick={() => handleCopy(item.cmd)}
                      style={{
                        background: copiedText === item.cmd ? '#dc2626' : 'transparent',
                        border: 'none',
                        color: copiedText === item.cmd ? '#fff' : '#dc2626',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        transition: '0.15s'
                      }}
                    >
                      {copiedText === item.cmd ? 'COPIADO' : 'COPIAR'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
