'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, Scale, Ban, Mail } from 'lucide-react';
import { Card, AlertBox } from '@/components/ui/Blocks';
import { PageTitle, CardTitle } from './HomeScreen';

export default function CopyrightScreen() {
  return (
    <div>
      <PageTitle icon="⚖️">DIREITOS AUTORAIS</PageTitle>

      <Card>
        <CardTitle icon={<ShieldCheck size={18} />}>Propriedade Intelectual</CardTitle>
        <p style={p}>
          Todo o conteúdo disponível no <strong style={hl}>Make It Now Easy</strong> —
          incluindo textos, dicas, guias, layout, design, código e elementos visuais —
          é de propriedade exclusiva dos criadores e está protegido pelas leis de
          direitos autorais do Brasil (<strong style={hl}>Lei nº 9.610/1998</strong>) e
          tratados internacionais de propriedade intelectual.
        </p>
      </Card>

      <Card>
        <CardTitle icon={<Scale size={18} />}>O que é permitido</CardTitle>
        <p style={p}>Você pode:</p>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {allowed.map((item, i) => (
            <div key={i} style={allowRow}>
              <span style={greenDot}>✅</span>
              <span style={{ fontSize: 14, color: '#c4b0e0', fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle icon={<Ban size={18} />}>O que é proibido</CardTitle>
        <p style={p}>É estritamente proibido:</p>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {forbidden.map((item, i) => (
            <div key={i} style={forbidRow}>
              <span>❌</span>
              <span style={{ fontSize: 14, color: '#c4b0e0', fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle icon={<ShieldCheck size={18} />}>Conteúdo Premium</CardTitle>
        <p style={p}>
          O conteúdo desbloqueado pelo <strong style={hl}>Modo Premium</strong> é de uso
          estritamente pessoal e intransferível. É proibido compartilhar, revender,
          publicar ou distribuir o conteúdo premium para terceiros, seja gratuitamente
          ou mediante pagamento. O acesso é vinculado a um único usuário.
        </p>
      </Card>

      <Card>
        <CardTitle icon={<AlertTriangle size={18} />}>Penalidades</CardTitle>
        <p style={p}>
          O uso não autorizado do conteúdo deste site pode resultar em:
        </p>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {penalties.map((item, i) => (
            <div key={i} style={forbidRow}>
              <span>⚠️</span>
              <span style={{ fontSize: 14, color: '#c4b0e0', fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle icon={<Mail size={18} />}>Contato</CardTitle>
        <p style={p}>
          Para dúvidas sobre direitos autorais, solicitações de uso ou denúncias de
          violação, entre em contato pelo WhatsApp:{' '}
          <strong style={hl}>+55 11 99528-9506</strong>
        </p>
      </Card>

      <AlertBox type="warning">
        <AlertTriangle size={18} style={{ flexShrink: 0 }} />
        Este site é protegido por sistemas de segurança. Tentativas de cópia, scraping
        ou acesso não autorizado são monitoradas e registradas.
      </AlertBox>

      <p style={{ fontSize: 12, color: '#4a4a6a', textAlign: 'center', marginTop: 20, fontWeight: 500 }}>
        © {new Date().getFullYear()} Make It Now Easy. Todos os direitos reservados.
      </p>
    </div>
  );
}

const allowed = [
  'Usar o conteúdo para aprendizado pessoal',
  'Compartilhar o link do site com amigos',
  'Aplicar as dicas no seu próprio computador',
];

const forbidden = [
  'Copiar, reproduzir ou redistribuir qualquer conteúdo do site',
  'Vender ou monetizar as informações obtidas aqui',
  'Usar o conteúdo Premium para criar produtos concorrentes',
  'Fazer scraping ou extração automatizada de dados',
  'Remover marcas d\'água, créditos ou atribuições',
  'Compartilhar capturas de tela do conteúdo Premium',
];

const penalties = [
  'Processo civil por danos morais e materiais',
  'Indenização conforme a Lei nº 9.610/1998',
  'Bloqueio permanente do acesso ao site',
  'Notificação às autoridades competentes',
];

const p: React.CSSProperties = { fontSize: 14, color: '#b8a8d0', lineHeight: 1.7, fontWeight: 500 };
const hl: React.CSSProperties = { color: '#c084fc' };
const allowRow: React.CSSProperties = {
  display: 'flex', alignItems: 'flex-start', gap: 10,
  background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)',
  borderRadius: 8, padding: '8px 12px',
};
const forbidRow: React.CSSProperties = {
  display: 'flex', alignItems: 'flex-start', gap: 10,
  background: 'rgba(255,68,68,0.05)', border: '1px solid rgba(255,68,68,0.12)',
  borderRadius: 8, padding: '8px 12px',
};
const greenDot: React.CSSProperties = { flexShrink: 0 };
