'use client';

// URL direta de fundo para evitar o problema da caixa preta por imagem ausente
const IMG_HERO_APP = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop';

const CORES = {
  fundo: '#050505',
  card: 'rgba(15, 15, 15, 0.85)',
  vermelho: '#E40200',
  vermelhoGlow: 'rgba(228, 2, 0, 0.4)',
  vermelhoEscuro: '#7A0000',
  textoClaro: '#F0F0F0',
  textoCinza: '#999999',
  verdeGanho: '#00FF66',
  borda: '#220808',
};

export default function Home() {
  const jogos = [
    { nome: 'Valorant', sem: '180 FPS', com: '280 FPS', ganho: '+55%' },
    { nome: 'League of Legends', sem: '210 FPS', com: '320 FPS', ganho: '+52%' },
    { nome: 'CS2', sem: '120 FPS', com: '185 FPS', ganho: '+54%' },
    { nome: 'GTA V / FiveM', sem: '75 FPS', com: '115 FPS', ganho: '+53%' },
  ];

  return (
    <div style={{ backgroundColor: CORES.fundo, color: CORES.textoClaro, fontFamily: 'system-ui, sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* HEADER */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 8%', borderBottom: '1px solid ' + CORES.borda, backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(5,5,5,0.9)' }}>
        <div style={{ fontSize: 20, fontWeight: '900', color: CORES.vermelho, letterSpacing: 2, textShadow: '0 0 12px ' + CORES.vermelhoGlow }}>
          ⚡ OPTIMIZER KANEKI
        </div>
        
        <div style={{ display: 'flex', gap: 30, fontSize: 14, color: CORES.textoCinza }}>
          <a href="#recursos" style={{ color: 'inherit', textDecoration: 'none' }}>Recursos</a>
          <a href="#benchmarks" style={{ color: 'inherit', textDecoration: 'none' }}>Desempenho</a>
          <a href="#precos" style={{ color: 'inherit', textDecoration: 'none' }}>Planos</a>
        </div>

        <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
          <button style={{ background: 'transparent', border: 'none', color: CORES.textoClaro, cursor: 'pointer', fontSize: 14 }}>Entrar</button>
          <button style={{ background: CORES.vermelho, color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 15px ' + CORES.vermelhoGlow }}>
            Baixar Agora
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '80px 8%', gap: 40, flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1 1 500px', maxWidth: 600 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(228, 2, 0, 0.1)', border: '1px solid ' + CORES.vermelhoEscuro, padding: '6px 16px', borderRadius: 20, fontSize: 12, color: CORES.vermelho, fontWeight: 'bold', marginBottom: 24 }}>
            ⚡ ACABE COM O LAG E OS TRAVAMENTOS AGORA
          </div>

          <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: -1 }}>
            Otimize seu PC <br />
            <span style={{ color: CORES.vermelho, textShadow: '0 0 20px ' + CORES.vermelhoGlow }}>com 1 clique.</span>
          </h1>

          <p style={{ fontSize: 16, color: CORES.textoCinza, lineHeight: 1.6, marginBottom: 32 }}>
            Aumente seu FPS e reduza o input lag com otimizações inteligentes, automáticas e 100% reversíveis. Sem comandos complicados, sem risco.
          </p>

          <div style={{ display: 'flex', gap: 16, marginBottom: 40 }}>
            <button style={{ background: CORES.vermelho, color: '#FFF', border: 'none', padding: '16px 32px', borderRadius: 8, fontSize: 16, fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 25px ' + CORES.vermelhoGlow }}>
              Download Grátis
            </button>
            <button style={{ background: CORES.card, color: CORES.textoClaro, border: '1px solid ' + CORES.borda, padding: '16px 28px', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
              Ver Planos Premium
            </button>
          </div>

          <div style={{ display: 'flex', gap: 35, borderTop: '1px solid ' + CORES.borda, paddingTop: 25 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: CORES.vermelho }}>↓ 15ms</div>
              <div style={{ fontSize: 12, color: CORES.textoCinza, marginTop: 4 }}>Redução de latência</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: CORES.vermelho }}>↑ 35%</div>
              <div style={{ fontSize: 12, color: CORES.textoCinza, marginTop: 4 }}>Mais estabilidade</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 'bold', color: CORES.vermelho }}>↑ 45%</div>
              <div style={{ fontSize: 12, color: CORES.textoCinza, marginTop: 4 }}>Boot mais rápido</div>
            </div>
          </div>
        </div>

        {/* MOCKUP CARD */}
        <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 580, background: CORES.card, border: '1px solid ' + CORES.vermelhoEscuro, borderRadius: 12, padding: 20, boxShadow: '0 0 40px rgba(0,0,0,0.8), 0 0 20px ' + CORES.vermelhoGlow }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, borderBottom: '1px solid ' + CORES.borda, paddingBottom: 10 }}>
              <span style={{ fontSize: 12, color: CORES.textoCinza }}>OPTIMIZER KANEKI — Dashboard</span>
              <span style={{ fontSize: 11, background: CORES.vermelho, padding: '2px 8px', borderRadius: 4, fontWeight: 'bold' }}>SISTEMA PRONTO</span>
            </div>

            <div style={{ height: 260, borderRadius: 8, backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), transparent), url(${IMG_HERO_APP})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', padding: 20 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 'bold', textShadow: '0 0 10px #000' }}>PC Otimizado com Sucesso</div>
                <div style={{ fontSize: 12, color: CORES.verdeGanho, marginTop: 4 }}>✔ 150+ Tweaks de Registro Aplicados</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 15 }}>
              <div style={{ background: '#000', padding: 12, borderRadius: 6, border: '1px solid ' + CORES.borda }}>
                <div style={{ fontSize: 11, color: CORES.textoCinza }}>GPU Throttling</div>
                <div style={{ fontSize: 13, fontWeight: 'bold', color: CORES.vermelho, marginTop: 2 }}>DESATIVADO</div>
              </div>
              <div style={{ background: '#000', padding: 12, borderRadius: 6, border: '1px solid ' + CORES.borda }}>
                <div style={{ fontSize: 11, color: CORES.textoCinza }}>Plano de Energia</div>
                <div style={{ fontSize: 13, fontWeight: 'bold', color: CORES.verdeGanho, marginTop: 2 }}>DESEMPENHO MÁXIMO</div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* BENCHMARKS */}
      <section id="benchmarks" style={{ padding: '60px 8%', background: 'rgba(10,0,0,0.5)', borderTop: '1px solid ' + CORES.borda }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 32, fontWeight: 'bold', margin: '0 0 10px 0' }}>Ganho de FPS em Jogos Populares</h2>
          <p style={{ color: CORES.textoCinza, fontSize: 14 }}>Resultados medidos em PCs de entrada e intermediários no Brasil.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {jogos.map((jogo, index) => (
            <div key={index} style={{ background: CORES.card, border: '1px solid ' + CORES.borda, borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 15px 0', fontSize: 18, color: CORES.textoClaro }}>{jogo.nome}</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: CORES.textoCinza, marginBottom: 8 }}>
                <span>Sem Optimizer:</span>
                <span style={{ textDecoration: 'line-through' }}>{jogo.sem}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 'bold', color: CORES.verdeGanho, marginBottom: 12 }}>
                <span>Com Optimizer:</span>
                <span>{jogo.com}</span>
              </div>

              <div style={{ background: 'rgba(0,255,102,0.1)', color: CORES.verdeGanho, padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 'bold', display: 'inline-block' }}>
                {jogo.ganho} de Desempenho
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
