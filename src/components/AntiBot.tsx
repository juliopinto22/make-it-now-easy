'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Challenge { q: string; a: number; opt: number[]; }

function makeChallenge(): Challenge {
  const ops = ['+', '-', 'x'] as const;
  const op = ops[Math.floor(Math.random() * 3)];
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  let q = ''; let ans = 0;
  if (op === '+') { q = `${a} + ${b}`; ans = a + b; }
  else if (op === '-') { const x = Math.max(a,b), y = Math.min(a,b); q = `${x} - ${y}`; ans = x - y; }
  else { q = `${a} × ${b}`; ans = a * b; }

  const opts = new Set([ans]);
  while (opts.size < 4) opts.add(Math.floor(Math.random() * (ans + 8)) + Math.max(0, ans - 5));
  return { q, a: ans, opt: [...opts].sort(() => Math.random() - 0.5) };
}

interface Props { onVerified: () => void; }

export default function AntiBot({ onVerified }: Props) {
  const [challenge, setChallenge] = useState<Challenge>(makeChallenge);
  const [status, setStatus] = useState<'idle'|'wrong'|'ok'>('idle');
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // countdown quando bloqueado
  useEffect(() => {
    if (!blocked) return;
    setCountdown(30);
    const t = setInterval(() => setCountdown(c => { if (c <= 1) { clearInterval(t); setBlocked(false); setAttempts(0); return 0; } return c - 1; }), 1000);
    return () => clearInterval(t);
  }, [blocked]);

  const handleAnswer = useCallback((opt: number) => {
    if (blocked) return;
    if (opt === challenge.a) {
      setStatus('ok');
      setTimeout(onVerified, 600);
    } else {
      const next = attempts + 1;
      setAttempts(next);
      if (next >= 5) { setBlocked(true); return; }
      setStatus('wrong');
      setShake(true);
      setTimeout(() => { setShake(false); setStatus('idle'); setChallenge(makeChallenge()); }, 900);
    }
  }, [challenge, attempts, blocked, onVerified]);

  return (
    <div style={overlay}>
      <div style={{ ...modal, animation: shake ? 'shakeModal 0.5s ease' : undefined }}>

        {/* Logo */}
        <div style={{ fontSize: 36, marginBottom: 6, filter: 'drop-shadow(0 0 12px rgba(168,85,247,0.9))' }}>⚡</div>
        <div style={logoText}>MAKE IT NOW EASY</div>
        <div style={badge}>🎮 GAMER EDITION</div>

        <div style={divider} />

        {blocked ? (
          <>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🚫</div>
            <p style={title}>Muitas tentativas!</p>
            <p style={sub}>Aguarde <strong style={{ color: '#c084fc' }}>{countdown}s</strong> para tentar novamente.</p>
          </>
        ) : (
          <>
            <div style={robotIcon}>🤖</div>
            <p style={title}>Verificação de segurança</p>
            <p style={sub}>Prove que você não é um robô resolvendo o cálculo:</p>

            <div style={mathBox}>
              <span style={mathText}>{challenge.q} = ?</span>
            </div>

            <div style={optGrid}>
              {challenge.opt.map((o, i) => (
                <button key={i} onClick={() => handleAnswer(o)} style={{
                  ...optBtn,
                  background: status === 'ok' && o === challenge.a
                    ? 'linear-gradient(135deg,#16a34a,#15803d)'
                    : status === 'wrong'
                    ? 'rgba(255,68,68,0.15)'
                    : 'linear-gradient(135deg,rgba(168,85,247,0.2),rgba(124,58,237,0.15))',
                  borderColor: status === 'ok' && o === challenge.a ? '#22c55e' : 'rgba(168,85,247,0.35)',
                  boxShadow: status === 'ok' && o === challenge.a ? '0 0 14px rgba(34,197,94,0.5)' : '0 0 8px rgba(168,85,247,0.2)',
                }}>
                  {o}
                </button>
              ))}
            </div>

            {status === 'wrong' && (
              <p style={{ color: '#ff8080', fontSize: 13, marginTop: 8, fontWeight: 700 }}>
                ❌ Resposta errada! Tentativas restantes: {5 - attempts}
              </p>
            )}
            {status === 'ok' && (
              <p style={{ color: '#86efac', fontSize: 13, marginTop: 8, fontWeight: 700 }}>
                ✅ Verificado! Entrando...
              </p>
            )}

            <p style={{ fontSize: 11, color: '#4a4a6a', marginTop: 14, fontWeight: 500 }}>
              🔒 Protegido contra bots e acessos automatizados
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes shakeModal {
          0%,100%{transform:translateX(0)} 20%{transform:translateX(-10px)} 40%{transform:translateX(10px)}
          60%{transform:translateX(-6px)} 80%{transform:translateX(6px)}
        }
        @keyframes fadeInModal {
          from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)}
        }
      `}</style>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 99999,
  background: 'radial-gradient(ellipse at center, #0d0d25 0%, #05050f 100%)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  backgroundImage: 'linear-gradient(rgba(168,85,247,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.05) 1px,transparent 1px)',
  backgroundSize: '44px 44px',
};
const modal: React.CSSProperties = {
  background: 'linear-gradient(160deg,#0f0f28,#080818)',
  border: '1px solid rgba(168,85,247,0.4)',
  borderRadius: 18, padding: '32px 36px',
  textAlign: 'center', maxWidth: 380, width: '90%',
  boxShadow: '0 0 60px rgba(168,85,247,0.2), inset 0 1px 0 rgba(168,85,247,0.1)',
  animation: 'fadeInModal 0.4s ease',
};
const logoText: React.CSSProperties = {
  fontSize: 16, fontWeight: 900, letterSpacing: '2px',
  background: 'linear-gradient(90deg,#c084fc,#e879f9,#a855f7)',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
};
const badge: React.CSSProperties = {
  display: 'inline-block', marginTop: 6,
  background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.4)',
  borderRadius: 20, padding: '2px 12px', fontSize: 10, fontWeight: 800,
  color: '#d8b4fe', letterSpacing: '1px',
};
const divider: React.CSSProperties = {
  height: 1, margin: '20px 0',
  background: 'linear-gradient(90deg,transparent,rgba(168,85,247,0.4),transparent)',
};
const robotIcon: React.CSSProperties = { fontSize: 32, marginBottom: 8 };
const title: React.CSSProperties = { fontSize: 17, fontWeight: 900, color: '#e0d0ff', marginBottom: 6 };
const sub: React.CSSProperties = { fontSize: 13, color: '#8877aa', fontWeight: 500, marginBottom: 16, lineHeight: 1.5 };
const mathBox: React.CSSProperties = {
  background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)',
  borderRadius: 12, padding: '14px 24px', marginBottom: 16, display: 'inline-block',
  boxShadow: '0 0 20px rgba(168,85,247,0.15)',
};
const mathText: React.CSSProperties = {
  fontSize: 26, fontWeight: 900, color: '#c084fc',
  textShadow: '0 0 12px rgba(168,85,247,0.7)',
  letterSpacing: '2px',
};
const optGrid: React.CSSProperties = {
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
};
const optBtn: React.CSSProperties = {
  padding: '14px', borderRadius: 10, border: '1px solid',
  fontSize: 20, fontWeight: 900, color: '#e0d0ff',
  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s ease',
};
