import React from 'react';

export default function WindowsScreen() {
  const otimizacoes = [
    {
      titulo: 'Limpar Arquivos Temporários',
      descricao: 'Remove arquivos desnecessários do sistema para liberar memória e espaço.',
      arquivo: '/limpar-temp.bat',
      nomeDownload: 'Limpar_Temp.bat'
    },
    {
      titulo: 'Ativar Desempenho Máximo',
      descricao: 'Habilita o modo de energia de alta performance no Windows.',
      arquivo: '/modo-desempenho.bat',
      nomeDownload: 'Desempenho_Maximo.bat'
    },
    {
      titulo: 'Otimizar Rede e DNS',
      descricao: 'Limpa o cache de rede para melhorar a estabilidade e o ping nos jogos.',
      arquivo: '/otimizar-rede.bat',
      nomeDownload: 'Otimizar_Rede.bat'
    }
  ];

  return (
    <div style={{ color: '#fff', maxWidth: 800 }}>
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>⚡ Otimizações do Windows</h1>
      <p style={{ color: '#aaa', marginBottom: '30px' }}>
        Clique no botão para baixar o script de otimização e execute o arquivo no seu PC.
      </p>

      <div style={{ display: 'grid', gap: '20px' }}>
        {otimizacoes.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '20px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>{item.titulo}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>{item.descricao}</p>
            </div>

            <a
              href={item.arquivo}
              download={item.nomeDownload}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              ⬇️ Baixar e Executar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}























































          
