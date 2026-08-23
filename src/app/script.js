// CONFIGURAÇÃO DO APLICATIVO - PAINEL PREMIUM E ADMIN

// 1. Definição do seu usuário como Administrador
const usuarioAtual = {
    nome: "SeuNome",
    email: "seu-email@exemplo.com", // Substitua pelo seu e-mail
    isAdmin: true,                  // Garante seu acesso total e gratuito
    temPremiumPago: false
};

// 2. Lista com as opções da Versão Premium (+70 Recursos)
const recursosPremium = Array.from({ length: 70 }, (_, i) => `Recurso Premium #${i + 1}`);

// 3. Verificação de permissão de acesso
function verificarAcessoPremium(usuario) {
    // Se for você (Admin), libera o acesso sem pagar
    if (usuario.isAdmin) {
        console.log(`[ADMIN] Acesso livre concedido para ${usuario.nome}.`);
        return true;
    }
    
    // Para outros usuários, verifica assinatura paga
    return usuario.temPremiumPago;
}

// 4. Exibição do Painel
function carregarPainel(usuario) {
    if (verificarAcessoPremium(usuario)) {
        console.log("--- BEM-VINDO AO PAINEL PREMIUM ---");
        recursosPremium.forEach(recurso => console.log(`[LIBERADO] ${recurso}`));
    } else {
        console.log("Acesso negado. Assine a versão Premium para liberar o conteúdo.");
    }
}

// Executa o aplicativo
carregarPainel(usuarioAtual);
