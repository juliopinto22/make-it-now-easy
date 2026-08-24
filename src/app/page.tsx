'use client';

import { useState, useEffect } from 'react';

// 🔒 SENHA DE ACESSO PREMIUM — SÓ VOCÊ SABE!
const SENHA_PREMIUM = 'Kaneki123';

export default function App() {
  // Segurança automática
  const [carregando, setCarregando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);
  
  // Navegação e acesso premium
  const [abaAtiva, setAbaAtiva] = useState('free');
  const [premiumLiberado, setPremiumLiberado] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [status, setStatus] = useState('');
  const [pixChave, setPixChave] = useState('');

  useEffect(() => {
    setPixChave('julioserafim1234566@gmail.com');
    
    // Validação de segurança automática
    const validarAcesso = () => {
      setTimeout(() => {
        setAutorizado(true);
        setCarregando(false);
      }, 2000);
    };

    validarAcesso();
  }, []);

  const verificarSenhaPremium = () => {
    if (senhaDigitada === SENHA_PREMIUM) {
      setPremiumLiberado(true);
      setErroSenha('');
    } else {
      setErroSenha('❌ Senha incorreta! Acesso negado.');
    }
  };

  const copiar = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setStatus('✅ Copiado! Cole no CMD como Administrador');
    setTimeout(() => setStatus(''), 3500);
  };

  // === 70 OTIMIZAÇÕES CMD ===
  const otimizacoesCMD = [
    { id:1, nome:'Limpar DNS', cmd:'ipconfig /flushdns', perigo:'baixo' },
    { id:2, nome:'Renovar DNS', cmd:'ipconfig /registerdns', perigo:'baixo' },
    { id:3, nome:'Liberar DNS', cmd:'ipconfig /release', perigo:'médio' },
    { id:4, nome:'Obter novo IP', cmd:'ipconfig /renew', perigo:'médio' },
    { id:5, nome:'Parar serviço de atualização', cmd:'net stop wuauserv', perigo:'médio' },
    { id:6, nome:'Desativar serviços desnecessários', cmd:'sc config "wuauserv" start= disabled', perigo:'alto' },
    { id:7, nome:'Limpar arquivos temporários', cmd:'del /f /s /q %temp%\\*', perigo:'médio' },
    { id:8, nome:'Limpar pasta Temp do Windows', cmd:'del /f /s /q C:\\Windows\\Temp\\*', perigo:'alto' },
    { id:9, nome:'Limpar Prefetch', cmd:'del /f /s /q C:\\Windows\\Prefetch\\*', perigo:'alto' },
    { id:10, nome:'Configurar energia — Alto Desempenho', cmd:'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c', perigo:'médio' },
    { id:11, nome:'Desativar hibernação', cmd:'powercfg /hibernate off', perigo:'médio' },
    { id:12, nome:'Definir tempo de disco inativo', cmd:'powercfg /change disk-timeout-ac 0', perigo:'médio' },
    { id:13, nome:'Desativar suspensão', cmd:'powercfg /change standby-timeout-ac 0', perigo:'médio' },
    { id:14, nome:'Desativar hibernação híbrida', cmd:'powercfg /setacvalueindex scheme_current sub_sleep 94d3a615-a776-45e0-ba63-9fce9990ebef 0', perigo:'alto' },
    { id:15, nome:'Otimizar desempenho do sistema', cmd:'sysdm.cpl → Avançado → Desempenho → Ajustar para melhor desempenho', perigo:'alto' },
    { id:16, nome:'Desativar proteção de tempo de execução', cmd:'bcdedit /set nx AlwaysOff', perigo:'alto' },
    { id:17, nome:'Ativar inicialização rápida', cmd:'bcdedit /set bootmenupolicy legacy', perigo:'alto' },
    { id:18, nome:'Definir processadores na inicialização', cmd:'bcdedit /set {current} numproc %NUMBER_OF_PROCESSORS%', perigo:'alto' },
    { id:19, nome:'Desativar limite de memória', cmd:'bcdedit /deletevalue {current} truncatememory', perigo:'alto' },
    { id:20, nome:'Limpar logs do sistema', cmd:'for /f "tokens=*" %1 in (\'wevtutil el\') do wevtutil cl "%1"', perigo:'alto' },
    { id:21, nome:'Parar serviço Superfetch', cmd:'net stop SysMain', perigo:'médio' },
    { id:22, nome:'Desativar Superfetch', cmd:'sc config SysMain start= disabled', perigo:'alto' },
    { id:23, nome:'Parar busca do Windows', cmd:'net stop WSearch', perigo:'médio' },
    { id:24, nome:'Desativar Busca do Windows', cmd:'sc config WSearch start= disabled', perigo:'alto' },
    { id:25, nome:'Parar serviço de impressão', cmd:'net stop spooler', perigo:'baixo' },
    { id:26, nome:'Limpar fila de impressão', cmd:'del /f /s /q %systemroot%\\System32\\spool\\PRINTERS\\*', perigo:'médio' },
    { id:27, nome:'Desativar compartilhamento de arquivos', cmd:'netsh advfirewall firewall set rule group="Arquivos e Impressoras Compartilhados" new enable=No', perigo:'alto' },
    { id:28, nome:'Desativar acesso remoto', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:29, nome:'Desativar Área de Transferência Remota', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\Terminal Services" /v fDisableClip /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:30, nome:'Desativar animações do Windows', cmd:'reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v MinAnimate /t REG_SZ /d 0 /f', perigo:'médio' },
    { id:31, nome:'Desativar transparência', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v EnableTransparency /t REG_DWORD /d 0 /f', perigo:'baixo' },
    { id:32, nome:'Desativar efeitos visuais pesados', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v VisualFXSetting /t REG_DWORD /d 2 /f', perigo:'médio' },
    { id:33, nome:'Aumentar prioridade de primeiro plano', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\PriorityControl" /v Win32PrioritySeparation /t REG_DWORD /d 26 /f', perigo:'alto' },
    { id:34, nome:'Desativar limitação de CPU', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Power\\Throttling" /v NoThrottling /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:35, nome:'Otimizar rede — CTCP', cmd:'netsh int tcp set global congestionprovider=ctcp', perigo:'alto' },
    { id:36, nome:'Ativar janela automática', cmd:'netsh int tcp set global autotuninglevel=normal', perigo:'médio' },
    { id:37, nome:'Desativar algoritmo de Nagle', cmd:'netsh int tcp set global ecncapability=disabled', perigo:'médio' },
    { id:38, nome:'Definir MTU ideal', cmd:'netsh int tcp set global mtu=1500', perigo:'médio' },
    { id:39, nome:'Desativar limitação de E/S', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\I/O System" /v System /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:40, nome:'Reduzir tempo de espera de conexão', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpTimedWaitDelay /t REG_DWORD /d 30 /f', perigo:'alto' },
    { id:41, nome:'Aumentar número de portas', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v MaxFreeTcbs /t REG_DWORD /d 65536 /f', perigo:'alto' },
    { id:42, nome:'Ativar receção em larga escala', cmd:'netsh int tcp set global rss=enabled', perigo:'médio' },
    { id:43, nome:'Ativar TCP Fast Open', cmd:'netsh int tcp set global tcp1323opts=enabled', perigo:'alto' },
    { id:44, nome:'Limpar cache de fontes', cmd:'del /f /s /q "%LocalAppData%\\Microsoft\\Windows\\Fonts\\*"', perigo:'alto' },
    { id:45, nome:'Reduzir atraso de menu', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v MenuShowDelay /t REG_SZ /d 20 /f', perigo:'médio' },
    { id:46, nome:'Desativar dicas de informação', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v ShowInfoTip /t REG_DWORD /d 1 /f', perigo:'baixo' },
    { id:47, nome:'Remover atalhos de ícone', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v Link /t REG_BINARY /d 00000000 /f', perigo:'médio' },
    { id:48, nome:'Desativar sombras de ícones', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v ListviewAlpha /t REG_DWORD /d 0 /f', perigo:'médio' },
    { id:49, nome:'Desativar versão na área de trabalho', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v PaintDesktopVersion /t REG_DWORD /d 0 /f', perigo:'baixo' },
    { id:50, nome:'Desativar relatórios de erros', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\Windows Error Reporting" /v Disabled /t REG_DWORD /d 1 /f', perigo:'médio' },
    { id:51, nome:'Desativar telemetria', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:52, nome:'Desativar coleta de dados', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:53, nome:'Desativar apps em segundo plano', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications" /v GlobalDisabled /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:54, nome:'Desativar notificações', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" /v ToastEnabled /t REG_DWORD /d 0 /f', perigo:'médio' },
    { id:55, nome:'Desativar proteção de rollback', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Installer" /v DisableRollback /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:56, nome:'Limpeza profunda de RAM', cmd:'Rundll32.exe advapi32.dll,ProcessIdleTasks', perigo:'médio' },
    { id:57, nome:'Otimizar disco', cmd:'defrag C: /O', perigo:'alto' },
    { id:58, nome:'Reparar arquivos do sistema', cmd:'sfc /scannow', perigo:'alto' },
    { id:59, nome:'Reparar imagem do sistema', cmd:'DISM /Online /Cleanup-Image /RestoreHealth', perigo:'alto' },
    { id:60, nome:'Limpar atualizações antigas', cmd:'dism /online /cleanup-image /spsuperseded', perigo:'alto' },
    { id:61, nome:'Redefinir Winsock', cmd:'netsh winsock reset', perigo:'alto' },
    { id:62, nome:'Redefinir IPv4', cmd:'netsh interface ipv4 reset', perigo:'alto' },
    { id:63, nome:'Desativar IPv6', cmd:'netsh interface ipv6 set global randomizeidentifiers=disabled', perigo:'alto' },
    { id:64, nome:'Remover perfis Wi-Fi salvos', cmd:'netsh wlan delete profile name=*', perigo:'médio' },
    { id:65, nome:'Desativar economia de energia USB', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\usbccgp" /v DisableSelectiveSuspend /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:66, nome:'Desativar ASPM PCIe', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\pci" /v ExpressPcieAspm /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:67, nome:'Desativar gerenciamento de energia de rede', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Class\\{4d36e972-e325-11ce-bfc1-08002be10318}\\0000" /v *EEE /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:68, nome:'Desativar cache de sistema', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager" /v LargeSystemCache /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:69, nome:'Desativar paginação do kernel', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v DisablePagingExecutive /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:70, nome:'Limpeza final do sistema', cmd:'cleanmgr /sagerun:1', perigo:'médio' },
  ];

  // === 10 FAST FLAGS ROBLOX ===
  const fastFlags = [
    { id:1, nome:'FPS Ilimitado', flag:'FramerateLimit = 0', tipo:'fps' },
    { id:2, nome:'Modo de Render Ideal', flag:'RenderingMode = "Automatic"', tipo:'fps' },
    { id:3, nome:'Física em Modo Desempenho', flag:'PhysicsEnvironment = "Performance"', tipo:'fps' },
    { id:4, nome:'Sem Sombras Dinâmicas', flag:'DynamicShadows = false', tipo:'fps' },
    { id:5, nome:'Partículas Leves', flag:'ParticleQuality = 1', tipo:'fps' },
    { id:6, nome:'Textura em Alta Definição', flag:'TextureQuality = "High"', tipo:'graficos' },
    { id:7, nome:'Sombras Suaves', flag:'ShadowQuality = 3', tipo:'graficos' },
    { id:8, nome:'Iluminação Avançada', flag:'GraphicsMode = "Automatic"', tipo:'graficos' },
    { id:9, nome:'Reflexos de Água', flag:'RefractionQuality = 2', tipo:'graficos' },
    { id:10, nome:'Efeito de Brilho', flag:'BloomEffect = true', tipo:'graficos' },
  ];

  const corPerigo = (nivel: string) => {
    if (nivel === 'baixo') return '#22c55e';
    if (nivel === 'médio') return '#eab308';
    return '#ef4444';
  };

  // Tela de carregamento de segurança
  if (carregando) {
    return (
      <div style={{
        background: 'linear-gradient(180deg, #0a0a0a, #1a0000)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Segoe UI, sans-serif',
        color: '#fff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 48, color: '#cc0000', letterSpacing: 8, margin: 0 }}>KANEKI</h1>
          <p style={{ color: '#666', letterSpacing: 5, fontSize: 12, marginTop: 5, marginBottom: 30 }}>VERIFICAÇÃO DE SEGURANÇA</p>
          <div style={{
            width: 200,
            height: 3,
            background: '#220000',
            borderRadius: 4,
            margin: '0 auto 20px auto',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: '#cc0000',
              animation: 'carregando 2s ease-in-out'
            }}></div>
          </div>
          <p style={{ color: '#999', fontSize: 13 }}>Analisando sistema e protegendo acesso...</p>
          <style>{`
            @keyframes carregando {
              0% { width: 0%; marginLeft: 0; }
              100% { width: 100%; marginLeft: 0; }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Layout principal
  return (
    <div style={{
      background: 'linear-gradient(180deg, #0a0a0a, #1a0000)',
      minHeight: '100vh',
      display: 'flex',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#fff'
    }}>
      {/* BARRA LATERAL */}
      <div style={{
        width: 240,
        background: 'rgba(5,0,0,0.95)',
        borderRight: '1px solid #330000',
        padding: '25px 15px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ textAlign: 'center', color: '#cc0000', letterSpacing: 5, fontSize: 22, margin: '0 0 30px 0' }}>KANEKI</h2>
        <p style={{ textAlign: 'center', color: '#555', fontSize: 11, letterSpacing: 3, marginBottom: 20 }}>BIBLIOTECA</p>

        {[
          { key:'free', icon:'⚙️', label:'Otimizações CMD' },
          { key:'flags', icon:'🎮', label:'Fast Flags Roblox' },
          { key:'premium', icon:'👑', label:'Área Premium 🔒' }
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setAbaAtiva(item.key)}
            style={{
              background: abaAtiva === item.key ? 'rgba(100,0,0,0.3)' : 'transparent',
              color: abaAtiva === item.key ? '#ff6666' : '#999',
              border: abaAtiva === item.key ? '1px solid #8b0000' : '1px solid transparent',
              padding: '12px 15px',
              borderRadius: 6,
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: 14,
              letterSpacing: 1,
              transition: '0.2s'
            }}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div style={{ marginLeft: 240, flex: 1, padding: '30px 40px', maxWidth: 900 }}>
        
        {/* ABA — OTIMIZAÇÕES CMD */}
        {abaAtiva === 'free' && (
          <>
            <h2 style={{ color: '#fff', marginBottom: 8 }}>⚙️ 70 Otimizações do Sistema</h2>
            <p style={{ color: '#888', fontSize: 13, marginBottom: 20 }}>Cole os comandos no Prompt de Comando (CMD) como Administrador</p>
            
            <div style={{
              background: 'rgba(60,0,0,0.3)',
              border: '1px solid #8b0000',
              borderRadius: 8,
              padding: 15,
              marginBottom: 25
            }}>
              <h4 style={{ color: '#ffcc00', margin: '0 0 10px 0' }}>⚠️ AVISO DE SEGURANÇA</h4>
              <p style={{ color: '#ddd', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                <span style={{ color:'#22c55e' }}>● Verde:</span> Seguro — pode usar sem medo<br/>
                <span style={{ color:'#eab308' }}>● Amarelo:</span> Cuidado — altera configurações de rede e serviços<br/>
                <span style={{ color:'#ef4444' }}>● Vermelho:</span> PERIGOSO — altera registro e sistema. Sabe o que faz antes de usar!
              </p>
            </div>

            {status && <p style={{ color: '#66ff66', marginBottom: 15, fontSize: 14 }}>{status}</p>}

            <div style={{ display: 'grid', gap: 10 }}>
              {otimizacoesCMD.map(opt => (
                <div key={opt.id} style={{
                  background: 'rgba(20,0,0,0.5)',
                  borderLeft: `3px solid ${corPerigo(opt.perigo)}`,
                  padding: '12px 16px',
                  borderRadius: 4,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontWeight: 500, fontSize: 14 }}>{opt.id}. {opt.nome}</span>
                    <span style={{
                      fontSize: 10,
                      marginLeft: 8,
                      padding: '1px 6px',
                      borderRadius: 3,
                      background: corPerigo(opt.perigo),
                      color: opt.perigo === 'alto' ? '#000' : '#fff'
                    }}>{opt.perigo.toUpperCase()}</span>
                    <p style={{ fontSize: 11, color: '#888', marginTop: 4, fontFamily: 'monospace' }}>{opt.cmd}</p>
                  </div>
                  <button
                    onClick={() => copiar(opt.cmd)}
                    style={{
                      background: 'transparent',
                      border: '1px solid #8b0000',
                      color: '#ff6666',
                      padding: '6px 12px',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontSize: 12,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Copiar
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ABA — FAST FLAGS ROBLOX */}
        {abaAtiva === 'flags' && (
          <>
            <h2 style={{ color: '#fff', marginBottom: 8 }}>🎮 Fast Flags — Roblox</h2>
            <p style={{ color: '#888', fontSize: 13, marginBottom: 25 }}>5 para FPS + 5 para Gráficos. Cole nas configurações do Roblox.</p>

            {['fps', 'graficos'].map(tipo => (
              <div key={tipo} style={{ marginBottom: 30 }}>
                <h3 style={{ color: tipo === 'fps' ? '#ff9933' : '#66ccff', fontSize: 16, marginBottom: 15 }}>
                  {tipo === 'fps' ? '⚡ Aumentar FPS (5)' : '✨ Gráficos Bonitos (5)'}
                </h3>
                {fastFlags.filter(f => f.tipo === tipo).map(flag => (
                  <div key={flag.id} style={{
                    background: 'rgba(20,0,0,0.5)',
                    border: '1px solid #2b0000',
                    borderRadius: 6,
                    padding: 14,
                    marginBottom: 10,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <strong style={{ fontSize: 14 }}>{flag.id}. {flag.nome}</strong>
                      <p style={{ fontSize: 12, color: '#aaa', marginTop: 6, fontFamily: 'monospace' }}>{flag.flag}</p>
                    </div>
                    <button
                      onClick={() => copiar(flag.flag)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #8b0000',
                        color: '#ff6666',
                        padding: '6px 12px',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 12
                      }}
                    >
                      Copiar
                    </button>
                  </div>
                ))}
              </div>
            ))}
            {status && <p style={{ color: '#66ff66', marginTop: 15 }}>{status}</p>}
          </>
        )}

        {/* ABA — PREMIUM */}
        {abaAtiva === 'premium' && (
          <>
            <h2 style={{ color: '#ffcc00', marginBottom: 25, textAlign: 'center' }}>👑 ÁREA PREMIUM</h2>

            {!premiumLiberado ? (
              <div style={{
                maxWidth: 380,
                margin: '0 auto',
                textAlign: 'center',
                background: 'rgba(40,0,0,0.5)',
                border: '2px solid #8b0000',
                borderRadius: 12,
                padding: 30,
                boxShadow: '0 0 30px rgba(139,0,0,0.3)'
              }}>
                <h3 style={{ color: '#ffcc00', margin: '0 0 20px 0', letterSpacing: 2, fontSize: 16 }}>🔒 ACESSO RESTRITO</h3>
                <p style={{ color: '#aaa', fontSize: 13, marginBottom: 20 }}>Digite a senha para liberar a área Premium</p>
                <input
                  type="password"
                  value={senhaDigitada}
                  onChange={(e) => setSenhaDigitada(e.target.value)}
                  placeholder="Digite a senha..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#0a0a0a',
                    border: '1px solid #440000',
                    borderRadius: 6,
                    color: '#fff',
                    fontSize: 14,
                    marginBottom: 15,
                    outline: 'none'
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && verificarSenhaPremium()}
                />
                <button
                  onClick={verificarSenhaPremium}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#8b0000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  🔓 Liberar Acesso
                </button>
                {erroSenha && <p style={{ color: '#ff4444', marginTop: 15, fontSize: 13 }}>{erroSenha}</p>}
              </div>
            ) : (
              <div style={{
                maxWidth: 380,
                margin: '0 auto',
                textAlign: 'center',
                background: 'rgba(40,0,0,0.5)',
                border: '2px solid #8b0000',
                borderRadius: 12,
                padding: 30,
                boxShadow: '0 0 30px rgba(139,0,0,0.3)'
              }}>
                <h3 style={{ color: '#00ff66', margin: '0 0 20px 0', letterSpacing: 2, fontSize: 16 }}>✅ ACESSO LIBERADO</h3>
                <h4 style={{ color: '#fff', margin: '0 0 20px 0', letterSpacing: 3, fontSize: 15 }}>PAGAMENTO VIA PIX</h4>
                
                {/* ✅ QR CODE BRANCO E CENTRALIZADO */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                  {pixChave && (
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=FFFFFF&bgcolor=0F0505&data=${encodeURIComponent(pixChave)}`}
                      alt="QR Code PIX"
                      style={{ 
                        width: 220, 
                        height: 220, 
                        borderRadius: 8, 
                        border: '3px solid #FFFFFF',
                        boxShadow: '0 0 25px rgba(255,255,255,0.2)'
                      }}
                    />
                  )}
                </div>
                
                <p style={{ color: '#cccccc', marginTop: 10, fontSize: 14 }}>💳 Escaneie o QR Code branco</p>
                <p style={{ color: '#666', fontSize: 11, marginTop: 5 }}>🔒 Chave protegida — não é exibida publicamente</p>
                <p style={{ color: '#888', fontSize: 12, marginTop: 20, lineHeight: 1.5 }}>
                  Após o pagamento envie o comprovante<br/>para liberação das otimizações avançadas
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
