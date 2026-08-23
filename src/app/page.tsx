'use client';

import React, { useState } from 'react';

export default function App() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const KANEKI_AVATAR = 'https://images.alphacoders.com/554/thumb-1920-554270.jpg';
  const KANEKI_BG = 'https://images.alphacoders.com/605/thumb-1920-605782.png';

  const handleVerify = () => {
    if (!acceptedTerms) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1200);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1800);
  };

  const freeOptimizations = [
    // --- OTIMIZAÇÕES ANTERIORES (20) ---
    { category: 'NETWORK', title: 'Flush DNS', desc: 'Limpa rotas e cache de IP acumulados.', cmd: 'ipconfig /flushdns' },
    { category: 'NETWORK', title: 'Renovar IP Local', desc: 'Solicita um novo IP para a placa de rede.', cmd: 'ipconfig /renew' },
    { category: 'NETWORK', title: 'Resetar Winsock', desc: 'Restaura a biblioteca de conexões do Windows.', cmd: 'netsh winsock reset' },
    { category: 'NETWORK', title: 'Reset TCP/IP', desc: 'Reseta o protocolo de rede padrão.', cmd: 'netsh int ip reset' },
    { category: 'NETWORK', title: 'Desativar Chimney', desc: 'Elimina picos de latência em jogos.', cmd: 'netsh int tcp set global chimney=disabled' },

    { category: 'GAMING', title: 'Desativar GameDVR', desc: 'Remove o gravador em segundo plano do Windows.', cmd: 'reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR" /v "AllowGameDVR" /t REG_DWORD /d 0 /f' },
    { category: 'GAMING', title: 'Modo de Jogo UI', desc: 'Abre a central para ativar a prioridade de GPU.', cmd: 'start ms-settings:gaming-gamemode' },
    { category: 'GAMING', title: 'Plano Desempenho Máximo', desc: 'Habilita o perfil oculto de energia no sistema.', cmd: 'powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61' },
    { category: 'GAMING', title: 'Desativar Hibernação', desc: 'Economiza espaço e reduz leituras no SSD.', cmd: 'powercfg /hibernate off' },
    { category: 'GAMING', title: 'Painel DirectX', desc: 'Diagnóstico rápido da placa de vídeo.', cmd: 'dxdiag' },

    { category: 'CLEAN', title: 'Pasta Temp Global', desc: 'Abre o diretório temporário do sistema.', cmd: 'temp' },
    { category: 'CLEAN', title: 'Pasta Temp Usuário', desc: 'Abre o cache temporário de programas.', cmd: 'shell:Local AppData\\Temp' },
    { category: 'CLEAN', title: 'Prefetch Cache', desc: 'Abre a pasta de pré-inicialização do Windows.', cmd: 'prefetch' },
    { category: 'CLEAN', title: 'Limpeza de Disco', desc: 'Executa a ferramenta oficial de remoção de lixo.', cmd: 'cleanmgr' },
    { category: 'CLEAN', title: 'Reset Store Cache', desc: 'Limpa o cache acumulado da Microsoft Store.', cmd: 'wsreset.exe' },

    { category: 'SYSTEM', title: 'Reparar Arquivos SFC', desc: 'Corrige arquivos corrompidos do sistema.', cmd: 'sfc /scannow' },
    { category: 'SYSTEM', title: 'Imagem DISM', desc: 'Restaura a imagem base do Windows.', cmd: 'DISM /Online /Cleanup-Image /RestoreHealth' },
    { category: 'SYSTEM', title: 'Efeitos Visuais', desc: 'Abre o painel de ajuste de desempenho visual.', cmd: 'SystemPropertiesPerformance' },
    { category: 'SYSTEM', title: 'Programas de Início', desc: 'Gerencie apps que iniciam com o PC.', cmd: 'msconfig' },
    { category: 'SYSTEM', title: 'Serviços do Windows', desc: 'Abre a lista de serviços para otimização manual.', cmd: 'services.msc' },

    // --- NOVAS 20 OPÇÕES SEGURAS ---
    { category: 'NETWORK', title: 'Limpar Tabela ARP', desc: 'Reseta o mapeamento de endereços IP locais da rede.', cmd: 'arp -d *' },
    { category: 'NETWORK', title: 'Ativar Autotuning TCP', desc: 'Garante que a taxa de download e upload opere no máximo.', cmd: 'netsh int tcp set global autotuninglevel=normal' },
    { category: 'NETWORK', title: 'Painel de Adaptadores', desc: 'Atalho direto para trocar o DNS rapidamente.', cmd: 'ncpa.cpl' },

    { category: 'GAMING', title: 'Configurações de Exibição', desc: 'Painel para verificar e ajustar a taxa de atualização (Hz).', cmd: 'start ms-settings:display' },
    { category: 'GAMING', title: 'Configurações de GPU', desc: 'Atalho para ativar o agendamento de GPU (HAGS).', cmd: 'start ms-settings:display-advancedgraphics' },
    { category: 'GAMING', title: 'Gerenciador de Tarefas', desc: 'Defina a prioridade de CPU dos jogos manualmente.', cmd: 'taskmgr' },

    { category: 'CLEAN', title: 'Abrir Lixeira', desc: 'Acesso direto para esvaziar a Lixeira do sistema.', cmd: 'explorer.exe shell:RecycleBinFolder' },
    { category: 'CLEAN', title: 'Cache do Explorador', desc: 'Abre a pasta de dados recentes do Windows Explorer.', cmd: 'shell:recent' },
    { category: 'CLEAN', title: 'Cache de Icones', desc: 'Reconstrói o cache visual do sistema operacional.', cmd: 'ie4uinit.exe -Show' },
    { category: 'CLEAN', title: 'Armazenamento UI', desc: 'Painel nativo do Windows para apagar arquivos temporários.', cmd: 'start ms-settings:storagesense' },

    { category: 'SYSTEM', title: 'Otimizar Discos/SSD', desc: 'Executa a ferramenta nativa de otimização TRIM e desfragmentação.', cmd: 'dfrgui' },
    { category: 'SYSTEM', title: 'Informações do Sistema', desc: 'Exibe especificações completas de processador, RAM e BIOS.', cmd: 'msinfo32' },
    { category: 'SYSTEM', title: 'Monitor de Recursos', desc: 'Acompanhe consumo de memória e disco em tempo real.', cmd: 'resmon' },
    { category: 'SYSTEM', title: 'Gerenciador de Dispositivos', desc: 'Verifique se há drivers de vídeo ou rede desatualizados.', cmd: 'devmgmt.msc' },
    { category: 'SYSTEM', title: 'Adicionar/Remover Programas', desc: 'Painel direto para desinstalar softwares pesados.', cmd: 'appwiz.cpl' },
    { category: 'SYSTEM', title: 'Propriedades do Sistema', desc: 'Acesso rápido para ajustar a Memória Virtual (Paging).', cmd: 'sysdm.cpl' },
    { category: 'SYSTEM', title: 'Visualizador de Eventos', desc: 'Ferramenta oficial para diagnosticar erros no Windows.', cmd: 'eventvwr.msc' },
    { category: 'SYSTEM', title: 'Gerenciamento de Disco', desc: 'Verifique a saúde e a partição das suas unidades.', cmd: 'diskmgmt.msc' },
    { category: 'SYSTEM', title: 'Regras do Firewall', desc: 'Painel nativo para liberar ou bloquear portas de jogos.', cmd: 'wf.msc' },
    { category: 'SYSTEM', title: 'Painel de Controle Tradicional', desc: 'Acesso direto às configurações clássicas do sistema.', cmd: 'control' }
  ];

  const filtered = freeOptimizations.filter(i => 
    i.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    i.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  if (!verified) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url(${KANEKI_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(10, 10, 10, 0.9)',
          border: '1px solid rgba(220, 38, 38, 0.4)',
          padding: '30px',
          borderRadius: '16px',
          textAlign: 'center',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 0 30px rgba(220, 38, 38, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto 15px auto',
            border: '2px solid #dc2626',
            boxShadow: '0 0 15px rgba(220,38,38,0.5)'
          }}>
            <img src={KANEKI_AVATAR} alt="Kaneki" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '2px', marginBottom: '4px', color: '#fff' }}>
            OPTIMIZER KANEKI
          </h2>
          <p style={{ fontSize: '11px', color: '#888', marginBottom: '20px' }}>
            Verificação de Segurança & Termos
          </p>

          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '11px',
            color: '#a3a3a3',
            textAlign: 'left',
            lineHeight: '1.4',
            maxHeight: '110px',
            overflowY: 'auto',
            marginBottom: '15px'
          }}>
            <strong style={{ color: '#dc2626' }}>AVISO DE DIREITOS AUTORAIS E ISENÇÃO:</strong><br />
            1. As imagens e referências pertencem a Sui Ishida / Tokyo Ghoul.<br />
            2. Este projeto é de uso educacional e informativo.<br />
            3. Os comandos fornecidos utilizam recursos nativos do sistema operacional. Use por sua conta e risco.
          </div>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#ccc',
            marginBottom: '20px',
            cursor: 'pointer',
            textAlign: 'left'
          }}>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              style={{ accentColor: '#dc2626', cursor: 'pointer' }}
            />
            Li e concordo com os termos e avisos.
          </label>

          <button
            onClick={handleVerify}
            disabled={!acceptedTerms || verifying}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              background: !acceptedTerms ? '#222' : (verifying ? '#333' : '#dc2626'),
              border: 'none',
              color: !acceptedTerms ? '#555' : '#fff',
              fontWeight: 'bold',
              fontSize: '13px',
              letterSpacing: '1px',
              cursor: !acceptedTerms ? 'not-allowed' : (verifying ? 'wait' : 'pointer'),
              transition: '0.2s',
              boxShadow: !acceptedTerms ? 'none' : '0 0 15px rgba(220, 38, 38, 0.4)'
            }}
          >
            {verifying ? 'VERIFICANDO...' : 'ACESSAR PAINEL'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#e5e5e5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <aside style={{
        width: collapsed ? '70px' : '220px',
        backgroundColor: '#050505',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px 12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.25s ease',
        zIndex: 10
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '30px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            paddingLeft: collapsed ? '0' : '5px'
          }}>
            <img
              src={KANEKI_AVATAR}
              alt="Kaneki"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid #dc2626',
                objectFit: 'cover'
              }}
            />
            {!collapsed && (
              <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1px', color: '#fff' }}>
                OPTIMIZER <span style={{ color: '#dc2626' }}>KANEKI</span>
              </span>
            )}
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(220, 38, 38, 0.12)',
                color: '#dc2626',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                justifyContent: collapsed ? 'center' : 'flex-start'
              }}
            >
              <span style={{ fontSize: '16px' }}>⚡</span>
              {!collapsed && <span>Otimizações Free ({filtered.length})</span>}
            </button>
          </nav>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#a3a3a3',
            borderRadius: '6px',
            padding: '8px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          {collapsed ? '➔' : '⬅ Recolher'}
        </button>
      </aside>

      <main style={{ flex: 1, padding: '35px 40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', margin: 0 }}>
              Optimizer Kaneki
            </h1>
            <p style={{ fontSize: '13px', color: '#525252', margin: '4px 0 0 0' }}>
              Comandos nativos, seguros e de alto desempenho
            </p>
          </div>

          <input
            type="text"
            placeholder="Filtrar ajuste..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '13px',
              outline: 'none',
              width: '200px'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {filtered.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#050505',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '16px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '10px', color: '#dc2626', fontWeight: 'bold', letterSpacing: '1px' }}>
                    {item.category}
                  </span>
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#fff', margin: '0 0 4px 0' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '12px', color: '#666', margin: 0, lineHeight: '1.4' }}>
                  {item.desc}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#000',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.04)'
              }}>
                <code style={{ fontSize: '11px', color: '#a3a3a3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>
                  {item.cmd}
                </code>
                <button
                  onClick={() => handleCopy(item.cmd)}
                  style={{
                    background: copiedText === item.cmd ? '#dc2626' : 'transparent',
                    border: 'none',
                    color: copiedText === item.cmd ? '#fff' : '#dc2626',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    transition: '0.15s'
                  }}
                >
                  {copiedText === item.cmd ? 'COPIADO' : 'COPIAR'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
