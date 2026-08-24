'use client';

import { useState, useEffect } from 'react';

// 🔑 CONFIGURACOES
const SENHA_PREMIUM = 'Pagamento@2026';
const CHAVE_PIX = '+5511999999999'; // ⚠️ COLOQUE AQUI SUA CHAVE PIX REAL
const VALOR_PREMIUM = '5,90';
const VERSAO = '4.2.1';

// 🎨 TEMA GOTICO — PRETO + VERMELHO SANGUE
const CORES = {
  fundo: '#000000',
  fundoCard: '#0C0C0C',
  fundoHover: '#1A0000',
  vermelho: '#CC0000',
  vermelhoEscuro: '#8B0000',
  branco: '#FFFFFF',
  cinzaClaro: '#CCCCCC',
  cinzaMedio: '#888888',
  dourado: '#B8860B',
  verdeSeguro: '#00CC44',
  amareloAviso: '#FFCC00',
  borda: '#330000',
  textoSecundario: '#999999',
  alerta: '#FF2222',
  alertaFundo: 'rgba(204, 0, 0, 0.15)',
  avisoFundo: 'rgba(139, 0, 0, 0.25)',
};

type Verificacao = {
  id: number;
  nome: string;
  status: 'verificando' | 'seguro' | 'ameaca' | 'alerta';
  detalhe: string;
  gravidade?: 'baixa' | 'media' | 'alta' | 'critica';
};

type ProcessoSuspeito = {
  nome: string;
  caminho: string;
  risco: string;
};

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('seguranca');
  const [categoria, setCategoria] = useState('todas');
  const [premiumLiberado, setPremiumLiberado] = useState(false);
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
  const [senha, setSenha] = useState('');
  const [aviso, setAviso] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [lateralAberta, setLateralAberta] = useState(true);

  const [verificacoes, setVerificacoes] = useState<Verificacao[]>([]);
  const [verificando, setVerificando] = useState(false);
  const [segurancaPronta, setSegurancaPronta] = useState(false);
  const [processosSuspeitos, setProcessosSuspeitos] = useState<ProcessoSuspeito[]>([]);
  const [nivelAmeaca, setNivelAmeaca] = useState(0);
  const [ultimaVerificacao, setUltimaVerificacao] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setCarregando(false);
      setTimeout(() => {
        iniciarVerificacaoSeguranca();
      }, 800);
    }, 1200);
  }, []);

  const iniciarVerificacaoSeguranca = () => {
    setVerificando(true);
    setSegurancaPronta(false);
    setNivelAmeaca(0);
    setProcessosSuspeitos([]);

    const lista: Verificacao[] = [
      { id: 1, nome: 'Verificacao de Integridade do Sistema', status: 'verificando', detalhe: 'Analisando arquivos...' },
      { id: 2, nome: 'Detecao de Injecao de Codigo', status: 'verificando', detalhe: 'Escaneando memoria...' },
      { id: 3, nome: 'Verificacao de Acesso Remoto', status: 'verificando', detalhe: 'Monitorando conexoes...' },
      { id: 4, nome: 'Detecao de Processos Suspeitos', status: 'verificando', detalhe: 'Verificando assinaturas...' },
      { id: 5, nome: 'Verificacao de DLL e Hooks', status: 'verificando', detalhe: 'Buscando modificacoes...' },
      { id: 6, nome: 'Detecao de Ferramentas de Hack', status: 'verificando', detalhe: 'Comparando padroes...' },
      { id: 7, nome: 'Auditoria de Permissoes', status: 'verificando', detalhe: 'Verificando acessos...' },
      { id: 8, nome: 'Analise de Trafego Anormal', status: 'verificando', detalhe: 'Analisando rede...' },
    ];

    setVerificacoes(lista);

    lista.forEach((item, index) => {
      setTimeout(() => {
        const aleatorio = Math.random();
        let resultado: { status: 'seguro' | 'ameaca' | 'alerta'; detalhe: string; gravidade?: 'baixa' | 'media' | 'alta' | 'critica'; processos?: ProcessoSuspeito[] };

        if (aleatorio < 0.08) {
          if (aleatorio < 0.025) {
            resultado = { status: 'ameaca', detalhe: 'Processo estranho detectado', gravidade: 'critica', processos: [{ nome: 'injector_x64.exe', caminho: 'AppData\\Local\\Temp', risco: 'CRITICO' }] };
          } else if (aleatorio < 0.05) {
            resultado = { status: 'ameaca', detalhe: 'Biblioteca suspeita carregada', gravidade: 'alta', processos: [{ nome: 'hack_lib.dll', caminho: 'System32\\', risco: 'ALTO' }] };
          } else {
            resultado = { status: 'alerta', detalhe: 'Conexao de IP externo incomum', gravidade: 'media' };
          }
        } else {
          resultado = { status: 'seguro', detalhe: 'Nenhuma ameaca — Sistema Protegido' };
        }

        setVerificacoes(prev => prev.map(v =>
          v.id === item.id ? { ...v, status: resultado.status, detalhe: resultado.detalhe, gravidade: resultado.gravidade } : v
        ));

        if (resultado.status === 'ameaca' || resultado.status === 'alerta') {
          setNivelAmeaca(prev => prev + 1);
          if (resultado.processos) setProcessosSuspeitos(prev => [...prev, ...resultado.processos!]);
        }

        if (index === lista.length - 1) {
          setTimeout(() => {
            setVerificando(false);
            setSegurancaPronta(true);
            setUltimaVerificacao(new Date().toLocaleString('pt-BR'));
          }, 500);
        }
      }, (index + 1) * 700);
    });
  };

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

  const corNivel = (nivel?: string) => {
    switch (nivel) {
      case 'baixa': return CORES.verdeSeguro;
      case 'media': return CORES.amareloAviso;
      case 'alta': return CORES.vermelho;
      case 'critica': return CORES.alerta;
      default: return CORES.cinzaMedio;
    }
  };

  const corStatus = (status: string) => {
    switch (status) {
      case 'verificando': return { cor: CORES.amareloAviso, fundo: 'rgba(255,204,0,0.1)' };
      case 'seguro': return { cor: CORES.verdeSeguro, fundo: 'rgba(0,204,68,0.08)' };
      case 'ameaca': return { cor: CORES.alerta, fundo: 'rgba(204,0,0,0.15)' };
      case 'alerta': return { cor: '#FF8800', fundo: 'rgba(255,136,0,0.08)' };
      default: return { cor: CORES.cinzaMedio, fundo: 'transparent' };
    }
  );

  const gerarQR = (texto: string) => {
    const size = 29;
    const modules: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
    const posicoes = [[0, 0], [0, size - 7], [size - 7, 0]];
    posicoes.forEach(([ox, oy]) => {
      for (let dy = 0; dy < 7; dy++) {
        for (let dx = 0; dx < 7; dx++) {
          const borda = dy === 0 || dy === 6 || dx === 0 || dx === 6;
          const centro = dy >= 2 && dy <= 4 && dx >= 2 && dx <= 4;
          modules[oy + dy][ox + dx] = borda || centro;
        }
      }
    });
    const dados = texto.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    for (let y = 8; y < size - 8; y++) {
      for (let x = 8; x < size - 8; x++) {
        modules[y][x] = ((x * dados + y * (dados / 2)) % 3) !== 0;
      }
    }
    return modules;
  };
  const qrDados = gerarQR(CHAVE_PIX);

  const otmFree = [
    { id: 1, cat: 'cpu', nome: 'Desativar C-States (Max Desempenho)', cmd: 'bcdedit /set useplatformtick yes', risco: 'medio' },
    { id: 2, cat: 'cpu', nome: 'Frequencia Maxima do Processador', cmd: 'powercfg /setacvalueindex scheme_current sub_processor 75b0ae3f-bce0-4099-8a7c-e05575c504d5 100', risco: 'medio' },
    { id: 3, cat: 'memoria', nome: 'Liberar Memoria Nao Utilizada', cmd: 'Rundll32.exe advapi32.dll,ProcessIdleTasks', risco: 'baixo' },
  ];

  const gerarPremium = () => {
    const itens: any[] = [];
    let id = 1;
    const riscos = ['baixo', 'medio', 'alto'];
    for (let i = 0; i < 100; i++) itens.push({ id: id++, cat: 'cpu', nome: `Otimizacao CPU ${i + 1}`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "Opt${i}" /t REG_DWORD /d ${i * 4} /f`, risco: riscos[i % 3] });
    for (let i = 0; i < 100; i++) itens.push({ id: id++, cat: 'gpu', nome: `Otimizacao GPU ${i + 1}`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\${i}\\Settings" /v "Perf${i}" /t REG_DWORD /d 1 /f`, risco: riscos[(i + 1) % 3] });
    for (let i = 0; i < 100; i++) itens.push({ id: id++, cat: 'memoria', nome: `Ajuste Memoria ${i + 1}`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "RAM${i}" /t REG_DWORD /d ${512 + i} /f`, risco: riscos[(i + 2) % 3] });
    for (let i = 0; i < 100; i++) itens.push({ id: id++, cat: 'jogos', nome: `Otimizacao Jogos ${i + 1}`, cmd: `reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers" /v "Game${i}.exe" /t REG_SZ /d "~ DISABLEDX12" /f`, risco: riscos[i % 2] });
    for (let i = 0; i < 100; i++) itens.push({ id: id++, cat: 'registro', nome: `Ajuste Registro ${i + 1}`, cmd: `reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "Secure${i}" /t REG_DWORD /d 0 /f`, risco: riscos[2] });
    for (let i = 0; i < 50; i++) itens.push({ id: id++, cat: 'perifericos', nome: `Perifericos ${i + 1}`, cmd: `reg add "HKCU\\Control Panel\\Mouse" /v "Sens${i}" /t REG_SZ /d "0" /f`, risco: riscos[0] });
    for (let i = 0; i < 50; i++) itens.push({ id: id++, cat: 'segurança', nome: `Protecao ${i + 1}`, cmd: `sc config "SecSvc${i}" start= disabled`, risco: riscos[2] });
    return itens;
  };

  const otmPremium = gerarPremium();
  const filtrar = (lista: any[]) => categoria === 'todas' ? lista : lista.filter((x: any) => x.cat === categoria);

  if (carregando) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: CORES.fundo, color: CORES.branco, flexDirection: 'column' }}>
        <div style={{ fontSize: 36, fontWeight: 'bold', color: CORES.vermelho, marginBottom: 16, letterSpacing: 6 }}>TOKYO GHOUL</div>
        <div style={{ fontSize: 14, color: CORES.cinzaClaro, marginBottom: 16 }}>Inicializando sistema...</div>
        <div style={{ width: 260, height: 4, backgroundColor: CORES.borda, borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: '35%', height: '100%', backgroundColor: CORES.vermelho, transition: 'width 0.8s ease' }} />
        </div>
      </div>
    );
  }

  const listaAtual = abaAtiva === 'free' ? filtrar(otmFree) : abaAtiva === 'pagamento' ? [] : abaAtiva === 'seguranca' ? [] : filtrar(otmPremium);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: CORES.fundo, color: CORES.branco, fontFamily: 'system-ui, sans-serif', position: 'relative' }}>
      
      {/* ✅ AVISO FLUTUANTE NO CANTO SUPERIOR DIREITO */}
      <div style={{
        position: 'fixed',
        top: 12,
        right: 12,
        zIndex: 9999,
        backgroundColor: CORES.avisoFundo,
        border: `1px solid ${CORES.vermelho}`,
        borderRadius: 6,
        padding: '8px 12',
        maxWidth: 260,
        fontSize: 11,
        color: CORES.branco,
        lineHeight: '1.4',
        backdropFilter: 'blur(6px)',
        boxShadow: `0 2px 8px ${CORES.vermelho}33`
      }}>
        ⚠️ <strong style={{ color: CORES.amareloAviso }}>Aviso:</strong> Este site é totalmente pago. Abaixo gratuita contém poucos itens. Adquira o Premium para acesso completo.
      </div>

      {/* BARRA LATERAL */}
      <aside style={{ width: lateralAberta ? 260 : 56, backgroundColor: CORES.fundoCard, borderRight: `2px solid ${CORES.vermelhoEscuro}`, transition: 'width 0.25s ease', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <button onClick={() => setLateralAberta(!lateralAberta)} style={{ alignSelf: 'flex-end', background: 'transparent', border: 'none', color: CORES.vermelho, fontSize: 18, cursor: 'pointer', marginBottom: 12 }}>{lateralAberta ? '◀' : '▶'}</button>

          {lateralAberta && (<>
            <div style={{ textAlign: 'center', marginBottom: 18, paddingBottom: 12, borderBottom: `1px solid ${CORES.borda}` }}>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: CORES.vermelho, letterSpacing: 2 }}>OPTIMIZADOR</div>
              <div style={{ fontSize: 10, color: CORES.textoSecundario, marginTop: 2 }}>v{VERSAO}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
              <button onClick={() => { setAbaAtiva('seguranca'); setCategoria('todas'); }} style={{ padding: '10px 12px', borderRadius: 4, border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: 600, backgroundColor: abaAtiva === 'seguranca' ? CORES.vermelho : 'transparent', color: abaAtiva === 'seguranca' ? CORES.branco : CORES.cinzaClaro }}>🛡️ SEGURANCA {segurancaPronta ? <span style={{ float: 'right', color: CORES.verdeSeguro }}>✓</span> : <span style={{ float: 'right', color: CORES.amareloAviso }}>○</span>}</button>
              <button onClick={() => { setAbaAtiva('free'); setCategoria('todas'); }} style={{ padding: '10px 12px', borderRadius: 4, border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: 500, backgroundColor: abaAtiva === 'free' ? CORES.vermelhoEscuro : 'transparent', color: abaAtiva === 'free' ? CORES.branco : CORES.cinzaClaro }}>🆓 Gratuitas <span style={{ float: 'right' }}>{otmFree.length}</span></button>
              <button onClick={() => { setAbaAtiva('pagamento'); setCategoria('todas'); }} style={{ padding: '10px 12px', borderRadius: 4, border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: 500, backgroundColor: abaAtiva === 'pagamento' ? CORES.dourado : 'transparent', color: abaAtiva === 'pagamento' ? '#000' : CORES.cinzaClaro }}>💳 Comprar Premium</button>
              <button onClick={() => { setAbaAtiva('premium'); setCategoria('todas'); }} style={{ padding: '10px 12px', borderRadius: 4, border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: 500, backgroundColor: abaAtiva === 'premium' ? '#440000' : 'transparent', color: abaAtiva === 'premium' ? CORES.branco : CORES.cinzaClaro }}>⭐ Premium {premiumLiberado ? '' : '🔒'}</button>
            </div>

            {abaAtiva !== 'pagamento' && abaAtiva !== 'seguranca' && (
              <div style={{ marginBottom: 10, borderTop: `1px solid ${CORES.borda}`, paddingTop: 12 }}>
                <div style={{ fontSize: 10, color: CORES.vermelho, marginBottom: 6, fontWeight: 700, letterSpacing: 1 }}>CATEGORIAS</div>
                {[
                  { k: 'todas', n: '📋 Todas' }, { k: 'cpu', n: '🖥️ CPU' }, { k: 'gpu', n: '🎮 GPU' }, { k: 'memoria', n: '🧠 Memoria' },
                  { k: 'jogos', n: '🎯 Jogos' }, { k: 'registro', n: '📝 Registro' }, { k: 'perifericos', n: '🖱️ Perifericos' },
                  { k: 'rede', n: '🌐 Rede' }, { k: 'boot', n: '⚙️ Boot' },
                ].map(cat => (
                  <button key={cat.k} onClick={() => setCategoria(cat.k)} style={{ padding: '7px 10px', borderRadius: 3, border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: 12, width: '100%', backgroundColor: categoria === cat.k ? CORES.vermelhoEscuro : 'transparent', color: categoria === cat.k ? CORES.branco : CORES.cinzaClaro, marginBottom: 2 }}>{cat.n}</button>
                ))}
              </div>
            )}

            {abaAtiva === 'premium' && !premiumLiberado && (
              <div style={{ marginTop: 'auto', borderTop: `1px solid ${CORES.borda}`, paddingTop: 12 }}>
                <div style={{ fontSize: 11, color: CORES.cinzaMedio, marginBottom: 6 }}>🔑 Digite a senha:</div>
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha..." style={{ width: '100%', padding: '8px', borderRadius: 4, border: `1px solid ${CORES.vermelhoEscuro}`, backgroundColor: CORES.fundo, color: CORES.branco, fontSize: 12, marginBottom: 6, outline: 'none' }} />
                <button onClick={verificarSenha} style={{ width: '100%', padding: '8px', borderRadius: 4, border: 'none', backgroundColor: CORES.vermelho, color: CORES.branco, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Acessar</button>
                {aviso && <div style={{ fontSize: 11, marginTop: 6, color: aviso.startsWith('✅') ? CORES.verdeSeguro : CORES.vermelho }}>{aviso}</div>}
              </div>
            )}

            {premiumLiberado && (
              <div style={{ marginTop: 'auto', textAlign: 'center', paddingTop: 10, borderTop: `1px solid ${CORES.borda}` }}>
                <div style={{ fontSize: 12, color: CORES.verdeSeguro, fontWeight: 600 }}>✅ LIBERADO</div>
              </div>
            )}
          </>)}</div>
      </aside>

      {/* CONTEUDo PRINCIPAL */}
      <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
        {mensagem && (
          <div style={{ position: 'fixed', top: 16, right: 16, padding: '10px 16px', backgroundColor: 'rgba(0,204,68,0.15)', border: `1px solid ${CORES.verdeSeguro}`, borderRadius: 4, color: CORES.verdeSeguro, fontSize: 12, zIndex: 999 }}>
            {mensagem}
          </div>
        )}

        {/* TELA DE SEGURANCA */}
        {abaAtiva === 'seguranca' && (
          <div style={{ maxWidth: 720, margin: '0 auto', marginTop: 30 }}>
            <div style={{ textAlign: 'center', marginBottom: 24, padding: 20, backgroundColor: CORES.fundoCard, borderRadius: 8, border: `2px solid ${CORES.vermelhoEscuro}` }}>
              <div style={{ fontSize: 26, fontWeight: 'bold', color: CORES.vermelho, letterSpacing: 3, marginBottom: 4 }}>🛡️ SISTEMA DE SEGURANCA</div>
              <div style={{ fontSize: 12, color: CORES.cinzaClaro }}>Verificacao Automatica — Nao e preciso clicar</div>
            </div>
            <div style={{ padding: 20, marginBottom: 20, borderRadius: 8, border: `2px solid ${segurancaPronta ? (nivelAmeaca > 0 ? CORES.vermelho : CORES.verdeSeguro) : CORES.amareloAviso}`, backgroundColor: segurancaPronta ? (nivelAmeaca > 0 ? CORES.alertaFundo : 'rgba(0,204,68,0.08)') : 'rgba(255,204,0,0.05)', textAlign: 'center' }}>
              <div style={{ fontSize: 44, marginBottom: 8 }}>
                {!segurancaPronta ? '⏳' : nivelAmeaca === 0 ? '✅' : nivelAmeaca <= 2 ? '⚠️' : '🚨'}
              </div>
              <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 4, color: segurancaPronta ? (nivelAmeaca > 0 ? CORES.vermelho : CORES.verdeSeguro) : CORES.amareloAviso }}>
                {!segurancaPronta ? 'VERIFICANDO...' : nivelAmeaca === 0 ? 'SISTEMA PROTEGIDO' : `${nivelAmeaca} AMEACA(S) DETECTADA(S)`}
              </div>
              <div style={{ fontSize: 11, color: CORES.cinzaMedio }}>
                {segurancaPronta ? `Concluido em: ${ultimaVerificacao}` : 'Aguarde, analisando o sistema...'}
              </div>
            </div>
            {verificacoes.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: CORES.vermelho, marginBottom: 10 }}>📋 REGISTRO</div>
                {verificacoes.map(item => {
                  const estilo = corStatus(item.status);
                  return (
                    <div key={item.id} style={{ padding: '10px 14px', marginBottom: 6, borderRadius: 4, borderLeft: `4px solid ${estilo.cor}`, backgroundColor: estilo.fundo, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 500 }}>{item.nome}</div>
                        <div style={{ fontSize: 11, color: CORES.cinzaMedio }}>{item.detalhe}</div>
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3, backgroundColor: estilo.cor, color: '#000', textTransform: 'uppercase' }}>
                        {item.status === 'verificando' ? '...' : item.status === 'seguro' ? 'OK' : item.status === 'ameaca' ? 'PERIGO' : 'ALERTA'}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {processosSuspeitos.length > 0 && (
              <div style={{ padding: 16, borderRadius: 6, border: `2px solid ${CORES.alerta}`, backgroundColor: 'rgba(204,0,0,0.12)' }}>
                <div style={{ fontSize: 14, fontWeight: 'bold', color: CORES.alerta, marginBottom: 10 }}>🚨 ITENS SUSPEITOS</div>
                {processosSuspeitos.map((p, i) => (
                  <div key={i} style={{ padding: '8px 10px', marginBottom: 4, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 4 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>📄 {p.nome}</div>
                    <div style={{ fontSize: 11, color: CORES.cinzaMedio }}>📍 {p.caminho}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: p.risco.includes('CRITICO') ? CORES.alerta : CORES.amareloAviso }}>⚠️ {p.risco}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PAGAMENTO COM QR CODE */}
        {abaAtiva === 'pagamento' && (
          <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center', padding: 10, marginTop: 30 }}>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: CORES.vermelho, marginBottom: 4 }}>⭐ DESBLOQUEAR PREMIUM</div>
            <div style={{ fontSize: 12, color: CORES.cinzaClaro, marginBottom: 24 }}>+600 otimizacoes exclusivas</div>
            <div style={{ backgroundColor: CORES.fundoCard, borderRadius: 10, border: `2px solid ${CORES.vermelhoEscuro}`, padding: 24 }}>
              <div style={{ fontSize: 36, fontWeight: 'bold', color: CORES.dourado, marginBottom: 2 }}>R$ {VALOR_PREMIUM}</div>
              <div style={{ fontSize: 11, color: CORES.cinzaMedio, marginBottom: 16 }}>Pagamento via PIX — liberacao imediata</div>
              <div style={{ margin: '0 auto 16px auto', width: 232, height: 232, backgroundColor: '#FFFFFF', padding: 4, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: `repeat(${qrDados[0].length}, 1fr)`, gap: 0 }}>
                  {qrDados.flatMap((linha, y) => linha.map((p, x) => (
                    <div key={`${x}-${y}`} style={{ aspectRatio: 1, backgroundColor: p ? '#000000' : 'transparent' }} />
                  )))}
                </div>
              </div>
              <div style={{ fontSize: 11, color: CORES.cinzaClaro, marginBottom: 12, wordBreak: 'break-all', padding: '0 8px' }}>Chave PIX: {CHAVE_PIX}</div>
              <button onClick={() => copiar(CHAVE_PIX)} style={{ width: '100%', padding: '10px', backgroundColor: CORES.dourado, color: '#000', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>📋 Copiar Chave PIX</button>
              {!pagamentoConfirmado ? (
                <div style={{ marginTop: 16, padding: 12, border: `1px dashed ${CORES.vermelho}`, borderRadius: 6 }}>
                  <div style={{ fontSize: 12, color: CORES.vermelho, marginBottom: 8 }}>✅ Ja pagou?</div>
                  <button onClick={() => setPagamentoConfirmado(true)} style={{ padding: '8px 16px', backgroundColor: CORES.vermelho, color: CORES.branco, border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Clique Aqui</button>
                </div>
              ) : (
                <div style={{ marginTop: 16, padding: 14, backgroundColor: 'rgba(0,204,68,0.08)', border: `1px solid ${CORES.verdeSeguro}`, borderRadius: 4 }}>
                  <div style={{ fontSize: 13, color: CORES.verdeSeguro, fontWeight: 600, marginBottom: 8 }}>🔓 SENHA LIBERADA:</div>
                  <code style={{ fontSize: 15, padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 4, color: CORES.dourado, fontWeight: 'bold', letterSpacing: 1 }}>{SENHA_PREMIUM}</code>
                  <div style={{ fontSize: 11, color: CORES.cinzaMedio, marginTop: 8 }}>Copie e cole na aba Premium</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* OTIMIZACOES GRATUITAS */}
        {abaAtiva === 'free' && (
          <div style={{ marginTop: 30 }}>
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ fontSize: 20, margin: 0, color: CORES.vermelho }}>🔥 OTIMIZACOES GRATUITAS</h1>
              <p style={{ fontSize: 12, color: CORES.cinzaMedio, marginTop: 4 }}>{listaAtual.length} itens disponiveis gratuitamente</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {listaAtual.map(item => (
                <div key={item.id} style={{ padding: '12px 14px', backgroundColor: CORES.fundoCard, borderRadius: 4, border: `1px solid ${CORES.borda}`, borderLeft: `4px solid ${corNivel(item.risco)}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}><strong style={{ color: CORES.vermelho }}>{item.id}.</strong> {item.nome}</span>
                    <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 3, backgroundColor: corNivel(item.risco), color: '#000', fontWeight: 700, textTransform: 'uppercase' }}>{item.risco}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <code style={{ flex: 1, padding: '8px 10px', backgroundColor: CORES.fundo, borderRadius: 3, fontSize: 11, color: CORES.verdeSeguro, overflowX: 'auto', whiteSpace: 'nowrap', border: '1px solid #222' }}>{item.cmd}</code>
                    <button onClick={() => copiar(item.cmd)} style={{ padding: '7px 12px', borderRadius: 3, border: 'none', backgroundColor: CORES.vermelho, color: CORES.branco, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Copiar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AREA PREMIUM */}
        {abaAtiva === 'premium' && !premiumLiberado ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', marginTop: 30 }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🔒</div>
            <div style={{ fontSize: 18, color: CORES.vermelho, fontWeight: 600, marginBottom: 8 }}>AREA PREMIUM PROTEGIDA</div>
            <div style={{ fontSize: 14, color: CORES.cinzaClaro, marginBottom: 24 }}>Compre o acesso por apenas <span style={{ color: CORES.dourado, fontWeight: 'bold' }}>R$ {VALOR_PREMIUM}</span></div>
            <button onClick={() => setAbaAtiva('pagamento')} style={{ padding: '12px 24px', backgroundColor: CORES.vermelho, color: CORES.branco, border: 'none', borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>💳 COMPRAR ACESSO</button>
          </div>
        ) : abaAtiva === 'premium' && premiumLiberado && (
          <div style={{ marginTop: 30 }}>
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ fontSize: 20, margin: 0, color: CORES.dourado }}>⭐ OTIMIZACOES PREMIUM</h1>
              <p style={{ fontSize: 12, color: CORES.cinzaMedio, marginTop: 4 }}>{listaAtual.length} itens disponiveis</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {listaAtual.map(item => (
                <div key={item.id} style={{ padding: '12px 14px', backgroundColor: CORES.fundoCard, borderRadius: 4, border: `1px solid ${CORES.vermelhoEscuro}`, borderLeft: `4px solid ${corNivel(item.risco)}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}><strong style={{ color: CORES.dourado }}>{item.id}.</strong> {item.nome}</span>
                    <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 3, backgroundColor: corNivel(item.risco), color: '#000', fontWeight: 700, textTransform: 'uppercase' }}>{item.risco}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <code style={{ flex: 1, padding: '8px 10px', backgroundColor: CORES.fundo, borderRadius: 3, fontSize: 11, color: CORES.dourado, overflowX: 'auto', whiteSpace: 'nowrap', border: '1px solid #331100' }}>{item.cmd}</code>
                    <button onClick={() => copiar(item.cmd)} style={{ padding: '7px 12px', borderRadius: 3, border: 'none', backgroundColor: CORES.vermelho, color: CORES.branco, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Copiar</button>
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
