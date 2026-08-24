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

  // ✅ FUNÇÃO DE SENHA NO MODELO ORIGINAL
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
  // 🔥 OTIMIZAÇÕES GRATUITAS — COMO ESTAVA ANTES
  // ==============================================
  const otimizacoesGratuitas = [
    { id:1, nome:'Limpar DNS', cmd:'ipconfig /flushdns', perigo:'baixo' },
    { id:2, nome:'Renovar DNS', cmd:'ipconfig /registerdns', perigo:'baixo' },
    { id:3, nome:'Liberar DNS', cmd:'ipconfig /release', perigo:'médio' },
    { id:4, nome:'Obter novo IP', cmd:'ipconfig /renew', perigo:'médio' },
    { id:5, nome:'Parar atualização Windows', cmd:'net stop wuauserv', perigo:'médio' },
    { id:6, nome:'Desativar atualização', cmd:'sc config "wuauserv" start= disabled', perigo:'alto' },
    { id:7, nome:'Limpar arquivos temporários', cmd:'del /f /s /q %temp%\\*', perigo:'médio' },
    { id:8, nome:'Limpar pasta Temp do Windows', cmd:'del /f /s /q C:\\Windows\\Temp\\*', perigo:'alto' },
    { id:9, nome:'Limpar cache Prefetch', cmd:'del /f /s /q C:\\Windows\\Prefetch\\*', perigo:'alto' },
    { id:10, nome:'Ativar Plano Alto Desempenho', cmd:'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c', perigo:'médio' },
    { id:11, nome:'Desativar Hibernação', cmd:'powercfg /hibernate off', perigo:'médio' },
    { id:12, nome:'Desligar economia de energia disco', cmd:'powercfg /change disk-timeout-ac 0', perigo:'médio' },
    { id:13, nome:'Desativar suspensão automática', cmd:'powercfg /change standby-timeout-ac 0', perigo:'médio' },
    { id:14, nome:'Desativar proteção DEP', cmd:'bcdedit /set nx AlwaysOff', perigo:'alto' },
    { id:15, nome:'Inicialização rápida do sistema', cmd:'bcdedit /set bootmenupolicy legacy', perigo:'alto' },
    { id:16, nome:'Usar todos os núcleos no boot', cmd:'bcdedit /set {current} numproc %NUMBER_OF_PROCESSORS%', perigo:'alto' },
    { id:17, nome:'Remover limite de memória boot', cmd:'bcdedit /deletevalue {current} truncatememory', perigo:'alto' },
    { id:18, nome:'Limpar logs do sistema', cmd:'for /f "tokens=*" %1 in (\'wevtutil el\') do wevtutil cl "%1"', perigo:'alto' },
    { id:19, nome:'Parar serviço Superfetch', cmd:'net stop SysMain', perigo:'médio' },
    { id:20, nome:'Desativar Superfetch', cmd:'sc config SysMain start= disabled', perigo:'alto' },
    { id:21, nome:'Parar busca do Windows', cmd:'net stop WSearch', perigo:'médio' },
    { id:22, nome:'Desativar serviço de busca', cmd:'sc config WSearch start= disabled', perigo:'alto' },
    { id:23, nome:'Limpar fila de impressão', cmd:'net stop spooler & del /f /s /q %systemroot%\\System32\\spool\\PRINTERS\\*', perigo:'médio' },
    { id:24, nome:'Desativar compartilhamento de arquivos', cmd:'netsh advfirewall firewall set rule group="Arquivos e Impressoras Compartilhados" new enable=No', perigo:'alto' },
    { id:25, nome:'Bloquear Acesso Remoto', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:26, nome:'Desativar área de trabalho remota', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\Terminal Services" /v fDisableClip /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:27, nome:'Desligar animações do Windows', cmd:'reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v MinAnimate /t REG_SZ /d 0 /f', perigo:'médio' },
    { id:28, nome:'Desativar transparência', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v EnableTransparency /t REG_DWORD /d 0 /f', perigo:'baixo' },
    { id:29, nome:'Reduzir efeitos visuais', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v VisualFXSetting /t REG_DWORD /d 2 /f', perigo:'médio' },
    { id:30, nome:'Aumentar prioridade de jogos', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\PriorityControl" /v Win32PrioritySeparation /t REG_DWORD /d 38 /f', perigo:'alto' },
    { id:31, nome:'Desativar limitação CPU', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Power\\Throttling" /v NoThrottling /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:32, nome:'Otimizar rede TCP', cmd:'netsh int tcp set global congestionprovider=ctcp', perigo:'alto' },
    { id:33, nome:'Ativar ajuste automático de janela', cmd:'netsh int tcp set global autotuninglevel=normal', perigo:'médio' },
    { id:34, nome:'Desativar algoritmo Nagle', cmd:'netsh int tcp set global ecncapability=disabled', perigo:'médio' },
    { id:35, nome:'Definir MTU ideal', cmd:'netsh int tcp set global mtu=1500', perigo:'médio' },
    { id:36, nome:'Reduzir tempo de espera TCP', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpTimedWaitDelay /t REG_DWORD /d 30 /f', perigo:'alto' },
    { id:37, nome:'Aumentar limite de portas', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v MaxFreeTcbs /t REG_DWORD /d 65536 /f', perigo:'alto' },
    { id:38, nome:'Ativar receção lateral rede', cmd:'netsh int tcp set global rss=enabled', perigo:'médio' },
    { id:39, nome:'Acelerar abertura rápida TCP', cmd:'netsh int tcp set global tcp1323opts=enabled', perigo:'alto' },
    { id:40, nome:'Apagar cache de fontes', cmd:'del /f /s /q "%LocalAppData%\\Microsoft\\Windows\\Fonts\\*"', perigo:'alto' },
    { id:41, nome:'Reduzir atraso do menu', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v MenuShowDelay /t REG_SZ /d 20 /f', perigo:'médio' },
    { id:42, nome:'Ocultar dicas do sistema', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v ShowInfoTip /t REG_DWORD /d 1 /f', perigo:'baixo' },
    { id:43, nome:'Remover seta de atalhos', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v Link /t REG_BINARY /d 00000000 /f', perigo:'médio' },
    { id:44, nome:'Desativar sombra de ícones', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v ListviewAlpha /t REG_DWORD /d 0 /f', perigo:'médio' },
    { id:45, nome:'Ocultar versão na área de trabalho', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v PaintDesktopVersion /t REG_DWORD /d 0 /f', perigo:'baixo' },
    { id:46, nome:'Desativar relatório de erros', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\Windows Error Reporting" /v Disabled /t REG_DWORD /d 1 /f', perigo:'médio' },
    { id:47, nome:'Desligar telemetria', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:48, nome:'Desativar coleta de dados', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:49, nome:'Bloquear apps em segundo plano', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications" /v GlobalDisabled /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:50, nome:'Desligar notificações do sistema', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" /v ToastEnabled /t REG_DWORD /d 0 /f', perigo:'médio' },
    { id:51, nome:'Desativar proteção de instalação', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Installer" /v DisableRollback /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:52, nome:'Limpar memória RAM', cmd:'Rundll32.exe advapi32.dll,ProcessIdleTasks', perigo:'médio' },
    { id:53, nome:'Verificar e reparar arquivos do sistema', cmd:'sfc /scannow', perigo:'alto' },
    { id:54, nome:'Reparar imagem do Windows', cmd:'DISM /Online /Cleanup-Image /RestoreHealth', perigo:'alto' },
    { id:55, nome:'Limpar arquivos de atualizações antigas', cmd:'dism /online /cleanup-image /spsuperseded', perigo:'alto' },
    { id:56, nome:'Redefinir soquete de rede', cmd:'netsh winsock reset', perigo:'alto' },
    { id:57, nome:'Redefinir configurações IPv4', cmd:'netsh interface ipv4 reset', perigo:'alto' },
    { id:58, nome:'Desativar identificação IPv6', cmd:'netsh interface ipv6 set global randomizeidentifiers=disabled', perigo:'alto' },
    { id:59, nome:'Desativar economia de energia USB', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\usbccgp" /v DisableSelectiveSuspend /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:60, nome:'Desativar serviços de diagnóstico', cmd:'sc config "DiagTrack" start= disabled & net stop DiagTrack', perigo:'alto' },
  ];

  // ==============================================
  // 🚀 120 OTIMIZAÇÕES PREMIUM — EXTRA ADICIONADA
  // ==============================================
  const otimizacoesPremium = [
    { id:1, nome:'🚀 Desativar isolamento de segurança', cmd:'bcdedit /set vsmlaunchoff', perigo:'alto' },
    { id:2, nome:'🚀 Desligar segurança de memória', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\DeviceGuard" /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:3, nome:'🚀 Desativar HVCI (GANHO FPS)', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity" /v Enabled /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:4, nome:'🚀 Desativar virtualização baseada em hipervisor', cmd:'bcdedit /set hypervisorlaunchtype off', perigo:'alto' },
    { id:5, nome:'🚀 Desativar proteção DMA', cmd:'bcdedit /set disablepcie /d 1', perigo:'alto' },
    { id:6, nome:'🚀 Aumentar memória alocada ao boot', cmd:'bcdedit /set increaseuserva 3072', perigo:'alto' },
    { id:7, nome:'🚀 Remover limite de memória do kernel', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v NonPagedPoolQuota /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:8, nome:'🚀 Ativar páginas grandes na memória', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v LargePageMinimum /t REG_DWORD /d 1048576 /f', perigo:'alto' },
    { id:9, nome:'🚀 CPU sempre em desempenho máximo', cmd:'powercfg /setacvalueindex scheme_current sub_processor 5d76a2ca-e8c0-402f-a133-215449555648 100', perigo:'alto' },
    { id:10, nome:'🚀 Desativar economia de CPU', cmd:'powercfg /setacvalueindex scheme_current sub_processor 619b7950-5c8e-4a3c-94c3-5e6b0cd31681 100', perigo:'alto' },
    { id:11, nome:'🚀 Desligar C-States do processador', cmd:'powercfg /setacvalueindex scheme_current sub_processor 891808d9-0ce9-4296-9120-2de96084e49f 0', perigo:'alto' },
    { id:12, nome:'🚀 Latência mínima do CPU', cmd:'powercfg /setacvalueindex scheme_current sub_processor 5d76a2ca-e8c0-402f-a133-215449555648 100', perigo:'alto' },
    { id:13, nome:'🚀 Frequência mínima do CPU 100%', cmd:'powercfg /setacvalueindex scheme_current sub_processor 891808d9-0ce9-4296-9120-2de96084e49f 100', perigo:'alto' },
    { id:14, nome:'🚀 Desbloquear estado de desempenho', cmd:'powercfg /setacvalueindex scheme_current sub_processor 75b0ae15-98b7-4ac1-a492-8e0c3d14c201 100', perigo:'alto' },
    { id:15, nome:'🚀 Desativar controle térmico', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Power\\Throttling" /v DisableThermalThrottling /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:16, nome:'🚀 Latência de rede zero', cmd:'netsh int tcp set global timestamps=disabled', perigo:'alto' },
    { id:17, nome:'🚀 Resposta TCP mais rápida', cmd:'netsh int tcp set global delayedacktimeout=10', perigo:'alto' },
    { id:18, nome:'🚀 Congestionamento otimizado', cmd:'netsh int tcp set global congestionprovider=dctcp', perigo:'alto' },
    { id:19, nome:'🚀 Sem limite de conexões', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpMaxConnections /t REG_DWORD /d 4294967295 /f', perigo:'alto' },
    { id:20, nome:'🚀 Cache DNS permanente', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Dnscache\\Parameters" /v MaxCacheTtl /t REG_DWORD /d 86400 /f', perigo:'alto' },
    { id:21, nome:'🚀 Tempo de espera TCP reduzido', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpTimedWaitDelay /t REG_DWORD /d 5 /f', perigo:'alto' },
    { id:22, nome:'🚀 Aumentar janela de rede', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpWindowSize /t REG_DWORD /d 65535 /f', perigo:'alto' },
    { id:23, nome:'🚀 Acelerar DirectX', cmd:'reg add "HKLM\\Software\\Microsoft\\Direct3D" /v DisableAGPSupport /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:24, nome:'🚀 Prioridade máxima da GPU', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\GraphicsDrivers" /v SchedulePriority /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:25, nome:'🚀 Desativar VSync do sistema', cmd:'reg add "HKLM\\Software\\Microsoft\\Direct3D" /v VSyncEnable /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:26, nome:'🚀 Acelerar renderização', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v DesktopLivePreviewHoverTime /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:27, nome:'🚀 Remover aceleração do mouse', cmd:'reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:28, nome:'🚀 Resposta do teclado instantânea', cmd:'reg add "HKCU\\Control Panel\\Keyboard" /v KeyboardDelay /t REG_SZ /d 0 /f', perigo:'médio' },
    { id:29, nome:'🚀 Velocidade máxima do teclado', cmd:'reg add "HKCU\\Control Panel\\Keyboard" /v KeyboardSpeed /t REG_SZ /d 31 /f', perigo:'médio' },
    { id:30, nome:'🚀 Memória RAM em modo PAE', cmd:'bcdedit /set pae ForceEnable', perigo:'alto' },
    { id:31, nome:'🚀 Arquivo de paginação otimizado', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v PagingFiles /t REG_SZ /d "" /f', perigo:'alto' },
    { id:32, nome:'🚀 Desativar Windows Defender', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows Defender" /v DisableAntiSpyware /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:33, nome:'🚀 Desligar proteção em tempo real', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\Real-Time Protection" /v DisableRealtimeMonitoring /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:34, nome:'🚀 Desativar Firewall', cmd:'netsh advfirewall set allprofiles state off', perigo:'alto' },
    { id:35, nome:'🚀 Bloquear atualizações do Windows', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU" /v NoAutoUpdate /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:36, nome:'🚀 Desativar notificações de segurança', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows Defender" /v DisableNotifications /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:37, nome:'🚀 Desligar SmartScreen', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\System" /v EnableSmartScreen /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:38, nome:'🚀 Remover apps pré-instalados 1', cmd:'powershell -Command "Get-AppxPackage *3dbuilder* | Remove-AppxPackage"', perigo:'alto' },
    { id:39, nome:'🚀 Remover apps pré-instalados 2', cmd:'powershell -Command "Get-AppxPackage *calculator* | Remove-AppxPackage"', perigo:'alto' },
    { id:40, nome:'🚀 Remover aplicativo Xbox', cmd:'powershell -Command "Get-AppxPackage *xboxapp* | Remove-AppxPackage"', perigo:'alto' },
    { id:41, nome:'🚀 Desativar Xbox Game Bar', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\GameBar" /v AllowGameBar /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:42, nome:'🚀 Desligar Gravação de Tela', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:43, nome:'🚀 Desativar DVR do Xbox', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\GameDVR" /v AllowGameDVR /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:44, nome:'🚀 Desligar serviço Xbox Live', cmd:'sc config XblAuthManager start= disabled', perigo:'alto' },
    { id:45, nome:'🚀 Desativar Cortana', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Windows Search" /v AllowCortana /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:46, nome:'🚀 Desligar busca na web', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Windows Search" /v DisableWebSearch /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:47, nome:'🚀 Sem dicas e propagandas', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\CloudContent" /v DisableWindowsConsumerFeatures /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:48, nome:'🚀 Desativar notícias e clima', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Feeds" /v ShellFeedsEnabled /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:49, nome:'🚀 Remover Widgets da barra', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v TaskbarDa /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:50, nome:'🚀 Desativar acesso rápido', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v ShowRecent /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:51, nome:'🚀 Limpar histórico de arquivos', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v Start_TrackDocs /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:52, nome:'🚀 Desligar efeitos de janela', cmd:'reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v MinAnimate /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:53, nome:'🚀 Sem rolagem suave', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v SmoothScroll /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:54, nome:'🚀 Desativar desfoque e transparência', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\Dwm" /v EnableAeroPeek /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:55, nome:'🚀 Desativar temas do sistema', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v ThemeActive /t REG_SZ /d "" /f', perigo:'alto' },
    { id:56, nome:'🚀 Sem protetor de tela', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v ScreenSaveActive /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:57, nome:'🚀 Desativar suspensão automática', cmd:'powercfg /change standby-timeout-ac 0', perigo:'alto' },
    { id:58, nome:'🚀 Desligar hibernação', cmd:'powercfg /hibernate off', perigo:'alto' },
    { id:59, nome:'🚀 Desligar desligamento do disco', cmd:'powercfg /change disk-timeout-ac 0', perigo:'alto' },
    { id:60, nome:'🚀 Desativar coleta de dados', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\System" /v DisableTelemetry /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:61, nome:'🚀 Remover ID de publicidade', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v Enabled /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:62, nome:'🚀 Desativar reconhecimento de fala', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Speech" /v AllowSpeech /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:63, nome:'🚀 Desativar privacidade de localização', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\LocationAndSensors" /v DisableLocation /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:64, nome:'🚀 Desativar câmera do sistema', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\PrivacySettings" /v DisableCamera /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:65, nome:'🚀 Desativar microfone padrão', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\PrivacySettings" /v DisableMicrophone /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:66, nome:'🚀 Desativar atualização de driver', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Device Installation" /v DisableDeviceInstallations /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:67, nome:'🚀 Desativar armazenamento em nuvem', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\OneDrive" /v DisableFileSyncNGSC /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:68, nome:'🚀 Remover OneDrive do explorador', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Desktop\\NameSpace\\{018D5C66-401E-438B-9735-354F25F98ED5}" /v OneDrive /f', perigo:'alto' },
    { id:69, nome:'🚀 Desativar Sincronização de Configurações', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\SettingSync" /v DisableSettingSync /t REG_DWORD /d 2 /f', perigo:'alto' },
    { id:70, nome:'🚀 Desativar Área de Transferência Compartilhada', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\System" /v DisableCrossDeviceClipboard /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:71, nome:'🚀 Desativar Entrada de Texto Aprimorada', cmd:'reg add "HKCU\\Software\\Microsoft\\Input" /v EnableInlinePrediction /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:72, nome:'🚀 Desativar Histórico da Área de Transferência', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v DisableClipboardHistory /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:73, nome:'🚀 Desativar Busca de Dispositivos', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Bluetooth" /v DisableDiscovery /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:74, nome:'🚀 Desativar Serviço de Impressão', cmd:'sc config Spooler start= disabled & net stop Spooler', perigo:'alto' },
    { id:75, nome:'🚀 Desativar Suporte a PDF nativo', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Adobe Acrobat" /v DisablePDFIntegration /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:76, nome:'🚀 Desativar Visualização Rápida', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\PreviewHandlers" /v {8c1d5f9d-5c31-46e4-9e42-f3d928615894} /f', perigo:'alto' },
    { id:77, nome:'🚀 Desativar Compressão NTFS', cmd:'fsutil behavior set disablecompression 1', perigo:'alto' },
    { id:78, nome:'🚀 Desativar Indexação de Arquivos', cmd:'fsutil behavior set disablelastaccess 1', perigo:'alto' },
    { id:79, nome:'🚀 Otimizar Cache de Escrita', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\LanmanServer\\Parameters" /v Size /t REG_DWORD /d 3 /f', perigo:'alto' },
    { id:80, nome:'🚀 Aumentar Desempenho de Arquivos', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\LanmanWorkstation\\Parameters" /v UtilizeNtfsCache /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:81, nome:'🚀 Desativar Limite de Conexões', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\LanmanServer\\Parameters" /v MaxMpxCt /t REG_DWORD /d 65535 /f', perigo:'alto' },
    { id:82, nome:'🚀 Desativar Mensagens de Rede', cmd:'net config server /autodisconnect:-1', perigo:'alto' },
    { id:83, nome:'🚀 Remover Tempo Limite de Sessão', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\LanmanServer\\Parameters" /v AutoDisconnect /t REG_DWORD /d 4294967295 /f', perigo:'alto' },
    { id:84, nome:'🚀 Desativar QoS Pacote Agendador', cmd:'sc config QWAVE start= disabled & net stop QWAVE', perigo:'alto' },
    { id:85, nome:'🚀 Remover Limite de Largura de Banda', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Psched" /v NonBestEffortLimit /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:86, nome:'🚀 Desativar Difusão de Rede', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v EnableMulticast /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:87, nome:'🚀 Desativar Resolução Automática', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v UseDomainNameDevolution /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:88, nome:'🚀 Aumentar Tamanho de Buffer', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpSendBuffer /t REG_DWORD /d 65535 /f', perigo:'alto' },
    { id:89, nome:'🚀 Aumentar Recepção de Buffer', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpReceiveBuffer /t REG_DWORD /d 65535 /f', perigo:'alto' },
    { id:90, nome:'🚀 Desativar Roteamento de Origem', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v DisableIPSourceRouting /t REG_DWORD /d 2 /f', perigo:'alto' },
    { id:91, nome:'🚀 Desativar Redirecionamento ICMP', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v EnableICMPRedirect /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:92, nome:'🚀 Desativar Detecção de Obturador', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v EnablePMTUDiscovery /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:93, nome:'🚀 Desativar Detecção de Inatividade', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v KeepAliveTime /t REG_DWORD /d 60000 /f', perigo:'alto' },
    { id:94, nome:'🚀 Reduzir Tempo de Manter Vivo', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v KeepAliveInterval /t REG_DWORD /d 500 /f', perigo:'alto' },
    { id:95, nome:'🚀 Desativar Segurança 802.1x', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v Enable8021x /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:96, nome:'🚀 Desativar Autenticação WLAN', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\WLAN" /v EnableAutoConfig /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:97, nome:'🚀 Desativar Serviço WLAN', cmd:'sc config WlanSvc start= disabled & net stop WlanSvc', perigo:'alto' },
    { id:98, nome:'🚀 Desativar Autenticação Wired', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\WiredLANSVC" /v EnableAutoConfig /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:99, nome:'🚀 Desativar Serviço Wired', cmd:'sc config dot3svc start= disabled & net stop dot3svc', perigo:'alto' },
    { id:100, nome:'🚀 Desativar Balanceamento de Carga', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\TCPIP\\Parameters" /v LoadBalancingNetworkPriority /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:101, nome:'🚀 Desativar Offloading de IP', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v DisableIPOffload /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:102, nome:'🚀 Desativar Offloading de TCP', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v DisableTCPOffload /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:103, nome:'🚀 Desativar Segmentação Grande', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v EnableTCPLargeSendOffload /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:104, nome:'🚀 Desativar RSS Avançado', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v RssBaseProcNumber /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:105, nome:'🚀 Otimizar Latência de Áudio', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Multimedia\\Audio" /v DisableProtectedAudioDG /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:106, nome:'🚀 Prioridade de Áudio em Segundo Plano', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Multimedia\\Audio" /v BackgroundPriority /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:107, nome:'🚀 Desativar Aprimoramentos de Áudio', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Multimedia\\Audio" /v DisableEnhancements /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:108, nome:'🚀 Desativar Controle de Brilho Adaptativo', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\Display" /v DisableAdaptiveBrightness /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:109, nome:'🚀 Desativar Economia de Energia de Vídeo', cmd:'powercfg /setacvalueindex scheme_current sub_video 0 /f', perigo:'alto' },
    { id:110, nome:'🚀 Desativar Gerenciamento de Energia PCIe', cmd:'powercfg /setacvalueindex scheme_current sub_pciexpress 0 /f', perigo:'alto' },
    { id:111, nome:'🚀 Desativar Link State Power Management', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\pci" /v ASPM /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:112, nome:'🚀 Desativar Mensagens de Erro de Disco', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Disk" /v ErrorControl /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:113, nome:'🚀 Desativar Verificação de Integridade', cmd:'bcdedit /set nointegritychecks on', perigo:'alto' },
    { id:114, nome:'🚀 Permitir Drivers Não Assinados', cmd:'bcdedit /set testsigning on', perigo:'alto' },
    { id:115, nome:'🚀 Desativar Proteção contra Execução de Dados', cmd:'bcdedit /set nx AlwaysOff', perigo:'alto' },
    { id:116, nome:'🚀 Desativar Proteção de Pilhas', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v DisablePagingExecutive /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:117, nome:'🚀 Bloquear Modo de Suspensão', cmd:'powercfg /hibernate off', perigo:'alto' },
    { id:118, nome:'🚀 Desativar Modo de Espera', cmd:'powercfg /change standby-timeout-ac 0', perigo:'alto' },
    { id:119, nome:'🚀 Desativar Suspensão Híbrida', cmd:'powercfg /setacvalueindex scheme_current sub_sleep 0 /f', perigo:'alto' },
    { id:120, nome:'🚀 Desativar Recuperação de Sistema', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\SystemRestore" /v DisableConfig /t REG_DWORD /d 1 /f', perigo:'alto' },
  ];

  // ==============================================
  // 🎨 INTERFACE — EXATAMENTE COMO ESTAVA ANTES
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

      {/* ÁREA DE SENHA */}
      {!premiumPagoLiberado && !adminLiberado && (
        <div style={{ backgroundColor:'#1a1a30', padding:'25px', borderRadius:'12px', marginBottom:'30px', border:'2px solid #ff2e63' }}>
          <h2 style={{ color:'#fffa65', textAlign:'center', marginTop:0 }}>💳 ACESSO PREMIUM — 120 OTIMIZAÇÕES</h2>
          <p style={{ textAlign:'center', fontSize:'16px', margin:'10px 0' }}>Chave PIX: <code style={{ backgroundColor:'#333', padding:'4px 8px', borderRadius:'4px' }}>{CHAVE_PIX}</code></p>
          <p style={{ textAlign:'center', color:'#888', fontSize:'14px', marginBottom:'20px' }}>Após pagamento, insira sua senha abaixo:</p>

          <div style={{ display:'flex', justifyContent:'center', gap:'10px', marginBottom:'15px' }}>
            <button
              onClick={() => setTipoAcesso('admin')}
              style={{
                padding:'10px 20px',
                backgroundColor: tipoAcesso === 'admin' ? '#ff2e63' : '#333',
                color:'#fff',
                border:'none',
                borderRadius:'6px',
                cursor:'pointer',
                fontWeight:'bold'
              }}
            >
              👑 Administrador
            </button>
            <button
              onClick={() => setTipoAcesso('premium')}
              style={{
                padding:'10px 20px',
                backgroundColor: tipoAcesso === 'premium' ? '#ff2e63' : '#333',
                color:'#fff',
                border:'none',
                borderRadius:'6px',
                cursor:'pointer',
                fontWeight:'bold'
              }}
            >
              💎 Premium
            </button>
          </div>

          <div style={{ display:'flex', justifyContent:'center', gap:'10px' }}>
            <input
              type="password"
              value={senhaDigitada}
              onChange={(e) => setSenhaDigitada(e.target.value)}
              placeholder="Digite sua senha..."
              style={{
                padding:'10px 15px',
                fontSize:'16px',
                borderRadius:'6px',
                border:'1px solid #555',
                backgroundColor:'#222',
                color:'#fff',
                width:'250px',
                outline:'none'
              }}
              onKeyDown={(e) => e.key === 'Enter' && verificarSenha()}
            />
            <button
              onClick={verificarSenha}
              style={{
                padding:'10px 20px',
                backgroundColor:'#00b894',
                color:'#fff',
                border:'none',
                borderRadius:'6px',
                cursor:'pointer',
                fontWeight:'bold'
              }}
            >
              ✅ Entrar
            </button>
          </div>

          {erroSenha && (
            <p style={{ textAlign:'center', marginTop:'15px', fontSize:'16px', fontWeight:'bold', color: erroSenha.includes('✅') ? '#00b894' : '#ff6b6b' }}>
              {erroSenha}
            </p>
          )}
        </div>
      )
