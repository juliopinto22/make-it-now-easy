'use client';

import { useState, useEffect } from 'react';

export default function PainelPage() {
  const [status, setStatus] = useState<string>('');
  const [qrData, setQrData] = useState<string>('');

  // ✅ CHAVE PIX — E-MAIL — FICA ESCONDIDA, NÃO APARECE NA TELA
  useEffect(() => {
    const chavePix = "julioserafim1234566@gmail.com";
    setQrData(chavePix);
  }, []);

  const comandos = {
    roblox: `:: Roblox FPS Boost — cole no Executor
FramerateLimit = 0
RenderingMode = "Automatic"
TextureQuality = "Plain"
PhysicsEnvironment = "Performance"`,
    valorant: `:: Valorant — Otimização
Configurações → Gráficos: TUDO BAIXO
Limitar FPS = DESLIGADO
Nvidia/AMD: Prioridade em DESEMPENHO`,
    sistema: `:: Limpeza do Sistema (cole no CMD como ADM)
ipconfig /flushdns
del /f /s /q %temp%\\*
cleanmgr /sagerun:1`
  };

  const copiarComando = (tipo: 'roblox' | 'valorant' | 'sistema') => {
    navigator.clipboard.writeText(comandos[tipo])
      .then(() => {
        setStatus('✅ Copiado com sucesso!');
        setTimeout(() => setStatus(''), 3000);
      });
  };

  const voltar = () => {
    window.location.href = '/';
  };

  const estilo = {
    corpo: {
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0000 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#e0e0e0',
      padding: '20px',
      fontFamily: "'Segoe UI', sans-serif"
    },
    caixa: {
      background: 'rgba(10, 10, 10, 0.92)',
      border: '1px solid #8b0000',
      borderRadius: '12px',
      padding: '32px',
      maxWidth: '520px',
      width: '100%',
      boxShadow: '0 0 30px rgba(139, 0, 0, 0.35), inset 0 0 60px rgba(0,0,0,0.8)'
    },
    titulo: { 
      color: '#ffffff', 
      textAlign: 'center' as const, 
      fontSize: '32px', 
      fontWeight: 300,
      letterSpacing: '4px',
      marginBottom: '4px'
    },
    subtitulo: { 
      color: '#990000', 
      textAlign: 'center' as const, 
      fontSize: '13px', 
      letterSpacing: '6px',
      textTransform: 'uppercase' as const,
      marginBottom: '28px',
      opacity: '0.85'
    },
    divisor: {
      width: '60px',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #8b0000, transparent)',
      margin: '0 auto 24px auto'
    },
    grupo: { 
      margin: '16px 0', 
      padding: '18px 20px', 
      background: 'rgba(25, 0, 0, 0.5)', 
      borderRadius: '6px',
      borderLeft: '2px solid #8b0000',
      transition: '0.2s'
    },
    h3: { 
      color: '#ffffff', 
      fontSize: '15px', 
      marginBottom: '6px',
      fontWeight: 500
    },
    p: { 
      color: '#999999', 
      fontSize: '13px', 
      marginBottom: '12px' 
    },
    botao: { 
      padding: '9px 16px', 
      background: 'transparent',
      color: '#cc3333', 
      border: '1px solid #8b0000', 
      borderRadius: '4px', 
      cursor: 'pointer', 
      fontSize: '13px',
      letterSpacing: '1px',
      transition: '0.25s',
      fontWeight: 500
    },
    voltarBtn: { 
      background: 'transparent', 
      border: '1px solid #333',
      color: '#777', 
      marginBottom: '18px', 
      padding: '8px 14px', 
      borderRadius: '4px', 
      cursor: 'pointer',
      fontSize: '12px',
      transition: '0.2s'
    },
    premium: { 
      marginTop: '28px', 
      padding: '22px', 
      background: 'rgba(20, 0, 0, 0.6)', 
      border: '1px solid #8b0000',
      borderRadius: '8px', 
      textAlign: 'center' as const 
    },
    premiumTitulo: {
      color: '#cc0000',
      fontSize: '14px',
      letterSpacing: '3px',
      textTransform: 'uppercase' as const,
      marginBottom: '16px'
    },
    qrImg: { 
      width: '200px', 
      height: '200px', 
      borderRadius: '6px', 
      border: '2px solid #330000', 
      boxShadow: '0 0 18px rgba(139, 0, 0, 0.45)'
    },
    aviso: { 
      color: '#996666', 
      marginTop: '12px', 
      fontSize: '12px',
      letterSpacing: '1px'
    },
    statusTxt: { 
      color: '#66cc66', 
      marginTop: '16px', 
      textAlign: 'center' as const,
      fontSize: '13px',
      height: '20px'
    }
  };

  return (
    <div style={estilo.corpo}>
      <div style={estilo.caixa}>
        <button style={estilo.voltarBtn} onClick={voltar}>← Voltar</button>
        
        <h1 style={estilo.titulo}>KANEKI</h1>
        <p style={estilo.subtitulo}>OPTIMIZER</p>
        <div style={estilo.divisor}></div>

        <div style={estilo.grupo}>
          <h3 style={estilo.h3}>🎮 Roblox — Aumentar FPS</h3>
          <p style={estilo.p}>Desempenho máximo e taxa de quadros ilimitada</p>
          <button style={estilo.botao} onClick={() => copiarComando('roblox')}>Copiar Comandos</button>
        </div>

        <div style={estilo.grupo}>
          <h3 style={estilo.h3}>🔫 Valorant — Otimização</h3>
          <p style={estilo.p}>Melhor resposta e estabilidade de quadros</p>
          <button style={estilo.botao} onClick={() => copiarComando('valorant')}>Copiar Comandos</button>
        </div>

        <div style={estilo.grupo}>
          <h3 style={estilo.h3}>🖥️ Sistema — Limpeza</h3>
          <p style={estilo.p}>Libera RAM, cache e arquivos temporários</p>
          <button style={estilo.botao} onClick={() => copiarComando('sistema')}>Copiar Comandos</button>
        </div>

        {/* ✅ QR CODE CORRIGIDO + CHAVE PIX NO E-MAIL */}
        <div style={estilo.premium}>
          <h3 style={estilo.premiumTitulo}>👑 Área Premium</h3>
          
          {qrData && (
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=8B0000&bgcolor=0F0505&data=${encodeURIComponent(qrData)}`}
              alt="QR Code PIX"
              style={estilo.qrImg}
            />
          )}
          
          <p style={estilo.aviso}>💳 PIX via e-mail — escaneie para pagamento</p>
          <p style={{color:'#555', fontSize:'11px', marginTop:'6px'}}>🔒 Chave protegida</p>
        </div>

        <p style={estilo.statusTxt}>{status}</p>
      </div>
    </div>
  );
}
