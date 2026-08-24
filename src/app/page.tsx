<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OPTIMIZER KANEKI</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
      background-color: #050505;
      color: #F0F0F0;
      overflow-x: hidden;
    }

    /* HEADER */
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 8%;
      border-bottom: 1px solid #220808;
      background: rgba(5, 5, 5, 0.95);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .logo {
      font-size: 20px;
      font-weight: 900;
      color: #E40200;
      letter-spacing: 2px;
      text-shadow: 0 0 12px rgba(228, 2, 0, 0.5);
    }

    nav {
      display: flex;
      gap: 30px;
    }

    nav a {
      color: #999;
      text-decoration: none;
      font-size: 14px;
      transition: 0.2s;
    }

    nav a:hover {
      color: #FFF;
    }

    .btn-header {
      background: #E40200;
      color: #FFF;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 0 15px rgba(228, 2, 0, 0.4);
    }

    /* HERO SECTION */
    .hero {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 80px 8%;
      gap: 40px;
      flex-wrap: wrap;
    }

    .hero-text {
      flex: 1 1 500px;
      max-width: 600px;
    }

    .badge {
      display: inline-block;
      background: rgba(228, 2, 0, 0.1);
      border: 1px solid #7A0000;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      color: #E40200;
      font-weight: bold;
      margin-bottom: 24px;
    }

    h1 {
      font-size: 52px;
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 20px;
    }

    h1 span {
      color: #E40200;
      text-shadow: 0 0 20px rgba(228, 2, 0, 0.4);
    }

    .description {
      font-size: 16px;
      color: #999;
      line-height: 1.6;
      margin-bottom: 32px;
    }

    .cta-group {
      display: flex;
      gap: 16px;
      margin-bottom: 40px;
    }

    .btn-main {
      background: #E40200;
      color: #FFF;
      border: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 0 25px rgba(228, 2, 0, 0.4);
    }

    .btn-sec {
      background: rgba(15, 15, 15, 0.85);
      color: #F0F0F0;
      border: 1px solid #220808;
      padding: 16px 28px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
    }

    .stats {
      display: flex;
      gap: 35px;
      border-top: 1px solid #220808;
      padding-top: 25px;
    }

    .stat-number {
      font-size: 24px;
      font-weight: bold;
      color: #E40200;
    }

    .stat-desc {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }

    /* MOCKUP CARD */
    .hero-card {
      flex: 1 1 500px;
      display: flex;
      justify-content: center;
    }

    .card-box {
      width: 100%;
      max-width: 580px;
      background: rgba(15, 15, 15, 0.85);
      border: 1px solid #7A0000;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 0 40px rgba(0,0,0,0.8), 0 0 20px rgba(228, 2, 0, 0.3);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      border-bottom: 1px solid #220808;
      padding-bottom: 10px;
      font-size: 12px;
      color: #999;
    }

    .status-tag {
      background: #E40200;
      color: #FFF;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 11px;
    }

    .image-preview {
      height: 260px;
      border-radius: 8px;
      /* Imagem online funcional para evitar tela preta */
      background: linear-gradient(to top, rgba(0,0,0,0.9), transparent), 
                  url('https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop') center/cover;
      display: flex;
      align-items: flex-end;
      padding: 20px;
    }

    .image-preview h3 {
      font-size: 20px;
      text-shadow: 0 0 10px #000;
    }

    .image-preview p {
      font-size: 12px;
      color: #00FF66;
      margin-top: 4px;
    }

    .controls-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 15px;
    }

    .control-item {
      background: #000;
      padding: 12px;
      border-radius: 6px;
      border: 1px solid #220808;
    }

    .control-label {
      font-size: 11px;
      color: #999;
    }

    .control-value {
      font-size: 13px;
      font-weight: bold;
      margin-top: 2px;
    }

    /* BENCHMARKS */
    .benchmarks {
      padding: 60px 8%;
      background: rgba(10, 0, 0, 0.5);
      border-top: 1px solid #220808;
    }

    .bench-title {
      text-align: center;
      margin-bottom: 40px;
    }

    .bench-title h2 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .bench-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
    }

    .bench-card {
      background: rgba(15, 15, 15, 0.85);
      border: 1px solid #220808;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
    }

    .bench-card h4 {
      margin-bottom: 15px;
      font-size: 18px;
    }

    .fps-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #999;
      margin-bottom: 8px;
    }

    .fps-gain {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      font-weight: bold;
      color: #00FF66;
      margin-bottom: 12px;
    }

    .badge-gain {
      background: rgba(0, 255, 102, 0.1);
      color: #00FF66;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      display: inline-block;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header>
    <div class="logo">⚡ OPTIMIZER KANEKI</div>
    <nav>
      <a href="#recursos">Recursos</a>
      <a href="#desempenho">Desempenho</a>
      <a href="#planos">Planos</a>
    </nav>
    <button class="btn-header">Baixar Agora</button>
  </header>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-text">
      <div class="badge">⚡ ACABE COM O LAG E OS TRAVAMENTOS AGORA</div>
      <h1>Otimize seu PC <br /><span>com 1 clique.</span></h1>
      <p class="description">
        Aumente seu FPS e reduza o input lag com otimizações inteligentes, automáticas e 100% reversíveis. Sem comandos complicados, sem risco.
      </p>
      <div class="cta-group">
        <button class="btn-main">Download Grátis</button>
        <button class="btn-sec">Ver Planos Premium</button>
      </div>
      <div class="stats">
        <div>
          <div class="stat-number">↓ 15ms</div>
          <div class="stat-desc">Redução de latência</div>
        </div>
        <div>
          <div class="stat-number">↑ 35%</div>
          <div class="stat-desc">Mais estabilidade</div>
        </div>
        <div>
          <div class="stat-number">↑ 45%</div>
          <div class="stat-desc">Boot mais rápido</div>
        </div>
      </div>
    </div>

    <!-- MOCKUP CARD -->
    <div class="hero-card">
      <div class="card-box">
        <div class="card-header">
          <span>OPTIMIZER KANEKI — Dashboard</span>
          <span class="status-tag">SISTEMA PRONTO</span>
        </div>
        <div class="image-preview">
          <div>
            <h3>PC Otimizado com Sucesso</h3>
            <p>✔ 150+ Tweaks de Registro Aplicados</p>
          </div>
        </div>
        <div class="controls-grid">
          <div class="control-item">
            <div class="control-label">GPU Throttling</div>
            <div class="control-value" style="color: #E40200;">DESATIVADO</div>
          </div>
          <div class="control-item">
            <div class="control-label">Plano de Energia</div>
            <div class="control-value" style="color: #00FF66;">DESEMPENHO MÁXIMO</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BENCHMARKS -->
  <section class="benchmarks" id="desempenho">
    <div class="bench-title">
      <h2>Ganho de FPS em Jogos Populares</h2>
      <p style="color: #999;">Resultados medidos em PCs de entrada e intermediários no Brasil.</p>
    </div>
    <div class="bench-grid">
      <div class="bench-card">
        <h4>Valorant</h4>
        <div class="fps-row"><span>Sem Optimizer:</span> <span style="text-decoration: line-through;">180 FPS</span></div>
        <div class="fps-gain"><span>Com Optimizer:</span> <span>280 FPS</span></div>
        <div class="badge-gain">+55% de Desempenho</div>
      </div>
      <div class="bench-card">
        <h4>League of Legends</h4>
        <div class="fps-row"><span>Sem Optimizer:</span> <span style="text-decoration: line-through;">210 FPS</span></div>
        <div class="fps-gain"><span>Com Optimizer:</span> <span>320 FPS</span></div>
        <div class="badge-gain">+52% de Desempenho</div>
      </div>
      <div class="bench-card">
        <h4>CS2</h4>
        <div class="fps-row"><span>Sem Optimizer:</span> <span style="text-decoration: line-through;">120 FPS</span></div>
        <div class="fps-gain"><span>Com Optimizer:</span> <span>185 FPS</span></div>
        <div class="badge-gain">+54% de Desempenho</div>
      </div>
      <div class="bench-card">
        <h4>GTA V / FiveM</h4>
        <div class="fps-row"><span>Sem Optimizer:</span> <span style="text-decoration: line-through;">75 FPS</span></div>
        <div class="fps-gain"><span>Com Optimizer:</span> <span>115 FPS</span></div>
        <div class="badge-gain">+53% de Desempenho</div>
      </div>
    </div>
  </section>

</body>
</html>
