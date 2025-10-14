document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões de somar (+) e subtrair (-)
    const botoesSomar = document.querySelectorAll('.btn-somar');
    const botoesSubtrair = document.querySelectorAll('.btn-subtrair');

    // Seleciona o botão de finalizar pedido, o elemento do total e os campos do cliente
    const btnFinalizar = document.getElementById('btn-finalizar-pedido');
    const totalElemento = document.getElementById('total-pedido');
    const nomeClienteInput = document.getElementById('nome-cliente');
    const enderecoClienteInput = document.getElementById('endereco-cliente');

    // Número do WhatsApp da loja
    const numeroWhatsApp = '5546991032063';

    // Adiciona evento de clique a cada botão de somar
    botoesSomar.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            input.value = parseInt(input.value) + 1;
            atualizarTotal();
        });
    });

    // Adiciona evento de clique a cada botão de subtrair
    botoesSubtrair.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.nextElementSibling;
            const quantidade = parseInt(input.value);
            if (quantidade > 0) {
                input.value = quantidade - 1;
                atualizarTotal();
            }
        });
    });

    // Adiciona evento de clique ao botão de finalizar pedido
    btnFinalizar.addEventListener('click', () => {
        gerarPedidoWhatsApp();
    });

    // Função para atualizar o total do pedido
    function atualizarTotal() {
        let total = 0;
        const itens = document.querySelectorAll('.lista-itens li');

        itens.forEach(item => {
            const preco = parseFloat(item.dataset.preco);
            const quantidade = parseInt(item.querySelector('.quantidade').value);
            total += preco * quantidade;
        });

        // Formata o total para duas casas decimais e substitui ponto por vírgula
        totalElemento.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // Função para gerar a mensagem e abrir o WhatsApp
    function gerarPedidoWhatsApp() {
        // Captura os valores dos campos do cliente
        const nomeCliente = nomeClienteInput.value.trim();
        const enderecoCliente = enderecoClienteInput.value.trim();

        // Verifica se os campos obrigatórios estão preenchidos
        if (nomeCliente === '' || enderecoCliente === '') {
            alert('Por favor, informe seu nome e endereço para a entrega.');
            return; // Interrompe a função se os campos estiverem vazios
        }

        let pedidoItens = [];
        const itens = document.querySelectorAll('.lista-itens li');
        let total = 0;

        itens.forEach(item => {
            const nome = item.dataset.nome;
            const preco = parseFloat(item.dataset.preco);
            const quantidade = parseInt(item.querySelector('.quantidade').value);

            if (quantidade > 0) {
                // Adiciona o item à lista de pedidos
                pedidoItens.push(`${quantidade}x ${nome} - R$ ${(preco * quantidade).toFixed(2).replace('.', ',')}`);
                total += preco * quantidade;
            }
        });

        if (pedidoItens.length > 0) {
            // Formata a nova mensagem com os dados do cliente
            const mensagem = `Olá, gostaria de fazer um pedido.\n\n` +
                `*Cliente:* ${nomeCliente}\n` +
                `*Endereço:* ${enderecoCliente}\n\n` +
                `${pedidoItens.join('\n')}\n\n` +
                `*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;

            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
        } else {
            alert('Por favor, selecione pelo menos um item para o seu pedido.');
        }
    }
});