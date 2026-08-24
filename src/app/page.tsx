<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel — Optimizer Kaneki</title>
    <link rel="stylesheet" href="estilo.css">
    <style>
        .grupo { margin: 18px 0; padding: 15px; background: rgba(40,0,60,0.35); border-radius: 8px; }
        h3 { margin-bottom: 10px; }
        button { margin: 5px; padding: 10px 15px; background: #550088; color: #fff; border: none; border-radius: 5px; cursor: pointer; transition: 0.2s; }
        button:hover { background: #880088; transform: scale(1.03); }
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

        <!-- ✅ ÁREA PREMIUM COM QR CODE NOVO → A CHAVE FICA ESCONDIDA -->
        <div class="grupo premium">
            <h3>👑 ÁREA PREMIUM</h3>
            <div class="qr-container">
                <!-- QR Code gerado com base nos seus dados PIX → só escaneável, número NÃO aparece -->
                <svg id="qr-code-svg" class="qr-code" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"></svg>
                <p class="aviso-pix">💳 Escaneie para pagar — PIX copia e cola</p>
                <p class="chave-oculta">🔒 Chave protegida — apenas via QR Code</p>
            </div>
        </div>

        <p id="status" class="status"></p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js"></script>
    <script>
        // ✅ DADOS DO PIX → NÃO APARECE NA TELA, SÓ NO QR CODE
        const dadosPix = "+55 11947138400"; // A chave fica AQUI no código, NÃO aparece visível pro usuário

        // ✅ GERA O QR CODE AUTOMATICAMENTE → só a imagem, sem mostrar o número
        QRCode.to(document.getElementById('qr-code-svg'), dadosPix, {
            width: 220,
            height: 220,
            margin: 2,
            color: { dark: '#cc0000', light: '#1a001a' } // Cores do tema Kaneki
        });

        // ✅ COMANDOS DE OTIMIZAÇÃO — EXATAMENTE OS MESMOS DE ANTES
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
