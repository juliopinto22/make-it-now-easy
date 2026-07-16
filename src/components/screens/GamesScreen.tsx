'use client';

import React from 'react';
import { Gamepad2, Monitor, Cpu, Crosshair, BarChart2, Settings } from 'lucide-react';
import { Card, AlertBox, StepList } from '@/components/ui/Blocks';
import { PageTitle, CardTitle } from './HomeScreen';

export default function GamesScreen() {
  return (
    <div>
      <PageTitle icon="🎮">MAIS FPS (GRÁTIS)</PageTitle>

      <Card>
        <CardTitle icon={<Gamepad2 size={18} />}>1. Ative o Modo Jogo do Windows</CardTitle>
        <p style={p}>
          O Modo Jogo do Windows redireciona recursos de CPU e GPU para o jogo em execução,
          reduzindo interferências de processos em segundo plano.
        </p>
        <StepList steps={[
          'Abra Configurações (Win + I)',
          'Vá em Jogos → Modo de Jogo',
          'Ative a chave → LIGADO',
          'Volte ao menu Jogos → Capturas → desative "Gravar em segundo plano" se não usar',
          'Reinicie o PC para aplicar todas as configurações',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<Monitor size={18} />}>2. Desative o Xbox Game Bar e DVR</CardTitle>
        <p style={p}>
          O Xbox Game Bar fica monitorando o sistema o tempo todo esperando ser chamado.
          Se você não grava gameplays, é puro desperdício de recursos.
        </p>
        <StepList steps={[
          'Configurações → Jogos → Xbox Game Bar → DESLIGADO',
          'Configurações → Jogos → Capturas → desative "Gravar enquanto jogo em segundo plano"',
          'Desative também "Gravar áudio ao gravar um jogo"',
          'Opcional: pressione Win + G durante o jogo — se aparecer, ainda está ativo',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<Cpu size={18} />}>3. Feche processos antes de jogar</CardTitle>
        <p style={p}>
          Cada programa aberto consome uma fatia de RAM e CPU. Antes de qualquer sessão de jogo,
          faça uma limpeza rápida:
        </p>
        <StepList steps={[
          'Feche: navegador (Chrome/Edge consome bastante RAM), Discord, Spotify, OneDrive',
          'Abra o Gerenciador de Tarefas (Ctrl + Shift + Esc) → aba Processos',
          'Ordene por CPU ou Memória — encerre processos suspeitos que consomem muito',
          'Pressione Win + R → msconfig → aba Serviços → marque "Ocultar serviços Microsoft" → desative os desnecessários',
          'Deixe rodando apenas antivírus e o que for essencial',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<Monitor size={18} />}>4. Configure a taxa de atualização do monitor</CardTitle>
        <p style={p}>
          Muita gente tem monitor 144Hz mas deixa configurado em 60Hz por padrão — e perde
          toda a vantagem do hardware.
        </p>
        <StepList steps={[
          'Clique com botão direito na área de trabalho → Configurações de exibição',
          'Role até "Configurações de exibição avançadas"',
          'Clique em "Propriedades do adaptador de exibição"',
          'Na aba "Monitor", mude a "Taxa de atualização da tela" para a mais alta disponível',
          'Confirme que o cabo (HDMI 2.0 ou DisplayPort) suporta a taxa escolhida',
        ]} />
        <p style={{ ...p, marginTop: 10 }}>
          <strong style={hl}>Lembre:</strong> HDMI 1.4 suporta no máximo 144Hz em 1080p.
          Para 4K@144Hz ou 240Hz, use DisplayPort ou HDMI 2.1.
        </p>
      </Card>

      <Card>
        <CardTitle icon={<Crosshair size={18} />}>5. Configurações gráficas ideais nos jogos</CardTitle>
        <p style={p}>
          Saber o que cada configuração faz te permite fazer trocas inteligentes entre qualidade
          e desempenho. Aqui estão os ajustes que mais impactam o FPS:
        </p>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {graphicsTips.map((t, i) => (
            <div key={i} style={tipRow}>
              <span style={{ ...badge, background: t.impact === 'Alto' ? '#c0392b' : t.impact === 'Médio' ? '#e67e22' : '#27ae60' }}>
                {t.impact}
              </span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{t.setting}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>{t.tip}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle icon={<BarChart2 size={18} />}>6. Ative o FPS Counter para monitorar</CardTitle>
        <p style={p}>
          Monitorar o FPS em tempo real te ajuda a identificar gargalos e ajustar configurações
          com precisão. Use uma dessas opções gratuitas:
        </p>
        <StepList steps={[
          '<strong>MSI Afterburner + RivaTuner:</strong> o mais completo — mostra FPS, uso de GPU, CPU e temperatura',
          '<strong>Steam Overlay:</strong> Steam → Configurações → Em jogo → ative "Contador de FPS"',
          '<strong>NVIDIA GeForce Experience:</strong> overlay com FPS integrado (apenas GPUs NVIDIA)',
          '<strong>Xbox Game Bar:</strong> Win + G → widget de Desempenho (mesmo desativando para gravação, o monitor funciona)',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<Settings size={18} />}>7. Prioridade do processo do jogo</CardTitle>
        <p style={p}>
          Você pode forçar o Windows a dar mais CPU ao processo do jogo manualmente:
        </p>
        <StepList steps={[
          'Abra o jogo',
          'Pressione Ctrl + Shift + Esc → aba Detalhes',
          'Encontre o processo do jogo (.exe)',
          'Clique com botão direito → Definir prioridade → Alta (não use "Tempo real" — pode travar o sistema)',
          'Atenção: essa configuração se reseta ao fechar o jogo',
        ]} />
      </Card>

      <AlertBox type="warning">
        💡 Regra de ouro dos FPS: prefira qualidade <strong>Média com 100+ FPS</strong> a
        Ultra com 40 FPS. Fluidez constante é sempre melhor que imagem linda e travada.
      </AlertBox>
    </div>
  );
}

const graphicsTips = [
  { setting: 'Resolução', impact: 'Alto', tip: 'Use a resolução nativa do monitor. Abaixar dá mais FPS mas deixa a imagem borrada.' },
  { setting: 'Sombras', impact: 'Alto', tip: 'Coloque em Médio ou Baixo — é um dos ajustes que mais impacta a GPU.' },
  { setting: 'Anti-aliasing (AA)', impact: 'Alto', tip: 'Use FXAA ou desative. MSAA é muito pesado. TAA é bom balanço.' },
  { setting: 'Distância de visão', impact: 'Médio', tip: 'Reduzir ajuda bastante em open worlds. Coloque em Médio.' },
  { setting: 'Efeitos (partículas, fumaça)', impact: 'Médio', tip: 'Pode reduzir sem perder muito da experiência visual.' },
  { setting: 'VSync', impact: 'Médio', tip: 'Desative — limita o FPS e adiciona input lag. Use G-Sync ou FreeSync se tiver.' },
  { setting: 'Texturas', impact: 'Baixo', tip: 'Você pode manter em Alto — usa VRAM mas tem pouco impacto no FPS.' },
];

const p: React.CSSProperties = { fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 500 };
const hl: React.CSSProperties = { color: 'var(--accent)' };
const tipRow: React.CSSProperties = {
  display: 'flex', alignItems: 'flex-start', gap: 12,
  background: '#0d0d0d', borderRadius: 8, padding: '10px 14px',
  border: '1px solid var(--border)',
};
const badge: React.CSSProperties = {
  color: '#fff', fontSize: 11, fontWeight: 800, padding: '2px 8px',
  borderRadius: 20, minWidth: 52, textAlign: 'center', marginTop: 2,
};
