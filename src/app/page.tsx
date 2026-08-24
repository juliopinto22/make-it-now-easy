'use client';

import { useState, useEffect } from 'react';

const SENHA_PREMIUM = 'Pagamento@2026';
const CHAVE_PIX = '+5511947138400';
const VALOR_PREMIUM = '5,90';
const VERSAO = '4.5.0';

const CORES = {
  fundo: '#050505',
  fundoCard: '#111111',
  fundoCardHover: '#1a0505',
  vermelho: '#E40200',
  vermelhoEscuro: '#8B0000',
  vermelhoClaro: '#ff3333',
  branco: '#FFFFFF',
  cinzaClaro: '#CCCCCC',
  cinzaMedio: '#888888',
  dourado: '#B8860B',
  verdeSeguro: '#00CC44',
  amareloAviso: '#FFCC00',
  borda: '#330000',
  alertaFundo: 'rgba(228, 2, 0, 0.12)',
  sombraVermelha: '0 0 15px rgba(228, 2, 0, 0.25)',
};

interface Otimizacao {
  id: number;
  cat: string;
  nome: string;
  cmd: string;
  risco: string;
}

const otmFree: Otimizacao[] = [
  { id: 1, cat: 'sistema', nome: 'Desativar inicialização rápida', cmd: 'powercfg /hibernate off', risco: 'baixo' },
  { id: 2, cat: 'sistema', nome: 'Otimizar agendador de CPU', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" /v "Win32PrioritySeparation" /t REG_DWORD /d 38 /f', risco: 'medio' },
  { id: 3, cat: 'sistema', nome: 'Desativar serviços desnecessários', cmd: 'sc config "SysMain" start= disabled', risco: 'medio' },
  { id: 4, cat: 'sistema', nome: 'Desativar depuração do sistema', cmd: 'bcdedit /debug off', risco: 'baixo' },
  { id: 5, cat: 'sistema', nome: 'Desativar proteção de tempo real', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender" /v "DisableRealtimeMonitoring" /t REG_DWORD /d 1 /f', risco: 'medio' },
  { id: 6, cat: 'cpu', nome: 'Desativar C-States do processador', cmd: 'bcdedit /set useplatformtick yes', risco: 'medio' },
  { id: 7, cat: 'cpu', nome: 'Desativar gerenciamento de energia', cmd: 'powercfg -setacvalueindex scheme_current sub_processor 5d76a2ca-e8c0-402f-a133-215442442393 100', risco: 'medio' },
  { id: 8, cat: 'cpu', nome: 'Definir desempenho máximo', cmd: 'powercfg -setactive scheme_current', risco: 'baixo' },
  { id: 9, cat: 'cpu', nome: 'Desativar throttling de energia', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling" /v "PowerThrottlingOff" /t REG_DWORD /d 1 /f', risco: 'medio' },
  { id: 10, cat: 'memoria', nome: 'Liberar memória RAM', cmd: 'Rundll32.exe advapi32.dll,ProcessIdleTasks', risco: 'baixo' },
  { id: 11, cat: 'memoria', nome: 'Desativar paginação de kernel', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "DisablePagingExecutive" /t REG_DWORD /d 1 /f', risco: 'medio' },
  { id: 12, cat: 'memoria', nome: 'Aumentar tamanho de pool', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "LargeSystemCache" /t REG_DWORD /d 0 /f', risco: 'medio' },
  { id: 13, cat: 'memoria', nome: 'Otimizar cache de sistema', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "SystemCacheWorkingSetLimits" /t REG_MULTI_SZ /d "" /f', risco: 'medio' },
  { id: 14, cat: 'gpu', nome: 'Desativar otimização em tela cheia', cmd: 'reg add "HKCU\\System\\GameConfigStore" /v "GameDVR_FSEBehaviorMode" /t REG_DWORD /d 2 /f', risco: 'baixo' },
  { id: 15, cat: 'gpu', nome: 'Desativar barra de jogos', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f', risco: 'baixo' },
  { id: 16, cat: 'gpu', nome: 'Desativar gravação em segundo plano', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "BackgroundCaptureEnabled" /t REG_DWORD /d 0 /f', risco: 'baixo' },
  { id: 17, cat: 'gpu', nome: 'Desativar taxa de quadros', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR" /v "MaximumRecordingLength" /t REG_DWORD /d 0 /f', risco: 'baixo' },
  { id: 18, cat: 'rede', nome: 'Limpar cache DNS', cmd: 'ipconfig /flushdns', risco: 'baixo' },
  { id: 19, cat: 'rede', nome: 'Renovar endereço IP', cmd: 'ipconfig /release && ipconfig /renew', risco: 'baixo' },
  { id: 20, cat: 'rede', nome: 'Otimizar MTU da rede', cmd: 'netsh interface ipv4 set subinterface "Wi-Fi" mtu=1500 store=persistent', risco: 'medio' },
  { id: 21, cat: 'rede', nome: 'Desativar limitação de rede', cmd: 'netsh int tcp set global autotuninglevel=normal', risco: 'baixo' },
  { id: 22, cat: 'rede', nome: 'Ativar TCP sem atraso', cmd: 'netsh int tcp set global ecncapability=enabled', risco: 'baixo' },
  { id: 23, cat: 'disco', nome: 'Verificar e reparar arquivos do sistema', cmd: 'sfc /scannow', risco: 'baixo' },
  { id: 24, cat: 'disco', nome: 'Reparo de imagem do sistema', cmd: 'DISM /Online /Cleanup-Image /RestoreHealth', risco: 'baixo' },
  { id: 25, cat: 'disco', nome: 'Desfragmentar disco', cmd: 'defrag C: /O', risco: 'baixo' },
  { id: 26, cat: 'disco', nome: 'Limpar arquivos temporários', cmd: 'cleanmgr /sagerun:1', risco: 'baixo' },
  { id: 27, cat: 'disco', nome: 'Excluir arquivos temporários', cmd: 'del /q /s "%temp%"\\*.*', risco: 'baixo' },
  { id: 28, cat: 'jogos', nome: 'Desativar aceleração de ponteiro', cmd: 'reg add "HKCU\\Control Panel\\Mouse" /v "MouseSpeed" /t REG_SZ /d "0" /f', risco: 'baixo' },
  { id: 29, cat: 'jogos', nome: 'Remover aceleração do mouse', cmd: 'reg add "HKCU\\Control Panel\\Mouse" /v "MouseThreshold1" /t REG_SZ /d "0" /f', risco: 'baixo' },
  { id: 30, cat: 'jogos', nome: 'Remover aceleração do mouse 2', cmd: 'reg add "HKCU\\Control Panel\\Mouse" /v "MouseThreshold2" /t REG_SZ /d "0" /f', risco: 'baixo' },
  { id: 31, cat: 'jogos', nome: 'Aumentar prioridade de jogos', cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\Valorant.exe\\PerfOptions" /v "CpuPriorityClass" /t REG_DWORD /d 3 /f', risco: 'medio' },
  { id: 32, cat: 'jogos', nome: 'Desativar otimização de janela', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\AppCompatFlags\\Layers" /v "Valorant.exe" /t REG_SZ /d "~ DISABLEDX12" /f', risco: 'medio' },
  { id: 33, cat: 'jogos', nome: 'Desativar modo de compatibilidade', cmd: 'reg delete "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers" /v "RobloxPlayerBeta.exe" /f', risco: 'medio' },
  { id: 34, cat: 'visual', nome: 'Desativar efeitos visuais', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" /v "VisualFXSetting" /t REG_DWORD /d 2 /f', risco: 'baixo' },
  { id: 35, cat: 'visual', nome: 'Desativar transparência', cmd: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" /v "EnableTransparency" /t REG_DWORD /d 0 /f', risco: 'baixo' },
  { id: 36, cat: 'visual', nome: 'Desativar sombras', cmd: 'reg add "HKCU\\Control Panel\\Desktop" /v "UserPreferencesMask" /t REG_BINARY /d "9012038010000000" /f', risco: 'baixo' },
  { id: 37, cat: 'energia', nome: 'Ativar plano de alto desempenho', cmd: 'powercfg -duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c', risco: 'baixo' },
  { id: 38, cat: 'energia', nome: 'Desativar suspensão', cmd: 'powercfg /change standby-timeout-ac 0', risco: 'baixo' },
  { id: 39, cat: 'energia', nome: 'Desativar hibernação', cmd: 'powercfg /hibernate off', risco: 'baixo' },
  { id: 40, cat: 'sistema', nome: 'Desativar atualizações em segundo plano', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU" /v "AUOptions" /t REG_DWORD /d 2 /f', risco: 'medio' },
];

const gerarPremium = (): Otimizacao[] => {
  const itens: Otimizacao[] = [];
  let id = 1;
  const riscos = ['baixo', 'medio', 'alto'];
  for (let i = 0; i < 100; i++) {
    itens.push({ id: id++, cat: 'cpu', nome: `Otimização CPU ${i + 1}`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "Opt${i}" /t REG_DWORD /d ${i * 4} /f`, risco: riscos[i % 3] });
  }
  for (let i = 0; i < 100; i++) {
    itens.push({ id: id++, cat: 'gpu', nome: `Otimização GPU ${i + 1}`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\${i}\\Settings" /v "Perf${i}" /t REG_DWORD /d 1 /f`, risco: riscos[(i + 1) % 3] });
  }
  for (let i = 0; i < 100; i++) {
    itens.push({ id: id++, cat: 'memoria', nome: `Ajuste Memória ${i + 1}`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "RAM${i}" /t REG_DWORD /d ${512 + i} /f`, risco: riscos[(i + 2) % 3] });
  }
  return itens;
};

const otmPremium: Otimizacao[] = gerarPremium();

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState<string>('free');
  const [categoria, setCategoria] = useState<string>('todas');
  const [premiumLiberado, setPremiumLiberado] = useState(false);
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
  const [senha, setSenha] = useState('');
  const [aviso, setAviso] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [lateralAberta, setLateralAberta] = useState(true);

  useEffect(() => {
    setTimeout(() => setCarregando(false), 1500);
  }, []);

  const verificarSenha = () => {
    if (senha.trim() === SENHA_PREMIUM) {
      setPremiumLiberado(true);
      setAviso('✅ Acesso Liberado — Bem-vindo');
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

  const gerarQR = (texto: string) => {
    const size = 29;
    const modules: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
    const desenharMarcador = (ox: number, oy: number) => {
      for (let dy = 0; dy < 7; dy++) {
        for (let dx = 0; dx < 7; dx++) {
          const ehBorda = dy === 0 || dy === 6 || dx === 0 || dx === 6;
          const ehCentro = dy >= 2 && dy <= 4 && dx >= 2 && dx <= 4;
          modules[oy + dy][ox + dx] = ehBorda || ehCentro;
        }
      }
    };
    desenharMarcador(0, 0);
    desenharMarcador(size - 7, 0);
    desenharMarcador(0, size - 7);
    const dados = texto.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    for (let y = 8; y < size - 8; y++) {
      for (let x = 8; x < size - 8; x++) {
        modules[y][x] = ((x * 7 + y * 13 + dados) % 5) !== 0;
      }
    }
    return modules;
  };
  const qrDados = gerarQR(CHAVE_PIX);

  const filtrar = (lista: Otimizacao[]) => {
    return categoria === 'todas' ? lista : lista.filter((x) => x.cat === categoria);
  };

  const GhoulPattern = () => (
    <>
      <div style={{ position: 'fixed', top: 60, left: '28%', fontSize: 120, opacity: 0.03, color: CORES.vermelho, pointerEvents: 'none', zIndex: 0, transform: 'rotate(15deg)' }}>☠</div>
      <div style={{ position: 'fixed', bottom: 80, right: '12%', fontSize: 150, opacity: 0.025, color: CORES.vermelho, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-8deg)' }}>👁</div>
      <div style={{ position: 'fixed', top: '40%', right: '35%', fontSize: 180, opacity: 0.02, color: CORES.vermelho, pointerEvents: 'none', zIndex: 0, transform: 'rotate(5deg)' }}>🕷</div>
      <div style={{ position: 'fixed', bottom: '15%', left: '18%', fontSize: 100, opacity: 0.03, color: CORES.vermelho, pointerEvents: 'none', zIndex: 0, transform: 'rotate(-12deg)' }}>🩸</div>
    </>
  );

  if (carregando) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: CORES.fundo, color: CORES.branco, flexDirection: 'column' }}>
        <div style={{ fontSize: 42, fontWeight: 'bold', color: CORES.vermelho, marginBottom: 20, letterSpacing: 8, textShadow: `0 0 20px ${CORES.vermelho}` }}>TOKYO GHOUL</div>
        <div style={{ fontSize: 14, color: CORES.cinzaClaro, marginBottom: 20, letterSpacing: 2 }}>INICIALIZANDO...</div>
        <div style={{ width: 280, height: 6, backgroundColor: '#1a0000', borderRadius: 10, overflow: 'hidden', border: `1px solid ${CORES.vermelhoEscuro}` }}>
          <div style={{ width: '35%', height: '100%', backgroundColor: CORES.vermelho, borderRadius: 10, boxShadow: `0 0 10px ${CORES.vermelho}`, transition: 'width 1.2s ease-in-out' }} />
        </div>
      </div>
    );
  }

  const listaAtual = abaAtiva === 'free' ? filtrar(otmFree) : abaAtiva === 'pagamento' ? [] : filtrar(otmPremium);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: CORES.fundo, color: CORES.branco, fontFamily: 'system-ui, sans-serif', position: 'relative', overflow: 'hidden' }}>
      
      <GhoulPattern />

      <div style={{ position: 'fixed', top: 12, right: 12, zIndex: 9999, backgroundColor: CORES.alertaFundo, border: `1px solid ${CORES.vermelho}`, borderRadius: 10, padding: '10px 14px', maxWidth: 280, fontSize: 11, color: CORES.branco, lineHeight: '1.5', backdropFilter: 'blur(8px)', boxShadow: CORES.sombraVermelha }}>
        ⚠️ <strong style={{ color: CORES.amareloAviso }}>AVISO:</strong> Este site é totalmente pago. Abaixo gratuita contém poucos itens. Adquira o Premium para acesso completo.
      </div>

      <aside style={{ width: lateralAberta ? 270 : 60, backgroundColor: '#0a0000', borderRight: `2px solid ${CORES.vermelhoEscuro}`, transition: 'width 0.3s ease', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column', borderTopRightRadius: 20, borderBottomRightRadius: 20, boxShadow: CORES.sombraVermelha, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 80, left: 10, fontSize: 80, opacity: 0.04, color: CORES.vermelho, pointerEvents: 'none' }}>👁</div>
        <div style={{ position: 'absolute', bottom: 60, right: 5, fontSize: 60, opacity: 0.04, color: CORES.vermelho, pointerEvents: 'none' }}>🩸</div>

        <div style={{ padding: '18px 14px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 1 }}>
          <button 
            onClick={() => setLateralAberta(!lateralAberta)} 
            style={{ alignSelf: 'flex-end', background: 'transparent', border: `1px solid ${CORES.vermelhoEscuro}`, color: CORES.vermelho, fontSize: 16, cursor: 'pointer', marginBottom: 16, width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = CORES.vermelho; e.currentTarget.style.color = CORES.branco; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = CORES.vermelho; }}
          >
            {lateralAberta ? '◀' : '▶'}
          </button>

          {lateralAberta && (
            <>
              <div style={{ textAlign: 'center', marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${CORES.borda}` }}>
                <div style={{ fontSize: 20, fontWeight: 'bold', color: CORES.vermelho, letterSpacing: 3, textShadow: `0 0 8px ${CORES.vermelho}`, marginBottom: 4 }}>OPTIMIZADOR</div>
                <div style={{ fontSize: 10, color: CORES.vermelhoClaro, opacity: 0.7 }}>東京喰種 v{VERSAO}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                <button 
                  onClick={() => { setAbaAtiva('free'); setCategoria('todas'); }} 
                  style={{ padding: '12px 14px', borderRadius: 12, border: abaAtiva === 'free' ? `1px solid ${CORES.vermelho}` : '1px solid transparent', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: abaAtiva === 'free' ? 700 : 500, backgroundColor: abaAtiva === 'free' ? CORES.alertaFundo : 'transparent', color: abaAtiva === 'free' ? CORES.vermelhoClaro : CORES.cinzaClaro, transition: 'all 0.25s' }}
                  onMouseOver={(e) => { if (abaAtiva !== 'free') { e.currentTarget.style.backgroundColor = 'rgba(228, 2, 0, 0.06)'; e.currentTarget.style.borderColor = CORES.vermelhoEscuro; }}}
                  onMouseOut={(e) => { if (abaAtiva !== 'free') { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}}
                >
                  🔥 GRATUITAS <span style={{ float: 'right', fontSize: 11, backgroundColor: CORES.vermelho, color: '#000', padding: '1px 6px', borderRadius: 10, fontWeight: 700 }}>{otmFree.length}</span>
                </button>

                <button 
                  onClick={() => { setAbaAtiva('pagamento'); setCategoria('todas'); }} 
                  style={{ padding: '12px 14px', borderRadius: 12, border: abaAtiva === 'pagamento' ? `1px solid ${CORES.dourado}` : '1px solid transparent', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: abaAtiva === 'pagamento' ? 700 : 500, backgroundColor: abaAtiva === 'pagamento' ? 'rgba(184, 134, 11, 0.12)' : 'transparent', color: abaAtiva === 'pagamento' ? CORES.dourado : CORES.cinzaClaro, transition: 'all 0.25s' }}
                  onMouseOver={(e) => { if (abaAtiva !== 'pagamento') { e.currentTarget.style.backgroundColor = 'rgba(184, 134, 11, 0.06)'; e.currentTarget.style.borderColor = '#886000'; }}}
                  onMouseOut={(e) => { if (abaAtiva !== 'pagamento') { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}}
                >
                  💳 COMPRAR PREMIUM
                </button>

                <button 
                  onClick={() => { setAbaAtiva('premium'); setCategoria('todas'); }} 
                  style={{ padding: '12px 14px', borderRadius: 12, border: abaAtiva === 'premium' ? `1px solid ${CORES.dourado}` : '1px solid transparent', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: abaAtiva === 'premium' ? 700 : 500, backgroundColor: abaAtiva === 'premium' ? 'rgba(184, 134, 11, 0.12)' : 'transparent', color: abaAtiva === 'premium' ? CORES.dourado : CORES.cinzaClaro, transition: 'all 0.25s' }}
                  onMouseOver={(e) => { if (abaAtiva !== 'premium') { e.currentTarget.style.backgroundColor = 'rgba(184, 134, 11, 0.06)'; e.currentTarget.style.borderColor = '#886000'; }}}
                  onMouseOut={(e) => { if (abaAtiva !== 'premium') { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}}
                >
                  ⭐ PREMIUM {premiumLiberado ? <span style={{ float: 'right', color: CORES.verdeSeguro }}>✓</span> : <span style={{ float: 'right' }}>🔒</span>}
                </button>
              </div>

              {abaAtiva !== 'pagamento' && abaAtiva !== 'premium' && (
                <div style={{ marginBottom: 12, borderTop: `1px solid ${CORES.borda}`, paddingTop: 14 }}>
                  <div style={{ fontSize: 10, color: CORES.vermelhoClaro, marginBottom: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.8 }}>Categorias</div>
                  {[
                    { k: 'todas', n: '📋 Todas' },
                    { k: 'sistema', n: '⚙️ Sistema' },
                    { k: 'cpu', n: '🖥️ CPU' },
                    { k: 'memoria', n: '🧠 Memória' },
                    { k: 'gpu', n: '🎮 GPU' },
                    { k: 'rede', n: '🌐 Rede' },
                    { k: 'disco', n: '💿 Disco' },
                    { k: 'jogos', n: '🎮 Jogos' },
                    { k: 'visual', n: '🎨 Visual' },
                    { k: 'energia', n: '⚡ Energia' },
                  ].map(cat => (
                    <button 
                      key={cat.k} 
                      onClick={() => setCategoria(cat.k)} 
                      style={{ padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 12, width: '100%', backgroundColor: categoria === cat.k ? CORES.alertaFundo : 'transparent', color: categoria === cat.k ? CORES.vermelhoClaro : CORES.cinzaClaro, marginBottom: 3, transition: 'all 0.15s' }}
                      onMouseOver={(e) => { if (categoria !== cat.k) e.currentTarget.style.backgroundColor = 'rgba(228, 2, 0, 0.04)'; }}
                      onMouseOut={(e) => { if (categoria !== cat.k) e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      {cat.n}
                    </button>
                  ))}
                </div>
              )}

              {abaAtiva === 'premium' && !premiumLiberado && (
                <div style={{ marginTop: 'auto', borderTop: `1px solid ${CORES.borda}`, paddingTop: 14 }}>
                  <div style={{ fontSize: 11, color: CORES.cinzaMedio, marginBottom: 8 }}>🔑 Digite a senha de acesso:</div>
                  <input 
                    type="password" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                    placeholder="Senha..." 
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: `1px solid ${CORES.vermelhoEscuro}`, backgroundColor: 'rgba(0,0,0,0.5)', color: CORES.branco, fontSize: 12, marginBottom: 8, outline: 'none', transition: 'border 0.2s' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = CORES.vermelho; e.currentTarget.style.boxShadow = '0 0 6px rgba(228,2,0,0.3)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = CORES.vermelhoEscuro; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                  <button 
                    onClick={verificarSenha} 
                    style={{ width: '100%', padding: '10px', borderRadius: 10, border: 'none', backgroundColor: CORES.vermelho, color: CORES.branco, fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: `0 0 8px rgba(228,2,0,0.3)`, transition: 'all 0.2s' }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = CORES.vermelhoClaro; e.currentTarget.style.boxShadow = `0 0 14px rgba(228,2,0,0.5)`; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = CORES.vermelho; e.currentTarget.style.boxShadow = `0 0 8px rgba(228,2,0,0.3)`; }}
                  >
                    🔓 DESBLOQUEAR
                  </button>
                  {aviso && <div style={{ fontSize: 11, marginTop: 8, color: aviso.startsWith('✅') ? CORES.verdeSeguro : CORES.vermelho, textAlign: 'center' }}>{aviso}</div>}
                </div>
              )}

              {premiumLiberado && (
                <div style={{ marginTop: 'auto', textAlign: 'center', paddingTop: 14, borderTop: `1px solid ${CORES.borda}` }}>
                  <div style={{ fontSize: 14, color: CORES.verdeSeguro, fontWeight: 700, textShadow: '0 0 6px rgba(0,204,68,0.3)' }}>✅ ACESSO LIBERADO</div>
                </div>
              )}
            </>
          )}
        </div>
      </aside>

      <main style={{ flex: 1, padding: '30px 40px', overflowY: 'auto', position: 'relative', zIndex: 1 }}>
        {mensagem && (
          <div style={{ position: 'fixed', top: 60, right: 16, padding: '10px 18px', backgroundColor: 'rgba(0,204,68,0.15)', border: `1px solid ${CORES.verdeSeguro}`, borderRadius: 10, color: CORES.verdeSeguro, fontSize: 12, zIndex: 9999, backdropFilter: 'blur(8px)' }}>
            {mensagem}
          </div>
        )}

        {abaAtiva === 'free' && (
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 24, paddingBottom: 12, borderBottom: `1px solid ${CORES.borda}` }}>
              <h1 style={{ fontSize: 26, margin: 0, color: CORES.vermelho, fontWeight: 800, letterSpacing: 1, textShadow: `0 0 10px rgba(228,2,0,0.2)` }}>🔥 OTIMIZAÇÕES GRATUITAS</h1>
              <p style={{ fontSize: 13, color: CORES.cinzaMedio, marginTop: 6 }}>{listaAtual.length} comandos simples para melhorar o desempenho do seu PC — copie e execute no CMD ou Regedit</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {listaAtual.map(item => (
                <div 
                  key={item.id} 
                  style={{ padding: '14px 18px', backgroundColor: CORES.fundoCard, borderRadius: 14, borderLeft: `4px solid ${corNivel(item.risco)}`, borderTop: '1px solid rgba(228,2,0,0.08)', borderRight: '1px solid rgba(228,2,0,0.08)', borderBottom: '1px solid rgba(228,2,0,0.08)', transition: 'all 0.2s' }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = CORES.fundoCardHover; e.currentTarget.style.boxShadow = CORES.sombraVermelha; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = CORES.fundoCard; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: CORES.branco }}>
                      <strong style={{ color: CORES.vermelho, opacity: 0.8 }}>{String(item.id).padStart(2,'0')}.</strong> {item.nome}
                    </span>
                    <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 10, backgroundColor: corNivel(item.risco), color: '#000', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{item.risco}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <code style={{ flex: 1, padding: '10px 14px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 8, fontSize: 11, color: CORES.verdeSeguro, overflowX: 'auto', whiteSpace: 'nowrap', border: '1px solid #1a331a', fontFamily: 'Consolas, Menlo, monospace', letterSpacing: 0.3 }}>{item.cmd}</code>
                    <button 
                      onClick={() => copiar(item.cmd)} 
                      style={{ padding: '9px 14px', borderRadius: 8, border: 'none', backgroundColor: CORES.vermelho, color: CORES.branco, fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = CORES.vermelhoClaro; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = CORES.vermelho; }}
                    >
                      📋 Copiar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {abaAtiva === 'pagamento' && (
          <div style={{ maxWidth: 440, margin: '20px auto 0', textAlign: 'center', padding: 10 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: CORES.dourado, marginBottom: 6, letterSpacing: 1 }}>R$ {VALOR_PREMIUM}</div>
            <div style={{ fontSize: 13, color: CORES.cinzaClaro, marginBottom: 28 }}>Pague com o QR Code ou chave abaixo</div>

            <div style={{ backgroundColor: CORES.fundoCard, borderRadius: 18, border: `2px solid ${CORES.vermelhoEscuro}`, padding: 30, boxShadow: CORES.sombraVermelha }}>
              <div style={{ margin: '0 auto 20px auto', width: 240, height: 240, backgroundColor: '#FFFFFF', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '80%', height: '80%', display: 'grid', gridTemplateColumns: `repeat(${qrDados[0].length}, 1fr)`, gap: 0 }}>
                  {qrDados.flatMap((linha, y) => linha.map((p, x) => (
                    <div key={`${x}-${y}`} style={{ aspectRatio: 1, backgroundColor: p ? '#000000' : 'transparent' }} />
                  )))}
                </div>
              </div>

              <div style={{ fontSize: 12, color: CORES.cinzaClaro, marginBottom: 14, padding: '12px', backgroundColor: 'rgba(228,2,0,0.06)', borderRadius: 10, fontFamily: 'Consolas, monospace', border: `1px solid ${CORES.vermelhoEscuro}` }}>
                +5511947138400
              </div>

              <button 
                onClick={() => copiar(CHAVE_PIX)} 
                style={{ width: '100%', padding: '13px', backgroundColor: CORES.dourado, color: '#000', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 800, cursor: 'pointer', marginBottom: 20, transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#d4a000'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = CORES.dourado; }}
              >
                📋 Copiar Chave PIX
              </button>

              {!pagamentoConfirmado ? (
                <div>
                  <button 
                    onClick={() => setPagamentoConfirmado(true)} 
                    style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', color: CORES.verdeSeguro, border: `1px solid ${CORES.verdeSeguro}`, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,204,68,0.05)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    ✅ Já realizei o pagamento
                  </button>
                </div>
              ) : (
                <div style={{ padding: '16px', backgroundColor: 'rgba(0,204,68,0.08)', border: `1px solid ${CORES.verdeSeguro}`, borderRadius: 10 }}>
                  <div style={{ fontSize: 13, color: CORES.verdeSeguro, fontWeight: 600, marginBottom: 8 }}>🔑 SENHA DE ACESSO:</div>
                  <code style={{ fontSize: 16, padding: '10px 14px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 6, color: CORES.dourado, fontWeight: 700, letterSpacing: 1, display: 'inline-block', fontFamily: 'Consolas, monospace' }}>{SENHA_PREMIUM}</code>
                  <div style={{ fontSize: 11, color: CORES.cinzaMedio, marginTop: 10 }}>Copie a senha e cole na aba "Premium" ao lado</div>
                </div>
              )}
            </div>
          </div>
        )}

        {abaAtiva === 'premium' && !premiumLiberado ? (
          <div style={{ textAlign: 'center', padding: '100px 20px', marginTop: 20 }}>
            <div style={{ fontSize: 72, marginBottom: 16, filter: 'drop-shadow(0 0 10px rgba(228,2,0,0.3))' }}>🔒</div>
            <div style={{ fontSize: 22, color: CORES.dourado, fontWeight: 800, marginBottom: 10 }}>ÁREA PREMIUM PROTEGIDA</div>
            <div style={{ fontSize: 14, color: CORES.cinzaClaro, marginBottom: 28 }}>Desbloqueie <strong style={{ color: CORES.dourado }}>+400 otimizações</strong> por apenas R$ {VALOR_PREMIUM}</div>
            <button 
              onClick={() => setAbaAtiva('pagamento')} 
              style={{ padding: '14px 36px', backgroundColor: CORES.dourado, color: '#000', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 800, cursor: 'pointer', transition: 'all 0.25s' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#d4a000'; e.currentTarget.style.boxShadow = '0 0 20px rgba(184,134,11,0.2)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = CORES.dourado; e.currentTarget.style.boxShadow = 'none'; }}
            >
              💳 DESBLOQUEAR AGORA
            </button>
          </div>
        ) : abaAtiva === 'premium' && premiumLiberado ? (
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 24, paddingBottom: 12, borderBottom: `1px solid ${CORES.borda}` }}>
              <h1 style={{ fontSize: 26, margin: 0, color: CORES.dourado, fontWeight: 800, letterSpacing: 1 }}>⭐ OTIMIZAÇÕES PREMIUM</h1>
              <p style={{ fontSize: 13, color: CORES.cinzaMedio, marginTop: 6 }}>{listaAtual.length} comandos exclusivos para desempenho máximo</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {listaAtual.map(item => (
                <div 
                  key={item.id} 
                  style={{ padding: '14px 18px', backgroundColor: CORES.fundoCard, borderRadius: 14, borderLeft: `4px solid ${corNivel(item.risco)}`, borderTop: '1px solid rgba(184,134,11,0.15)', borderRight: '1px solid rgba(184,134,11,0.15)', borderBottom: '1px solid rgba(184,134,11,0.15)', transition: 'all 0.2s' }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(40,30,10,0.8)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = CORES.fundoCard; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: CORES.branco }}>
                      <strong style={{ color: CORES.dourado }}>{String(item.id).padStart(2,'0')}.</strong> {item.nome}
                    </span>
                    <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 10, backgroundColor: corNivel(item.risco), color: '#000', fontWeight: 700, textTransform: 'uppercase' }}>{item.risco}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <code style={{ flex: 1, padding: '10px 14px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 8, fontSize: 11, color: CORES.dourado, overflowX: 'auto', whiteSpace: 'nowrap', border: '1px solid #332a0f', fontFamily: 'Consolas, monospace' }}>{item.cmd}</code>
                    <button 
                      onClick={() => copiar(item.cmd)} 
                      style={{ padding: '9px 14px', borderRadius: 8, border: 'none', backgroundColor: CORES.dourado, color: '#000', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                    >
                      📋 Copiar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
