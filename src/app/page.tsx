'use client';

import { useState, useEffect } from 'react';

// 🔑 DADOS DO SISTEMA
const SENHA_ADMINISTRADOR = 'JulioKaneki999';
const SENHA_PREMIUM = 'Pagamento@2026';
const CHAVE_PIX = '+55 11947138400';

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('free');
  const [adminLiberado, setAdminLiberado] = useState(false);
  const [premiumPagoLiberado, setPremiumPagoLiberado] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [tipoAcesso, setTipoAcesso] = useState<'admin' | 'premium' | null>(null);
  const [erroSenha, setErroSenha] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setTimeout(() => setCarregando(false), 2000);
  }, []);

  // ✅ FUNÇÃO DE SENHA NO SEU MODELO EXATO
  const verificarSenha = () => {
    if (tipoAcesso === 'admin' && senhaDigitada === SENHA_ADMINISTRADOR) {
      setAdminLiberado(true);
      setErroSenha('✅ Bem-vindo, Administrador! Acesso TOTAL liberado!');
    } else if (tipoAcesso === 'premium' && senhaDigitada === SENHA_PREMIUM) {
      setPremiumPagoLiberado(true);
      setErroSenha('✅ Acesso Premium LIBERADO! Aproveite o FPS MÁXIMO!');
    } else {
      setErroSenha('❌ Senha incorreta! Compre para receber acesso.');
    }
    setSenhaDigitada('');
  };

  const copiar = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setStatus('✅ Copiado! Cole no CMD como ADMINISTRADOR!');
    setTimeout(() => setStatus(''), 4000);
  };

  // ==============================================
  // 🔥 70 OTIMIZAÇÕES GRATUITAS
  // ==============================================
  const otimizacoesGratuitas = [
    { id:1, nome:'Limpar DNS', cmd:'ipconfig /flushdns', perigo:'baixo' },
    { id:2, nome:'Renovar DNS', cmd:'ipconfig /registerdns', perigo:'baixo' },
    { id:3, nome:'Liberar DNS', cmd:'ipconfig /release', perigo:'médio' },
    { id:4, nome:'Obter novo IP', cmd:'ipconfig /renew', perigo:'médio' },
    { id:5, nome:'Parar atualização Windows', cmd:'net stop wuauserv', perigo:'médio' },
    { id:6, nome:'Desativar atualização', cmd:'sc config "wuauserv" start= disabled', perigo:'alto' },
    { id:7, nome:'Limpar arquivos temporários', cmd:'del /f /s /q %temp%\\*', perigo:'médio' },
    { id:8, nome:'Limpar Temp do Windows', cmd:'del /f /s /q C:\\Windows\\Temp\\*', perigo:'alto' },
    { id:9, nome:'Limpar Prefetch', cmd:'del /f /s /q C:\\Windows\\Prefetch\\*', perigo:'alto' },
    { id:10, nome:'Plano Alto Desempenho', cmd:'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c', perigo:'médio' },
    { id:11, nome:'Desativar hibernação', cmd:'powercfg /hibernate off', perigo:'médio' },
    { id:12, nome:'Disco sem economia', cmd:'powercfg /change disk-timeout-ac 0', perigo:'médio' },
    { id:13, nome:'Desativar suspensão', cmd:'powercfg /change standby-timeout-ac 0', perigo:'médio' },
    { id:14, nome:'Desativar hibridação', cmd:'powercfg /setacvalueindex scheme_current sub_sleep 94d3a615-a776-45e0-ba63-9fce9990ebef 0', perigo:'alto' },
    { id:15, nome:'Desativar proteção DEP', cmd:'bcdedit /set nx AlwaysOff', perigo:'alto' },
    { id:16, nome:'Inicialização rápida', cmd:'bcdedit /set bootmenupolicy legacy', perigo:'alto' },
    { id:17, nome:'Usar todos os núcleos', cmd:'bcdedit /set {current} numproc %NUMBER_OF_PROCESSORS%', perigo:'alto' },
    { id:18, nome:'Sem limite de memória', cmd:'bcdedit /deletevalue {current} truncatememory', perigo:'alto' },
    { id:19, nome:'Limpar logs do sistema', cmd:'for /f "tokens=*" %1 in (\'wevtutil el\') do wevtutil cl "%1"', perigo:'alto' },
    { id:20, nome:'Parar Superfetch', cmd:'net stop SysMain', perigo:'médio' },
    { id:21, nome:'Desativar Superfetch', cmd:'sc config SysMain start= disabled', perigo:'alto' },
    { id:22, nome:'Parar Busca Windows', cmd:'net stop WSearch', perigo:'médio' },
    { id:23, nome:'Desativar Busca', cmd:'sc config WSearch start= disabled', perigo:'alto' },
    { id:24, nome:'Parar impressão', cmd:'net stop spooler', perigo:'baixo' },
    { id:25, nome:'Limpar fila impressão', cmd:'del /f /s /q %systemroot%\\System32\\spool\\PRINTERS\\*', perigo:'médio' },
    { id:26, nome:'Desativar compartilhamento', cmd:'netsh advfirewall firewall set rule group="Arquivos e Impressoras Compartilhados" new enable=No', perigo:'alto' },
    { id:27, nome:'Desativar Acesso Remoto', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:28, nome:'Sem área remota', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\Terminal Services" /v fDisableClip /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:29, nome:'Sem animações', cmd:'reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v MinAnimate /t REG_SZ /d 0 /f', perigo:'médio' },
    { id:30, nome:'Sem transparência', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v EnableTransparency /t REG_DWORD /d 0 /f', perigo:'baixo' },
    { id:31, nome:'Efeitos visuais mínimos', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v VisualFXSetting /t REG_DWORD /d 2 /f', perigo:'médio' },
    { id:32, nome:'Prioridade em primeiro plano', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\PriorityControl" /v Win32PrioritySeparation /t REG_DWORD /d 38 /f', perigo:'alto' },
    { id:33, nome:'Sem limitação de CPU', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Power\\Throttling" /v NoThrottling /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:34, nome:'Otimizar rede CTCP', cmd:'netsh int tcp set global congestionprovider=ctcp', perigo:'alto' },
    { id:35, nome:'Janela automática ON', cmd:'netsh int tcp set global autotuninglevel=normal', perigo:'médio' },
    { id:36, nome:'Sem Nagle', cmd:'netsh int tcp set global ecncapability=disabled', perigo:'médio' },
    { id:37, nome:'MTU ideal 1500', cmd:'netsh int tcp set global mtu=1500', perigo:'médio' },
    { id:38, nome:'Sem limitação E/S', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\I/O System" /v System /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:39, nome:'Tempo de conexão rápido', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpTimedWaitDelay /t REG_DWORD /d 30 /f', perigo:'alto' },
    { id:40, nome:'Mais portas disponíveis', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v MaxFreeTcbs /t REG_DWORD /d 65536 /f', perigo:'alto' },
    { id:41, nome:'Receção larga ON', cmd:'netsh int tcp set global rss=enabled', perigo:'médio' },
    { id:42, nome:'TCP Fast Open ON', cmd:'netsh int tcp set global tcp1323opts=enabled', perigo:'alto' },
    { id:43, nome:'Limpar cache fontes', cmd:'del /f /s /q "%LocalAppData%\\Microsoft\\Windows\\Fonts\\*"', perigo:'alto' },
    { id:44, nome:'Menu instantâneo', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v MenuShowDelay /t REG_SZ /d 20 /f', perigo:'médio' },
    { id:45, nome:'Sem dicas de informação', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v ShowInfoTip /t REG_DWORD /d 1 /f', perigo:'baixo' },
    { id:46, nome:'Sem seta de atalho', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v Link /t REG_BINARY /d 00000000 /f', perigo:'médio' },
    { id:47, nome:'Sem sombra de ícone', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v ListviewAlpha /t REG_DWORD /d 0 /f', perigo:'médio' },
    { id:48, nome:'Sem versão na tela', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v PaintDesktopVersion /t REG_DWORD /d 0 /f', perigo:'baixo' },
    { id:49, nome:'Sem relatório de erros', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\Windows Error Reporting" /v Disabled /t REG_DWORD /d 1 /f', perigo:'médio' },
    { id:50, nome:'Sem telemetria', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:51, nome:'Sem coleta de dados', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:52, nome:'Apps em 2º plano OFF', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications" /v GlobalDisabled /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:53, nome:'Sem notificações', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" /v ToastEnabled /t REG_DWORD /d 0 /f', perigo:'médio' },
    { id:54, nome:'Sem proteção rollback', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Installer" /v DisableRollback /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:55, nome:'Limpar memória RAM', cmd:'Rundll32.exe advapi32.dll,ProcessIdleTasks', perigo:'médio' },
    { id:56, nome:'Otimizar disco', cmd:'defrag C: /O', perigo:'alto' },
    { id:57, nome:'Reparar arquivos sistema', cmd:'sfc /scannow', perigo:'alto' },
    { id:58, nome:'Reparar imagem sistema', cmd:'DISM /Online /Cleanup-Image /RestoreHealth', perigo:'alto' },
    { id:59, nome:'Limpar atualizações antigas', cmd:'dism /online /cleanup-image /spsuperseded', perigo:'alto' },
    { id:60, nome:'Redefinir Winsock', cmd:'netsh winsock reset', perigo:'alto' },
    { id:61, nome:'Redefinir IPv4', cmd:'netsh interface ipv4 reset', perigo:'alto' },
    { id:62, nome:'IPv6 privado OFF', cmd:'netsh interface ipv6 set global randomizeidentifiers=disabled', perigo:'alto' },
    { id:63, nome:'Esquecer Wi-Fi salvas', cmd:'netsh wlan delete profile name=*', perigo:'médio' },
    { id:64, nome:'USB sem economia', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\usbccgp" /v DisableSelectiveSuspend /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:65, nome:'ASPM PCIe OFF', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\pci" /v ExpressPcieAspm /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:66, nome:'Rede sem economia', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Class\\{4d36e972-e325-11ce-bfc1-08002be10318}\\0000" /v *EEE /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:67, nome:'Cache sistema OFF', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager" /v LargeSystemCache /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:68, nome:'Kernel sem paginação', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v DisablePagingExecutive /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:69, nome:'Limpeza geral disco', cmd:'cleanmgr /sagerun:1', perigo:'médio' },
    { id:70, nome:'Desativar serviços desnecessários', cmd:'sc config "DiagTrack" start= disabled & net stop DiagTrack', perigo:'alto' },
  ];

  // ==============================================
  // 🚀 130 OTIMIZAÇÕES PREMIUM (Total: 200)
  // ==============================================
  const otimizacoesPremium = [
    { id:71, nome:'🚀 Desativar Segurança Memória', cmd:'bcdedit /set vsmlaunchoff', perigo:'alto' },
    { id:72, nome:'🚀 Desativar Isolamento Core', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\DeviceGuard" /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:73, nome:'🚀 Desativar HVCI (GANHO FPS)', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity" /v Enabled /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:74, nome:'🚀 Desativar Virtualização Base', cmd:'bcdedit /set {current} hypervisoriommupolicy off', perigo:'alto' },
    { id:75, nome:'🚀 Desativar DMA Remapping', cmd:'bcdedit /set disablepcie /d 1', perigo:'alto' },
    { id:76, nome:'🚀 Kernel em Memória Física', cmd:'bcdedit /set removememory 0', perigo:'alto' },
    { id:77, nome:'🚀 Aumentar Tamanho de Página', cmd:'bcdedit /set increaseuserva 3072', perigo:'alto' },
    { id:78, nome:'🚀 Tempo de Resposta Zero', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v SystemCacheWorkingSetLimit /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:79, nome:'🚀 Sem Limite de Memória App', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v NonPagedPoolQuota /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:80, nome:'🚀 Acelerar Execução Kernel', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v LargePageMinimum /t REG_DWORD /d 1048576 /f', perigo:'alto' },
    { id:81, nome:'🚀 Prioridade JOGO Máxima', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\PriorityControl" /v Win32PrioritySeparation /t REG_DWORD /d 38 /f', perigo:'alto' },
    { id:82, nome:'🚀 CPU sempre em 100%', cmd:'powercfg /setacvalueindex scheme_current sub_processor 5d76a2ca-e8c0-402f-a133-215449555648 100', perigo:'alto' },
    { id:83, nome:'🚀 Sem Economia de CPU', cmd:'powercfg /setacvalueindex scheme_current sub_processor 619b7950-5c8e-4a3c-94c3-5e6b0cd31681 100', perigo:'alto' },
    { id:84, nome:'🚀 Desativar C-States CPU', cmd:'powercfg /setacvalueindex scheme_current sub_processor 891808d9-0ce9-4296-9120-2de96084e49f 0', perigo:'alto' },
    { id:85, nome:'🚀 Latência Mínima CPU', cmd:'powercfg /setacvalueindex scheme_current sub_processor 5d76a2ca-e8c0-402f-a133-215449555648 100', perigo:'alto' },
    { id:86, nome:'🚀 Desbloquear Frequência Máxima', cmd:'powercfg /setacvalueindex scheme_current sub_processor 75b0ae15-98b7-4ac1-a492-8e0c3d14c201 100', perigo:'alto' },
    { id:87, nome:'🚀 Resposta Instantânea CPU', cmd:'powercfg /setacvalueindex scheme_current sub_processor 45b1e35a-98f5-4b8b-a840-9b9161720e62 0', perigo:'alto' },
    { id:88, nome:'🚀 Desativar Throttling', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Power\\Throttling" /v NoThrottling /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:89, nome:'🚀 Desativar Estagnação Térmica', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Power\\Throttling" /v DisableThermalThrottling /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:90, nome:'🚀 Potência Ilimitada', cmd:'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c', perigo:'alto' },
    { id:91, nome:'🚀 Latência de Rede Zero', cmd:'netsh int tcp set global timestamps=disabled', perigo:'alto' },
    { id:92, nome:'🚀 Sem ACK Atrasado', cmd:'netsh int tcp set global delayedacktimeout=10', perigo:'alto' },
    { id:93, nome:'🚀 Pacotes Imediatos', cmd:'netsh int tcp set global ecncapability=enabled', perigo:'alto' },
    { id:94, nome:'🚀 Congestionamento Mais Rápido', cmd:'netsh int tcp set global congestionprovider=dctcp', perigo:'alto' },
    { id:95, nome:'🚀 Buffer de Rede Máximo', cmd:'netsh int tcp set global initialrto=2000', perigo:'alto' },
    { id:96, nome:'🚀 Sem Limite de Conexões', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpMaxConnections /t REG_DWORD /d 4294967295 /f', perigo:'alto' },
    { id:97, nome:'🚀 DNS em Cache Permanente', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Dnscache\\Parameters" /v MaxCacheTtl /t REG_DWORD /d 86400 /f', perigo:'alto' },
    { id:98, nome:'🚀 Resposta DNS Instantânea', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpUseRFC1122UrgentPointer /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:99, nome:'🚀 Sem Espera de Conexão', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpTimedWaitDelay /t REG_DWORD /d 5 /f', perigo:'alto' },
    { id:100, nome:'🚀 Mais Dados por Segundo', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpWindowSize /t REG_DWORD /d 65535 /f', perigo:'alto' },
    { id:101, nome:'🚀 Acelerar DirectX', cmd:'reg add "HKLM\\Software\\Microsoft\\Direct3D" /v DisableAGPSupport /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:102, nome:'🚀 Acelerar OpenGL', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows NT\\CurrentVersion\\OpenGL" /v DisableGenericDriver /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:103, nome:'🚀 GPU em Prioridade Alta', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\GraphicsDrivers" /v SchedulePriority /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:104, nome:'🚀 Sem Limite de VRAM', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v NonPagedPoolSize /t REG_DWORD /d 4294967295 /f', perigo:'alto' },
    { id:105, nome:'🚀 Desativar VSync Sistema', cmd:'reg add "HKLM\\Software\\Microsoft\\Direct3D" /v VSyncEnable /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:106, nome:'🚀 Acelerar Renderização', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v DesktopLivePreviewHoverTime /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:107, nome:'🚀 Desativar Cursor Sombra', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v CursorShadow /t REG_SZ /d 0 /f', perigo:'médio' },
    { id:108, nome:'🚀 Cursor Instantâneo', cmd:'reg add "HKCU\\Control Panel\\Mouse" /v MouseHoverTime /t REG_SZ /d 1 /f', perigo:'médio' },
    { id:109, nome:'🚀 Sem Rastro do Mouse', cmd:'reg add "HKCU\\Control Panel\\Mouse" /v MouseTrails /t REG_SZ /d 0 /f', perigo:'baixo' },
    { id:110, nome:'🚀 Aceleração Máxima Mouse', cmd:'reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold1 /t REG_SZ /d 0 /f', perigo:'médio' },
    { id:111, nome:'🚀 Aceleração Máxima Mouse 2', cmd:'reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold2 /t REG_SZ /d 0 /f', perigo:'médio' },
    { id:112, nome:'🚀 Precisão do Mouse OFF', cmd:'reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:113, nome:'🚀 Resposta Teclado Zero', cmd:'reg add "HKCU\\Control Panel\\Keyboard" /v KeyboardDelay /t REG_SZ /d 0 /f', perigo:'médio' },
    { id:114, nome:'🚀 Repetição Instantânea', cmd:'reg add "HKCU\\Control Panel\\Keyboard" /v KeyboardSpeed /t REG_SZ /d 31 /f', perigo:'médio' },
    { id:115, nome:'🚀 Limpar Arquivo de Páginas', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v ClearPageFileAtShutdown /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:116, nome:'🚀 Memória RAM Ilimitada (PAE)', cmd:'bcdedit /set pae ForceEnable', perigo:'alto' },
    { id:117, nome:'🚀 AWE Habilitado (Grandes Páginas)', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options" /v LargePages /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:118, nome:'🚀 Cache de Disco em RAM', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v StandbyPageListHighThreshold /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:119, nome:'🚀 Sem Arquivo de Paginação', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v PagingFiles /t REG_SZ /d "" /f', perigo:'alto' },
    { id:120, nome:'🚀 RAM para Disco Direto', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Dnscache" /v MaxNegativeCacheTtl /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:121, nome:'🚀 Desativar Windows Defender', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows Defender" /v DisableAntiSpyware /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:122, nome:'🚀 Desativar Proteção em Tempo Real', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection" /v DisableRealtimeMonitoring /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:123, nome:'🚀 Desativar Firewall Público', cmd:'netsh advfirewall set publicprofile state off', perigo:'alto' },
    { id:124, nome:'🚀 Desativar Firewall Privado', cmd:'netsh advfirewall set privateprofile state off', perigo:'alto' },
    { id:125, nome:'🚀 Desativar Firewall Domínio', cmd:'netsh advfirewall set domainprofile state off', perigo:'alto' },
    { id:126, nome:'🚀 Bloquear Windows Update', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU" /v NoAutoUpdate /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:127, nome:'🚀 Sem Acesso a Atualização', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate" /v DisableWindowsUpdateAccess /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:128, nome:'🚀 Desativar Serviço Defender', cmd:'sc config WinDefend start= disabled', perigo:'alto' },
    { id:129, nome:'🚀 Desativar Notificações Defender', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows Defender" /v DisableNotifications /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:130, nome:'🚀 Desativar SmartScreen', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\System" /v EnableSmartScreen /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:131, nome:'🚀 Remover App 3D Builder', cmd:'powershell -Command "Get-AppxPackage *3dbuilder* | Remove-AppxPackage"', perigo:'alto' },
    { id:132, nome:'🚀 Remover Alarmes e Relógio', cmd:'powershell -Command "Get-AppxPackage *windowsalarms* | Remove-AppxPackage"', perigo:'alto' },
    { id:133, nome:'🚀 Remover Calendário e Email', cmd:'powershell -Command "Get-AppxPackage *windowscommunicationsapps* | Remove-AppxPackage"', perigo:'alto' },
    { id:134, nome:'🚀 Remover Câmera', cmd:'powershell -Command "Get-AppxPackage *windowscamera* | Remove-AppxPackage"', perigo:'alto' },
    { id:135, nome:'🚀 Remover Get Office', cmd:'powershell -Command "Get-AppxPackage *officehub* | Remove-AppxPackage"', perigo:'alto' },
    { id:136, nome:'🚀 Remover Calculadora', cmd:'powershell -Command "Get-AppxPackage *calculator* | Remove-AppxPackage"', perigo:'alto' },
    { id:137, nome:'🚀 Remover Loja Windows', cmd:'powershell -Command "Get-AppxPackage *windowsstore* | Remove-AppxPackage"', perigo:'alto' },
    { id:138, nome:'🚀 Remover Mapas', cmd:'powershell -Command "Get-AppxPackage *windowsmaps* | Remove-AppxPackage"', perigo:'alto' },
    { id:139, nome:'🚀 Remover Notícias Bing', cmd:'powershell -Command "Get-AppxPackage *bingnews* | Remove-AppxPackage"', perigo:'alto' },
    { id:140, nome:'🚀 Remover Clima Bing', cmd:'powershell -Command "Get-AppxPackage *bingweather* | Remove-AppxPackage"', perigo:'alto' },
    { id:141, nome:'🚀 Remover OneNote', cmd:'powershell -Command "Get-AppxPackage *onenote* | Remove-AppxPackage"', perigo:'alto' },
    { id:142, nome:'🚀 Remover Pessoas', cmd:'powershell -Command "Get-AppxPackage *people* | Remove-AppxPackage"', perigo:'alto' },
    { id:143, nome:'🚀 Remover Fotos', cmd:'powershell -Command "Get-AppxPackage *photos* | Remove-AppxPackage"', perigo:'alto' },
    { id:144, nome:'🚀 Remover Gravação Áudio', cmd:'powershell -Command "Get-AppxPackage *soundrecorder* | Remove-AppxPackage"', perigo:'alto' },
    { id:145, nome:'🚀 Remover Esportes Bing', cmd:'powershell -Command "Get-AppxPackage *bingsports* | Remove-AppxPackage"', perigo:'alto' },
    { id:146, nome:'🚀 Remover Xbox App', cmd:'powershell -Command "Get-AppxPackage *xboxapp* | Remove-AppxPackage"', perigo:'alto' },
    { id:147, nome:'🚀 Remover Música Zune', cmd:'powershell -Command "Get-AppxPackage *zunemusic* | Remove-AppxPackage"', perigo:'alto' },
    { id:148, nome:'🚀 Remover Vídeo Zune', cmd:'powershell -Command "Get-AppxPackage *zunevideo* | Remove-AppxPackage"', perigo:'alto' },
    { id:149, nome:'🚀 Remover Mensagens', cmd:'powershell -Command "Get-AppxPackage *messaging* | Remove-AppxPackage"', perigo:'alto' },
    { id:150, nome:'🚀 Remover Solitário', cmd:'powershell -Command "Get-AppxPackage *solitaire* | Remove-AppxPackage"', perigo:'alto' },
    { id:151, nome:'🚀 Desativar Xbox DVR (GANHO FPS)', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\GameDVR" /v AllowGameDVR /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:152, nome:'🚀 Desativar Barra de Jogo', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\GameBar" /v AllowGameBar /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:153, nome:'🚀 Desativar Gravação de Tela', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:154, nome:'🚀 Desativar Transmissão', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v BroadcastEnabled /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:155, nome:'🚀 Sem Codificação em 2º Plano', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v EncodingEnabled /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:156, nome:'🚀 Desativar Serviço Xbox Rede', cmd:'sc config XboxNetApiSvc start= disabled', perigo:'alto' },
    { id:157, nome:'🚀 Desativar Serviço Xbox Live', cmd:'sc config XblAuthManager start= disabled', perigo:'alto' },
    { id:158, nome:'🚀 Desativar Presença Xbox', cmd:'sc config XblGameSave start= disabled', perigo:'alto' },
    { id:159, nome:'🚀 Desativar Dispositivos Xbox', cmd:'sc config XboxGipSvc start= disabled', perigo:'alto' },
    { id:160, nome:'🚀 Desativar Barra Completa', cmd:'reg add "HKCU\\Software\\Microsoft\\GameBar" /v UseNexusForGameBarEnabled /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:161, nome:'🚀 Desativar Gerenciador Licenças', cmd:'sc config LicenseManager start= disabled', perigo:'alto' },
    { id:162, nome:'🚀 Desativar Experiência Consumidor', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\CloudContent" /v DisableWindowsConsumerFeatures /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:163, nome:'🚀 Sem Coleta de Dados App', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\System" /v DisableTelemetry /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:164, nome:'🚀 Sem Compartilhamento Diagnóstico', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\System" /v AllowTelemetry /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:165, nome:'🚀 Desativar ID de Publicidade', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v Enabled /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:166, nome:'🚀 Desativar Reconhecimento de Fala', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Speech" /v AllowSpeech /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:167, nome:'🚀 Desativar Entrada de Tinta', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\TabletPC" /v AllowInk /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:168, nome:'🚀 Desativar Acesso à Localização', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\LocationAndSensors" /v DisableLocation /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:169, nome:'🚀 Desativar Câmera Sistema', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\LocationAndSensors" /v DisableCamera /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:170, nome:'🚀 Desativar Microfone Sistema', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\PrivacySettings" /v DisableMicrophone /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:171, nome:'🚀 Desativar Cortana', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Windows Search" /v AllowCortana /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:172, nome:'🚀 Sem Busca na Web', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Windows Search" /v DisableWebSearch /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:173, nome:'🚀 Sem Busca na Nuvem', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Windows Search" /v AllowSearchToUseLocation /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:174, nome:'🚀 Desativar Tela Privacidade OOBE', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\OOBE" /v DisablePrivacyScreen /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:175, nome:'🚀 Sem Experiências Personalizadas', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\CloudContent" /v DisableTailoredExperiencesWithDiagnosticData /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:176, nome:'🚀 Sem Dicas do Windows', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\System" /v DisableTips /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:177, nome:'🚀 Sem Conteúdo em Destaque', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\CloudContent" /v DisableWindowsSpotlight /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:178, nome:'🚀 Desativar Notícias e Interesses', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Feeds" /v ShellFeedsEnabled /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:179, nome:'🚀 Desativar Ícone Clima Barra', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Feeds" /v TaskbarDa /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:180, nome:'🚀 Desativar Widgets', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarDa /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:181, nome:'🚀 Desativar Acesso Rápido', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v ShowRecent /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:182, nome:'🚀 Sem Arquivos Recentes', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v ShowFrequent /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:183, nome:'🚀 Sem Pastas Usadas', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v ShowRecentApps /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:184, nome:'🚀 Desativar Histórico de Arquivos', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v Start_TrackDocs /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:185, nome:'🚀 Sem Pré-visualização de Pasta', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v PreviewPane /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:186, nome:'🚀 Sem Painel de Detalhes', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v DetailsPane /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:187, nome:'🚀 Desativar Animação Janela', cmd:'reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v MinAnimate /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:188, nome:'🚀 Desativar Rolagem Suave', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v SmoothScroll /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:189, nome:'🚀 Sem Fade de Menu', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v MenuFade /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:190, nome:'🚀 Sem Fade de Dica', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v ToolTipFade /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:191, nome:'🚀 Sem Fade de Seleção', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v SelectionFade /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:192, nome:'🚀 Desativar Composição Área Trabalho', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\Dwm" /v Composition /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:193, nome:'🚀 Sem Transparência DWM', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\Dwm" /v EnableAeroPeek /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:194, nome:'🚀 Sem Pré-visualização Aero Peek', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\Dwm" /v AlwaysHibernateThumbnails /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:195, nome:'🚀 Desativar Temas', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v ThemeActive /t REG_SZ /d "" /f', perigo:'alto' },
    { id:196, nome:'🚀 Sem Protetor de Tela', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v ScreenSaveActive /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:197, nome:'🚀 Plano Máximo Desempenho', cmd:'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c', perigo:'alto' },
    { id:198, nome:'🚀 Sem Suspensão Automática', cmd:'powercfg /change standby-timeout-ac 0', perigo:'alto' },
    { id:199, nome:'🚀 Sem Hibernação', cmd:'powercfg /hibernate off', perigo:'alto' },
    { id:200, nome:'🚀 Sem Desligamento Disco', cmd:'powercfg /change disk-timeout-ac 0', perigo:'alto' },
  ];

  // ==============================================
  // 🎨 INTERFACE COMPLETA E FECHADA
  // ==============================================
  if (carregando) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', backgroundColor:'#0f0f23', color:'#fff', fontSize:'24px' }}>
        ⏳ Carregando Optimizador do Julio...
      </div>
    );
  }

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#0f0f23', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <h1 style={{ textAlign:'center', color:'#ff2e63', fontSize:'36px', marginBottom:'10px' }}>🔥 OPTIMIZADOR DO JULIO — FPS MÁXIMO</h1>
      <p style={{ textAlign:'center', color:'#aaa', marginBottom:'30px' }}>Deixe o Windows limpo, rápido e extraia TODO o FPS do seu PC!</p>

      {status && <div style={{ backgroundColor:'#00b894', padding:'10px', borderRadius:'8px', textAlign:'center', marginBottom:'20px', fontWeight:'bold' }}>{status}</div>}

      {/* ÁREA DE PIX E SENHA */}
      {!premiumPagoLiberado && !adminLiberado && (
        <div style={{ backgroundColor:'#1a1a30', padding:'25px', borderRadius:'12px', marginBottom:'30px', border:'2px solid #ff2e63' }}>
          <h2 style={{ color:'#fffa65', textAlign:'center', marginTop:0
