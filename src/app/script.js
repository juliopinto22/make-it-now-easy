'use client';

import { useState, useEffect } from 'react';

export default function PainelPage() {
  const [status, setStatus] = useState('');
  const [qrData, setQrData] = useState('');

  // ✅ CHAVE PIX — FICA ESCONDIDA, NÃO APARECE NA TELA
  useEffect(() => {
    const chavePix = "+55 11947138400";
    setQrData(chavePix);
  }, []);

  const comandos = {
    roblox: `:: Roblox FPS Boost — cole no Executor
FramerateLimit = 0
RenderingMode = "Automatic"
TextureQuality = "Plain"
PhysicsEnvironment = "Performance"`,
    valorant: `:: Valorant Tweaks
Configurações → Gráficos: TUDO BAIXO
Limitar FPS = DESLIGADO
Nvidia/AMD: Prioridade em DESEMPENHO`,
    sistema: `:: Limpeza do Sistema (cole no CMD como ADM)
ipconfig /flushdns
del /f /s /q %temp%\\*
cleanmgr /sagerun:1`
  };

  const copiarComando = (tipo) => {
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
    container: {
      background: 'linear-gradient(135deg, #2b003d, #4b0000)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      padding: '20px',
      fontFamily: "'Segoe UI', sans-serif"
    },
    caixa: {
      background: 'rgba(0,0,0,0.75)',
      border: '2px solid #990000',
      borderRadius: '15px',
      padding: '35px',
      maxWidth: '550px',
      width: '100%',
      boxShadow: '0 0 25px #660066'
    },
    titulo: { color: '#cc0000', textAlign: 'center', fontSize: '38px', marginBottom: '5px' },
    subtitulo: { color: '#cc66ff', textAlign: 'center', fontSize: '20px', marginBottom: '25px', letterSpacing: '2px' },
    grupo: { margin: '18px 0', padding: '15px', background: 'rgba(40,0,60,0.35)', borderRadius: '8px' },
    botao: { margin: '5px', padding: '10px 15px', background: 'linear-gradient(90deg, #660066, #990000)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: '0.3s' },
    voltarBtn: { background: '#770000', marginBottom: '15px', padding: '10px 15px', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    premium: { border: '2px solid #cc0000', background: 'rgba(80,0,80,0.4)', boxShadow: '0 0 15px #cc0000', marginTop: '25px', padding: '15px', borderRadius: '8px', textAlign: 'center' },
    qrImg: { width: '220px', height: '220px', borderRadius: '10px', border: '3px solid #990000', boxShadow: '0 0 20px #660066' },
    aviso: { color: '#eeccff', marginTop: '12px', fontSize: '14px' },
    statusTxt: { color: '#99ff99', marginTop: '15px', textAlign: 'center' }
  };

  return (
    <div style={estilo.container}>
      <div style={estilo.caixa}>
        <button style={estilo.voltarBtn} onClick={voltar}>← Voltar</button>
        <h1 style={estilo.titulo}>Painel</h1>
        <h2 style={estilo.subtitulo}>OPTIMIZER KANEKI</h2>

        <div style={estilo.grupo}>
          <h3>🎮 Roblox — Aumentar FPS</h3>
          <p>Flags rápidas e ajustes de desempenho</p>
          <button style={estilo.botao} onClick={() => copiarComando('roblox')}>Copiar Comandos</button>
        </div>

        <div style={estilo.grupo}>
          <h3>🔫 Valorant — Desempenho</h3>
          <p>Otimizações do sistema e jogo</p>
          <button style={estilo.botao} onClick={() => copiarComando('valorant')}>Copiar Comandos</button>
        </div>

        <div style={estilo.grupo}>
          <h3>🖥️ Sistema — Limpeza</h3>
          <p>Limpa cache, RAM e arquivos temporários</p>
          <button style={estilo.botao} onClick={() => copiarComando('sistema')}>Copiar Comandos</button>
        </div>

        {/* ✅ QR CODE CORRIGIDO — SEM BIBLIOTECA EXTERNA = SEM ERRO */}
        <div style={estilo.premium}>
          <h3 style={{color:'#ffcc00', fontSize:'22px'}}>👑 ÁREA PREMIUM</h3>
          
          {/* QR Code gerado automaticamente — CORES DO TEMA KANEKI */}
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=C80000&bgcolor=2A0033&data=${encodeURIComponent(qrData)}`}
            alt="QR Code PIX"
            style={estilo.qrImg}
          />
          
          <p style={estilo.aviso}>💳 Escaneie para pagamento via PIX</p>
          <p style={{color:'#999', fontSize:'11px', marginTop:'5px'}}>🔒 Chave protegida — apenas QR Code</p>
        </div>

        <p style={estilo.statusTxt}>{status}</p>
      </div>
    </div>
  );
}
