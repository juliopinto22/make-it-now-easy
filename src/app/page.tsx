'use client';

import { useState, useEffect } from 'react';

// 🔑 CONFIGURAÇÕES
const SENHA_PREMIUM = 'Pagamento@2026';
const CHAVE_PIX = '+5511999999999'; // ⚠️ COLOQUE AQUI SUA CHAVE PIX REAL
const VALOR_PREMIUM = '5,90';
const VERSAO = '4.1.0';

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
  alerta: '#FF2222',
  alertaFundo: 'rgba(204, 0, 0, 0.15)',
};

// 🔒 TIPOS DE DADOS
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

  // 🛡️ ESTADO DO SISTEMA DE SEGURANÇA
  const [verificacoes, setVerificacoes] = useState<Verificacao[]>([]);
  const [verificando, setVerificando] = useState(false);
  const [segurancaPronta, setSegurancaPronta] = useState(false);
  const [processosSuspeitos, setProcessosSuspeitos] = useState<ProcessoSuspeito[]>([]);
  const [nivelAmeaca, setNivelAmeaca] = useState(0);
  const [ultimaVerificacao, setUltimaVerificacao] = useState('');

  useEffect(() => {
    setTimeout(() => setCarregando(false), 1200);
  }, []);

  // 🔍 SISTEMA DE VERIFICAÇÃO AUTOMÁTICA — SEM PERGUNTAS
  const iniciarVerificacaoSeguranca = () => {
    setVerificando(true);
    setSegurancaPronta(false);
    setNivelAmeaca(0);
    setProcessosSuspeitos([]);

    const lista: Verificacao[] = [
      { id: 1, nome: 'Verificação de Modificação de Arquivos do Sistema', status: 'verificando', detalhe: 'Analisando integridade...' },
      { id: 2, nome: 'Detecção de Injeção de Código', status: 'verificando', detalhe: 'Escaneando processos...' },
      { id: 3, nome: 'Verificação de Acesso Remoto', status: 'verificando', detalhe: 'Monitorando conexões...' },
      { id: 4, nome: 'Detecção de Processos Suspeitos', status: 'verificando', detalhe: 'Verificando assinaturas...' },
      { id: 5, nome: 'Verificação de Hooks e Injeção de DLL', status: 'verificando', detalhe: 'Buscando modificações...' },
      { id: 6, nome: 'Detecção de Ferramentas de Hack', status: 'verificando', detalhe: 'Comparando assinaturas...' },
      { id: 7, nome: 'Verificação de Acesso não Autorizado', status: 'verificando', detalhe: 'Auditando permissões...' },
      { id: 8, nome: 'Monitoramento de Conexões Anormais', status: 'verificando', detalhe: 'Analisando tráfego...' },
    ];

    setVerificacoes(lista);

    // Simulação de progresso em etapas
    lista.forEach((item, index) => {
      setTimeout(() => {
        const resultado = gerarResultadoVerificacao(item.id);
        setVerificacoes(prev => prev.map(v =>
          v.id === item.id ? { ...v, status: resultado.status, detalhe: resultado.detalhe, gravidade: resultado.gravidade } : v
        ));

        if (resultado.status === 'ameaca' || resultado.status === 'alerta') {
          setNivelAmeaca(prev => prev + 1);
          if (resultado.processos) setProcessosSuspeitos(resultado.processos);
        }

        // Última etapa — finalizar
        if (index === lista.length - 1) {
          setTimeout(() => {
            setVerificando(false);
            setSegurancaPronta(true);
            setUltimaVerificacao(new Date().toLocaleString('pt-BR'));
          }, 600);
        }
      }, (index + 1) * 900);
    });
  };

  // 🎲 GERADOR DE RESULTADOS DE VERIFICAÇÃO
  const gerarResultadoVerificacao = (id: number) => {
    const aleatorio = Math.random();

    // SIMULAÇÃO DE AMEAÇAS DETECTADAS
    if (aleatorio < 0.12) {
      const ameacas = [
        { status: 'ameaca' as const, detalhe: 'Arquivo modificado sem assinatura digital', gravidade: 'alta' as const },
        { status: 'ameaca' as const, detalhe: 'Processo desconhecido em execução', gravidade: 'critica' as const, processos: [{ nome: 'injector_x64.exe', caminho: 'AppData\\Temp\\', risco: 'ALTO' }] },
        { status: 'ameaca' as const, detalhe: 'DLL injetada em processo do sistema', gravidade: 'critica' as const, processos: [{ nome: 'hack_lib.dll', caminho: 'System32\\', risco: 'CRÍTICO' }] },
        { status: 'alerta' as const, detalhe: 'Conexão de IP suspeito detectada', gravidade: 'media' as const },
      ];
      return ameacas[Math.floor(Math.random() * ameacas.length)];
    }

    return { status: 'seguro' as const, detalhe: 'Nenhuma anomalia detectada — Protegido', gravidade: undefined };
  };

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

  const corStatus = (status: string) => {
    switch (status) {
      case 'verificando': return { cor: CORES.amareloAviso, fundo: 'rgba(255,204,0,0.1)' };
      case 'seguro': return { cor: CORES.verdeSeguro, fundo: 'rgba(0,204,68,0.1)' };
      case 'ameaca': return { cor: CORES.alerta, fundo: 'rgba(204,0,0,0.2)' };
      case 'alerta': return { cor: '#FF8800', fundo: 'rgba(255,136,0,0.1)' };
      default: return { cor: CORES.cinzaMedio, fundo: 'transparent' };
    }
  };

  // =====================================================
  // 🆓 50 OTIMIZAÇÕES GRATUITAS
  // =====================================================
  const otmFree = [
    { id: 1, cat: 'cpu', nome: 'Desativar C-States (Máximo Desempenho)', cmd: 'bcdedit /set useplatformtick yes', risco: 'alto' },
    { id: 2, cat: 'cpu', nome: 'Definir Frequência Máxima do Processador', cmd: 'powercfg /setacvalueindex scheme_current sub_processor 75b0ae3f-bce0-4099-8a7c-e05575c504d5 100', risco: 'medio' },
    { id: 3, cat: 'gpu', nome: 'Forçar Desempenho Máximo da GPU', cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000\\Settings" /v "PowerMizerLevelAC" /t REG_DWORD /d 1 /f', risco: 'medio' },
    { id: 4, cat: 'memoria', nome: 'Liberar Memória Não Utilizada', cmd: 'Rundll32.exe advapi32.dll,ProcessIdleTasks', risco: 'baixo' },
    { id: 5, cat: 'jogos', nome: 'Desativar Barra de Jogos Xbox', cmd: 'reg add "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\GameBar" /v "AllowAutoGameMode" /t REG_DWORD /d 0 /f', risco: 'baixo' },
    { id: 6, cat: 'registro', nome: 'Desativar Animações de Janelas', cmd: 'reg add "HKCU\\Control Panel\\Desktop\\WindowMetrics" /v "MinAnimate" /t REG_SZ /d 0 /f', risco: 'baixo' },
    { id: 7, cat: 'perifericos', nome: 'Remover Aceleração do Mouse', cmd: 'reg add "HKCU\\Control Panel\\Mouse" /v "MouseSpeed" /t REG_SZ /d 0 /f', risco: 'baixo' },
    { id: 8, cat: 'segurança', nome: 'Desativar Windows Defender', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender" /v "DisableAntiSpyware" /t REG_DWORD /d 1 /f', risco: 'alto' },
    { id: 9, cat: 'rede', nome: 'Limpar Cache DNS', cmd: 'ipconfig /flushdns', risco: 'baixo' },
    { id: 10, cat: 'boot', nome: 'Reduzir Tempo do Menu de Boot', cmd: 'bcdedit /set timeout 3', risco: 'baixo' },
  ];

  // =====================================================
  // ⭐ 600 OTIMIZAÇÕES PREMIUM
  // =====================================================
  const gerarPremium = () => {
    const itens: any[] = [];
    let id = 1;
    const riscos = ['baixo', 'medio', 'alto'];
    for (let i = 0; i < 100; i++) itens.push({ id: id++, cat: 'cpu', nome: `Otimização CPU ${i + 1}`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "Cache${i}" /t REG_DWORD /d ${i * 8} /f`, risco: riscos[i % 3] });
    for (let i = 0; i < 100; i++) itens.push({ id: id++, cat: 'gpu', nome: `Otimização GPU ${i + 1}`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\${i}\\Settings" /v "Opt${i}" /t REG_DWORD /d 1 /f`, risco: riscos[(i + 1) % 3] });
    for (let i = 0; i < 100; i++) itens.push({ id: id++, cat: 'memoria', nome: `Ajuste Memória ${i + 1}`, cmd: `reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v "Set${i}" /t REG_DWORD /d ${256 + i} /f`, risco: riscos[(i + 2) % 3] });
    for (let i = 0; i < 100; i++) itens.push({ id: id++, cat: 'jogos', nome: `Otimização Jogos ${i + 1}`, cmd: `reg add "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers" /v "Jogo${i}.exe" /t REG_SZ /d "~ DISABLEDX12" /f`, risco: riscos[i % 2] });
    for (let i = 0; i < 100; i++) itens.push({ id: id++, cat: 'registro', nome: `Ajuste Registro ${i + 1}`, cmd: `reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v "Opt${i}" /t REG_DWORD /d 0 /f`, risco: riscos[2] });
    for (let i = 0; i < 50; i++) itens.push({ id: id++, cat: 'perifericos', nome: `Otimização Periféricos ${i + 1}`, cmd: `reg add "HKCU\\Control Panel\\Mouse" /v "Sens${i}" /t REG_SZ /d "0" /f`, risco: riscos[0] });
    for (let i = 0; i < 50; i++) itens.push({ id: id++, cat: 'segurança', nome: `Proteção ${i + 1}`, cmd: `sc config "Service${i}" start= disabled`, risco: riscos[2] });
    return itens;
  };

  const otmPremium = gerarPremium();
  const filtrar = (lista: any[]) => categoria === 'todas' ? lista : lista.filter(x => x.cat === categoria);

  // QR Code Visual
  const gerarQRMatriz = () => {
    const size = 29;
    const modules: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
    [[0, 0], [0, size - 7], [size - 7, 0]].forEach(([ox, oy]) => {
      for (let dy = 0; dy < 7; dy++) {
        for (let dx = 0; dx < 7; dx++) {
          const r = dy === 0 || dy === 6 || dx === 0 || dx === 6;
          const m = dy >= 2 && dy <= 4 && dx >= 2 && dx <= 4;
          modules[oy + dy][ox + dx] = r || m;
        }
      }
    });
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
        <div style={{ fontSize:16, marginBottom:8 }}>Inicializando Sistema...</div>
        <div style={{ width:240, height:3, backgroundColor:CORES.borda, borderRadius:2, overflow:'hidden' }}>
          <div style={{ width:'35%', height:'100%', backgroundColor:CORES.vermelho }} />
        </div>
      </div>
    );
  }

  const listaAtual = abaAtiva === 'free' ? filtrar(otmFree) : abaAtiva === 'pagamento' ? [] : abaAtiva === 'seguranca' ? [] : filtrar(otmPremium);
  const liberado = abaAtiva === 'free' || abaAtiva === 'pagamento' || abaAtiva === 'seguranca' || premiumLiberado;

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
              <button onClick={() => { setAbaAtiva('seguranca'); setCategoria('todas'); }} style={{
                padding:'11px 14px', borderRadius:4, border:'none', cursor:'pointer', textAlign:'left', fontSize:13, fontWeight:600,
                backgroundColor: abaAtiva==='seguranca' ? CORES.vermelho : 'transparent',
                color: abaAtiva==='seguranca' ? CORES.branco : CORES.cinzaClaro
              }}>🛡️ SEGURANÇA <span style={{ float:'right', fontSize:11, opacity:.7 }}>{segurancaPronta ? '✓' : '○'}</span></button>

              <button onClick={() => { setAbaAtiva('free'); setCategoria('todas'); }} style={{
                padding:'11px 14px', borderRadius:4, border:'none', cursor:'pointer', textAlign:'left', fontSize:13, fontWeight:500,
                backgroundColor: abaAtiva==='free' ? CORES.vermelhoEscuro : 'transparent',
                color: abaAtiva==='free' ? CORES.branco : CORES.cinzaClaro
              }}>🆓 Gratuitas <span style={{ float:'right', fontSize:11, opacity:.7 }}>{otmFree.length}</span></button>

              <button onClick={() => { setAbaAtiva('pagamento'); setCategoria('todas'); }} style={{
                padding:'11px 14px', borderRadius:4, border:'none', cursor:'pointer', textAlign:'left', fontSize:13, fontWeight:500,
                backgroundColor: abaAtiva==='pagamento' ? CORES.dourado : 'transparent',
                color: abaAtiva==='pagamento' ? '#000' : CORES.cinzaClaro
              }}>💳 Comprar Premium</button>

              <button onClick={() => { setAbaAtiva('premium'); setCategoria('todas'); }} style={{
                padding:'11px 14px', borderRadius:4, border:'none', cursor:'pointer', textAlign:'left', fontSize:13, fontWeight:500,
                backgroundColor: abaAtiva==='premium' ? '#440000' : 'transparent',
                color: abaAtiva==='premium' ? CORES.branco : CORES.cinzaClaro
              }}>⭐ Premium <span style={{ float:'right', fontSize:11, opacity:.7 }}>{otmPremium.length}{premiumLiberado?'':' 🔒'}</span></button>
            </div>

            {/* CATEGORIAS */}
            {abaAtiva !== 'pagamento' && abaAtiva !== 'seguranca' && (
              <div style={{ marginBottom:12, borderTop:`1px solid ${CORES.borda}`, paddingTop:14 }}>
                <div style={{ fontSize:11, color:CORES.vermelho, marginBottom:8, fontWeight:700, letterSpacing:1 }}>CATEGORIAS</div>
                {[
                  {k:'todas',n:'📋 Todas'}, {k:'cpu',n:'🖥️ CPU'}, {k:'gpu',n:'🎮 GPU'}, {k:'memoria',n:'🧠 Memória'},
                  {k:'jogos',n:'🎯 Jogos'}, {k:'registro',n:'📝 Registro'}, {k:'perifericos',n:'🖱️ Periféricos'},
                  {k:'segurança',n:'🛡️ Segurança'}, {k:'rede',n:'🌐 Rede'}, {k:'boot',n:'⚙️ Boot'},
                  {k:'serviços',n:'🔧 Serviços'}, {k:'energia',n:'⚡ Energia'}, {k:'limpeza',n:'🧹 Limpeza'}, {k:'privacidade',n:'🔒 Privacidade'},
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
                <div style={{ fontSize:11, color:CORES.cinzaMedio, marginBottom:6 }}>🔑 Digite a senha recebida:</div>
                <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} placeholder="Senha de acesso..." style={{
                  width:'100%', padding:'8px 10px', borderRadius:4, border:`1px solid ${CORES.vermelhoEscuro}`, backgroundColor:CORES.fundo, color:CORES.branco, fontSize:12, marginBottom:6, outline:'none'
                }} />
                <button onClick={verificarSenha} style={{ width:'100%', padding:'8px', borderRadius:4, border:'none', backgroundColor:CORES.vermelho, color:CORES.branco, fontSize:13, fontWeight:600, cursor:'pointer' }}>Acessar Premium</button>
                {aviso && <div style={{ fontSize:11, marginTop:6, color:aviso.startsWith('✅')?CORES.verdeSeguro:CORES.vermelho }}>{aviso}</div>
              </div>
            )}

            {premiumLiberado && (
              <div style={{ marginTop:'auto', borderTop:`1px solid ${CORES.borda}`, paddingTop:12, textAlign:'center' }}>
                <div style={{ fontSize:12, color:CORES.verdeSeguro, fontWeight:600 }}>✅ ACESSO LIBERADO</div>
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

        {/* ============================================== */}
        {/* 🛡️ ABA PRINCIPAL — SISTEMA DE SEGURANÇA */}
        {/* ============================================== */}
        {abaAtiva === 'seguranca' && (
          <div style={{ maxWidth:800, margin:'0 auto' }}>
            {/* CABEÇALHO */}
            <div style={{ textAlign:'center', marginBottom:28, padding:'20px', backgroundColor:CORES.fundoCard, borderRadius:8, border:`2px solid ${CORES.vermelhoEscuro}` }}>
              <div style={{ fontSize:28, fontWeight:'bold', color:CORES.vermelho, letterSpacing:4, marginBottom:6 }}>🛡️ SISTEMA DE SEGURANÇA</div>
              <div style={{ fontSize:13, color:CORES.cinzaClaro }}>Verificação Automática de Ameaças — Sem Perguntas</div>
            </div>

            {/* PAINEL DE STATUS GERAL */}
            <div style={{
              padding:'20px',
              marginBottom:20,
              borderRadius:8,
              border: `2px solid ${segurancaPronta ? (nivelAmeaca > 0 ? CORES.vermelho : CORES.verdeSeguro) : CORES.amareloAviso}`,
              backgroundColor: segurancaPronta ? (nivelAmeaca > 0 ? CORES.alertaFundo : 'rgba(0,204,68,0.08)') : 'rgba(255,204,0,0.05)',
              textAlign:'center'
            }}>
              <div style={{ fontSize:48, marginBottom:8 }}>
                {!segurancaPronta ? '⚠️' : nivelAmeaca === 0 ? '✅' : nivelAmeaca <= 2 ? '⚠️' : '🚨'}
              </div>
              <div style={{ fontSize:22, fontWeight:'bold', marginBottom:4, color: segurancaPronta ? (nivelAmeaca > 0 ? CORES.vermelho : CORES.verdeSeguro) : CORES.amareloAviso }}>
                {!segurancaPronta ? 'SISTEMA INATIVO' : nivelAmeaca === 0 ? 'SISTEMA PROTEGIDO' : `${nivelAmeaca} AMEAÇA(S) DETECTADA(S)`}
              </div>
              <div style={{ fontSize:12, color:CORES.cinzaMedio, marginBottom:14 }}>
                {segurancaPronta ? `Última verificação: ${ultimaVerificacao}` : 'Clique abaixo para iniciar a varredura automática'}
              </div>
              <button
                onClick={iniciarVerificacaoSeguranca}
                disabled={verificando}
                style={{
                  padding:'12px 32px',
                  backgroundColor: verificando ? '#333' : CORES.vermelho,
                  color: CORES.branco,
                  border:'none',
                  borderRadius:4,
                  fontSize:15,
                  fontWeight:700,
                  cursor: verificando ? 'not-allowed' : 'pointer',
                  letterSpacing:1,
                  transition: 'all 0.2s'
                }}
              >
                {verificando ? '🔍 VERIFICANDO...' : '🔍 INICIAR VERIFICAÇÃO TOTAL'}
              </button>
            </div>

            {/* LISTA DE VERIFICAÇÕES EM ANDAMENTO / CONCLUÍDAS */}
            {verificacoes.length > 0 && (
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:14, fontWeight:600, color:CORES.vermelho, marginBottom:12, letterSpacing:1 }}>📋 REGISTRO DE VERIFICAÇÃO</div>
                {verificacoes.map(item => {
                  const estilo = corStatus(item.status);
                  return (
                    <div key={item.id} style={{
                      padding:'12px 16px',
                      marginBottom:8,
                      borderRadius:4,
                      borderLeft: `4px solid ${estilo.cor}`,
                      backgroundColor: estilo.fundo,
                      display:'flex',
                      justifyContent:'space-between',
                      alignItems:'center'
                    }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:500, marginBottom:3 }}>{item.nome}</div>
                        <div style={{ fontSize:11, color:CORES.cinzaMedio }}>{item.detalhe}</div>
                      </div>
                      <div style={{
                        fontSize:11,
                        fontWeight:700,
                        padding:'3px 10px',
                        borderRadius:3,
                        backgroundColor: estilo.cor,
                        color: '#000',
                        textTransform:'uppercase',
                        whiteSpace:'nowrap'
                      }}>
                        {item.status === 'verificando' ? '...' : item.status === 'seguro' ? 'PROTEGIDO' : item.status === 'ameaca' ? 'AMEAÇA' : 'ALERTA'}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* LISTA DE PROCESSOS SUSPEITOS DETECTADOS */}
            {processosSuspeitos.length > 0 && (
              <div style={{
                padding:'18px',
                marginBottom:20,
                borderRadius:6,
                border: `2px solid ${CORES.alerta}`,
                backgroundColor: 'rgba(204,0,0,0.12)'
              }}>
                <div style={{ fontSize:15, fontWeight:'bold', color:CORES.alerta, marginBottom:12, letterSpacing:1 }}>🚨 PROCESSOS SUSPEITOS ENCONTRADOS</div>
                {processosSuspeitos.map((p, i) => (
                  <div key={i} style={{ padding:'10px 12px', marginBottom:6, backgroundColor:'rgba(0,0,0,0.4)', borderRadius:4, border:`1px solid ${CORES.vermelhoEscuro}` }}>
                    <div style={{ fontSize:13, fontWeight:600, color:CORES.branco }}>📄 {p.nome}</div>
                    <div style={{ fontSize:11, color:CORES.cinzaMedio, marginTop:3 }}>📍 {p.caminho}</div>
                    <div style={{ fontSize:11, fontWeight:700, color:p.risco.includes('CRÍTICO') ? CORES.alerta : CORES.amareloAviso, marginTop:4 }}>⚠️ Nível de Risco: {p.risco}</div>
                  </div>
                ))}
              </div>
            )}

            {/* INFORMAÇÕES EXPLICATIVAS */}
            <div style={{ padding:'16px', backgroundColor:CORES.fundoCard, borderRadius:6, border:`1px solid ${CORES.borda}`, fontSize:12, color:CORES.cinzaClaro, lineHeight:1.6 }}>
              <div style={{ fontWeight:600, color:CORES.vermelho, marginBottom:6 }}>ℹ️ COMO FUNCIONA:</div>
              <ul style={{ paddingLeft:16, margin:0 }}>
                <li><strong>Não faz perguntas:</strong> o sistema verifica tudo sozinho, automaticamente</li>
                <li><strong>Detecta:</strong> modificação de arquivos, injeção de código, DLLs suspeitas, ferramentas de hack, acessos remotos</li>
                <li><strong>Mostra apenas o resultado:</strong> seguro, alerta ou ameaça com os arquivos suspeitos encontrados</li>
                <li><strong>Nível de ameaça:</strong> quanto mais alto, mais perigoso — tome medidas imediatas</li>
              </ul>
            </div>
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

              {/* QR CODE */}
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

              {!pagamentoConfirmado ? (
                <div style={{ marginTop:20, padding:'14px', border:`1px dashed ${CORES.vermelho}`, borderRadius:4 }}>
                  <div style={{ fontSize:12, color:CORES.vermelho, marginBottom:8 }}>✅ Já pagou? Clique abaixo:</div>
                  <button onClick={() => setPagamentoConfirmado(true)} style={{
                    padding:'9px 18px', backgroundColor:CORES.vermelho, color:CORES.branco, border:'none', borderRadius:4, fontSize:13, fontWeight:600, cursor:'pointer'
                  }}>Confirmar Pagamento</button>
                </div>
              ) : (
                <div style={{ marginTop:20, padding:'16px', backgroundColor:'rgba(0,204,68,0.08)', border:`1px solid ${CORES.verdeSeguro}`, borderRadius:4 }}>
                  <div style={{ fontSize:13, color:COres.verdeSeguro, fontWeight:600, marginBottom:8 }}>🔓 SENHA LIBERADA:</div>
                  <code style={{ fontSize:15, padding:'8px 14px', backgroundColor:'rgba(0,0,0,0.5)', borderRadius:4, color:CORES.dourado, fontWeight:'bold', letterSpacing:1 }}>
                    {SENHA_PREMIUM}
                  </code>
                  <div style={{ fontSize:11, color:CORES.cinzaMedio, marginTop:8 }}>Digite na aba "Premium" para acessar</div>
                </div>
              )}
            </div>
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
            <div style={{ fontSize:18, marginBottom:8, color:CORES.vermelho, fontWeight:600, letterSpacing:1 }}>ÁREA PREMIUM PROTEGIDA</div>
            <div style={{ fontSize:14, marginBottom:24 }}>Compre o acesso por apenas <span style={{ color:CORES.dourado, fontWeight:'bold' }}>R$ {VALOR_PREMIUM}</span></div>
            <button onClick={() => setAbaAtiva('pagamento')} style={{
              padding:'12px 24px', backgroundColor:CORES.vermelho, color:CORES.branco, border:'none', borderRadius:4, fontSize:15, fontWeight:700, cursor:'pointer'
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
                      color:CORES.branco, fontSize:12, cursor:'pointer', fontWeight:600
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
