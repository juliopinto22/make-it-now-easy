'use client';

import { useState, useEffect } from 'react';

const SENHA_PREMIUM = 'Pagamento@2026';
const CHAVE_PIX = '+5511947138400';
const VALOR_PREMIUM = '5,90';
const VERSAO = '4.5.0';

const CORES = {
  fundo: '#050505',
  fundoCard: '#111111',
  vermelho: '#E40200',
  vermelhoEscuro: '#8B0000',
  vermelhoClaro: '#FF3333',
  branco: '#FFFFFF',
  cinzaClaro: '#CCCCCC',
  cinzaMedio: '#888888',
  dourado: '#B8860B',
  verdeSeguro: '#00CC44',
  amareloAviso: '#FFCC00',
  borda: '#330000'
};

export default function Page() {
  return (
    <div style={{background: CORES.fundo, color: CORES.branco, padding: 40}}>
      <h1 style={{color: CORES.vermelho}}>OPTIMIZADOR v{VERSAO}</h1>
      <p>Arquivo carregado sem erro! ✅</p>
      <p>Chave PIX: {CHAVE_PIX}</p>
      <p>Valor: R$ {VALOR_PREMIUM}</p>
      <p>Senha: {SENHA_PREMIUM}</p>
    </div>
  );
}
