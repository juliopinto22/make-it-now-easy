'use client';

import React from 'react';
import { Wifi, Cable, Globe, Activity, Router, Radio } from 'lucide-react';
import { Card, AlertBox, StepList } from '@/components/ui/Blocks';
import { PageTitle, CardTitle } from './HomeScreen';

export default function NetworkScreen() {
  return (
    <div>
      <PageTitle icon="🛜">SEM LAG (GRÁTIS)</PageTitle>

      <Card>
        <CardTitle icon={<Cable size={18} />}>1. Cabo é sempre melhor que Wi-Fi</CardTitle>
        <p style={p}>
          Wi-Fi sofre com interferências de paredes, outros dispositivos e redes vizinhas.
          Um cabo Cat5e ou Cat6 garante latência estável e zero perdas de pacotes.
        </p>
        <StepList steps={[
          'Use cabo Cat5e (suficiente para 1Gbps) ou Cat6 (mais protegido contra interferência)',
          'Conecte direto no roteador ou no switch — evite adaptadores USB de rede',
          'Verifique se o PC reconhece a rede com fio: Configurações → Rede → Ethernet',
          'Se tiver Wi-Fi e Ethernet, o Windows vai usar o cabo automaticamente',
          'Certifique-se de que o adaptador de rede da placa-mãe está com o driver atualizado',
        ]} />
        <p style={{ ...p, marginTop: 10 }}>
          <strong style={hl}>Comparação real:</strong> Wi-Fi 5GHz típico: 5–15ms de ping com variação.
          Cabo: 1–3ms de ping estável. Para jogos online, a diferença é enorme.
        </p>
      </Card>

      <Card>
        <CardTitle icon={<Globe size={18} />}>2. Troque o DNS por um mais rápido</CardTitle>
        <p style={p}>
          O DNS é o "catálogo de endereços" da internet. Um DNS lento aumenta o tempo de
          carregamento de páginas e até afeta a conexão inicial com servidores de jogos.
        </p>
        <StepList steps={[
          'Abra Configurações → Rede e Internet → Ethernet (ou Wi-Fi) → Editar DNS',
          'Selecione "Manual" e ative IPv4',
          'DNS preferencial: <strong>1.1.1.1</strong> (Cloudflare — mais rápido do mundo)',
          'DNS alternativo: <strong>1.0.0.1</strong>',
          'Ou use Google: <strong>8.8.8.8</strong> e <strong>8.8.4.4</strong>',
          'Salve e abra o CMD → digite: ipconfig /flushdns → para limpar o cache antigo',
        ]} />
        <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {dnsServers.map((d, i) => (
            <div key={i} style={dnsCard}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent)' }}>{d.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{d.primary} / {d.secondary}</div>
              <div style={{ fontSize: 11, color: '#555', fontWeight: 600, marginTop: 2 }}>{d.note}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle icon={<Radio size={18} />}>3. Se usar Wi-Fi: otimize a banda</CardTitle>
        <p style={p}>
          Se cabo não for possível, use estas configurações para extrair o máximo do Wi-Fi:
        </p>
        <StepList steps={[
          'Prefira a banda <strong>5GHz</strong> — mais rápida e menos congestionada que a 2.4GHz',
          'Mantenha o PC o mais perto possível do roteador — cada parede atenua o sinal',
          'Evite microondas ligados perto do roteador — operam na mesma frequência (2.4GHz)',
          'Clique com botão direito no Wi-Fi → Propriedades → aba Avançado → procure "Preferred Band" → defina 5GHz Preferred',
          'Atualize o driver do adaptador Wi-Fi pelo site do fabricante do notebook ou da placa Wi-Fi',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<Router size={18} />}>4. Otimize as configurações do roteador</CardTitle>
        <p style={p}>
          O painel do roteador tem configurações que a maioria ignora. Acesse digitando
          <strong style={hl}> 192.168.0.1</strong> ou <strong style={hl}>192.168.1.1</strong> no navegador:
        </p>
        <StepList steps={[
          '<strong>QoS (Qualidade de Serviço):</strong> configure prioridade para o PC de jogos — assim ele tem preferência sobre celulares e smart TVs',
          '<strong>Canal Wi-Fi:</strong> em 2.4GHz use canal 1, 6 ou 11 (os que não se sobrepõem). Em 5GHz qualquer canal costuma funcionar',
          '<strong>Banda larga:</strong> coloque o roteador em modo Bridge/DMZ para o PC de jogos se tiver dois roteadores',
          '<strong>Reinicialização automática:</strong> configure para reiniciar nas madrugadas — previne lentidão acumulada',
        ]} />
      </Card>

      <Card>
        <CardTitle icon={<Activity size={18} />}>5. Diagnóstico de problemas de rede</CardTitle>
        <p style={p}>
          Antes de reclamar da operadora, teste sua própria rede com estas ferramentas:
        </p>
        <StepList steps={[
          '<strong>Teste de velocidade:</strong> acesse fast.com (Netflix) ou speedtest.net — compare com o plano contratado',
          '<strong>Teste de ping:</strong> Win + R → cmd → ping 8.8.8.8 -n 20 → veja os tempos e se há "Request timed out"',
          '<strong>Traceroute:</strong> cmd → tracert 8.8.8.8 → mostra cada salto da conexão até o destino',
          '<strong>Perda de pacotes:</strong> cmd → ping 8.8.8.8 -n 100 → se mostrar pacotes perdidos, o problema é na sua rede',
          '<strong>Teste o roteador:</strong> conecte o cabo direto no modem (sem o roteador) e repita o teste de velocidade',
        ]} />
      </Card>

      <AlertBox type="warning">
        💡 Feche Netflix, YouTube e downloads em outros dispositivos da casa durante partidas.
        Um stream em 4K consome até 25 Mbps — e isso aumenta o ping de todos na rede!
      </AlertBox>
    </div>
  );
}

const dnsServers = [
  { name: 'Cloudflare', primary: '1.1.1.1', secondary: '1.0.0.1', note: 'Mais rápido globalmente' },
  { name: 'Google', primary: '8.8.8.8', secondary: '8.8.4.4', note: 'Mais confiável' },
  { name: 'OpenDNS', primary: '208.67.222.222', secondary: '208.67.220.220', note: 'Com proteção' },
];

const p: React.CSSProperties = { fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 500 };
const hl: React.CSSProperties = { color: 'var(--accent)' };
const dnsCard: React.CSSProperties = {
  background: '#0d0d0d', border: '1px solid var(--border)', borderRadius: 8,
  padding: '10px 14px', flex: 1, minWidth: 160,
};
