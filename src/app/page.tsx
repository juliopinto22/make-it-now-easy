'use client';

import { useState, useEffect } from 'react';

const SENHA_ADMINISTRADOR = 'JulioKaneki999';
const SENHA_PREMIUM = 'Pagamento@2026';
const VERSAO_APP = '2.0.0';

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('free');
  const [adminLiberado, setAdminLiberado] = useState(false);
  const [premiumLiberado, setPremiumLiberado] = useState(false);
  const [senha, setSenha] = useState('');
  const [tipoSenha, setTipoSenha] = useState<'admin' | 'premium' | null>(null);
  const [aviso, setAviso] = useState('');
  const [status, setStatus] = useState('');
  const [sidebarAberta, setSidebarAberta] = useState(true);

  useEffect(() => {
    setTimeout(() => setCarregando(false), 1500);
  }, []);

  const verificarSenha = () => {
    if (tipoSenha === 'admin' && senha === SENHA_ADMINISTRADOR) {
      setAdminLiberado(true);
      setAviso('✅ Acesso Administrador liberado!');
    } else if (tipoSenha === 'premium' && senha === SENHA_PREMIUM) {
      setPremiumLiberado(true);
      setAviso('✅ Acesso Premium liberado!');
    } else {
      setAviso('❌ Senha incorreta!');
    }
    setSenha('');
  };

  const copiar = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setStatus('✅ Comando copiado! Cole no CMD como ADMINISTRADOR!');
    setTimeout(() => setStatus(''), 3500);
  };

  const getCorPerigo = (nivel: string) => {
    switch (nivel) {
      case 'baixo': return '#00ff88';
      case 'médio': return '#ffcc00';
      case 'alto': return '#ff4444';
      default: return '#888888';
    }
  };

  const otimizacoesFree = [
    { id: 1, nome: 'Limpar DNS', cmd: 'ipconfig /flushdns', perigo: 'baixo' },
    { id: 2, nome: 'Renovar DNS', cmd: 'ipconfig /registerdns', perigo: 'baixo' },
    { id: 3, nome: 'Liberar DNS', cmd: 'ipconfig /release', perigo: 'médio' },
    { id: 4, nome: 'Obter novo IP', cmd: 'ipconfig /renew', perigo: 'médio' },
    { id: 5, nome: 'Parar atualização Windows', cmd: 'net stop wuauserv', perigo: 'médio' },
    { id: 6, nome: 'Desativar atualização', cmd: 'sc config "wuauserv" start= disabled', perigo: 'alto' },
    { id: 7, nome: 'Limpar arquivos temporários', cmd: 'del /f /s /q %temp%\\*', perigo: 'médio' },
    { id: 8, nome: 'Limpar pasta Temp do Windows', cmd: 'del /f /s /q C:\\Windows\\Temp\\*', perigo: 'alto' },
    { id: 9, nome: 'Limpar cache Prefetch', cmd: 'del /f /s /q C:\\Windows\\Prefetch\\*', perigo: 'alto' },
    { id: 10, nome: 'Ativar Plano Alto Desempenho', cmd: 'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c', perigo: 'médio' },
    { id: 11, nome: 'Desativar Hibernação', cmd: 'powercfg /hibernate off', perigo: 'médio' },
    { id: 12, nome: 'Desligar economia de energia disco', cmd: 'powercfg /change disk-timeout-ac 0', perigo: 'médio' },
    { id: 13, nome: 'Desativar suspensão automática', cmd: 'powercfg /change standby-timeout-ac 0', perigo: 'médio' },
    { id: 14, nome: 'Desativar proteção DEP', cmd: 'bcdedit /set nx AlwaysOff', perigo: 'alto' },
    { id: 15, nome: 'Inicialização rápida do sistema', cmd: 'bcdedit /set bootmenupolicy legacy', perigo: 'alto' },
    { id: 16, nome: 'Usar todos os núcleos no boot', cmd: 'bcdedit /set {current} numproc %NUMBER_OF_PROCESSORS%', perigo: 'alto' },
    { id: 17, nome: 'Remover limite de memória boot', cmd: 'bcdedit /deletevalue {current} truncatememory', perigo: 'alto' },
    { id: 18, nome: 'Limpar logs do sistema', cmd: 'for /f "tokens=*" %i in (wevtutil el) do wevtutil cl "%i"', perigo: 'alto' },
    { id: 19, nome: 'Parar serviço Superfetch', cmd: 'net stop SysMain', perigo: 'médio' },
    { id: 20, nome: 'Desativar Superfetch', cmd: 'sc config SysMain start= disabled', perigo: 'alto' },
    { id: 21, nome: 'Parar busca do Windows', cmd: 'net stop WSearch', perigo: 'médio' },
    { id: 22, nome: 'Desativar serviço de busca', cmd: 'sc config WSearch start= disabled', perigo: 'alto' },
    { id: 23, nome: 'Limpar fila de impressão', cmd: 'net stop spooler & del /f /s /q %systemroot%\\System32\\spool\\PRINTERS\\*', perigo: 'médio' },
    { id: 24, nome: 'Desativar compartilhamento de arquivos', cmd: 'netsh advfirewall firewall set rule group="Arquivos e Impressoras Compartilhados" new enable=No', perigo: 'alto' }
  ];

  const otimizacoesPremium = [
    { id: 1, nome: 'Desativar isolamento de segurança', cmd: 'bcdedit /set vsmlaunchoff', perigo: 'alto' },
    { id: 2, nome: 'Desligar segurança de memória', cmd: 'reg add "HKLM\\System\\CurrentControlSet\\Control\\DeviceGuard" /v EnableVirtualizationBasedSecurity /t REG_DWORD /d 0 /f', perigo: 'alto' },
    { id: 3, nome: 'Desativar HVCI (GANHO FPS)', cmd: 'reg add "HKLM\\System\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity" /v Enabled /t REG_DWORD /d 0 /f', perigo: 'alto' },
    { id: 4, nome: 'Desativar virtualização', cmd: 'bcdedit /set hypervisorlaunchtype off', perigo: 'alto' },
    { id: 5, nome: 'Desativar proteção DMA', cmd: 'bcdedit /set disablepcie /d 1', perigo: 'alto' },
    { id: 6, nome: 'Aumentar memória boot', cmd: 'bcdedit /set increaseuserva 3072', perigo: 'alto' },
    { id: 7, nome: 'Remover limite memória kernel', cmd: 'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v NonPagedPoolQuota /t REG_DWORD /d 0 /f', perigo: 'alto' },
    { id: 8, nome: 'Ativar páginas grandes', cmd: 'reg add "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v LargePageMinimum /t REG_DWORD /d 1048576 /f', perigo: 'alto' },
    { id: 9, nome: 'CPU desempenho máximo', cmd: 'powercfg /setacvalueindex scheme_current sub_processor 5d76a2ca-e8c0-402f-a133-215449555648 100', perigo: 'alto' },
    { id: 10, nome: 'Desligar economia CPU', cmd: 'powercfg /setacvalueindex scheme_current sub_processor 619b7950-5c8e-4a3c-94c3-5e6b0cd31681 100', perigo: 'alto' },
    { id: 11, nome: 'Desligar C-States CPU', cmd: 'powercfg /setacvalueindex scheme_current sub_processor 891808d9-0ce9-4296-9120-2de96084e49f 0', perigo: 'alto' },
    { id: 12, nome: 'Latência mínima CPU', cmd: 'powercfg /setacvalueindex scheme_current sub_processor 5d76a2ca-e8c0-402f-a133-215449555648 100', perigo: 'alto' },
    { id: 13, nome: 'Frequência mínima 100%', cmd: 'powercfg /setacvalueindex scheme_current sub_processor 891808d9-0ce9-4296-9120-2de96084e49f 100', perigo: 'alto' },
    { id: 14, nome: 'Desbloquear desempenho', cmd: 'powercfg /setacvalueindex scheme_current sub_processor 75b0ae15-98b7-4ac1-a492-8e0c3d14c201 100', perigo: 'alto' },
    { id: 15, nome: 'Desativar controle térmico', cmd: 'reg add "HKLM\\System\\CurrentControlSet\\Services\\Power\\Throttling" /v DisableThermalThrottling /t REG_DWORD /d 1 /f', perigo: 'alto' },
    { id: 16, nome: 'Latência rede zero', cmd: 'netsh int tcp set global timestamps=disabled', perigo: 'alto' },
    { id: 17, nome: 'Resposta TCP rápida', cmd: 'netsh int tcp set global delayedacktimeout=10', perigo: 'alto' },
    { id: 18, nome: 'Congestionamento otimizado', cmd: 'netsh int tcp set global congestionprovider=dctcp', perigo: 'alto' },
    { id: 19, nome: 'Sem limite conexões', cmd: 'reg add "HKLM\\System\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpMaxConnections /t REG_DWORD /d 4294967295 /f', perigo: 'alto' },
    { id: 20, nome: 'Cache DNS permanente', cmd: 'reg add "HKLM\\System\\CurrentControlSet\\Services\\Dnscache\\Parameters" /v MaxCacheTtl /t REG_DWORD /d 86400 /f', perigo: 'alto' }
  ];

  if (carregando) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#0f0f23', color: '#fff', fontSize: '22px' }}>
        ⏳ Carregando Optimizador do Julio...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f0f23', color: '#fff' }}>
      <aside style={{
        width: sidebarAberta ? '260px' : '60px',
        backgroundColor: '#1a1a30',
        borderRight: '2px solid #ff2e63',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <div style={{ padding: '12px' }}>
          <button
            onClick={() => setSidebarAberta(!sidebarAberta)}
            style={{
              width: '100%', padding: '10px', backgroundColor: '#ff2e63',
              color: '#fff', border: 'none', borderRadius: '6px',
              cursor: 'pointer', fontSize: '16px', marginBottom: '15px'
            }}
          >
            {sidebarAberta ? '◀' : '▶'}
          </button>

          {sidebarAberta && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#ff2e63', fontSize: '18px', margin: 0 }}>🔥 OPTIMIZADOR</h2>
                <p style={{ fontSize: '12px', color: '#888', margin: '4px 0' }}>v{VERSAO_APP}</p>
                <p style={{ fontSize: '11px', color: '#666' }}>por Julio</p>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => setAbaAtiva('free')}
                  style={{
                    padding: '10px', textAlign: 'left', background: abaAtiva === 'free' ? '#2a2a4a' : 'transparent',
                    border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer'
                  }}
                >
                  🆓 Gratuitas ({otimizacoesFree.length})
                </button>
                <button
                  onClick={() => setAbaAtiva('premium')}
                  style={{
                    padding: '10px', textAlign: 'left', background: abaAtiva === 'premium' ? '#2a2a4a' : 'transparent',
                    border: 'none', borderRadius: '6px', color: premiumLiberado || adminLiberado ? '#fff' : '#888',
                    cursor: 'pointer'
                  }}
                >
                  ⭐ Premium ({otimizacoesPremium.length})
                  {!premiumLiberado && !adminLiberado && <span style={{ fontSize: '10px', marginLeft: 6 }}>🔒</span>}
                </button>
              </nav>

              {!adminLiberado && !premiumLiberado && (
                <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#252545', borderRadius: '8px' }}>
                  <p style={{ fontSize: '12px', marginBottom: 8, color: '#ccc' }}>🔑 Digite a senha:</p>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Senha..."
                    style={{
                      width: '100%', padding: '8px', marginBottom: 8,
                      backgroundColor: '#1a1a30', border: '1px solid #444',
                      borderRadius: '4px', color: '#fff', fontSize: '13px'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '6px', marginBottom: 8 }}>
                    <button
                      onClick={() => { setTipoSenha('admin'); verificarSenha(); }}
                      style={{ flex: 1, padding: '6px', backgroundColor: '#7b2ffd', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '12px', cursor: 'pointer' }}
                    >Admin</button>
                    <button
                      onClick={() => { setTipoSenha('premium'); verificarSenha(); }}
                      style={{ flex: 1, padding: '6px', backgroundColor: '#ff2e63', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '12px', cursor: 'pointer' }}
                    >Premium</button>
                  </div>
                  {aviso && <p style={{ fontSize: '11px', color: aviso.startsWith('✅') ? '#00ff88' : '#ff6666' }}>{aviso}</p>}
                </div>
              )}
            </>
          )}
        </div>
      </aside>

      <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {status && (
          <div style={{
            position: 'fixed', top: 15, right: 15, padding: '12px 20px',
            backgroundColor: 'rgba(0,255,136,0.15)', border: '1px solid #00ff88',
            borderRadius: '8px', color: '#00ff88', fontSize: '13px', zIndex: 999
          }}>{status}</div>
        )}

        <h1 style={{ color: '#ff2e63', marginBottom: '20px', fontSize: '22px' }}>
          {abaAtiva === 'free' ? '🔥 Otimizações Gratuitas' : '⭐ Otimizações Premium'}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {abaAtiva === 'free' && otimizacoesFree.map((item) => (
            <div key={item.id} style={{
              padding: '14px', backgroundColor: '#1a1a30', borderRadius: '8px',
              borderLeft: `4px solid ${getCorPerigo(item.perigo)}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '14px', color: '#eee' }}>{item.id}. {item.nome}</h3>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: getCorPerigo(item.perigo), color: '#000', fontWeight: 'bold' }}>
                  {item.perigo.toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <code style={{ flex: 1, padding: '8px 10px', backgroundColor: '#0f0f23', borderRadius: '4px', fontSize: '12px', color: '#00ff88', overflowX: 'auto' }}>
                  {item.cmd}
                </code>
                <button
                  onClick={() => copiar(item.cmd)}
                  style={{ padding: '8px 14px', backgroundColor: '#7b2ffd', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >📋 Copiar</button>
              </div>
            </div>
          ))}

          {abaAtiva === 'premium' && (premiumLiberado || adminLiberado ? (
            otimizacoesPremium.map((item) => (
              <div key={item.id} style={{
                padding: '14px', backgroundColor: '#1a1a30', borderRadius: '8px',
                borderLeft: `4px solid ${getCorPerigo(item.perigo)}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '14px', color: '#eee' }}>{item.id}. {item.nome}</h3>
                  <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: getCorPerigo(item.perigo), color: '#000', fontWeight: 'bold' }}>
                    {item.perigo.toUpperCase()}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <code style={{ flex: 1, padding: '8px 10px', backgroundColor: '#0f0f23', borderRadius: '4px', fontSize: '12px', color: '#ffcc00', overflowX: 'auto' }}>
                    {item.cmd}
                  </code>
                  <button
                    onClick={() => copiar(item.cmd)}
                    style={{ padding: '8px 14px', backgroundColor: '#ff2e63', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >📋 Copiar</button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
              <p style={{ fontSize: '16px' }}>🔒 Área Protegida</p>
              <p style={{ fontSize: '13px', marginTop: '8px' }}>Digite a senha de acesso no menu lateral para liberar as otimizações Premium.</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
