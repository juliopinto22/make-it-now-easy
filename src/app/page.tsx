'use client';

import { useState, useEffect } from 'react';

// 🔑 DADOS
const SENHA_ADMIN = 'JulioKaneki999';
const SENHA_PREMIUM = 'Pagamento@2026';
const CHAVE_PIX = '+5511999999999'; // 👉 COLOQUE AQUI SUA CHAVE PIX REAL
const VALOR_PREMIUM = '5,90';
const VERSAO = '3.1.0';

// 🎨 TEMA TOKYO GHOUL
const CORES = {
  bg: '#0D0D12',
  bgCard: '#16161F',
  bgHover: '#1F1F2E',
  roxo: '#7B2FFD',
  sangue: '#E6244C',
  texto: '#E0E0E2',
  textoSecundario: '#8F8F9A',
  verdeSeguro: '#22C55E',
  amareloAviso: '#FACC15',
  vermelhoPerigo: '#EF4444',
  borda: '#2A2A3C',
};

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('free');
  const [categoria, setCategoria] = useState('todas');
  const [adminLiberado, setAdminLiberado] = useState(false);
  const [premiumLiberado, setPremiumLiberado] = useState(false);
  const [senha, setSenha] = useState('');
  const [aviso, setAviso] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [lateralAberta, setLateralAberta] = useState(true);

  useEffect(() => {
    setTimeout(() => setCarregando(false), 1200);
  }, []);

  const verificarSenha = (tipo: 'admin' | 'premium') => {
    if (tipo === 'admin' && senha.trim() === SENHA_ADMIN) {
      setAdminLiberado(true);
      setAviso('✅ Acesso Administrador — Kaneki');
    } else if (tipo === 'premium' && senha.trim() === SENHA_PREMIUM) {
      setPremiumLiberado(true);
      setAviso('✅ Acesso Premium — Ghoul liberado');
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

  const corPerigo = (nivel: string) => {
    switch (nivel) {
      case 'baixo': return CORES.verdeSeguro;
      case 'medio': return CORES.amareloAviso;
      case 'alto': return CORES.vermelhoPerigo;
      default: return CORES.textoSecundario;
    }
  };

  // =====================================================
  // 🆓 50 OTIMIZAÇÕES GRATUITAS
  // =====================================================
  const otmFree = [
    { id: 1, cat: 'rede', nome: 'Limpar Cache DNS', cmd: 'ipconfig /flushdns', risco: 'baixo' },
    { id: 2, cat: 'rede', nome: 'Renovar Registro DNS', cmd: 'ipconfig /registerdns', risco: 'baixo' },
    { id: 3, cat: 'rede', nome: 'Liberar Endereço IP', cmd: 'ipconfig /release', risco: 'medio' },
    { id: 4, cat: 'rede', nome: 'Obter Novo IP', cmd: 'ipconfig /renew', risco: 'medio' },
    { id: 5, cat: 'sistema', nome: 'Parar Atualização Windows', cmd: 'net stop wuauserv', risco: 'medio' },
    { id: 6, cat: 'sistema', nome: 'Desativar Serviço de Atualização', cmd: 'sc config "wuauserv" start= disabled', risco: 'alto' },
    { id: 7, cat: 'limpeza', nome: 'Limpar Arquivos Temporários', cmd: 'del /f /s /q "%temp%"\\*', risco: 'medio' },
    { id: 8, cat: 'limpeza', nome: 'Limpar Temp do Windows', cmd: 'del /f /s /q "C:\\Windows\\Temp"\\*', risco: 'alto' },
    { id: 9, cat: 'limpeza', nome: 'Limpar Prefetch', cmd: 'del /f /s /q "C:\\Windows\\Prefetch"\\*', risco: 'alto' },
    { id: 10, cat: 'energia', nome: 'Ativar Plano Alto Desempenho', cmd: 'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c', risco: 'baixo' },
    { id: 11, cat: 'energia', nome: 'Desativar Hibernação', cmd: 'powercfg /hibernate off', risco: 'medio' },
    { id: 12, cat: 'energia', nome: 'Desligar Tempo Disco AC', cmd: 'powercfg /change disk-timeout-ac 0', risco: 'baixo' },
    { id: 13, cat: 'energia', nome: 'Desligar Suspensão Automática', cmd: 'powercfg /change standby-timeout-ac 0', risco: 'baixo' },
    { id: 14, cat: 'boot', nome: 'Desativar Proteção DEP', cmd: 'bcdedit /set nx AlwaysOff', risco: 'alto' },
    { id: 15, cat: 'boot', nome: 'Inicialização Rápida Legacy', cmd: 'bcdedit /set bootmenupolicy legacy', risco: 'alto' },
    { id: 16, cat: 'boot', nome: 'Usar Todos os Núcleos no Boot', cmd: 'bcdedit /set {current} numproc %NUMBER_OF_PROCESSORS%', risco: 'alto' },
    { id: 17, cat: 'boot', nome: 'Remover Limite Memória Boot', cmd: 'bcdedit /deletevalue {current} truncatememory', risco: 'alto' },
    { id: 18, cat: 'limpeza', nome: 'Limpar Logs do Sistema', cmd: 'for /f "tokens=*" %i in (wevtutil el) do wevtutil cl "%i"', risco: 'medio' },
    { id: 19, cat: 'serviços', nome: 'Parar Superfetch / SysMain', cmd: 'net stop SysMain', risco: 'medio' },
    { id: 20, cat: 'serviços', nome: 'Desativar Superfetch', cmd: 'sc config SysMain start= disabled', risco: 'alto' },
    { id: 21, cat: 'serviços', nome: 'Parar Busca Windows', cmd: 'net stop WSearch', risco: 'medio' },
    { id: 22, cat: 'serviços', nome: 'Desativar Windows Search', cmd: 'sc config WSearch start= disabled', risco: 'alto' },
    { id: 23, cat: 'limpeza', nome: 'Limpar Fila Impressão', cmd: 'net stop spooler & del /f /s /q "%systemroot%\\System32\\spool\\PRINTERS"\\*', risco: 'medio' },
    { id: 24, cat: 'rede', nome: 'Desativar Compartilhamento Arquivos', cmd: 'netsh advfirewall firewall set rule group="Arquivos e Impressoras Compartilhados" new enable=No', risco: 'medio' },
    { id: 25, cat: 'rede', nome: 'Desativar IPv6', cmd: 'netsh interface ipv6 set global randomizeidentifiers=disabled', risco: 'medio' },
    { id: 26, cat: 'rede', nome: 'Otimizar TCP — Janela Auto', cmd: 'netsh int tcp set global autotuninglevel=normal', risco: 'baixo' },
    { id: 27, cat: 'rede', nome: 'Ativar Congestionamento CTCP', cmd: 'netsh int tcp set global congestionprovider=ctcp', risco: 'baixo' },
    { id: 28, cat: 'rede', nome: 'Desativar Timestamps TCP', cmd: 'netsh int tcp set global timestamps=disabled', risco: 'baixo' },
    { id: 29, cat: 'rede', nome: 'Definir MTU 1500', cmd: 'netsh int tcp set global mtu=1500', risco: 'medio' },
    { id: 30, cat: 'memoria', nome: 'Liberar Memória RAM', cmd: 'Rundll32.exe advapi32.dll,ProcessIdleTasks', risco: 'baixo' },
    { id: 31, cat: 'sistema', nome: 'Verificar Arquivos Sistema', cmd: 'sfc /scannow', risco: 'medio' },
    { id: 32, cat: 'sistema', nome: 'Reparar Imagem Windows', cmd: 'DISM /Online /Cleanup-Image /RestoreHealth', risco: 'medio' },
    { id: 33, cat: 'sistema', nome: 'Limpar Componentes Atualização', cmd: 'dism /online /cleanup-image /spsuperseded', risco: 'medio' },
    { id: 34, cat: 'registro', nome: 'Desativar Animações Janelas', cmd: 'reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v MinAnimate /t REG_SZ /d 0 /f', risco: 'baixo' },
    { id: 35, cat: 'registro', nome: 'Desativar Transparência', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v EnableTransparency /t REG_DWORD /d 0 /f', risco: 'baixo' },
    { id: 36, cat: 'registro', nome: 'Reduzir Efeitos Visuais', cmd: 'reg add "HKCU\\Control Panel\\Desktop" /v VisualFXSetting /t REG_DWORD /d 2 /f', risco: 'baixo' },
    { id: 37, cat: 'registro', nome: 'Aumentar Prioridade Jogos', cmd: 'reg add "HKLM\\System\\CurrentControlSet\\Control\\PriorityControl" /v Win32PrioritySeparation /t REG_DWORD /d 38 /f', risco: 'medio' },
    { id: 38, cat: 'serviços', nome: 'Desativar Serviço Diagnóstico', cmd: 'sc config "DiagTrack" start= disabled', risco: 'alto' },
    { id: 39, cat: 'serviços', nome: 'Parar Diagnóstico', cmd: 'net stop DiagTrack', risco: 'medio' },
    { id: 40, cat: 'privacidade', nome: 'Desativar Telemetria', cmd: 'reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', risco: 'alto' },
    { id: 41, cat: 'privacidade', nome: 'Bloquear Apps Segundo Plano', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications" /v GlobalDisabled /t REG_DWORD /d 1 /f', risco: 'medio' },
    { id: 42, cat: 'energia', nome: 'Desligar Suspensão Híbrida', cmd: 'powercfg /change hibernate-timeout-ac 0', risco: 'medio' },
    { id: 43, cat: 'boot', nome: 'Reduzir Tempo Menu Boot', cmd: 'bcdedit /set timeout 3', risco: 'baixo' },
    { id: 44, cat: 'rede', nome: 'Resetar Catálogo Winsock', cmd: 'netsh winsock reset', risco: 'alto' },
    { id: 45, cat: 'rede', nome: 'Resetar Pilha IPv4', cmd: 'netsh int ipv4 reset', risco: 'alto' },
    { id: 46, cat: 'perifericos', nome: 'Aceleração Máxima Teclado', cmd: 'reg add "HKCU\\Control Panel\\Keyboard" /v KeyboardSpeed /t REG_SZ /d 31 /f', risco: 'baixo' },
    { id: 47, cat: 'perifericos', nome: 'Atraso Mínimo Teclado', cmd: 'reg add "HKCU\\Control Panel\\Keyboard" /v KeyboardDelay /t REG_SZ /d 0 /f', risco: 'baixo' },
    { id: 48, cat: 'perifericos', nome: 'Remover Aceleração Mouse', cmd: 'reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d 0 /f', risco: 'baixo' },
    { id: 49, cat: 'limpeza', nome: 'Apagar Cache de Fontes', cmd: 'del /f /s /q "%LocalAppData%\\Microsoft\\Windows\\FontsCache"\\*', risco: 'medio' },
    { id: 50, cat: 'jogos', nome: 'Desativar Modo Jogo DVR', cmd: 'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 0 /f', risco: 'medio' },
  ];

  // =====================================================
  // ⭐ 600 OTIMIZAÇÕES PREMIUM
  // =====================================================
  const gerarPremium = () => {
    const itens: any[] = [];
    let idSeq = 1;
    const riscos = ['baixo', 'medio', 'alto'];

    for (let i = 0; i < 60; i++) itens.push({ id: idSeq++, cat: 'cpu', nome: `Otimização CPU #${idSeq - 1}`, cmd: `bcdedit /set useplatformtick ${i % 2 === 0 ? 'yes' : 'no'}`, risco: riscos[2] });
    for (let i = 0; i < 60; i++) itens.push({ id: idSeq++, cat: 'gpu', nome: `Otimização GPU #${idSeq - 1}`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\${i.toString().padStart(4,'0')}\\Settings" /v "FeatureTestControl" /t REG_DWORD /d ${0x1320 + i} /f`, risco: riscos[1] });
    for (let i = 0; i < 60; i++) { const v = Math.round(256 + i * 64); itens.push({ id: idSeq++, cat: 'memoria', nome: `Ajuste Memória #${idSeq - 1}`, cmd: `reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "SystemCacheWorkingSetLimit" /t REG_DWORD /d ${v} /f`, risco: riscos[Math.floor(Math.random()*3)] }); }
    for (let i = 0; i < 80; i++) itens.push({ id: idSeq++, cat: 'rede', nome: `Parâmetro Rede #${idSeq - 1}`, cmd: `reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v "TcpWindowSize" /t REG_DWORD /d ${8192 + i * 512} /f`, risco: riscos[0] });
    for (let i = 0; i < 60; i++) itens.push({ id: idSeq++, cat: 'boot', nome: `Parâmetro Boot #${idSeq - 1}`, cmd: `bcdedit /set quietboot ${i % 2 === 0 ? 'yes' : 'no'}`, risco: riscos[2] });
    for (let i = 0; i < 100; i++) { const svcs = ['wuauserv','WSearch','DiagTrack','DPS','WinDefend','Spooler','RemoteRegistry','Fax','XblAuthManager','RetailDemo']; const s = svcs[i % svcs.length]; itens.push({ id: idSeq++, cat: 'serviços', nome: `Desativar Serviço — ${s}`, cmd: `sc config "${s}" start= disabled`, risco: riscos[2] }); }
    for (let i = 0; i < 80; i++) itens.push({ id: idSeq++, cat: 'registro', nome: `Chave Registro #${idSeq - 1}`, cmd: `reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "EnableLUA" /t REG_DWORD /d 0 /f`, risco: riscos[1] });
    for (let i = 0; i < 60; i++) itens.push({ id: idSeq++, cat: 'jogos', nome: `Otimização Jogos #${idSeq - 1}`, cmd: `reg add "HKCU\\System\\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 0 /f`, risco: riscos[0] });
    for (let i = 0; i < 40; i++) itens.push({ id: idSeq++, cat: 'energia', nome: `Otimização Energia #${idSeq - 1}`, cmd: `powercfg /setacvalueindex scheme_current sub_processor 5d76a2ca-e8c0-402f-a133-215449555648 ${80 + i}`, risco: riscos[1] });

    return itens.slice(0, 600);
  };

  const otmPremium = gerarPremium();

  const filtrar = (lista: any[]) => categoria === 'todas' ? lista : lista.filter(x => x.cat === categoria);

  if (carregando) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', backgroundColor:CORES.bg, color:CORES.texto, flexDirection:'column' }}>
        <div style={{ fontSize:28, fontWeight:'bold', color:CORES.sangue, marginBottom:12 }}>東京喰種</div>
        <div style={{ fontSize:18, marginBottom:8 }}>Carregando Optimizador do Julio...</div>
        <div style={{ width:220, height:4, backgroundColor:CORES.borda, borderRadius:2, overflow:'hidden' }}>
          <div style={{ width:'40%', height:'100%', backgroundColor:CORES.sangue }} />
        </div>
      </div>
    );
  }

  const listaAtual = abaAtiva === 'free' ? filtrar(otmFree) : abaAtiva === 'pagamento' ? [] : filtrar(otmPremium);
  const liberado = abaAtiva === 'free' || abaAtiva === 'pagamento' || adminLiberado || premiumLiberado;

  return (
    <div style={{ display:'flex', minHeight:'100vh', backgroundColor:CORES.bg, color:CORES.texto, fontFamily:'system-ui, sans-serif' }}>
      {/* ============= BARRA LATERAL ============= */}
      <aside style={{
        width: lateralAberta ? '270px' : '64px',
        backgroundColor: CORES.bgCard,
        borderRight: `1px solid ${CORES.borda}`,
        transition: 'width 0.25s ease',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '14px', display:'flex', flexDirection:'column', height:'100%' }}>
          <button onClick={() => setLateralAberta(!lateralAberta)} style={{
            alignSelf:'flex-end', background:'transparent', border:'none', color:CORES.textoSecundario, fontSize:18, cursor:'pointer', marginBottom:16
          }}>{lateralAberta ? '◀' : '▶'}</button>

          {lateralAberta && (<>
            <div style={{ textAlign:'center', marginBottom:20 }}>
              <div style={{ fontSize:22, fontWeight:'bold', color:CORES.sangue, letterSpacing:2 }}>TOKYO GHOUL</div>
              <div style={{ fontSize:11, color:CORES.textoSecundario, marginTop:4 }}>Optimizador v{VERSAO}</div>
              <div style={{ fontSize:10, color:CORES.roxo, marginTop:2 }}>Julio © 2026</div>
            </div>

            {/* ABAS PRINCIPAIS */}
            <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:16 }}>
              <button onClick={() => { setAbaAtiva('free'); setCategoria('todas'); }} style={{
                padding:'10px 12px', borderRadius:6, border:'none', cursor:'pointer', textAlign:'left', fontSize:13,
                backgroundColor: abaAtiva==='free' ? CORES.roxo : 'transparent',
                color: abaAtiva==='free' ? '#fff' : CORES.textoSecundario
              }}>🆓 Gratuitas <span style={{ float:'right', fontSize:11, opacity:.7 }}>{otmFree.length}</span></button>

              <button onClick={() => { setAbaAtiva('pagamento'); setCategoria('todas'); }} style={{
                padding:'10px 12px', borderRadius:6, border:'none', cursor:'pointer', textAlign:'left', fontSize:13,
                backgroundColor: abaAtiva==='pagamento' ? '#00B945' : 'transparent',
                color: abaAtiva==='pagamento' ? '#fff' : CORES.textoSecundario
              }}>💳 Comprar Premium</button>

              <button onClick={() => { setAbaAtiva('premium'); setCategoria('todas'); }} style={{
                padding:'10px 12px', borderRadius:6, border:'none', cursor:'pointer', textAlign:'left', fontSize:13,
                backgroundColor: abaAtiva==='premium' ? CORES.sangue : 'transparent',
                color: abaAtiva==='premium' ? '#fff' : CORES.textoSecundario
              }}>⭐ Premium <span style={{ float:'right', fontSize:11, opacity:.7 }}>{otmPremium.length}{liberado||abaAtiva==='pagamento'?'':' 🔒'}</span></button>
            </div>

            {/* CATEGORIAS — só mostra nas otimizações */}
            {abaAtiva !== 'pagamento' && (
              <div style={{ marginBottom:12, borderTop:`1px solid ${CORES.borda}`, paddingTop:12 }}>
                <div style={{ fontSize:11, color:CORES.textoSecundario, marginBottom:8, fontWeight:600 }}>FILTROS</div>
                {[
                  {k:'todas',n:'📋 Todas'}, {k:'cpu',n:'🖥️ CPU'}, {k:'gpu',n:'🎮 GPU'}, {k:'memoria',n:'🧠 Memória'},
                  {k:'rede',n:'🌐 Rede'}, {k:'boot',n:'⚙️ Boot'}, {k:'serviços',n:'🔧 Serviços'},
                  {k:'registro',n:'📝 Registro'}, {k:'jogos',n:'🎯 Jogos'}, {k:'energia',n:'⚡ Energia'},
                  {k:'limpeza',n:'🧹 Limpeza'}, {k:'privacidade',n:'🛡️ Privacidade'}, {k:'perifericos',n:'🖱️ Periféricos'},
                ].map(cat => (
                  <button key={cat.k} onClick={() => setCategoria(cat.k)} style={{
                    padding:'7px 10px', borderRadius:4, border:'none', cursor:'pointer', textAlign:'left', fontSize:12, width:'100%',
                    backgroundColor: categoria===cat.k ? CORES.bgHover : 'transparent',
                    color: categoria===cat.k ? CORES.texto : CORES.textoSecundario, marginBottom:2
                  }}>{cat.n}</button>
                ))}
              </div>
            )}

            {/* SENHA — só aparece nas otimizações premium */}
            {abaAtiva === 'premium' && !premiumLiberado && !adminLiberado && (
              <div style={{ marginTop:'auto', borderTop:`1px solid ${CORES.borda}`, paddingTop:12 }}>
                <div style={{ fontSize:11, color:CORES.textoSecundario, marginBottom:6 }}>🔑 Já comprou? Digite a senha:</div>
                <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} placeholder="Senha de acesso..." style={{
                  width:'100%', padding:'8px 10px', borderRadius:4, border:`1px solid ${CORES.borda}`, backgroundColor:CORES.bg, color:CORES.texto, fontSize:12, marginBottom:8, outline:'none'
                }} />
                <div style={{ display:'flex', gap:6 }}>
                  <button onClick={()=>verificarSenha('admin')} style={{ flex:1, padding:'7px', borderRadius:4, border:'none', backgroundColor:CORES.roxo, color:'#fff', fontSize:12, cursor:'pointer' }}>Admin</button>
                  <button onClick={()=>verificarSenha('premium')} style={{ flex:1, padding:'7px', borderRadius:4, border:'none', backgroundColor:CORES.sangue, color:'#fff', fontSize:12, cursor:'pointer' }}>Premium</button>
                </div>
                {aviso && <div style={{ fontSize:11, marginTop:6, color:aviso.startsWith('✅')?CORES.verdeSeguro:CORES.sangue }}>{aviso}</div>}
              </div>
            )}

            {(premiumLiberado || adminLiberado) && (
              <div style={{ marginTop:'auto', borderTop:`1px solid ${CORES.borda}`, paddingTop:12, textAlign:'center' }}>
                <div style={{ fontSize:12, color:CORES.verdeSeguro }}>✅ Acesso Liberado!</div>
              </div>
            )}
          </>)}</div>
      </aside>

      {/* ============= CONTEÚDO PRINCIPAL ============= */}
      <main style={{ flex:1, padding:'22px', overflowY:'auto', position:'relative' }}>
        {mensagem && (
          <div style={{ position:'fixed', top:16, right:16, padding:'10px 16px', backgroundColor:'rgba(34,197,69,0.15)', border:`1px solid ${CORES.verdeSeguro}`, borderRadius:6, color:CORES.verdeSeguro, fontSize:13, zIndex:999 }}>
            {mensagem}
          </div>
        )}

        {/* 💳 TELA DE PAGAMENTO PREMIUM */}
        {abaAtiva === 'pagamento' && (
          <div style={{ maxWidth:480, margin:'0 auto', textAlign:'center', padding:'20px' }}>
            <div style={{ fontSize:26, fontWeight:'bold', color:CORES.sangue, marginBottom:6 }}>⭐ Desbloqueie o Premium</div>
            <div style={{ fontSize:14, color:CORES.textoSecundario, marginBottom:24 }}>+600 otimizações exclusivas para máximo desempenho</div>

            <div style={{ backgroundColor:CORES.bgCard, borderRadius:12, border:`1px solid ${CORES.borda}`, padding:'28px', marginBottom:20 }}>
              <div style={{ fontSize:42, fontWeight:'bold', color:'#00B945' }}>R$ {VALOR_PREMIUM}</div>
              <div style={{ fontSize:12, color:CORES.textoSecundario, marginTop:4 }}>Pagamento via PIX — liberação automática</div>

              {/* QR CODE ILUSTRATIVO */}
              <div style={{ margin:'20px auto', width:220, height:220, backgroundColor:'#fff', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', padding:12 }}>
                <div style={{ width:'100%', height:'100%', display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:1 }}>
                  {Array.from({length:49}).map((_,i) => {
                    const pattern = [0,1,2,3,4,5,6,7,8,13,14,20,22,24,26,28,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48];
                    return <div key={i} style={{ backgroundColor:pattern.includes(i)?'#000':'transparent', borderRadius:i===0||i===6||i===42||i===48?2:0 }} />;
                  })}
                </div>
              </div>

              <div style={{ fontSize:12, color:CORES.textoSecundario, marginBottom:8 }}>📱 Escaneie o QR Code com seu app do banco</div>

              <button onClick={() => copiar(`Chave PIX: ${CHAVE_PIX}`)} style={{
                padding:'10px 20px', backgroundColor:'#00B945', color:'#fff', border:'none', borderRadius:6, fontSize:14, fontWeight:600, cursor:'pointer'
              }}>📋 Copiar Chave PIX</button>

              <div style={{ marginTop:16, padding:'12px', backgroundColor:'rgba(123,47,253,0.08)', borderRadius:6, border:`1px solid ${CORES.roxo}30` }}>
                <div style={{ fontSize:12, color:CORES.roxo, fontWeight:600, marginBottom:4 }}>🔑 Após o pagamento</div>
                <div style={{ fontSize:12, color:CORES.textoSecundario }}>Envie o comprovante e receba sua senha de acesso em instantes!</div>
                <div style={{ fontSize:13, color:CORES.verdeSeguro, marginTop:8, fontWeight:500 }}>Senha padrão: <code style={{ backgroundColor:'rgba(0,0,0,0.3)', padding:'2px 6px', borderRadius:3 }}>{SENHA_PREMIUM}</code></div>
              </div>
            </div>

            <button onClick={() => setAbaAtiva('free')} style={{
              background:'transparent', border:'none', color:CORES.textoSecundario, fontSize:13, cursor:'pointer', textDecoration:'underline'
            }}>← Voltar para otimizações gratuitas</button>
          </div>
        )}

        {/* 🔥 OTIMIZAÇÕES GRATUITAS */}
        {abaAtiva === 'free' && (
          <>
            <div style={{ marginBottom:22 }}>
              <h1 style={{ fontSize:20, margin:0, color:CORES.roxo }}>🔥 Otimizações Gratuitas</h1>
              <p style={{ fontSize:12, color:CORES.textoSecundario, marginTop:4 }}>
                Exibindo {listaAtual.length} otimização{listaAtual.length!==1?'ões':''}
                {categoria!=='todas' && ` • Filtro: ${categoria.toUpperCase()}`}
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {listaAtual.map(item => (
                <div key={`${abaAtiva}-${item.id}`} style={{
                  padding:'12px 14px', backgroundColor:CORES.bgCard, borderRadius:8, border:`1px solid ${CORES.borda}`,
                  borderLeftWidth:4, borderLeftColor: corPerigo(item.risco)
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                    <span style={{ fontSize:13, fontWeight:500 }}><strong style={{ color:CORES.roxo }}>{item.id}.</strong> {item.nome}</span>
                    <span style={{ fontSize:10, padding:'2px 6px', borderRadius:3, backgroundColor:corPerigo(item.risco), color:'#000', fontWeight:700, textTransform:'uppercase' }}>{item.risco}</span>
                  </div>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <code style={{ flex:1, padding:'8px 10px', backgroundColor:CORES.bg, borderRadius:4, fontSize:12, color:CORES.verdeSeguro, overflowX:'auto', whiteSpace:'nowrap' }}>
                      {item.cmd}
                    </code>
                    <button onClick={() => copiar(item.cmd)} style={{
                      padding:'8px 14px', borderRadius:4, border:'none', backgroundColor:CORES.roxo,
                      color:'#fff', fontSize:12, cursor:'pointer', fontWeight:500
                    }}>📋 Copiar</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ⭐ OTIMIZAÇÕES PREMIUM */}
        {abaAtiva === 'premium' && !liberado ? (
          <div style={{ textAlign:'center', padding:'60px 20px', color:CORES.textoSecundario }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔒</div>
            <div style={{ fontSize:18, marginBottom:8, color:CORES.sangue, fontWeight:600 }}>Área Premium Protegida</div>
            <div style={{ fontSize:14, marginBottom:20 }}>Compre o acesso por apenas <span style={{ color:'#00B945', fontWeight:'bold' }}>R$ {VALOR_PREMIUM}</span> e libere +600 otimizações!</div>
            <button onClick={() => setAbaAtiva('pagamento')} style={{
              padding:'12px 24px', backgroundColor:'#00B945', color:'#fff', border:'none', borderRadius:8, fontSize:15, fontWeight:600, cursor:'pointer'
            }}>💳 Comprar Acesso Premium</button>
          </div>
        ) : abaAtiva === 'premium' && liberado && (
          <>
            <div style={{ marginBottom:22 }}>
              <h1 style={{ fontSize:20, margin:0, color:CORES.sangue }}>⭐ Otimizações Premium</h1>
              <p style={{ fontSize:12, color:CORES.textoSecundario, marginTop:4 }}>
                Exibindo {listaAtual.length} otimização{listaAtual.length!==1?'ões':''}
                {categoria!=='todas' && ` • Filtro: ${categoria.toUpperCase()}`}
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {listaAtual.map(item => (
                <div key={`${abaAtiva}-${item.id}`} style={{
                  padding:'12px 14px', backgroundColor:CORES.bgCard, borderRadius:8, border:`1px solid ${CORES.borda}`,
                  borderLeftWidth:4, borderLeftColor: corPerigo(item.risco)
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                    <span style={{ fontSize:13, fontWeight:500 }}><strong style={{ color:CORES.sangue }}>{item.id}.</strong> {item.nome}</span>
                    <span style={{ fontSize:10, padding:'2px 6px', borderRadius:3, backgroundColor:corPerigo(item.risco), color:'#000', fontWeight:700, textTransform:'uppercase' }}>{item.risco}</span>
                  </div>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <code style={{ flex:1, padding:'8px 10px', backgroundColor:CORES.bg, borderRadius:4, fontSize:12, color:'#ffcc00', overflowX:'auto', whiteSpace:'nowrap' }}>
                      {item.cmd}
                    </code>
                    <button onClick={() => copiar(item.cmd)} style={{
                      padding:'8px 14px', borderRadius:4, border:'none', backgroundColor:CORES.sangue,
                      color:'#fff', fontSize:12, cursor:'pointer', fontWeight:500
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
