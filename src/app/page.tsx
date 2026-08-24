'use client';

import { useState, useEffect } from 'react';

// 🔑 SENHAS DO SISTEMA
const SENHA_ADMINISTRADOR = 'JulioKaneki999';
const SENHA_PREMIUM = 'Pagamento@2026';

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('free');
  const [adminLiberado, setAdminLiberado] = useState(false);
  const [premiumPagoLiberado, setPremiumPagoLiberado] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [tipoAcesso, setTipoAcesso] = useState<'admin' | 'premium' | null>(null);
  const [erroSenha, setErroSenha] = useState('');
  const [status, setStatus] = useState('');
  const [pixChave, setPixChave] = useState('');

  useEffect(() => {
    setPixChave('julioserafim1234566@gmail.com');
    setTimeout(() => setCarregando(false), 2000);
  }, []);

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

  // === 70 OTIMIZAÇÕES GRATUITAS ===
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
    { id:15, nome:'Ajustar desempenho', cmd:'sysdm.cpl → Avançado → Desempenho → Ajustar para melhor', perigo:'alto' },
    { id:16, nome:'Desativar proteção DEP', cmd:'bcdedit /set nx AlwaysOff', perigo:'alto' },
    { id:17, nome:'Inicialização rápida', cmd:'bcdedit /set bootmenupolicy legacy', perigo:'alto' },
    { id:18, nome:'Usar todos os núcleos', cmd:'bcdedit /set {current} numproc %NUMBER_OF_PROCESSORS%', perigo:'alto' },
    { id:19, nome:'Sem limite de memória', cmd:'bcdedit /deletevalue {current} truncatememory', perigo:'alto' },
    { id:20, nome:'Limpar logs do sistema', cmd:'for /f "tokens=*" %1 in (\'wevtutil el\') do wevtutil cl "%1"', perigo:'alto' },
    { id:21, nome:'Parar Superfetch', cmd:'net stop SysMain', perigo:'médio' },
    { id:22, nome:'Desativar Superfetch', cmd:'sc config SysMain start= disabled', perigo:'alto' },
    { id:23, nome:'Parar Busca Windows', cmd:'net stop WSearch', perigo:'médio' },
    { id:24, nome:'Desativar Busca', cmd:'sc config WSearch start= disabled', perigo:'alto' },
    { id:25, nome:'Parar impressão', cmd:'net stop spooler', perigo:'baixo' },
    { id:26, nome:'Limpar fila impressão', cmd:'del /f /s /q %systemroot%\\System32\\spool\\PRINTERS\\*', perigo:'médio' },
    { id:27, nome:'Desativar compartilhamento', cmd:'netsh advfirewall firewall set rule group="Arquivos e Impressoras Compartilhados" new enable=No', perigo:'alto' },
    { id:28, nome:'Desativar Acesso Remoto', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:29, nome:'Sem área remota', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows NT\\Terminal Services" /v fDisableClip /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:30, nome:'Sem animações', cmd:'reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v MinAnimate /t REG_SZ /d 0 /f', perigo:'médio' },
    { id:31, nome:'Sem transparência', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v EnableTransparency /t REG_DWORD /d 0 /f', perigo:'baixo' },
    { id:32, nome:'Efeitos visuais mínimos', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v VisualFXSetting /t REG_DWORD /d 2 /f', perigo:'médio' },
    { id:33, nome:'Prioridade em primeiro plano', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\PriorityControl" /v Win32PrioritySeparation /t REG_DWORD /d 26 /f', perigo:'alto' },
    { id:34, nome:'Sem limitação de CPU', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Power\\Throttling" /v NoThrottling /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:35, nome:'Otimizar rede CTCP', cmd:'netsh int tcp set global congestionprovider=ctcp', perigo:'alto' },
    { id:36, nome:'Janela automática ON', cmd:'netsh int tcp set global autotuninglevel=normal', perigo:'médio' },
    { id:37, nome:'Sem Nagle', cmd:'netsh int tcp set global ecncapability=disabled', perigo:'médio' },
    { id:38, nome:'MTU ideal 1500', cmd:'netsh int tcp set global mtu=1500', perigo:'médio' },
    { id:39, nome:'Sem limitação E/S', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\I/O System" /v System /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:40, nome:'Tempo de conexão rápido', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpTimedWaitDelay /t REG_DWORD /d 30 /f', perigo:'alto' },
    { id:41, nome:'Mais portas disponíveis', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v MaxFreeTcbs /t REG_DWORD /d 65536 /f', perigo:'alto' },
    { id:42, nome:'Receção larga ON', cmd:'netsh int tcp set global rss=enabled', perigo:'médio' },
    { id:43, nome:'TCP Fast Open ON', cmd:'netsh int tcp set global tcp1323opts=enabled', perigo:'alto' },
    { id:44, nome:'Limpar cache fontes', cmd:'del /f /s /q "%LocalAppData%\\Microsoft\\Windows\\Fonts\\*"', perigo:'alto' },
    { id:45, nome:'Menu instantâneo', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v MenuShowDelay /t REG_SZ /d 20 /f', perigo:'médio' },
    { id:46, nome:'Sem dicas de informação', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v ShowInfoTip /t REG_DWORD /d 1 /f', perigo:'baixo' },
    { id:47, nome:'Sem seta de atalho', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v Link /t REG_BINARY /d 00000000 /f', perigo:'médio' },
    { id:48, nome:'Sem sombra de ícone', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v ListviewAlpha /t REG_DWORD /d 0 /f', perigo:'médio' },
    { id:49, nome:'Sem versão na tela', cmd:'reg add "HKCU\\Control Panel\\Desktop" /v PaintDesktopVersion /t REG_DWORD /d 0 /f', perigo:'baixo' },
    { id:50, nome:'Sem relatório de erros', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\Windows Error Reporting" /v Disabled /t REG_DWORD /d 1 /f', perigo:'médio' },
    { id:51, nome:'Sem telemetria', cmd:'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:52, nome:'Sem coleta de dados', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:53, nome:'Apps em 2º plano OFF', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications" /v GlobalDisabled /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:54, nome:'Sem notificações', cmd:'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" /v ToastEnabled /t REG_DWORD /d 0 /f', perigo:'médio' },
    { id:55, nome:'Sem proteção rollback', cmd:'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Installer" /v DisableRollback /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:56, nome:'Limpar memória RAM', cmd:'Rundll32.exe advapi32.dll,ProcessIdleTasks', perigo:'médio' },
    { id:57, nome:'Otimizar disco', cmd:'defrag C: /O', perigo:'alto' },
    { id:58, nome:'Reparar arquivos sistema', cmd:'sfc /scannow', perigo:'alto' },
    { id:59, nome:'Reparar imagem sistema', cmd:'DISM /Online /Cleanup-Image /RestoreHealth', perigo:'alto' },
    { id:60, nome:'Limpar atualizações antigas', cmd:'dism /online /cleanup-image /spsuperseded', perigo:'alto' },
    { id:61, nome:'Redefinir Winsock', cmd:'netsh winsock reset', perigo:'alto' },
    { id:62, nome:'Redefinir IPv4', cmd:'netsh interface ipv4 reset', perigo:'alto' },
    { id:63, nome:'IPv6 privado OFF', cmd:'netsh interface ipv6 set global randomizeidentifiers=disabled', perigo:'alto' },
    { id:64, nome:'Esquecer Wi-Fi salvas', cmd:'netsh wlan delete profile name=*', perigo:'médio' },
    { id:65, nome:'USB sem economia', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\usbccgp" /v DisableSelectiveSuspend /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:66, nome:'ASPM PCIe OFF', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Services\\pci" /v ExpressPcieAspm /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:67, nome:'Rede sem economia', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Class\\{4d36e972-e325-11ce-bfc1-08002be10318}\\0000" /v *EEE /t REG_SZ /d 0 /f', perigo:'alto' },
    { id:68, nome:'Cache sistema OFF', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager" /v LargeSystemCache /t REG_DWORD /d 0 /f', perigo:'alto' },
    { id:69, nome:'Kernel sem paginação', cmd:'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v DisablePagingExecutive /t REG_DWORD /d 1 /f', perigo:'alto' },
    { id:70, nome:'Limpeza geral disco', cmd:'cleanmgr /sagerun:1', perigo:'médio' },
  ];

  // === 200 OTIMIZAÇÕES PREMIUM — AS MAIS PODEROSAS ===
  const otimizacoesPremium = 
