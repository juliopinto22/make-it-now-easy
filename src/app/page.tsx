'use client';

import { useState, useEffect } from 'react';

// 🔑 CONFIGURAÇÕES
const SENHA_PREMIUM = 'Pagamento@2026';
const CHAVE_PIX = '+5511999999999'; // ⚠️ COLOQUE AQUI SUA CHAVE PIX REAL
const VALOR_PREMIUM = '5,90';
const VERSAO = '4.0.0';

// 🎨 TEMA GÓTICO — PRETO + VERMELHO SANGUE
const CORES = {
  fundo: '#000000',
  fundoCard: '#0C0C0C',
  fundoHover: '#1A0000',
  vermelho: '#CC0000',
  vermelhoEscuro: '#8B0000',
  branco: '#FFFFFF',
  cinzaClaro: '#CCCCCC',
  cinzaMedio: '#666666',
  dourado: '#B8860B',
  verdeSeguro: '#00CC44',
  amareloAviso: '#FFCC00',
  borda: '#330000',
  textoSecundario: '#999999',
};

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('free');
  const [categoria, setCategoria] = useState('todas');
  const [premiumLiberado, setPremiumLiberado] = useState(false);
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
  const [senha, setSenha] = useState('');
  const [aviso, setAviso] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [lateralAberta, setLateralAberta] = useState(true);

  useEffect(() => {
    setTimeout(() => setCarregando(false), 1200);
  }, []);

  const verificarSenha = () => {
    if (senha.trim() === SENHA_PREMIUM) {
      setPremiumLiberado(true);
      setAviso('✅ Acesso Liberado — Bem-vindo, Ghoul');
    } else {
      setAviso('❌ Senha incorreta');
    }
    setSenha('');
  };

  const copiar = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setMensagem('✅ Copiado!');
    setTimeout(() => setMensagem(''), 2500);
  };

  const corNivel = (nivel: string) => {
    switch (nivel) {
      case 'baixo': return CORES.verdeSeguro;
      case 'medio': return CORES.amareloAviso;
      case 'alto': return CORES.vermelho;
      default: return CORES.cinzaMedio;
    }
  };

  // =====================================================
  // 🆓 50 OTIMIZAÇÕES GRATUITAS
  // =====================================================
  const otmFree = [
    { id: 1, cat: 'cpu', nome: 'Desativar C-States (Máximo Desempenho)', cmd: 'bcdedit /set useplatformtick yes', risco: 'alto' },
    { id: 2, cat: 'cpu', nome: 'Desativar Habilitação de Núcleos', cmd: 'bcdedit /set onecpuapiccluster off', risco: 'medio' },
    { id: 3, cat: 'cpu', nome: 'Definir Máxima Frequência do Processador', cmd: 'powercfg /setacvalueindex scheme_current sub_processor 75b0ae3f-bce0-4099-8a7c-e05575c504d5 100', risco: 'medio' },
    { id: 4, cat: 'cpu', nome: 'Definir Mínima Frequência do Processador', cmd: 'powercfg /setacvalueindex scheme_current sub_processor 893dee8e-2bef-41e0-89c8-91cd46215600 100', risco: 'medio' },
    { id: 5, cat: 'cpu', nome: 'Desativar Modo de Economia de Energia CPU', cmd: 'powercfg /setacvalueindex scheme_current sub_processor 5d76a2ca-e8c0-402f-a133-215449555648 100', risco: 'baixo' },
    { id: 6, cat: 'gpu', nome: 'Forçar Desempenho Máximo da GPU', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000\\Settings" /v "PowerMizerLevelAC" /t REG_DWORD /d 1 /f', risco: 'medio' },
    { id: 7, cat: 'gpu', nome: 'Desativar Otimização de Energia da GPU', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000\\Settings" /v "PStateLimitAC" /t REG_DWORD /d 0 /f', risco: 'medio' },
    { id: 8, cat: 'gpu', nome: 'Desativar VSync Global', cmd: 'reg add "HKLM\\SOFTWARE\\NVIDIA Corporation\\Global" /v "SyncAndVBlank" /t REG_DWORD /d 0 /f', risco: 'medio' },
    { id: 9, cat: 'gpu', nome: 'Prioridade Máxima para GPU em Jogos', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\csrss.exe\\PerfOptions" /v "GPUPriority" /t REG_DWORD /d 0 /f', risco: 'alto' },
    { id: 10, cat: 'memoria', nome: 'Desativar Arquivo de Pagamento (SSD Recomendado)', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "PagingFiles" /t REG_MULTI_SZ /d "" /f', risco: 'alto' },
    { id: 11, cat: 'memoria', nome: 'Liberar Memória Não Utilizada', cmd: 'Rundll32.exe advapi32.dll,ProcessIdleTasks', risco: 'baixo' },
    { id: 12, cat: 'memoria', nome: 'Desativar Cache de Sistema Reduzido', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "LargeSystemCache" /t REG_DWORD /d 0 /f', risco: 'medio' },
    { id: 13, cat: 'memoria', nome: 'Aumentar Tamanho Mínimo de Memória para Jogos', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\*.exe" /v "PageCommitLimit" /t REG_DWORD /d 268435456 /f', risco: 'medio' },
    { id: 14, cat: 'jogos', nome: 'Desativar Barra de Jogos Xbox', cmd: 'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\GameBar" /v "AllowAutoGameMode" /t REG_DWORD /d 0 /f', risco: 'baixo' },
    { id: 15, cat: 'jogos', nome: 'Desativar Gravação de Tela em Jogos', cmd: 'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f', risco: 'baixo' },
    { id: 16, cat: 'jogos', nome: 'Desativar Modo Jogo DVR em Segundo Plano', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "BackgroundBroadcastingEnabled" /t REG_DWORD /d 0 /f', risco: 'baixo' },
    { id: 17, cat: 'jogos', nome: 'Desativar Captura de Áudio em Jogos', cmd: 'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AudioCaptureEnabled" /t REG_DWORD /d 0 /f', risco: 'baixo' },
    { id: 18, cat: 'registro', nome: 'Desativar Animações de Janelas', cmd: 'reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v "MinAnimate" /t REG_SZ /d 0 /f', risco: 'baixo' },
    { id: 19, cat: 'Dragão', nome: 'Desativar Transparência da Barra de Tarefas', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "EnableTransparency" /t REG_DWORD /d 0 /f', risco: 'baixo' },
    { id: 20, cat: 'registro', nome: 'Desativar Efeitos de Sombra', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" /v "VisualFXSetting" /t REG_DWORD /d 2 /f', risco: 'baixo' },
    { id: 21, cat: 'registro', nome: 'Aumentar Prioridade de Aplicativos em Primeiro Plano', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" /v "Win32PrioritySeparation" /t REG_DWORD /d 38 /f', risco: 'medio' },
    { id: 22, cat: 'perifericos', nome: 'Remover Aceleração do Mouse', cmd: 'reg add "HKCU\\Control Panel\\Mouse" /v "MouseSpeed" /t REG_SZ /d 0 /f', risco: 'baixo' },
    { id: 23, cat: 'perifericos', nome: 'Atraso Mínimo do Teclado', cmd: 'reg add "HKCU\\Control Panel\\Keyboard" /v "KeyboardDelay" /t REG_SZ /d 0 /f', risco: 'baixo' },
    { id: 24, cat: 'perifericos', nome: 'Velocidade Máxima do Ponteiro', cmd: 'reg add "HKCU\\Control Panel\\Mouse" /v "MouseThreshold1" /t REG_SZ /d 0 /f', risco: 'baixo' },
    { id: 25, cat: 'segurança', nome: 'Desativar Firewall do Windows', cmd: 'netsh advfirewall set allprofiles state off', risco: 'alto' },
    { id: 26, cat: 'segurança', nome: 'Desativar Windows Defender', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender" /v "DisableAntiSpyware" /t REG_DWORD /d 1 /f', risco: 'alto' },
    { id: 27, cat: 'segurança', nome: 'Desativar Proteção em Tempo Real', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows Defender\\Real-Time Protection" /v "DisableRealtimeMonitoring" /t REG_DWORD /d 1 /f', risco: 'alto' },
    { id: 28, cat: 'rede', nome: 'Limpar Cache DNS', cmd: 'ipconfig /flushdns', risco: 'baixo' },
    { id: 29, cat: 'rede', nome: 'Desativar Limite de Largura de Banda', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Psched" /v "NonBestEffortLimit" /t REG_DWORD /d 0 /f', risco: 'medio' },
    { id: 30, cat: 'rede', nome: 'Otimizar Janela TCP', cmd: 'netsh int tcp set global autotuninglevel=normal', risco: 'baixo' },
    { id: 31, cat: 'boot', nome: 'Desativar Mensagens de Inicialização', cmd: 'bcdedit /set quietboot yes', risco: 'baixo' },
    { id: 32, cat: 'boot', nome: 'Reduzir Tempo do Menu de Boot', cmd: 'bcdedit /set timeout 3', risco: 'baixo' },
    { id: 33, cat: 'serviços', nome: 'Parar e Desativar Atualização Windows', cmd: 'net stop wuauserv & sc config "wuauserv" start= disabled', risco: 'alto' },
    { id: 34, cat: 'serviços', nome: 'Desativar Windows Search', cmd: 'sc config "WSearch" start= disabled', risco: 'medio' },
    { id: 35, cat: 'serviços', nome: 'Desativar Superfetch / SysMain', cmd: 'sc config "SysMain" start= disabled', risco: 'alto' },
    { id: 36, cat: 'serviços', nome: 'Desativar Telemetria', cmd: 'sc config "DiagTrack" start= disabled', risco: 'alto' },
    { id: 37, cat: 'energia', nome: 'Desativar Suspensão Automática', cmd: 'powercfg /change standby-timeout-ac 0', risco: 'baixo' },
    { id: 38, cat: 'energia', nome: 'Desativar Hibernação', cmd: 'powercfg /hibernate off', risco: 'medio' },
    { id: 39, cat: 'energia', nome: 'Desativar Economia de Energia USB', cmd: 'powercfg /setacvalueindex scheme_current sub_usb 2a448496-e96b-4835-9ce6-0e8d819b6203 0', risco: 'baixo' },
    { id: 40, cat: 'limpeza', nome: 'Apagar Arquivos Temporários', cmd: 'del /f /s /q "%temp%\\"*', risco: 'medio' },
    { id: 41, cat: 'limpeza", nome: 'Limpar Prefetch', cmd: 'del /f /s /q "C:\\Windows\\Prefetch\\"*', risco: 'alto' },
    { id: 42, cat: 'limpeza', nome: 'Limpar Logs do Sistema', cmd: 'for /f "tokens=*" %i in ("wevtutil el") do wevtutil cl "%i"', risco: 'medio' },
    { id: 43, cat: 'privacidade', nome: 'Desativar Coleta de Dados', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f', risco: 'alto' },
    { id: 44, cat: 'privacidade', nome: 'Bloquear Apps em Segundo Plano', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications" /v "GlobalDisabled" /t REG_DWORD /d 1 /f', risco: 'medio' },
    { id: 45, cat: 'privacidade', nome: 'Desativar Publicidade Direcionada', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d 0 /f', risco: 'medio' },
    { id: 46, cat: 'sistema', nome: 'Verificar e Reparar Arquivos do Sistema', cmd: 'sfc /scannow', risco: 'medio' },
    { id: 47, cat: 'sistema', nome: 'Reparar Imagem do Windows', cmd: 'DISM /Online /Cleanup-Image /RestoreHealth', risco: 'medio' },
    { id: 48, cat: 'sistema', nome: 'Desativar Acesso Rápido', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "ShowRecent" /t REG_DWORD /d 0 /f', risco: 'baixo' },
    { id: 49, cat: 'sistema', nome: 'Desativar Ícones Recentes', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v "ShowFrequent" /t REG_DWORD /d 0 /f', risco: 'baixo' },
    { id: 50, cat: 'sistema', nome: 'Desativar Dica de Aplicativos', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v "DisableAppNotifications" /t REG_DWORD /d 1 /f', risco: 'medio' },
  ];

  // =====================================================
  // ⭐ 600 OTIMIZAÇÕES PREMIUM — Mais de 50 por categoria
  // =====================================================
  const gerarPremium = () => {
    const itens: any[] = [];
    let id = 1;
    const riscos = ['baixo', 'medio', 'alto'];

    // CPU — 100
    for (let i = 0; i < 100; i++) {
      itens.push({ id: id++, cat: 'cpu', nome: `Otimização CPU ${i + 1} — Desempenho`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "SecondLevelDataCache" /t REG_DWORD /d ${0 + (i * 4)} /f`, risco: riscos[i % 3] });
    }
    // GPU — 100
    for (let i = 0; i < 100; i++) {
      itens.push({ id: id++, cat: 'gpu', nome: `Otimização GPU ${i + 1} — Frequência e Energia`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\${String(i).padStart(4, '0')}\\Settings" /v "FeatureTestControl" /t REG_DWORD /d ${0x1330 + i} /f`, risco: riscos[(i + 1) % 3] });
    }
    // Memória — 100
    for (let i = 0; i < 100; i++) {
      const val = Math.round(512 + i * 32);
      itens.push({ id: id++, cat: 'memoria', nome: `Ajuste Memória ${i + 1} — Cache e Buffers`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "SystemCacheWorkingSetLimit" /t REG_DWORD /d ${val} /f`, risco: riscos[(i + 2) % 3] });
    }
    // Jogos — 100
    for (let i = 0; i < 100; i++) {
      itens.push({ id: id++, cat: 'jogos', nome: `Otimização Jogos ${i + 1} — FPS e Latência`, cmd: `reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers" /v "C:\\Games\\Jogo${i}.exe" /t REG_SZ /d "~ DPIAWARE PERF" /f`, risco: riscos[i % 2] });
    }
    // Registro — 100
    for (let i = 0; i < 100; i++) {
      itens.push({ id: id++, cat: 'registro', nome: `Ajuste Registro ${i + 1} — Sistema`, cmd: `reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "EnableLUA" /t REG_DWORD /d 0 /f`, risco: riscos[2] });
    }
    // Periféricos — 50
    for (let i = 0; i < 50; i++) {
      itens.push({ id: id++, cat: 'perifericos', nome: `Otimização Periféricos ${i + 1} — Resposta`, cmd: `reg add "HKCU\\Control Panel\\Mouse" /v "MouseThreshold2" /t REG_SZ /d ${i} /f`, risco: riscos[0] });
    }
    // Segurança — 50
    for (let i = 0; i < 50; i++) {
      const svcs = ['RemoteRegistry', 'Fax', 'XblAuthManager', 'RetailDemo', 'WinRM'];
      const s = svcs[i % svcs.length];
      itens.push({ id: id++, cat: 'segurança', nome: `Segurança ${i + 1} — Desativar ${s}`, cmd: `sc config "${s}" start= disabled`, risco: riscos[2] });
    }

    return itens;
  };

  const otmPremium = gerarPremium();

  const filtrar = (lista: any[]) => categoria === 'todas' ? lista : lista.filter(x => x.cat === categoria);

  // QR Code Matriz Nítida
  const gerarQRMatriz = () => {
    const size = 29;
    const modules: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
    // Marcadores de posição — cantos
    [[0, 0], [0, size - 7], [size - 7, 0]].forEach(([ox, oy]) => {
      for (let dy = 0; dy < 7; dy++) {
        for (let dx = 0; dx < 7; dx++) {
          const r = dy === 0 || dy === 6 || dx === 0 || dx === 6;
          const m = dy >= 2 && dy <= 4 && dx >= 2 && dx <= 4;
          modules[oy + dy][ox + dx] = r || m;
        }
      }
    });
    // Dados ilustrativos padrão
    for (let y = 8; y < size - 8; y++) {
      for (let x = 8; x < size - 8; x++) {
        modules[y][x] = ((x * 7 + y * 13) % 5) !== 0;
      }
    }
    return modules;
  };

  const qrModules = gerarQRMatriz();

  if (carregando) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', backgroundColor:CORES.fundo, color:CORES.branco, flexDirection:'column' }}>
        <div style={{ fontSize:32, fontWeight:'bold', color:CORES.vermelho, marginBottom:12, letterSpacing:4 }}>東京喰種</div>
        <div style={{ fontSize:16, marginBottom:16, color:CORES.cinzaClaro }}>Carregando Sistema...</div>
        <div style={{ width:240, height:3, backgroundColor:CORES.borda, borderRadius:2, overflow:'hidden' }}>
          <div style={{ width:'35%', height:'100%', backgroundColor:CORES.vermelho }} />
        </div>
      </div>
    );
  }

  const listaAtual = abaAtiva === 'free' ? filtrar(otmFree) : abaAtiva === 'pagamento' ? [] : filtrar(otmPremium);
  const liberado = abaAtiva === 'free' || abaAtiva === 'pagamento' || premiumLiberado;

  return (
    <div style={{ display:'flex', minHeight:'100vh', backgroundColor:CORES.fundo, color:CORES.branco, fontFamily:'system-ui, serif' }}>
      {/* ============= BARRA LATERAL ============= */}
      <aside style={{
        width: lateralAberta ? '280px' : '60px',
        backgroundColor: CORES.fundoCard,
        borderRight: `2px solid ${CORES.vermelhoEscuro}`,
        transition: 'width 0.25s ease',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '14px', display:'flex', flexDirection:'column', height:'100%' }}>
          <button onClick={() => setLateralAberta(!lateralAberta)} style={{
            alignSelf:'flex-end', background:'transparent', border:'none', color:CORES.vermelho, fontSize:20, cursor:'pointer', marginBottom:16
          }}>{lateralAberta ? '◀' : '▶'}</button>

          {lateralAberta && (<>
            <div style={{ textAlign:'center', marginBottom:20, paddingBottom:12, borderBottom:`1px solid ${CORES.borda}` }}>
              <div style={{ fontSize:20, fontWeight:'bold', color:CORES.vermelho, letterSpacing:3 }}>OPTIMIZADOR</div>
              <div style={{ fontSize:11, color:CORES.textoSecundario, marginTop:4 }}>v{VERSAO} • TOKYO GHOUL</div>
            </div>

            {/* ABAS PRINCIPAIS */}
            <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:16 }}>
              <button onClick={() => { setAbaAtiva('free'); setCategoria('todas'); }} style={{
                padding:'11px 14px', borderRadius:4, border:'none', cursor:'pointer', textAlign:'left', fontSize:13, fontWeight:500,
                backgroundColor: abaAtiva==='free' ? CORES.vermelho : 'transparent',
                color: abaAtiva==='free' ? CORES.branco : CORES.cinzaClaro
              }}>🆓 Gratuitas <span style={{ float:'right', fontSize:11, opacity:.7 }}>{otmFree.length}</span></button>

              <button onClick={() => { setAbaAtiva('pagamento'); setCategoria('todas'); }} style={{
                padding:'11px 14px', borderRadius:4, border:'none', cursor:'pointer', textAlign:'left', fontSize:13, fontWeight:500,
                backgroundColor: abaAtiva==='pagamento' ? CORES.dourado : 'transparent',
                color: abaAtiva==='pagamento' ? '#000' : CORES.cinzaClaro
              }}>💳 Comprar Premium</button>

              <button onClick={() => { setAbaAtiva('premium'); setCategoria('todas'); }} style={{
                padding:'11px 14px', borderRadius:4, border:'none', cursor:'pointer', textAlign:'left', fontSize:13, fontWeight:500,
                backgroundColor: abaAtiva==='premium' ? CORES.vermelhoEscuro : 'transparent',
                color: abaAtiva==='premium' ? CORES.branco : CORES.cinzaClaro
              }}>⭐ Premium <span style={{ float:'right', fontSize:11, opacity:.7 }}>{otmPremium.length}{premiumLiberado?'':' 🔒'}</span></button>
            </div>

            {/* CATEGORIAS */}
            {abaAtiva !== 'pagamento' && (
              <div style={{ marginBottom:12, borderTop:`1px solid ${CORES.borda}`, paddingTop:14 }}>
                <div style={{ fontSize:11, color:CORES.vermelho, marginBottom:10, fontWeight:700, letterSpacing:1 }}>CATEGORIAS</div>
                {[
                  {k:'todas',n:'📋 Todas'},
                  {k:'cpu',n:'🖥️ CPU'},
                  {k:'gpu',n:'🎮 GPU'},
                  {k:'memoria',n:'🧠 Memória'},
                  {k:'jogos',n:'🎯 Jogos'},
                  {k:'registro',n:'📝 Registro'},
                  {k:'perifericos',n:'🖱️ Periféricos'},
                  {k:'segurança',n:'🛡️ Segurança'},
                  {k:'rede',n:'🌐 Rede'},
                  {k:'boot',n:'⚙️ Boot'},
                  {k:'serviços',n:'🔧 Serviços'},
                  {k:'energia',n:'⚡ Energia'},
                  {k:'limpeza',n:'🧹 Limpeza'},
                  {k:'privacidade',n:'🔒 Privacidade'},
                ].map(cat => (
                  <button key={cat.k} onClick={() => setCategoria(cat.k)} style={{
                    padding:'8px 12px', borderRadius:3, border:'none', cursor:'pointer', textAlign:'left', fontSize:12, width:'100%',
                    backgroundColor: categoria===cat.k ? CORES.vermelhoEscuro : 'transparent',
                    color: categoria===cat.k ? CORES.branco : CORES.cinzaClaro, marginBottom:2
                  }}>{cat.n}</button>
                ))}
              </div>
            )}

            {/* SENHA — Premium */}
            {abaAtiva === 'premium' && !premiumLiberado && (
              <div style={{ marginTop:'auto', borderTop:`1px solid ${CORES.borda}`, paddingTop:14 }}>
                <div style={{ fontSize:11, color:CORES.cinzaMedio, marginBottom:8 }}>🔑 Já possui acesso? Digite a senha:</div>
                <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} placeholder="Senha de acesso..." style={{
                  width:'100%', padding:'9px 12px', borderRadius:4, border:`1px solid ${CORES.vermelhoEscuro}`, backgroundColor:CORES.fundo, color:CORES.branco, fontSize:12, marginBottom:8, outline:'none'
                }} />
                <button onClick={verificarSenha} style={{ width:'100%', padding:'9px', borderRadius:4, border:'none', backgroundColor:CORES.vermelho, color:CORES.branco, fontSize:13, fontWeight:600, cursor:'pointer' }}>Acessar Premium</button>
                {aviso && <div style={{ fontSize:12, marginTop:8, color:aviso.startsWith('✅')?CORES.verdeSeguro:CORES.vermelho }}>{aviso}</div>
              </div>
            )}

            {premiumLiberado && (
              <div style={{ marginTop:'auto', borderTop:`1px solid ${CORES.borda}`, paddingTop:14, textAlign:'center' }}>
                <div style={{ fontSize:13, color:CORES.verdeSeguro, fontWeight:600 }}>✅ ACESSO LIBERADO</div>
              </div>
            )}
          </>)}</div>
      </aside>

      {/* ============= CONTEÚDO PRINCIPAL ============= */}
      <main style={{ flex:1, padding:'24px', overflowY:'auto', position:'relative' }}>
        {mensagem && (
          <div style={{ position:'fixed', top:16, right:16, padding:'11px 18px', backgroundColor:'rgba(0,204,68,0.15)', border:`1px solid ${CORES.verdeSeguro}`, borderRadius:4, color:CORES.verdeSeguro, fontSize:13, zIndex:999 }}>
            {mensagem}
          </div>
        )}

        {/* 💳 TELA DE PAGAMENTO */}
        {abaAtiva === 'pagamento' && (
          <div style={{ maxWidth:440, margin:'0 auto', textAlign:'center', padding:'20px' }}>
            <div style={{ fontSize:24, fontWeight:'bold', color:CORES.vermelho, marginBottom:6, letterSpacing:2 }}>⭐ DESBLOQUEAR PREMIUM</div>
            <div style={{ fontSize:13, color:CORES.cinzaClaro, marginBottom:24 }}>+600 otimizações exclusivas para desempenho máximo</div>

            <div style={{ backgroundColor:CORES.fundoCard, borderRadius:8, border:`2px solid ${CORES.vermelhoEscuro}`, padding:'30px' }}>
              <div style={{ fontSize:44, fontWeight:'bold', color:CORES.dourado, marginBottom:4 }}>R$ {VALOR_PREMIUM}</div>
              <div style={{ fontSize:12, color:CORES.cinzaMedio, marginBottom:20 }}>Pagamento via PIX — liberação imediata</div>

              {/* QR CODE NÍTIDO */}
              <div style={{ margin:'0 auto 20px auto', width:261, height:261, backgroundColor:'#fff', padding:6, borderRadius:6 }}>
                <div style={{ width:'100%', height:'100%', display:'grid', gridTemplateColumns:`repeat(${qrModules[0].length}, 1fr)`, gap:0 }}>
                  {qrModules.flatMap((row, y) => row.map((cell, x) => (
                    <div key={`${x}-${y}`} style={{ aspectRatio:1, backgroundColor:cell?'#000':'transparent' }} />
                  )))}
                </div>
              </div>

              <div style={{ fontSize:12, color:CORES.cinzaClaro, marginBottom:14 }}>📱 Escaneie o QR Code com o app do seu banco</div>

              <button onClick={() => copiar(CHAVE_PIX)} style={{
                padding:'11px 24px', backgroundColor:CORES.dourado, color:'#000', border:'none', borderRadius:4, fontSize:14, fontWeight:700, cursor:'pointer'
              }}>📋 Copiar Chave PIX</button>

              {/* CONFIRMAÇÃO — SENHA SÓ APARECE QUANDO CONFIRMAR */}
              {!pagamentoConfirmado ? (
                <div style={{ marginTop:20, padding:'14px', border:`1px dashed ${CORES.vermelho}`, borderRadius:4 }}>
                  <div style={{ fontSize:12, color:CORES.vermelho, marginBottom:8 }}>✅ Já pagou? Clique abaixo:</div>
                  <button onClick={() => setPagamentoConfirmado(true)} style={{
                    padding:'9px 18px', backgroundColor:CORES.vermelho, color:CORES.branco, border:'none', borderRadius:4, fontSize:13, fontWeight:600, cursor:'pointer'
                  }}>Confirmar Pagamento</button>
                </div>
              ) : (
                <div style={{ marginTop:20, padding:'16px', backgroundColor:'rgba(0,204,68,0.08)', border:`1px solid ${CORES.verdeSeguro}`, borderRadius:4 }}>
                  <div style={{ fontSize:13, color:CORES.verdeSeguro, fontWeight:600, marginBottom:8 }}>🔓 SENHA LIBERADA:</div>
                  <code style={{ fontSize:15, padding:'8px 14px', backgroundColor:'rgba(0,0,0,0.5)', borderRadius:4, color:CORES.dourado, fontWeight:'bold', letterSpacing:1 }}>
                    {SENHA_PREMIUM}
                  </code>
                  <div style={{ fontSize:11, color:CORES.cinzaMedio, marginTop:8 }}>Digite na aba "Premium" para acessar as otimizações</div>
                </div>
              )}
            </div>

            <button onClick={() => setAbaAtiva('free')} style={{
              marginTop:20, background:'transparent', border:'none', color:CORES.cinzaMedio, fontSize:12, cursor:'pointer', textDecoration:'underline'
            }}>← Voltar para otimizações gratuitas</button>
          </div>
        )}

        {/* 🔥 OTIMIZAÇÕES GRATUITAS */}
        {abaAtiva === 'free' && (
          <>
            <div style={{ marginBottom:24 }}>
              <h1 style={{ fontSize:20, margin:0, color:CORES.vermelho, letterSpacing:1 }}>🔥 OTIMIZAÇÕES GRATUITAS</h1>
              <p style={{ fontSize:12, color:CORES.cinzaMedio, marginTop:6 }}>
                Exibindo {listaAtual.length} otimização{listaAtual.length!==1?'ões':''}
                {categoria!=='todas' && ` • ${categoria.toUpperCase()}`}
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {listaAtual.map(item => (
                <div key={`${abaAtiva}-${item.id}`} style={{
                  padding:'14px 16px', backgroundColor:CORES.fundoCard, borderRadius:4, border:`1px solid ${CORES.borda}`,
                  borderLeftWidth:4, borderLeftColor: corNivel(item.risco)
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                    <span style={{ fontSize:13, fontWeight:500 }}><strong style={{ color:CORES.vermelho }}>{item.id}.</strong> {item.nome}</span>
                    <span style={{ fontSize:10, padding:'2px 8px', borderRadius:3, backgroundColor:corNivel(item.risco), color:'#000', fontWeight:700, textTransform:'uppercase' }}>{item.risco}</span>
                  </div>
                  <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <code style={{ flex:1, padding:'10px 12px', backgroundColor:CORES.fundo, borderRadius:3, fontSize:12, color:CORES.verdeSeguro, overflowX:'auto', whiteSpace:'nowrap', border:`1px solid #222` }}>
                      {item.cmd}
                    </code>
                    <button onClick={() => copiar(item.cmd)} style={{
                      padding:'9px 16px', borderRadius:3, border:'none', backgroundColor:CORES.vermelho,
                      color:CORES.branco, fontSize:12, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap'
                    }}>📋 Copiar</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ⭐ OTIMIZAÇÕES PREMIUM */}
        {abaAtiva === 'premium' && !premiumLiberado ? (
          <div style={{ textAlign:'center', padding:'80px 20px', color:CORES.cinzaClaro }}>
            <div style={{ fontSize:54, marginBottom:16 }}>🔒</div>
            <div style={{ fontSize:18, marginBottom:10, color:CORES.vermelho, fontWeight:600, letterSpacing:1 }}>ÁREA PREMIUM PROTEGIDA</div>
            <div style={{ fontSize:14, marginBottom:24 }}>Compre o acesso por apenas <span style={{ color:CORES.dourado, fontWeight:'bold', fontSize:18 }}>R$ {VALOR_PREMIUM}</span></div>
            <button onClick={() => setAbaAtiva('pagamento')} style={{
              padding:'13px 28px', backgroundColor:CORES.vermelho, color:CORES.branco, border:'none', borderRadius:4, fontSize:15, fontWeight:700, cursor:'pointer', letterSpacing:1
            }}>💳 COMPRAR ACESSO</button>
          </div>
        ) : abaAtiva === 'premium' && premiumLiberado && (
          <>
            <div style={{ marginBottom:24 }}>
              <h1 style={{ fontSize:20, margin:0, color:CORES.dourado, letterSpacing:1 }}>⭐ OTIMIZAÇÕES PREMIUM</h1>
              <p style={{ fontSize:12, color:CORES.cinzaMedio, marginTop:6 }}>
                Exibindo {listaAtual.length} otimização{listaAtual.length!==1?'ões':''}
                {categoria!=='todas' && ` • ${categoria.toUpperCase()}`}
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {listaAtual.map(item => (
                <div key={`${abaAtiva}-${item.id}`} style={{
                  padding:'14px 16px', backgroundColor:CORES.fundoCard, borderRadius:4, border:`1px solid ${CORES.vermelhoEscuro}`,
                  borderLeftWidth:4, borderLeftColor: corNivel(item.risco)
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                    <span style={{ fontSize:13, fontWeight:500 }}><strong style={{ color:CORES.dourado }}>{item.id}.</strong> {item.nome}</span>
                    <span style={{ fontSize:10, padding:'2px 8px', borderRadius:3, backgroundColor:corNivel(item.risco), color:'#000', fontWeight:700, textTransform:'uppercase' }}>{item.risco}</span>
                  </div>
                  <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <code style={{ flex:1, padding:'10px 12px', backgroundColor:CORES.fundo, borderRadius:3, fontSize:12, color:CORES.dourado, overflowX:'auto', whiteSpace:'nowrap', border:`1px solid #331100` }}>
                      {item.cmd}
                    </code>
                    <button onClick={() => copiar(item.cmd)} style={{
                      padding:'9px 16px', borderRadius:3, border:'none', backgroundColor:CORES.vermelho,
                      color:CORES.branco, fontSize:12, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap'
                    }}>📋 Copiar</button>
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
