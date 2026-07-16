'use client';

import React from 'react';
import { ListX, Zap, Trash2, Settings, MemoryStick, ShieldOff, HardDrive } from 'lucide-react';
import { Card, AlertBox, StepList } from '@/components/ui/Blocks';
import { PageTitle, CardTitle } from './HomeScreen';

export default function WindowsScreen() {
  return (
    <div>
      <PageTitle icon="🪟">OTIMIZAR WINDOWS (GRÁTIS)</PageTitle>

      <Card>
        <CardTitle icon={<ListX size={18} />}>1. Desative programas de inicialização</CardTitle>
        <p style={p}>
          Muitos programas se adicionam à inicialização do Windows sem você perceber — e cada um deles
          atrasa o boot e consome RAM desde o primeiro segundo. Limpar isso é um dos ganhos mais rápidos.
        </p>
        <StepList steps={[
          'Pressione Ctrl + Shift + Esc para abrir o Gerenciador de Tarefas',
          'Clique na aba "Inicializar" (ou "Startup" no Windows 11)',
          'Veja a coluna "Impacto na inicialização" — foque nos marcados como Alto',
          'Clique com botão direito → Desabilitar em tudo que não usa no início (OneDrive, Spotify, Discord, Teams, etc.)',
          'Reinicie o PC e sinta a diferença no tempo de boot',
        ]} />
        <p style={{ ...p, marginTop: 10 }}>
          <strong style={hl}>Dica:</strong> Você não está desinstalando nada — só está impedindo o programa de
          abrir automaticamente. Pode abrir manualmente quando quiser.
        </p>
      </Card>

      <Card>
        <CardTitle icon={<Zap size={18} />}>2. Ative o Modo Alto Desempenho</CardTitle>
        <p style={p}>
          Por padrão, o Windows usa o plano "Balanceado" para economizar energia — isso pode limitar
          o desempenho do processador durante tarefas pesadas como jogos ou edição.
        </p>
        <StepList steps={[
          'Abra Configurações (Win + I)',
          'Vá em Sistema → Energia e suspensão (Windows 10) ou Energia e bateria (Windows 11)',
          'Clique em "Configurações de energia adicionais"',
          'Selecione "Alto Desempenho" — se não aparecer, clique em "Mostrar planos adicionais"',
          'Pronto! O processador vai trabalhar na máxima performance',
        ]} />
        <p style={{ ...p, marginTop: 10 }}>
          <strong style={hl}>Atenção:</strong> Se você usa notebook, isso vai consumir mais bateria.
          Use só quando estiver na tomada.
        </p>
      </Card>

      <Card>
        <CardTitle icon={<Trash2 size={18} />}>3. Limpeza completa de arquivos temporários</CardTitle>
        <p style={p}>
          Arquivos temporários acumulam com o tempo e ocupam espaço no disco, podendo deixar
          o sistema lento. Faça isso mensalmente.
        </p>
        <StepList steps={[
          'Pressione Win + R, digite %temp% e pressione Enter',
          'Selecione todos os arquivos (Ctrl + A) e delete — pule os que estiverem em uso',
          'Pressione Win + R novamente, digite temp e delete tudo',
          'Pressione Win + R, digite prefetch e delete tudo',
          'Abra o Limpeza de Disco: Win + R → cleanmgr → selecione C: → marque todas as caixas → OK',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<Settings size={18} />}>4. Ajuste os efeitos visuais</CardTitle>
        <p style={p}>
          Sombras, animações e transparências ficam ótimas, mas consomem recursos. Em PCs menos
          potentes, desativá-las faz diferença real de desempenho.
        </p>
        <StepList steps={[
          'Clique com botão direito em "Este Computador" → Propriedades',
          'Clique em "Configurações avançadas do sistema" (lado esquerdo)',
          'Na aba "Avançado", clique em "Configurações" dentro de Desempenho',
          'Selecione "Ajustar para melhor desempenho" — isso desativa todas as animações',
          'Ou marque manualmente só as que quiser manter (ex: "Mostrar miniaturas em vez de ícones")',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<MemoryStick size={18} />}>5. Otimize a memória virtual (Pagefile)</CardTitle>
        <p style={p}>
          A memória virtual é um espaço no HD/SSD usado quando a RAM está cheia. Configurar manualmente
          pode evitar travamentos em sistemas com pouca RAM.
        </p>
        <StepList steps={[
          'Clique com botão direito em "Este Computador" → Propriedades → Conf. avançadas do sistema',
          'Aba "Avançado" → Desempenho → Configurações → aba "Avançado" → Alterar',
          'Desmarque "Gerenciar automaticamente o tamanho do arquivo de paginação"',
          'Selecione C: → Tamanho personalizado',
          'Tamanho inicial: 1,5x sua RAM em MB (ex: 8GB RAM = 12288 MB)',
          'Tamanho máximo: 3x sua RAM em MB (ex: 8GB RAM = 24576 MB)',
          'Clique em Definir → OK → reinicie',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<ShieldOff size={18} />}>6. Desative a Indexação de disco em C:</CardTitle>
        <p style={p}>
          O Windows indexa os arquivos para buscas mais rápidas, mas isso usa CPU e disco
          continuamente. Se você não usa muito a busca do Windows Explorer, pode desativar.
        </p>
        <StepList steps={[
          'Abra o "Este Computador"',
          'Clique com botão direito no disco C: → Propriedades',
          'Desmarque "Permitir que os arquivos nesta unidade tenham o conteúdo indexado..."',
          'Clique em OK → Aplicar a C:, subpastas e arquivos → aguarde',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<HardDrive size={18} />}>7. Desfragmentação (só para HD, não SSD!)</CardTitle>
        <p style={p}>
          Se você usa HD mecânico (não SSD), a desfragmentação organiza os dados e deixa
          o disco mais rápido. <strong style={{ color: '#FF3333' }}>Nunca faça isso em SSD</strong> — danifica o dispositivo.
        </p>
        <StepList steps={[
          'Abra "Desfragmentar e Otimizar Unidades" no menu Iniciar',
          'Selecione o HD (verifique se é HD ou SSD na coluna "Tipo de mídia")',
          'Clique em "Analisar" — se a fragmentação for acima de 10%, clique em "Otimizar"',
          'Aguarde o processo concluir (pode demorar minutos a horas)',
        ]} />
        <p style={{ ...p, marginTop: 10 }}>
          <strong style={hl}>Para SSD:</strong> O Windows já executa o TRIM automaticamente — não precisa fazer nada.
        </p>
      </Card>

      <AlertBox type="warning">
        💡 Crie um Ponto de Restauração antes de mexer nas configurações avançadas:
        Win + R → sysdm.cpl → Proteção do Sistema → Criar.
      </AlertBox>
    </div>
  );
}

const p: React.CSSProperties = { fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 500 };
const hl: React.CSSProperties = { color: 'var(--accent)' };
