// script.js
const cardapio = [
  {
    id: 1,
    nome: "Hambúrguer Clássico",
    descricao: "Pão, carne, queijo, alface e tomate",
    preco: 15.0,
    categoria: "Hambúrgueres",
    imagem: "hamburguer-classico.jpg",
    acrescimos: [
      { nome: "Bacon", preco: 3.0 },
      { nome: "Queijo Extra", preco: 2.0 },
      { nome: "Molho Especial", preco: 1.5 },
    ],
  },
  {
    id: 2,
    nome: "Hambúrguer Bacon",
    descricao: "Pão, carne, queijo, bacon e molho especial",
    preco: 18.0,
    categoria: "Hambúrgueres",
    imagem: "hamburguer-bacon.jpg",
    acrescimos: [
      { nome: "Queijo Extra", preco: 2.0 },
      { nome: "Molho Especial", preco: 1.5 },
    ],
  },
  // Adicione mais produtos aqui
];

let carrinho = [];
let produtoSelecionado = null;

// Exibe o cardápio
function exibirCardapio() {
  const cardapioDiv = document.getElementById("cardapio");
  const categorias = [...new Set(cardapio.map((item) => item.categoria))]; // Remove categorias duplicadas

  categorias.forEach((categoria) => {
    const categoriaDiv = document.createElement("div");
    categoriaDiv.className = "categoria";
    categoriaDiv.innerHTML = `<h3>${categoria}</h3>`;

    const itensCategoria = cardapio.filter((item) => item.categoria === categoria);
    itensCategoria.forEach((item) => {
      categoriaDiv.innerHTML += `
        <div class="item" onclick="abrirPopup(${item.id})">
          <img src="${item.imagem}" alt="${item.nome}">
          <div>
            <h3>${item.nome}</h3>
            <p>${item.descricao}</p>
            <p>R$ ${item.preco.toFixed(2)}</p>
          </div>
        </div>
      `;
    });

    cardapioDiv.appendChild(categoriaDiv);
  });
}

// Abre o popup de detalhes do produto
function abrirPopup(id) {
  produtoSelecionado = cardapio.find((item) => item.id === id);
  document.getElementById("popup-nome").innerText = produtoSelecionado.nome;
  document.getElementById("popup-descricao").innerText = produtoSelecionado.descricao;
  document.getElementById("popup").style.display = "flex";
  document.getElementById("popup").classList.add("active");
}

// Fecha o popup
function fecharPopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("popup").classList.remove("active");
}

// Adiciona o produto ao carrinho
function adicionarAoCarrinho() {
  if (!produtoSelecionado) return;

  const quantidade = parseInt(document.getElementById("quantidade-popup").value);
  const observacoes = document.getElementById("observacoes").value;

  // Obtém os acréscimos selecionados
  const acrescimosSelecionados = [];
  document.querySelectorAll("#lista-acrescimos input[type='checkbox']:checked").forEach((checkbox) => {
    acrescimosSelecionados.push({
      nome: checkbox.value,
      preco: parseFloat(checkbox.dataset.preco),
    });
  });

  const itemCarrinho = {
    ...produtoSelecionado,
    quantidade,
    observacoes,
    acrescimos: acrescimosSelecionados,
  };

  // Verifica se o item já está no carrinho
  const itemExistente = carrinho.find((item) => item.id === itemCarrinho.id);
  if (itemExistente) {
    itemExistente.quantidade += quantidade; // Atualiza a quantidade
  } else {
    carrinho.push(itemCarrinho); // Adiciona o item ao carrinho
  }

  atualizarCarrinho();
  fecharPopup();
}

// Atualiza o carrinho
function atualizarCarrinho() {
  const itensCarrinho = document.getElementById("itens-carrinho");
  const subtotalCarrinho = document.getElementById("subtotal-carrinho");
  const valorTaxaEntrega = document.getElementById("valor-taxa-entrega");
  const totalCarrinho = document.getElementById("total-carrinho");

  // Limpa a lista de itens
  itensCarrinho.innerHTML = "";

  // Adiciona cada item do carrinho à lista
  carrinho.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome} - ${item.quantidade}x - R$ ${(item.preco * item.quantidade).toFixed(2)}
      <div class="quantidade-container">
        <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
        <input type="number" id="quantidade-${item.id}" value="${item.quantidade}" min="1" onchange="atualizarQuantidade(${item.id})">
        <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
      </div>
    `;

    // Adiciona os acréscimos ao item
    if (item.acrescimos.length > 0) {
      li.innerHTML += `<ul>`;
      item.acrescimos.forEach((acrescimo) => {
        li.innerHTML += `
          <li>+ ${acrescimo.nome} - R$ ${acrescimo.preco.toFixed(2)}</li>
        `;
      });
      li.innerHTML += `</ul>`;
    }

    // Adiciona as observações
    if (item.observacoes) {
      li.innerHTML += `<div class="observacoes">Obs: ${item.observacoes}</div>`;
    }

    itensCarrinho.appendChild(li);
  });

  // Calcula o subtotal
  const subtotal = carrinho.reduce((sum, item) => {
    const valorAcrescimos = item.acrescimos.reduce((sumAcrescimo, acrescimo) => sumAcrescimo + acrescimo.preco, 0);
    return sum + (item.preco + valorAcrescimos) * item.quantidade;
  }, 0);
  subtotalCarrinho.innerText = subtotal.toFixed(2);

  // Calcula a taxa de entrega (R$ 3,00 se for delivery)
  const metodoRetirada = document.getElementById("metodo-retirada").value;
  const taxaEntrega = metodoRetirada === "Receber em Casa" ? 3.0 : 0.0;
  valorTaxaEntrega.innerText = taxaEntrega.toFixed(2);

  // Calcula o total
  const total = subtotal + taxaEntrega;
  totalCarrinho.innerText = total.toFixed(2);

  // Atualiza o contador do carrinho
  atualizarContadorCarrinho();
}

// Altera a quantidade de um item no carrinho
function alterarQuantidade(id, delta) {
  const item = carrinho.find((item) => item.id === id);
  const novaQuantidade = item.quantidade + delta;

  if (novaQuantidade <= 0) {
    // Remove o item do carrinho se a quantidade for 0
    carrinho = carrinho.filter((item) => item.id !== id);
  } else {
    item.quantidade = novaQuantidade;
    document.getElementById(`quantidade-${id}`).value = novaQuantidade;
  }

  atualizarCarrinho();
}

// Atualiza a quantidade de um item no carrinho
function atualizarQuantidade(id) {
  const item = carrinho.find((item) => item.id === id);
  const novaQuantidade = parseInt(document.getElementById(`quantidade-${id}`).value);

  if (novaQuantidade <= 0) {
    // Remove o item do carrinho se a quantidade for 0
    carrinho = carrinho.filter((item) => item.id !== id);
  } else {
    item.quantidade = novaQuantidade;
  }

  atualizarCarrinho();
}

// Alternar visibilidade do carrinho
function alternarCarrinho() {
  const carrinhoPopup = document.getElementById("carrinho-popup");
  carrinhoPopup.classList.toggle("active");
}

// Atualizar contador do carrinho
function atualizarContadorCarrinho() {
  const contador = document.getElementById("contador-carrinho");
  contador.innerText = carrinho.reduce((total, item) => total + item.quantidade, 0);
}

// Alterar quantidade no popup de detalhes
function alterarQuantidadePopup(delta) {
  const quantidadeInput = document.getElementById("quantidade-popup");
  let quantidade = parseInt(quantidadeInput.value);
  quantidade = Math.max(1, quantidade + delta); // Garante que a quantidade não seja menor que 1
  quantidadeInput.value = quantidade;
}

// Abre o popup de finalização do pedido
function finalizarPedido() {
  document.getElementById("finalizar-pedido-popup").style.display = "flex";
  document.getElementById("finalizar-pedido-popup").classList.add("active");
}

// Fecha o popup de finalização do pedido
function fecharFinalizarPedido() {
  document.getElementById("finalizar-pedido-popup").style.display = "none";
  document.getElementById("finalizar-pedido-popup").classList.remove("active");
}

// Envia o pedido para o WhatsApp
function enviarPedidoWhatsApp() {
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const rua = document.getElementById("rua").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const bairro = document.getElementById("bairro").value.trim();
  const endereco = `${rua}, ${numero}, ${bairro}`;

  // Validação dos campos
  if (!nome) {
    alert("Por favor, insira seu nome.");
    return;
  }

  if (!telefone) {
    alert("Por favor, insira um número de telefone.");
    return;
  }

  if (!rua || !numero || !bairro) {
    alert("Por favor, insira o endereço completo.");
    return;
  }

  const metodoPagamento = document.getElementById("metodo-pagamento").value;
  const metodoRetirada = document.getElementById("metodo-retirada").value;

  const itens = carrinho
    .map((item) => {
      const acrescimos = item.acrescimos.map((acrescimo) => `+ ${acrescimo.nome} (R$ ${acrescimo.preco.toFixed(2)})`).join(", ");
      const observacoes = item.observacoes ? ` (${item.observacoes})` : "";
      return `${item.nome} - ${item.quantidade}x - R$ ${(item.preco * item.quantidade).toFixed(2)}${observacoes} ${acrescimos ? `(${acrescimos})` : ""}`;
    })
    .join("\n");

  const subtotal = carrinho.reduce((sum, item) => {
    const valorAcrescimos = item.acrescimos.reduce((sumAcrescimo, acrescimo) => sumAcrescimo + acrescimo.preco, 0);
    return sum + (item.preco + valorAcrescimos) * item.quantidade;
  }, 0);
  const taxaEntrega = metodoRetirada === "Receber em Casa" ? 3.0 : 0.0;
  const totalFinal = subtotal + taxaEntrega;

  const mensagem = `
    Pedido Rei do Burguer: ${nome}
    Telefone: ${telefone}
    Endereço: ${endereco}

    ${itens}

    Subtotal: R$ ${subtotal.toFixed(2)}
    + Frete: R$ ${taxaEntrega.toFixed(2)}
    Total: R$ ${totalFinal.toFixed(2)}
  `;

  const linkWhatsApp = `https://wa.me/5533998521968?text=${encodeURIComponent(mensagem)}`;
  window.open(linkWhatsApp, "_blank");
}

// Inicializa o cardápio
exibirCardapio();