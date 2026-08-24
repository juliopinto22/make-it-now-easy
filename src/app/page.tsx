'use client';

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
  return (
    <div style={{ backgroundColor: CORES.fundo, color: CORES.textoClaro, fontFamily: 'system-ui, sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* HEADER */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 8%', borderBottom: '1px solid ' + CORES.borda, backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(5,5,5,0.9)' }}>
        <div style={{ fontSize: 20, fontWeight: '900', color: CORES.vermelho, letterSpacing: 2, textShadow: '0 0 12px ' + CORES.vermelhoGlow }}>
          ⚡ OPTIMIZER KANEKI
        </div>
        
        <div style={{ display: 'flex', gap: 30, fontSize: 14, color: CORES.textoCinza }}>
          <a href="#recursos" style={{ color: 'inherit', textDecoration: 'none' }}>Recursos</a>
          <a href="#planos" style={{ color: 'inherit', textDecoration: 'none' }}>Planos</a>
        </div>

        <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
          <a href="#login" style={{ color: CORES.textoClaro, textDecoration: 'none', fontSize: 14 }}>Entrar</a>
          <a 
            href="#planos" 
            style={{ background: CORES.vermelho, color: '#FFF', textDecoration: 'none', padding: '10px 20px', borderRadius: 6, fontWeight: 'bold', boxShadow: '0 0 15px ' + CORES.vermelhoGlow, fontSize: 14 }}
          >
            Acessar Site
          </a>
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

          <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
            <a 
              href="#planos" 
              style={{ background: CORES.vermelho, color: '#FFF', textDecoration: 'none', padding: '16px 32px', borderRadius: 8, fontSize: 16, fontWeight: 'bold', boxShadow: '0 0 25px ' + CORES.vermelhoGlow, display: 'inline-block' }}
            >
              Acessar Site
            </a>

            <a 
              href="#planos" 
              style={{ background: CORES.card, color: CORES.textoClaro, textDecoration: 'none', border: '1px solid ' + CORES.borda, padding: '16px 28px', borderRadius: 8, fontSize: 16, display: 'inline-block' }}
            >
              Ver Planos Premium
            </a>
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

      {/* SEÇÃO DE PLANOS (FREE & PREMIUM) */}
      <section id="planos" style={{ padding: '80px 8%', borderTop: '1px solid ' + CORES.borda, background: 'rgba(10,0,0,0.6)' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12 }}>Escolha o seu Plano</h2>
          <p style={{ color: CORES.textoCinza, fontSize: 16 }}>Desbloqueie o máximo potencial do seu sistema com as opções abaixo.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 30, flexWrap: 'wrap', alignItems: 'stretch' }}>
          
          {/* PLANO FREE */}
          <div style={{ flex: '1 1 320px', maxWidth: 380, background: CORES.card, border: '1px solid ' + CORES.borda, borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, color: CORES.textoCinza, fontWeight: 'bold', marginBottom: 8 }}>GRÁTIS</div>
              <h3 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Plano Free</h3>
              <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 24 }}>R$ 0 <span style={{ fontSize: 14, color: CORES.textoCinza, fontWeight: 'normal' }}>/sempre</span></div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', lineHeight: '2.2', fontSize: 14, color: CORES.textoCinza }}>
                <li>✔ Otimização básica de Memória RAM</li>
                <li>✔ Limpeza de arquivos temporários</li>
                <li>✔ Desativação básica de telemetria</li>
                <li>✖ Sem tweaks avançados de GPU/CPU</li>
                <li>✖ Sem prioridade de processo em jogos</li>
              </ul>
            </div>

            <button style={{ width: '100%', background: 'transparent', color: CORES.textoClaro, border: '1px solid ' + CORES.borda, padding: '14px', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>
              Acessar Versão Free
            </button>
          </div>

          {/* PLANO PREMIUM */}
          <div style={{ flex: '1 1 320px', maxWidth: 380, background: CORES.card, border: '1px solid ' + CORES.vermelho, borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 0 30px ' + CORES.vermelhoGlow, position: 'relative' }}>
            
            <div style={{ position: 'absolute', top: -12, right: 20, background: CORES.vermelho, color: '#FFF', fontSize: 11, fontWeight: 'bold', padding: '4px 12px', borderRadius: 12, letterSpacing: 1 }}>
              MAIS POPULAR
            </div>

            <div>
              <div style={{ fontSize: 14, color: CORES.vermelho, fontWeight: 'bold', marginBottom: 8 }}>VIP ACCESS</div>
              <h3 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Plano Premium</h3>
              <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 24 }}>R$ 29,90 <span style={{ fontSize: 14, color: CORES.textoCinza, fontWeight: 'normal' }}>/mês</span></div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', lineHeight: '2.2', fontSize: 14, color: CORES.textoClaro }}>
                <li>✔ 150+ Tweaks avançados no Registro</li>
                <li>✔ Redução de Input Lag e Latência</li>
                <li>✔ Plano de Energia Kaneki Max Performance</li>
                <li>✔ Otimização exclusiva para GPU e CPU</li>
                <li>✔ Suporte VIP 24/7 e Atualizações Contínuas</li>
              </ul>
            </div>

            <button style={{ width: '100%', background: CORES.vermelho, color: '#FFF', border: 'none', padding: '14px', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 20px ' + CORES.vermelhoGlow }}>
              Assinar Premium Agora
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
