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

const otmFree = [
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

const gerarPremium = () => {
  const itens = [];
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

const otmPremium = gerarPremium();

export default function Page() {
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

  const copiar = (texto) => {
    navigator.clipboard.writeText(texto);
    setMensagem('✅ Copiado!');
    setTimeout(() => setMensagem(''), 2500);
  };

  const corNivel = (nivel) => {
    switch (nivel) {
      case 'baixo': return CORES.verdeSeguro;
      case 'medio': return CORES.amareloAviso;
      case 'alto': return CORES.vermelho;
      default: return CORES.cinzaMedio;
    }
  };

  const gerarQR = (texto) => {
    const size = 29;
    const modules = Array.from({ length: size }, () => Array(size).fill(false));
    const desenharMarcador = (ox, oy) => {
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
        modules[y][x] = ((x * 7 + y * 13 + dados) % 3 + dados) % 5) !== 0;
      }
    }
    return modules;
  };
  const qrDados = gerarQR(CHAVE_PIX);

  const filtrar = (lista) => {
    return categoria === 'todas' ? lista : lista.filter((x) => x.cat === categoria);
  };

  if (carregando) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: CORES.fundo, color: CORES.branco, flexDirection: 'column' }}>
        <div style={{ fontSize: 42, fontWeight: 'bold', color: CORES.vermelho, marginBottom: 20, letterSpacing: 8 }}>TOKYO GHOUL</div>
        <div style={{ fontSize: 14, color: CORES.cinzaClaro, marginBottom: 20 }}>INICIALIZANDO...</div>
        <div style={{ width: 280, height: 6, backgroundColor: '#1a0000', borderRadius: 10, border: `1px solid ${CORES.vermelhoEscuro}` }}>
          <div style={{ width: '35%', height: '100%', backgroundColor: CORES.vermelho, borderRadius: 10 }} />
        </div>
      </div>
    );
  }

  const listaAtual = abaAtiva === 'free' ? filtrar(otmFree) : abaAtiva === 'pagamento' ? [] : filtrar(otmPremium);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: CORES.fundo, color: CORES.branco }}>
      
      <div style={{ position: 'fixed', top: 60, left: '28%', fontSize: 120, opacity: 0.03, color: CORES.vermelho, pointerEvents: 'none' }}>☠</div>
      <div style={{ position: 'fixed', bottom: 80, right: '12%', fontSize: 150, opacity: 0.025, color: CORES.vermelho, pointerEvents: 'none' }}>👁</div>

      <aside style={{ width: lateralAberta ? 270 : 60, backgroundColor: '#0a0000', borderRight: `2px solid ${CORES.vermelhoEscuro}`, transition: 'width 0.3s ease', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '18px 14px' }}>
          <button onClick={() => setLateralAberta(!lateralAberta)} style={{ float: 'right', background: 'transparent', border: `1px solid ${CORES.vermelhoEscuro}`, color: CORES.vermelho, width: 32, height: 32, borderRadius: '50%', cursor: 'pointer' }}>
            {lateralAberta ? '◀' : '▶'}
          </button>

          {lateralAberta && (
            <>
              <div style={{ textAlign: 'center', marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${CORES.borda}` }}>
                <div style={{ fontSize: 20, fontWeight: 'bold', color: CORES.vermelho }}>OPTIMIZADOR</div>
                <div style={{ fontSize: 10, color: CORES.vermelhoClaro }}>v{VERSAO}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button onClick={() => { setAbaAtiva('free'); setCategoria('todas'); }} style={{ padding: '10px', background: abaAtiva === 'free' ? CORES.alertaFundo : 'transparent', border: 'none', color: abaAtiva === 'free' ? CORES.vermelhoClaro : CORES.cinzaClaro, borderRadius: 8, cursor: 'pointer' }}>
                  🔥 GRATUITAS ({otmFree.length})
                </button>
                <button onClick={() => setAbaAtiva('pagamento')} style={{ padding: '10px', background: abaAtiva === 'pagamento' ? 'rgba(184,134,11,0.12)' : 'transparent', border: 'none', color: abaAtiva === 'pagamento' ? CORES.dourado : CORES.cinzaClaro, borderRadius: 8, cursor: 'pointer' }}>
                  💳 COMPRAR PREMIUM
                </button>
                <button onClick={() => { setAbaAtiva('premium'); setCategoria('todas'); }} style={{ padding: '10px', background: abaAtiva === 'premium' ? 'rgba(184,134,11,0.12)' : 'transparent', border: 'none', color: abaAtiva === 'premium' ? CORES.dourado : CORES.cinzaClaro, borderRadius: 8, cursor: 'pointer' }}>
                  ⭐ PREMIUM {premiumLiberado ? '✓' : '🔒'}
                </button>
              </div>

              {abaAtiva === 'free' && (
                <div style={{ marginTop: 16, borderTop: `1px solid ${CORES.borda}`, paddingTop: 12 }}>
                  <div style={{ fontSize: 11, color: CORES.vermelhoClaro, marginBottom: 8 }}>Categorias</div>
                  {['todas', 'sistema', 'cpu', 'memoria', 'gpu', 'rede', 'disco', 'jogos', 'visual', 'energia'].map(cat => (
                    <button key={cat} onClick={() => setCategoria(cat)} style={{ padding: '6px 10px', background: categoria === cat ? CORES.alertaFundo : 'transparent', border: 'none', color: categoria === cat ? CORES.vermelhoClaro : CORES.cinzaClaro, borderRadius: 6, cursor: 'pointer', textAlign: 'left', width: '100%', marginBottom: 2 }}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              )}

              {abaAtiva === 'premium' && !premiumLiberado && (
                <div style={{ marginTop: 20, borderTop: `1px solid ${CORES.borda}`, paddingTop: 12 }}>
                  <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha..." style={{ width: '100%', padding: '8px', background: '#000', border: `1px solid ${CORES.vermelhoEscuro}`, borderRadius: 6, color: '#fff' }} />
                  <button onClick={verificarSenha} style={{ marginTop: 8, width: '100%', padding: '8px', background: CORES.vermelho, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>DESBLOQUEAR</button>
                  {aviso && <div style={{ marginTop: 8, fontSize: 12, color: aviso.includes('✅') ? CORES.verdeSeguro : CORES.vermelho }}>{aviso}</div>}
                </div>
              )}
            </>
          )}
        </div>
      </aside>

      <main style={{ flex: 1, padding: 30 }}>
        {mensagem && <div style={{ position: 'fixed style={{ position: 'fixed', top: 20, right: 20, padding: '10px 20px', background: 'rgba(0,204,68,0.2)', border: `1px solid ${CORES.verdeSeguro}`, borderRadius: 8, color: CORES.verdeSeguro }}>{mensagem}</div>}

        {abaAtiva === 'free' && (
          <div>
            <h1 style={{ color: CORES.vermelho }}>🔥 OTIMIZAÇÕES GRATUITAS</h1>
            <p style={{ color: CORES.cinzaMedio, marginBottom: 20 }}>{listaAtual.length} comandos prontos para copiar</p>
            {listaAtual.map(item => (
              <div key={item.id} style={{ background: CORES.fundoCard, padding: 12, borderRadius: 10, marginBottom: 10, borderLeft: `4px solid ${corNivel(item.risco)}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <strong>{String(item.id).padStart(2,'0')}. {item.nome}</strong>
                  <span style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, background: corNivel(item.risco), color: '#000' }}>{item.risco}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <code style={{ flex: 1, background: '#000', padding: 6, borderRadius: 4, fontSize: 11, color: CORES.verdeSeguro, overflowX: 'auto' }}>{item.cmd}</code>
                  <button onClick={() => copiar(item.cmd)} style={{ padding: '6px 10px', background: CORES.vermelho, color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>📋</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {abaAtiva === 'pagamento' && (
          <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: CORES.dourado, fontSize: 32 }}>R$ {VALOR_PREMIUM}</h2>
            <div style={{ background: CORES.fundoCard, padding: 20, borderRadius: 16, marginTop: 20 }}>
              <div style={{ height: 200, background: '#fff', borderRadius: 8, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>QR Code</div>
              <p style={{ fontFamily: 'monospace', fontSize: 12, background: '#000', padding: 8, borderRadius: 4 }}>{CHAVE_PIX}</p>
              <button onClick={() => copiar(CHAVE_PIX)} style={{ marginTop: 10, width: '100%', padding: 10, background: CORES.dourado, color: '#000', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>📋 Copiar PIX</button>
              {!pagamentoConfirmado ? (
                <button onClick={() => setPagamentoConfirmado(true)} style={{ marginTop: 10, width: '100%', padding: 10, background: 'transparent', color: CORES.verdeSeguro, border: `1px solid ${CORES.verdeSeguro}`, borderRadius: 8, cursor: 'pointer' }}>✅ Paguei</button>
              ) : (
                <div style={{ marginTop: 15, padding: 12, background: 'rgba(0,204,68,0.1)', borderRadius: 8, border: `1px solid ${CORES.verdeSeguro}` }}>
                  <p style={{ color: CORES.verdeSeguro, margin: 0 }}>SENHA:</p>
                  <code style={{ fontSize: 16, color: CORES.dourado }}>{SENHA_PREMIUM}</code>
                </div>
              )}
            </div>
          </div>
        )}

        {abaAtiva === 'premium' && !premiumLiberado && (
          <div style={{ textAlign: 'center', paddingTop: 60 }}>
            <div style={{ fontSize: 60 }}>🔒</div>
            <h2 style={{ color: CORES.dourado }}>ÁREA PREMIUM</h2>
            <p style={{ color: CORES.cinzaMedio }}>Faça o pagamento e insira a senha para liberar</p>
          </div>
        )}

        {abaAtiva === 'premium' && premiumLiberado && (
          <div>
            <h1 style={{ color: CORES.dourado }}>⭐ OTIMIZAÇÕES PREMIUM</h1>
            {listaAtual.map(item => (
              <div key={item.id} style={{ background: CORES.fundoCard, padding: 12, borderRadius: 10, marginBottom: 10, borderLeft: `4px solid ${corNivel(item.risco)}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <strong style={{ color: CORES.dourado }}>{String(item.id).padStart(2,'0')}. {item.nome}</strong>
                  <span style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, background: corNivel(item.risco), color: '#000' }}>{item.risco}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <code style={{ flex: 1, background: '#000', padding: 6, borderRadius: 4, fontSize: 11, color: CORES.dourado }}>{item.cmd}</code>
                  <button onClick={() => copiar(item.cmd)} style={{ padding: '6px 10px', background: CORES.dourado, color: '#000', border: 'none', borderRadius: 4, cursor: 'pointer' }}>📋</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
