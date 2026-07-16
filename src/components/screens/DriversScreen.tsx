'use client';

import React from 'react';
import { ShieldCheck, RefreshCw, Search, AlertCircle, MonitorCheck } from 'lucide-react';
import { Card, AlertBox, StepList } from '@/components/ui/Blocks';
import { PageTitle, CardTitle } from './HomeScreen';

export default function DriversScreen() {
  return (
    <div>
      <PageTitle icon="🔧">DRIVERS CORRETOS (GRÁTIS)</PageTitle>

      <Card>
        <CardTitle icon={<Search size={18} />}>1. Como descobrir seu hardware exato</CardTitle>
        <p style={p}>
          Antes de baixar qualquer driver, você precisa saber exatamente qual é o modelo
          do seu hardware. Veja como identificar cada peça:
        </p>
        <StepList steps={[
          '<strong>Placa de vídeo:</strong> Win + R → dxdiag → aba "Vídeo" → veja o nome completo',
          '<strong>Processador e RAM:</strong> Win + R → msinfo32 → veja "Processador" e "Memória física instalada"',
          '<strong>Placa-mãe:</strong> Win + R → msinfo32 → "Modelo do sistema base" ou "Fabricante da placa base"',
          '<strong>Todos os dispositivos:</strong> Win + R → devmgmt.msc → abre o Gerenciador de Dispositivos',
          '<strong>Número de série do notebook:</strong> Win + R → cmd → digite: wmic bios get serialnumber',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<ShieldCheck size={18} />}>2. Sites oficiais para baixar drivers</CardTitle>
        <p style={p}>
          Sempre baixe drivers diretamente do site do fabricante. Programas como "Driver Booster"
          ou "Driver Easy" muitas vezes instalam drivers genéricos ou desatualizados — evite-os.
        </p>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {officialSites.map((s, i) => (
            <div key={i} style={siteRow}>
              <span style={siteName}>{s.name}</span>
              <span style={siteDesc}>{s.desc}</span>
              <span style={siteUrl}>{s.url}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle icon={<RefreshCw size={18} />}>3. Quando (e quando não) atualizar drivers</CardTitle>
        <p style={p}>
          Atualizar driver não é sempre bom — às vezes uma versão nova traz bugs.
          Siga esta regra: <strong style={hl}>se está funcionando bem, não mexa.</strong>
        </p>
        <StepList steps={[
          '<strong>✅ Atualize se:</strong> um jogo novo tem FPS ruim ou trava no carregamento',
          '<strong>✅ Atualize se:</strong> a tela pisca, trava ou aparece tela preta',
          '<strong>✅ Atualize se:</strong> o fabricante lançou update de segurança ou performance',
          '<strong>❌ Não atualize se:</strong> tudo está funcionando e você está satisfeito',
          '<strong>❌ Não atualize se:</strong> o update é recente (menos de 2 semanas) — espere feedback da comunidade',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<MonitorCheck size={18} />}>4. Como instalar o driver de vídeo corretamente</CardTitle>
        <p style={p}>
          A instalação errada pode deixar rastros do driver antigo. Siga este método limpo:
        </p>
        <StepList steps={[
          'Baixe o instalador do driver no site oficial (NVIDIA ou AMD)',
          'Baixe também o programa <strong>DDU (Display Driver Uninstaller)</strong> — ferramenta gratuita e confiável',
          'Reinicie no Modo Seguro (Win + R → msconfig → aba Inicializar → Inicialização Segura)',
          'Execute o DDU e escolha "Limpar e reiniciar" para remover o driver atual completamente',
          'Após reiniciar normalmente, execute o instalador baixado do site oficial',
          'Na instalação NVIDIA: escolha "Personalizada" → marque "Executar instalação limpa"',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<span>🖨️</span>}>5. Outros drivers que fazem diferença</CardTitle>
        <p style={p}>
          Além da placa de vídeo, estes drivers também impactam o desempenho e a estabilidade:
        </p>
        <StepList steps={[
          '<strong>Chipset da placa-mãe:</strong> baixe no site da Intel (INF Utility) ou AMD (Chipset Software)',
          '<strong>Rede (LAN/Wi-Fi):</strong> acesse o site da placa-mãe ou do fabricante do notebook',
          '<strong>Áudio:</strong> Realtek Audio Console na Microsoft Store ou site da placa-mãe',
          '<strong>BIOS:</strong> verifique se há atualização no site da placa-mãe — pode melhorar compatibilidade',
        ]} />
      </Card>

      <AlertBox type="warning">
        <AlertCircle size={18} style={{ flexShrink: 0 }} />
        Após instalar qualquer driver novo, reinicie o computador antes de testar. Mudanças de driver
        só entram completamente em efeito após o reinício.
      </AlertBox>
    </div>
  );
}

const officialSites = [
  { name: 'NVIDIA (GPU)', desc: 'Placas GeForce GTX/RTX', url: 'nvidia.com/drivers' },
  { name: 'AMD (GPU + CPU)', desc: 'Placas Radeon e Ryzen', url: 'amd.com/support' },
  { name: 'Intel (GPU + CPU)', desc: 'GPUs Arc e processadores Core', url: 'intel.com/drivers' },
  { name: 'Realtek (Áudio)', desc: 'Driver de áudio HD', url: 'realtek.com' },
  { name: 'ASUS', desc: 'Placa-mãe / notebooks ASUS', url: 'asus.com/support' },
  { name: 'Gigabyte', desc: 'Placas-mãe Gigabyte/Aorus', url: 'gigabyte.com/support' },
  { name: 'MSI', desc: 'Placas-mãe e notebooks MSI', url: 'msi.com/support' },
];

const p: React.CSSProperties = { fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 500 };
const hl: React.CSSProperties = { color: 'var(--accent)' };
const siteRow: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10,
  background: '#0d0d0d', borderRadius: 8, padding: '10px 14px',
  border: '1px solid var(--border)',
};
const siteName: React.CSSProperties = { color: 'var(--accent)', fontWeight: 800, fontSize: 14, minWidth: 130 };
const siteDesc: React.CSSProperties = { color: 'var(--text-muted)', fontSize: 13, fontWeight: 500, flex: 1 };
const siteUrl: React.CSSProperties = { color: '#555', fontSize: 12, fontWeight: 600 };
