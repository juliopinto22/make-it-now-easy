<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel — Optimizer Kaneki</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
        body {
            background: linear-gradient(135deg, #2b003d, #4b0000);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            padding: 20px;
        }
        .caixa-principal {
            background: rgba(0,0,0,0.75);
            border: 2px solid #990000;
            border-radius: 15px;
            padding: 35px;
            max-width: 550px;
            width: 100%;
            box-shadow: 0 0 25px #660066;
        }
        .titulo { color: #cc0000; text-align: center; font-size: 38px; margin-bottom: 5px; }
        .subtitulo { color: #cc66ff; text-align: center; font-size: 20px; margin-bottom: 25px; letter-spacing: 2px; }
        .grupo { margin: 18px 0; padding: 15px; background: rgba(40,0,60,0.35); border-radius: 8px; }
        h3 { margin-bottom: 10px; }
        button {
            margin: 5px; padding: 10px 15px;
            background: linear-gradient(90deg, #660066, #990000);
            color: #fff; border: none; border-radius: 8px; cursor: pointer; transition: 0.3s;
        }
        button:hover { transform: scale(1.03); box-shadow: 0 0 10px #cc0000; }
        .voltar { background: #770000; margin-bottom: 15px; }
        .premium { border: 2px solid #cc0000; background: rgba(80,0,80,0.4); box-shadow: 0 0 15px #cc0000; margin-top: 25px; }
        .premium h3 { color: #ffcc00; text-align: center; font-size: 22px; }
        .qr-container { text-align: center; padding: 15px; }
        .qr-code { width: 220px; height: 220px; border-radius: 10px; border: 3px solid #990000; box-shadow: 0 0 20px #660066; }
        .aviso-pix { color: #eeccff; margin-top: 12px; font-size: 14px; }
        .chave-oculta { color: #999; font-size: 11px; margin-top: 5px; }
        .status { color:#99ff99; margin-top:15px; text-align:center; }
    </style>
</head>
<body>
    <div class="caixa-principal">
        <button class="voltar" onclick="window.location.href='index.html'">← Voltar</button>
        <h1 class="titulo">Painel</h1>
        <h2 class="subtitulo">OPTIMIZER KANEKI</h2>

        <div class="grupo">
            <h3>🎮 Roblox — Aumentar FPS</h3>
            <p>Flags rápidas e ajustes de desempenho</p>
            <button onclick="copiarComando('roblox')">Copiar Comandos</button>
        </div>

        <div class="grupo">
            <h3>🔫 Valorant — Desempenho</h3>
            <p>Otimizações do sistema e jogo</p>
            <button onclick="copiarComando('valorant')">Copiar Comandos</button>
        </div>

        <div class="grupo">
            <h3>🖥️ Sistema — Limpeza</h3>
            <p>Limpa cache, RAM e arquivos temporários</p>
            <button onclick="copiarComando('sistema')">Copiar Comandos</button>
        </div>

        <!-- ÁREA PREMIUM → Chave PIX escondida, só aparece o QR Code -->
        <div class="grupo premium">
            <h3>👑 ÁREA PREMIUM</h3>
            <div class="qr-container">
                <svg id="qr-code-svg" class="qr-code" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"></svg>
                <p class="aviso-pix">💳 Escaneie para pagamento via PIX</p>
                <p class="chave-oculta">🔒 Chave protegida — apenas QR Code</p>
            </div>
        </div>

        <p id="status" class="status"></p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js"></script>
    <script>
        // ⚠️ CHAVE PIX AQUI — NÃO APARECE NA TELA, SÓ NO QR CODE
        const dadosPix = "+55 11947138400";

        // Gera QR Code com cores do tema Kaneki
        QRCode.to(document.getElementById('qr-code-svg'), dadosPix, {
            width: 220, height: 220, margin: 2,
            color: { dark: '#cc0000', light: '#1a001a' }
        });

        // MESMOs comandos de otimização — nada mudou!
        const comandos = {
            roblox: `:: Roblox FPS Boost — cole no Executor
FramerateLimit = 0
RenderingMode = "Automatic"
TextureQuality = "Plain"
PhysicsEnvironment = "Performance"`,
            valorant: `:: Valorant Tweaks
Configurações → Gráficos: TUDO BAIXO
Limitar FPS = DESLIGADO
Nvidia/AMD: Prioridade em DESEMPENHO`,
            sistema: `:: Limpeza do Sistema (cole no CMD como ADM)
ipconfig /flushdns
del /f /s /q %temp%\\*
cleanmgr /sagerun:1`
        };

        function copiarComando(tipo) {
            navigator.clipboard.writeText(comandos[tipo])
                .then(() => {
                    document.getElementById('status').textContent = '✅ Copiado com sucesso!';
                    setTimeout(() => document.getElementById('status').textContent = '', 3000);
                });
        }
    </script>
</body>
</html>
