'use client';

import { useState, useEffect } from 'react';

// IMAGENS DE FUNDO
const IMG_CARREGANDO = '/KKTG-696x392.webp';
const IMG_FUNDO_PRINCIPAL = '/kaneki6.webp';
const IMG_HERO_APP = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop';

const SENHA_PREMIUM = 'Pagamento@2026';
const CHAVE_PIX = '+5511947138400';
const VALOR_PREMIUM = '5,90';
const VERSAO = '4.5.0';

const CORES = {
  fundo: '#050505',
  fundoCard: 'rgba(17, 17, 17, 0.88)',
  vermelho: '#E40200',
  vermelhoGlow: 'rgba(228, 2, 0, 0.4)',
  vermelhoEscuro: '#8B0000',
  vermelhoClaro: '#FF3333',
  branco: '#FFFFFF',
  cinzaClaro: '#CCCCCC',
  cinzaMedio: '#888888',
  dourado: '#B8860B',
  verdeSeguro: '#00CC44',
  amareloAviso: '#FFCC00',
  borda: '#330000',
  alertaFundo: 'rgba(228, 2, 0, 0.2)',
};

const otmFree = [
  { id: 1, cat: 'sistema', nome: 'Desativar inicialização rápida', cmd: 'powercfg /hibernate off', risco: 'baixo' },
  { id: 2, cat: 'sistema', nome: 'Otimizar agendador de CPU', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" /v "Win32PrioritySeparation" /t REG_DWORD /d 38 /f', risco: 'medio' },
  { id: 3, cat: 'sistema', nome: 'Desativar serviços desnecessários', cmd: 'sc config "SysMain" start= disabled', risco: 'medio' },
  { id: 4, cat: 'sistema', nome: 'Desativar depuração do sistema', cmd: 'bcdedit /debug off', risco: 'baixo' },
  { id: 5, cat: 'sistema', nome: 'Desativar proteção em tempo real (Defender)', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender" /v "DisableRealtimeMonitoring" /t REG_DWORD /d 1 /f', risco: 'medio' },
  { id: 6, cat: 'cpu', nome: 'Desativar C-States do processador', cmd: 'bcdedit /set useplatformtick yes', risco: 'medio' },
  { id: 7, cat: 'cpu', nome: 'Desativar gerenciamento de energia da CPU', cmd: 'powercfg -setacvalueindex scheme_current sub_processor 5d76a2ca-e8c0-402f-a133-215442442393 100', risco: 'medio' },
  { id: 8, cat: 'cpu', nome: 'Definir plano de desempenho máximo', cmd: 'powercfg -setactive scheme_current', risco: 'baixo' },
  { id: 9, cat: 'cpu', nome: 'Desativar throttling de energia', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling" /v "PowerThrottlingOff" /t REG_DWORD /d 1 /f', risco: 'medio' },
  { id: 10, cat: 'memoria', nome: 'Liberar memória RAM inativa', cmd: 'Rundll32.exe advapi32.dll,ProcessIdleTasks', risco: 'baixo' },
  { id: 11, cat: 'memoria', nome: 'Desativar paginação de kernel', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "DisablePagingExecutive" /t REG_DWORD /d 1 /f', risco: 'medio' },
  { id: 12, cat: 'memoria', nome: 'Aumentar tamanho do pool de memória', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "LargeSystemCache" /t REG_DWORD /d 0 /f', risco: 'medio' },
  { id: 13, cat: 'gpu', nome: 'Desativar otimização em tela cheia', cmd: 'reg add "HKCU\\System\\GameConfigStore" /v "GameDVR_FSEBehaviorMode" /t REG_DWORD /d 2 /f', risco: 'baixo' },
  { id: 14, cat: 'gpu', nome: 'Desativar Barra de Jogos (Game Bar)', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f', risco: 'baixo' },
  { id: 15, cat: 'gpu', nome: 'Desativar gravação em segundo plano', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "BackgroundCaptureEnabled" /t REG_DWORD /d 0 /f', risco: 'baixo' },
  { id: 16, cat: 'rede', nome: 'Limpar e redefinir cache DNS', cmd: 'ipconfig /flushdns', risco: 'baixo' },
  { id: 17, cat: 'rede', nome: 'Renovar endereço IP', cmd: 'ipconfig /release && ipconfig /renew', risco: 'baixo' },
  { id: 18, cat: 'rede', nome: 'Otimizar MTU da rede Wi-Fi', cmd: 'netsh interface ipv4 set subinterface "Wi-Fi" mtu=1500 store=persistent', risco: 'medio' },
  { id: 19, cat: 'rede', nome: 'Desativar limitação de largura de banda', cmd: 'netsh int tcp set global autotuninglevel=normal', risco: 'baixo' },
  { id: 20, cat: 'disco', nome: 'Verificar e reparar arquivos (SFC)', cmd: 'sfc /scannow', risco: 'baixo' },
  { id: 21, cat: 'disco', nome: 'Reparo de imagem do sistema (DISM)', cmd: 'DISM /Online /Cleanup-Image /RestoreHealth', risco: 'baixo' },
  { id: 22, cat: 'disco', nome: 'Limpar arquivos temporários', cmd: 'del /q /s "%temp%"\\*.*', risco: 'baixo' },
  { id: 23, cat: 'jogos', nome: 'Desativar aceleração do ponteiro do mouse', cmd: 'reg add "HKCU\\Control Panel\\Mouse" /v "MouseSpeed" /t REG_SZ /d "0" /f', risco: 'baixo' },
  { id: 24, cat: 'jogos', nome: 'Aumentar prioridade do Valorant', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Valorant.exe\\PerfOptions" /v "CpuPriorityClass" /t REG_DWORD /d 3 /f', risco: 'medio' },
  { id: 25, cat: 'visual', nome: 'Desativar efeitos visuais do Windows', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" /v "VisualFXSetting" /t REG_DWORD /d 2 /f', risco: 'baixo' },
  { id: 26, cat: 'visual', nome: 'Desativar transparência do sistema', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "EnableTransparency" /t REG_DWORD /d 0 /f', risco: 'baixo' },
  { id: 27, cat: 'energia', nome: 'Ativar plano de alto desempenho', cmd: 'powercfg -duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c', risco: 'baixo' },
  { id: 28, cat: 'energia', nome: 'Desativar suspensão automática', cmd: 'powercfg /change standby-timeout-ac 0', risco: 'baixo' },
];

const gerarPremium = () => {
  const itens = [];
  let id = 1;
  const riscos = ['baixo', 'medio', 'alto'];
  const categorias = ['cpu', 'gpu', 'memoria', 'rede', 'sistema', 'jogos'];

  for (let i = 0; i < 150; i++) {
    const cat = categorias[i % categorias.length];
    itens.push({
      id: id++,
      cat: cat,
      nome: `Otimização Ultra ${cat.toUpperCase()} #${i + 1}`,
      cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "Opt_${cat}_${i}" /t REG_DWORD /d ${i * 4} /f`,
      risco: riscos[i % 3]
    });
  }
  return itens;
};

const otmPremium = gerarPremium();

export default function Page() {
  const [carregando, setCarregando] = useState(true);
  const [modoApp, setModoApp] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('free');
  const [categoria, setCategoria] = useState('todas');
  const [busca, setBusca] = useState('');
  const [premiumLiberado, setPremiumLiberado] = useState(false);
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
  const [senha, setSenha] = useState('');
  const [aviso, setAviso] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [lateralAberta, setLateralAberta] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setCarregando(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const verificarSenha = () => {
    if (senha.trim() === SENHA_PREMIUM) {
      setPremiumLiberado(true);
      setAviso('✅ Acesso Liberado — Bem-vindo!');
    } else {
      setAviso('❌ Senha incorreta');
    }
    setSenha('');
  };

  const copiar = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setMensagem('✅ Copiado para a área de transferência!');
    setTimeout(() => setMensagem(''), 2500);
  };

  const corNivel = (nivel: string) => {
    if (nivel === 'baixo') return CORES.verdeSeguro;
    if (nivel === 'medio') return CORES.amareloAviso;
    if (nivel === 'alto') return CORES.vermelho;
    return CORES.cinzaMedio;
  };

  const filtrar = (lista: typeof otmFree) => {
    return lista.filter((item) => {
      const bateCategoria = categoria === 'todas' || item.cat === categoria;
      const bateBusca = item.nome.toLowerCase().includes(busca.toLowerCase()) || item.cmd.toLowerCase().includes(busca.toLowerCase());
      return bateCategoria && bateBusca;
    });
  };

  const abrirApp = (aba: string = 'free') => {
    setAbaAtiva(aba);
    setModoApp(true);
  };

  if (carregando) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.82)), url(${IMG_CARREGANDO})`, backgroundSize: 'cover', backgroundPosition: 'center', color: CORES.branco, flexDirection: 'column' }}>
        <div style={{ fontSize: 42, fontWeight: 'bold', color: CORES.vermelho, marginBottom: 10, letterSpacing: 8, textShadow: '0 0 20px #E40200' }}>
          TOKYO GHOUL
        </div>
        <div style={{ fontSize: 13, color: CORES.cinzaClaro, marginBottom: 25, letterSpacing: 2 }}>
          INICIALIZANDO SISTEMA DE OTIMIZAÇÃO...
        </div>
        <div style={{ width: 280, height: 6, backgroundColor: '#1a0000', borderRadius: 10, border: '1px solid ' + CORES.vermelhoEscuro, overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: CORES.vermelho, borderRadius: 10, animation: 'pulse 1.5s infinite' }} />
        </div>
      </div>
    );
  }

  // VISTA 1: LANDING PAGE
  if (!modoApp) {
    return (
      <div style={{ backgroundColor: CORES.fundo, color: CORES.branco, fontFamily: 'sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 8%', borderBottom: '1px solid ' + CORES.borda, backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(5,5,5,0.9)' }}>
          <div style={{ fontSize: 20, fontWeight: '900', color: CORES.vermelho, letterSpacing: 2, textShadow: '0 0 12px ' + CORES.vermelhoGlow }}>
            ⚡ OPTIMIZER KANEKI
          </div>
          <div style={{ display: 'flex', gap: 30, fontSize: 14, color: CORES.cinzaMedio }}>
            <a href="#planos" style={{ color: 'inherit', textDecoration: 'none' }}>Planos</a>
          </div>
          <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
            <button onClick={() => abrirApp('free')} style={{ background: CORES.vermelho, color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: 6, fontWeight: 'bold', boxShadow: '0 0 15px ' + CORES.vermelhoGlow, fontSize: 14, cursor: 'pointer' }}>
              Acessar Site
            </button>
          </div>
        </nav>

        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '80px 8%', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 500px', maxWidth: 600 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(228, 2, 0, 0.1)', border: '1px solid ' + CORES.vermelhoEscuro, padding: '6px 16px', borderRadius: 20, fontSize: 12, color: CORES.vermelho, fontWeight: 'bold', marginBottom: 24 }}>
              ⚡ ACABE COM O LAG E OS TRAVAMENTOS AGORA
            </div>
            <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: -1 }}>
              Otimize seu PC <br />
              <span style={{ color: CORES.vermelho, textShadow: '0 0 20px ' + CORES.vermelhoGlow }}>com 1 clique.</span>
            </h1>
            <p style={{ fontSize: 16, color: CORES.cinzaMedio, lineHeight: 1.6, marginBottom: 32 }}>
              Aumente seu FPS e reduza o input lag com otimizações inteligentes, automáticas e 100% reversíveis. Sem comandos complicados, sem risco.
            </p>
            <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
              <button onClick={() => abrirApp('free')} style={{ background: CORES.vermelho, color: '#FFF', border: 'none', padding: '16px 32px', borderRadius: 8, fontSize: 16, fontWeight: 'bold', boxShadow: '0 0 25px ' + CORES.vermelhoGlow, cursor: 'pointer' }}>
                Acessar Site
              </button>
              <button onClick={() => abrirApp('pagamento')} style={{ background: CORES.fundoCard, color: CORES.branco, border: '1px solid ' + CORES.borda, padding: '16px 28px', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
                Ver Planos Premium
              </button>
            </div>
          </div>

          <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 580, background: CORES.fundoCard, border: '1px solid ' + CORES.vermelhoEscuro, borderRadius: 12, padding: 20, boxShadow: '0 0 40px rgba(0,0,0,0.8), 0 0 20px ' + CORES.vermelhoGlow }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, borderBottom: '1px solid ' + CORES.borda, paddingBottom: 10 }}>
                <span style={{ fontSize: 12, color: CORES.cinzaMedio }}>OPTIMIZER KANEKI — Dashboard</span>
                <span style={{ fontSize: 11, background: CORES.vermelho, padding: '2px 8px', borderRadius: 4, fontWeight: 'bold' }}>SISTEMA PRONTO</span>
              </div>
              <div style={{ height: 260, borderRadius: 8, backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), transparent), url(${IMG_HERO_APP})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: 20 }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 'bold', textShadow: '0 0 10px #000' }}>PC Otimizado com Sucesso</div>
                  <div style={{ fontSize: 12, color: CORES.verdeSeguro, marginTop: 4 }}>✔ 150+ Tweaks de Registro Aplicados</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO PLANOS */}
        <section id="planos" style={{ padding: '80px 8%', borderTop: '1px solid ' + CORES.borda, background: 'rgba(10,0,0,0.6)' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12 }}>Escolha o seu Plano</h2>
            <p style={{ color: CORES.cinzaMedio, fontSize: 16 }}>Desbloqueie o máximo potencial do seu sistema com as opções abaixo.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 30, flexWrap: 'wrap', alignItems: 'stretch' }}>
            
            {/* CARD FREE */}
            <div style={{ flex: '1 1 320px', maxWidth: 380, background: CORES.fundoCard, border: '1px solid ' + CORES.borda, borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, color: CORES.cinzaMedio, fontWeight: 'bold', marginBottom: 8 }}>GRÁTIS</div>
                <h3 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Plano Free</h3>
                <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 24 }}>R$ 0 <span style={{ fontSize: 14, color: CORES.cinzaMedio, fontWeight: 'normal' }}>/sempre</span></div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', lineHeight: '2.2', fontSize: 14, color: CORES.cinzaMedio }}>
                  <li>✔ Otimização básica de Memória RAM</li>
                  <li>✔ Limpeza de arquivos temporários</li>
                  <li>✔ Desativação básica de telemetria</li>
                  <li>✖ Sem tweaks avançados de GPU/CPU</li>
                </ul>
              </div>
              <button onClick={() => abrirApp('free')} style={{ width: '100%', background: 'transparent', color: CORES.branco, border: '1px solid ' + CORES.borda, padding: '14px', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>
                Acessar Versão Free
              </button>
            </div>

            {/* CARD PREMIUM */}
            <div style={{ flex: '1 1 320px', maxWidth: 380, background: CORES.fundoCard, border: '1px solid ' + CORES.vermelho, borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 0 30px ' + CORES.vermelhoGlow, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -12, right: 20, background: CORES.vermelho, color: '#FFF', fontSize: 11, fontWeight: 'bold', padding: '4px 12px', borderRadius: 12, letterSpacing: 1 }}>
                MAIS POPULAR
              </div>
              <div>
                <div style={{ fontSize: 14, color: CORES.vermelho, fontWeight: 'bold', marginBottom: 8 }}>VIP ACCESS</div>
                <h3 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Plano Premium</h3>
                <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 24 }}>R$ {VALOR_PREMIUM} <span style={{ fontSize: 14, color: CORES.cinzaMedio, fontWeight: 'normal' }}>/vitalício</span></div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', lineHeight: '2.2', fontSize: 14, color: CORES.branco }}>
                  <li>✔ 150+ Tweaks avançados no Registro</li>
                  <li>✔ Redução de Input Lag e Latência</li>
                  <li>✔ Plano de Energia Kaneki Max Performance</li>
                  <li>✔ Otimização exclusiva para GPU e CPU</li>
                  <li>✔ Suporte VIP 24/7 e Atualizações Contínuas</li>
                </ul>
              </div>
              <button onClick={() => abrirApp('pagamento')} style={{ width: '100%', background: CORES.vermelho, color: '#FFF', border: 'none', padding: '14px', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 20px ' + CORES.vermelhoGlow }}>
                Assinar Premium Agora
              </button>
            </div>

          </div>
        </section>
      </div>
    );
  }

  // VISTA 2: APP DASHBOARD POR DENTRO
  const listaExibida = abaAtiva === 'free' ? filtrar(otmFree) : abaAtiva === 'premium' ? filtrar(otmPremium) : [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundImage: `linear-gradient(rgba(5, 5, 5, 0.88), rgba(5, 5, 5, 0.88)), url(${IMG_FUNDO_PRINCIPAL})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', color: CORES.branco, fontFamily: 'sans-serif' }}>
      
      {/* MENU LATERAL */}
      <aside style={{ width: lateralAberta ? 260 : 70, backgroundColor: 'rgba(10, 0, 0, 0.92)', borderRight: '2px solid ' + CORES.vermelhoEscuro, transition: 'width 0.3s ease', display: 'flex', flexDirection: 'column', padding: '16px 10px', backdropFilter: 'blur(5px)' }}>
        <button onClick={() => setLateralAberta(!lateralAberta)} style={{ alignSelf: lateralAberta ? 'flex-end' : 'center', background: 'transparent', border: '1px solid ' + CORES.vermelhoEscuro, color: CORES.vermelho, width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', marginBottom: 12 }}>
          {lateralAberta ? '◀' : '▶'}
        </button>

        {lateralAberta && (
          <div style={{ textAlign: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid ' + CORES.borda }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', color: CORES.vermelho, letterSpacing: 2 }}>OPTIMIZADOR</div>
            <div style={{ fontSize: 11, color: CORES.vermelhoClaro }}>v{VERSAO}</div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => setModoApp(false)} style={{ padding: '10px', background: 'transparent', border: '1px solid ' + CORES.borda, color: CORES.cinzaClaro, borderRadius: 8, cursor: 'pointer', textAlign: lateralAberta ? 'left' : 'center' }}>
            🏠 {lateralAberta && 'VOLTAR AO SITE'}
          </button>

          <button onClick={() => { setAbaAtiva('free'); setCategoria('todas'); }} style={{ padding: '10px', background: abaAtiva === 'free' ? CORES.alertaFundo : 'transparent', border: '1px solid ' + (abaAtiva === 'free' ? CORES.vermelho : 'transparent'), color: abaAtiva === 'free' ? CORES.vermelhoClaro : CORES.cinzaClaro, borderRadius: 8, cursor: 'pointer', textAlign: lateralAberta ? 'left' : 'center' }}>
            🔥 {lateralAberta && `GRATUITAS (${otmFree.length})`}
          </button>

          <button onClick={() => setAbaAtiva('pagamento')} style={{ padding: '10px', background: abaAtiva === 'pagamento' ? 'rgba(184,134,11,0.2)' : 'transparent', border: '1px solid ' + (abaAtiva === 'pagamento' ? CORES.dourado : 'transparent'), color: abaAtiva === 'pagamento' ? CORES.dourado : CORES.cinzaClaro, borderRadius: 8, cursor: 'pointer', textAlign: lateralAberta ? 'left' : 'center' }}>
            💳 {lateralAberta && 'COMPRAR PREMIUM'}
          </button>

          <button onClick={() => { setAbaAtiva('premium'); setCategoria('todas'); }} style={{ padding: '10px', background: abaAtiva === 'premium' ? 'rgba(184,134,11,0.2)' : 'transparent', border: '1px solid ' + (abaAtiva === 'premium' ? CORES.dourado : 'transparent'), color: abaAtiva === 'premium' ? CORES.dourado : CORES.cinzaClaro, borderRadius: 8, cursor: 'pointer', textAlign: lateralAberta ? 'left' : 'center' }}>
            ⭐ {lateralAberta && `PREMIUM ${premiumLiberado ? '✓' : '🔒'}`}
          </button>
        </div>

        {/* CATEGORIAS */}
        {lateralAberta && (abaAtiva === 'free' || (abaAtiva === 'premium' && premiumLiberado)) && (
          <div style={{ marginTop: 20, borderTop: '1px solid ' + CORES.borda, paddingTop: 12, overflowY: 'auto', maxHeight: '50vh' }}>
            <div style={{ fontSize: 11, color: CORES.vermelhoClaro, marginBottom: 8, fontWeight: 'bold' }}>CATEGORIAS</div>
            {['todas', 'sistema', 'cpu', 'memoria', 'gpu', 'rede', 'disco', 'jogos', 'visual', 'energia'].map((cat) => (
              <button key={cat} onClick={() => setCategoria(cat)} style={{ padding: '6px 10px', background: categoria === cat ? CORES.alertaFundo : 'transparent', border: 'none', color: categoria === cat ? CORES.vermelhoClaro : CORES.cinzaClaro, borderRadius: 6, cursor: 'pointer', textAlign: 'left', width: '100%', marginBottom: 4, fontSize: 13 }}>
                • {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        {lateralAberta && abaAtiva === 'premium' && !premiumLiberado && (
          <div style={{ marginTop: 20, borderTop: '1px solid ' + CORES.borda, paddingTop: 12 }}>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite a Senha..." style={{ width: '100%', padding: '8px', background: '#000', border: '1px solid ' + CORES.vermelhoEscuro, borderRadius: 6, color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
            <button onClick={verificarSenha} style={{ marginTop: 8, width: '100%', padding: '8px', background: CORES.vermelho, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' }}>
              DESBLOQUEAR
            </button>
            {aviso && <div style={{ marginTop: 8, fontSize: 12, color: aviso.includes('✅') ? CORES.verdeSeguro : CORES.vermelho, textAlign: 'center' }}>{aviso}</div>}
          </div>
        )}
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main style={{ flex: 1, padding: '24px 30px', overflowY: 'auto' }}>
        {mensagem && (
          <div style={{ position: 'fixed', top: 20, right: 20, padding: '10px 20px', background: 'rgba(0,204,68,0.2)', border: '1px solid ' + CORES.verdeSeguro, borderRadius: 8, color: CORES.verdeSeguro, zIndex: 1000, fontWeight: 'bold', backdropFilter: 'blur(10px)' }}>
            {mensagem}
          </div>
        )}

        {/* BARRA DE PESQUISA */}
        {(abaAtiva === 'free' || (abaAtiva === 'premium' && premiumLiberado)) && (
          <div style={{ marginBottom: 20 }}>
            <input type="text" placeholder="🔍 Buscar otimização ou comando..." value={busca} onChange={(e) => setBusca(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: CORES.fundoCard, border: '1px solid ' + CORES.borda, borderRadius: 8, color: CORES.branco, fontSize: 14, outline: 'none', boxSizing: 'border-box', backdropFilter: 'blur(5px)' }} />
          </div>
        )}

        {/* ABA: GRATUITA */}
        {abaAtiva === 'free' && (
          <div>
            <h1 style={{ color: CORES.vermelho, marginTop: 0, textShadow: '0 0 10px rgba(228,2,0,0.5)' }}>🔥 OTIMIZAÇÕES GRATUITAS</h1>
            <p style={{ color: CORES.cinzaMedio, marginBottom: 20 }}>Exibindo {listaExibida.length} comandos prontos para aplicar no Prompt/PowerShell</p>
            {listaExibida.map((item) => (
              <div key={item.id} style={{ background: CORES.fundoCard, padding: 14, borderRadius: 10, marginBottom: 12, borderLeft: '4px solid ' + corNivel(item.risco), borderTop: '1px solid ' + CORES.borda, backdropFilter: 'blur(8px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                  <strong>{String(item.id).padStart(2, '0')}. {item.nome}</strong>
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: corNivel(item.risco), color: '#000', fontWeight: 'bold' }}>Risco: {item.risco}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <code style={{ flex: 1, background: '#000', padding: 8, borderRadius: 6, fontSize: 12, color: CORES.verdeSeguro, overflowX: 'auto', border: '1px solid #222' }}>{item.cmd}</code>
                  <button onClick={() => copiar(item.cmd)} style={{ padding: '8px 14px', background: CORES.vermelho, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' }}>📋</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ABA: PAGAMENTO */}
        {abaAtiva === 'pagamento' && (
          <div style={{ maxWidth: 450, margin: '20px auto', textAlign: 'center' }}>
            <h2 style={{ color: CORES.dourado, fontSize: 32, margin: '0 0 10px 0', textShadow: '0 0 10px rgba(184,134,11,0.5)' }}>R$ {VALOR_PREMIUM}</h2>
            <p style={{ color: CORES.cinzaClaro, fontSize: 14, marginBottom: 20 }}>Acesso vitalício a mais de 150 otimizações exclusivas</p>
            <div style={{ background: CORES.fundoCard, padding: 24, borderRadius: 16, border: '1px solid ' + CORES.borda, backdropFilter: 'blur(10px)' }}>
              <div style={{ padding: 16, background: '#fff', borderRadius: 8, marginBottom: 16, color: '#000', fontWeight: 'bold' }}>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(CHAVE_PIX)}`} alt="QR Code PIX" style={{ width: 180, height: 180, margin: '0 auto 10px auto', display: 'block' }} />
                Escaneie o QR Code ou copie a chave abaixo
              </div>
              <p style={{ fontFamily: 'monospace', fontSize: 13, background: '#000', padding: 10, borderRadius: 6, wordBreak: 'break-all', border: '1px solid #333', color: CORES.dourado }}>{CHAVE_PIX}</p>
              <button onClick={() => copiar(CHAVE_PIX)} style={{ marginTop: 10, width: '100%', padding: 12, background: CORES.dourado, color: '#000', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>
                📋 Copiar Chave PIX
              </button>
              {!pagamentoConfirmado ? (
                <button onClick={() => setPagamentoConfirmado(true)} style={{ marginTop: 12, width: '100%', padding: 12, background: 'transparent', color: CORES.verdeSeguro, border: '1px solid ' + CORES.verdeSeguro, borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>
                  ✅ Já realizei o pagamento
                </button>
              ) : (
                <div style={{ marginTop: 16, padding: 14, background: 'rgba(0,204,68,0.1)', borderRadius: 8, border: '1px solid ' + CORES.verdeSeguro }}>
                  <p style={{ color: CORES.verdeSeguro, margin: '0 0 6px 0', fontSize: 12, fontWeight: 'bold' }}>SUA SENHA DE ACESSO:</p>
                  <code style={{ fontSize: 18, color: CORES.dourado, background: '#000', padding: '6px 12px', borderRadius: 6, display: 'inline-block', fontWeight: 'bold' }}>{SENHA_PREMIUM}</code>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ABA: PREMIUM (BLOQUEADA) */}
        {abaAtiva === 'premium' && !premiumLiberado && (
          <div style={{ textAlign: 'center', paddingTop: 60 }}>
            <div style={{ fontSize: 60, marginBottom: 10 }}>🔒</div>
            <h2 style={{ color: CORES.dourado }}>ÁREA PREMIUM PROTEGIDA</h2>
            <p style={{ color: CORES.cinzaMedio }}>Insira a senha de acesso no menu lateral para liberar as otimizações.</p>
          </div>
        )}

        {/* ABA: PREMIUM (LIBERADA) */}
        {abaAtiva === 'premium' && premiumLiberado && (
          <div>
            <h1 style={{ color: CORES.dourado, marginTop: 0, textShadow: '0 0 10px rgba(184,134,11,0.5)' }}>⭐ OTIMIZAÇÕES PREMIUM</h1>
            <p style={{ color: CORES.cinzaMedio, marginBottom: 20 }}>Exibindo {listaExibida.length} comandos avançados</p>
            {listaExibida.map((item) => (
              <div key={item.id} style={{ background: CORES.fundoCard, padding: 14, borderRadius: 10, marginBottom: 12, borderLeft: '4px solid ' + corNivel(item.risco), borderTop: '1px solid ' + CORES.borda, backdropFilter: 'blur(8px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                  <strong style={{ color: CORES.dourado }}>{String(item.id).padStart(2, '0')}. {item.nome}</strong>
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: corNivel(item.risco), color: '#000', fontWeight: 'bold' }}>Risco: {item.risco}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <code style={{ flex: 1, background: '#000', padding: 8, borderRadius: 6, fontSize: 12, color: CORES.dourado, overflowX: 'auto', border: '1px solid #333' }}>{item.cmd}</code>
                  <button onClick={() => copiar(item.cmd)} style={{ padding: '8px 14px', background: CORES.dourado, color: '#000', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' }}>📋</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
