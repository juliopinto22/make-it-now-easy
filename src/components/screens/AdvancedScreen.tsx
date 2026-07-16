'use client';

import React from 'react';
import { AlertTriangle, Lock } from 'lucide-react';
import { Card, AlertBox, StepList } from '@/components/ui/Blocks';
import { PageTitle, CardTitle } from './HomeScreen';

export default function AdvancedScreen() {
  return (
    <div>
      <PageTitle icon="⚙️" premium>
        AJUSTES AVANÇADOS (EXCLUSIVO PREMIUM)
      </PageTitle>

      <AlertBox type="danger">
        <AlertTriangle size={18} style={{ flexShrink: 0 }} />
        Conteúdo para usuários avançados. Anote as configurações originais antes de qualquer alteração.
        Siga os passos exatamente como indicado.
      </AlertBox>

      <Card premium>
        <CardTitle icon={<span>🔵</span>} premium>1. Como acessar a BIOS</CardTitle>
        <p style={p}>
          A BIOS (ou UEFI nos PCs modernos) é a camada mais fundamental do sistema — controla
          como o hardware funciona antes do Windows nem começar a carregar.
        </p>
        <StepList steps={[
          'Reinicie o PC e pressione a tecla de acesso logo na tela de logo: geralmente <strong>Del</strong>, <strong>F2</strong> ou <strong>F10</strong>',
          'ASUS: Del ou F2 | Gigabyte: Del | MSI: Del | notebooks Dell: F2 | Lenovo: F1 ou F2',
          'Outra forma: Configurações → Sistema → Recuperação → "Inicialização Avançada" → Reiniciar agora → Solucionar problemas → Configurações de Firmware UEFI',
          'Na BIOS, use as setas do teclado para navegar — mouse pode funcionar em UEFI modernas',
          'Pressione F10 para salvar e sair, ou ESC para sair sem salvar',
        ]} />
      </Card>

      <Card premium>
        <CardTitle icon={<span>💾</span>} premium>2. Ativar XMP / EXPO para a RAM</CardTitle>
        <p style={p}>
          Este é um dos ajustes mais impactantes e esquecidos. A RAM vem de fábrica rodando
          em velocidade base (2133 ou 3200 MHz) — muito abaixo do que foi comprado. O XMP corrige isso.
        </p>
        <StepList steps={[
          'Entre na BIOS (Del/F2 no boot)',
          'Procure por: <strong>XMP</strong> (Intel) ou <strong>EXPO</strong> / <strong>A-XMP</strong> (AMD)',
          'Geralmente fica em: AI Tweaker (ASUS) / MIT (Gigabyte) / OC (MSI) / Memory (genérico)',
          'Ative o perfil XMP/EXPO correspondente (geralmente Perfil 1)',
          'Salve (F10) e reinicie — a RAM vai operar na velocidade anunciada na embalagem',
          'Verifique no Windows: Ctrl+Shift+Esc → Desempenho → Memória → veja a velocidade',
        ]} />
        <p style={{ ...p, marginTop: 10 }}>
          <strong style={hl}>Exemplo real:</strong> RAM DDR4 3200MHz sem XMP = 2133MHz.
          Com XMP = 3200MHz. Ganho de até 15% em algumas aplicações.
        </p>
      </Card>

      <Card premium>
        <CardTitle icon={<span>🌡️</span>} premium>3. Temperatura: monitoramento e solução</CardTitle>
        <p style={p}>
          Quando o processador ou GPU superaquecem, eles reduzem automaticamente o desempenho
          para se proteger — isso se chama <strong style={hl}>thermal throttling</strong>.
          É uma das causas mais comuns de PC lento durante jogos.
        </p>
        <StepList steps={[
          'Instale HWiNFO64 (gratuito) para monitorar temperaturas em tempo real',
          'Temperaturas ideais em carga: CPU abaixo de 80°C | GPU abaixo de 85°C',
          'Se ultrapassar consistentemente: limpe o cooler e as saídas de ar com ar comprimido',
          'Troque a pasta térmica do processador se o PC tiver mais de 3 anos — pode cair 10–15°C',
          'Para notebooks: use uma base de refrigeração e mantenha as saídas de ar desobstruídas',
          'Para desktops: verifique o fluxo de ar — ar frio entra na frente/baixo, quente sai atrás/cima',
        ]} />
      </Card>

      <Card premium>
        <CardTitle icon={<span>🖥️</span>} premium>4. Serviços do Windows para desativar</CardTitle>
        <p style={p}>
          O Windows roda dezenas de serviços em segundo plano que a maioria das pessoas nunca usa.
          Desativar os corretos libera RAM e CPU sem riscos.
        </p>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {services.map((s, i) => (
            <div key={i} style={serviceRow}>
              <span style={{ ...riskBadge, background: s.risk === 'Seguro' ? '#1a3a1a' : s.risk === 'Moderado' ? '#3a2a00' : '#3a1010', color: s.risk === 'Seguro' ? '#4CAF50' : s.risk === 'Moderado' ? '#FFC107' : '#FF5252' }}>
                {s.risk}
              </span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>{s.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ ...p, marginTop: 12, fontSize: 13 }}>
          <strong style={hl}>Como desativar:</strong> Win + R → services.msc → encontre o serviço →
          duplo clique → Tipo de Inicialização: Manual ou Desabilitado → OK
        </p>
      </Card>

      <Card premium>
        <CardTitle icon={<span>🔧</span>} premium>5. Ajustes no Registro do Windows (Regedit)</CardTitle>
        <p style={p}>
          O Registro guarda configurações do sistema que não são expostas na interface gráfica.
          <strong style={{ color: '#FF5252' }}> Sempre faça um backup antes:</strong> Arquivo → Exportar → salve em lugar seguro.
        </p>
        <StepList steps={[
          'Win + R → regedit → Enter',
          '<strong>Desativar atualização automática de driver:</strong> HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DriverSearching → SearchOrderConfig = 0',
          '<strong>Prioridade de Foreground:</strong> HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl → Win32PrioritySeparation = 26 (hex) para jogos',
          '<strong>Desativar hibernação:</strong> abra CMD como Admin → powercfg -h off (libera espaço em disco igual à sua RAM)',
          'Após cada alteração no regedit, reinicie para aplicar',
        ]} />
      </Card>

      <Card premium>
        <CardTitle icon={<span>🎮</span>} premium>6. Painel NVIDIA — configurações que fazem diferença</CardTitle>
        <p style={p}>
          O Painel de Controle da NVIDIA tem ajustes que impactam diretamente o FPS e a latência.
          Clique com botão direito na área de trabalho → Painel de Controle NVIDIA:
        </p>
        <StepList steps={[
          '<strong>Gerenciar configurações 3D → Modo de baixa latência:</strong> Ultra',
          '<strong>Sincronização Vertical (VSync):</strong> Desligado (controle isso dentro do jogo)',
          '<strong>Otimização de threaded:</strong> Automático',
          '<strong>Filtragem de textura — Qualidade:</strong> Alto desempenho',
          '<strong>Configuração de energia:</strong> Preferir desempenho máximo',
          '<strong>G-Sync (se o monitor suportar):</strong> Ative em Tela → Configure G-SYNC',
        ]} />
      </Card>

      <AlertBox type="danger">
        <AlertTriangle size={18} style={{ flexShrink: 0 }} />
        LEMBRE-SE: Sempre anote ou tire print das configurações originais antes de alterar qualquer
        coisa na BIOS ou no Regedit. Assim você pode voltar se algo não funcionar como esperado.
      </AlertBox>
    </div>
  );
}

const services = [
  { name: 'SysMain (Superfetch)', desc: 'Pré-carrega apps na RAM — útil em HDs, desnecessário em SSD', risk: 'Seguro' },
  { name: 'Windows Search', desc: 'Indexação de arquivos — desnecessário se não usa a busca', risk: 'Seguro' },
  { name: 'Print Spooler', desc: 'Gerenciamento de impressora — desative se não tiver impressora', risk: 'Seguro' },
  { name: 'Fax', desc: 'Serviço de fax — praticamente ninguém usa', risk: 'Seguro' },
  { name: 'Connected User Experiences and Telemetry', desc: 'Envia dados de uso para a Microsoft', risk: 'Moderado' },
  { name: 'Windows Update', desc: 'Atualizações automáticas — desative apenas temporariamente', risk: 'Cuidado' },
];

const p: React.CSSProperties = { fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 500 };
const hl: React.CSSProperties = { color: 'var(--accent)' };
const serviceRow: React.CSSProperties = {
  display: 'flex', alignItems: 'flex-start', gap: 12,
  background: '#0d0d0d', borderRadius: 8, padding: '10px 14px',
  border: '1px solid var(--border)',
};
const riskBadge: React.CSSProperties = {
  fontSize: 11, fontWeight: 800, padding: '3px 8px',
  borderRadius: 20, minWidth: 68, textAlign: 'center', marginTop: 2,
};
