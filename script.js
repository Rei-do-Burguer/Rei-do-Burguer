const cardapio = [
  {
    id: 1,
    nome: "X-Tudo",
    descricao: "Hambúrguer artesanal (80g), queijo, tomate, molho especial, bacon, ovo, presunto, alface e cheddar no pão macio.",
    preco: 22.0,
    categoria: "Hamburguer Tradicional",
    imagem: "x-tudo.jpg",
    acrescimos: [],
  },
  {
    id: 2,
    nome: "X-Burguer",
    descricao: "Hambúrguer artesanal (80g), queijo e molho especial no pão fofinho.",
    preco: 15.0,
    categoria: "Hamburguer Tradicional",
    imagem: "x-burguer.jpg",
    acrescimos: [],
  },
  {
    id: 3,
    nome: "Hambúrguer",
    descricao: "Hambúrguer artesanal (80g), tomate, alface e molho especial no pão macio.",
    preco: 13.0,
    categoria: "Hamburguer Tradicional",
    imagem: "hamburguer.jpg",
    acrescimos: [],
  },
  {
    id: 4,
    nome: "X-Salada",
    descricao: "Hambúrguer artesanal (80g), queijo, tomate, alface e molho especial no pão fofinho.",
    preco: 15.0,
    categoria: "Hamburguer Tradicional",
    imagem: "x-salada.jpg",
    acrescimos: [],
  },
  {
    id: 5,
    nome: "X-EGG",
    descricao: "Hambúrguer artesanal (80g), queijo, tomate, ovo, alface, cheddar e molho especial.",
    preco: 16.0,
    categoria: "Hamburguer Tradicional",
    imagem: "x-egg.jpg",
    acrescimos: [],
  },
  {
    id: 6,
    nome: "X-EGG BACON",
    descricao: "Hambúrguer artesanal (80g), queijo, tomate, ovo, bacon, alface, cheddar e molho especial.",
    preco: 18.0,
    categoria: "Hamburguer Tradicional",
    imagem: "x-egg-bacon.jpg",
    acrescimos: [],
  },
  {
    id: 7,
    nome: "X-Bacon",
    descricao: "Hambúrguer artesanal (80g), queijo, tomate, bacon, alface, cheddar e molho especial.",
    preco: 17.0,
    categoria: "Hamburguer Tradicional",
    imagem: "x-bacon.jpg",
    acrescimos: [],
  },
  {
    id: 8,
    nome: "X-REAL",
    descricao: "Hambúrguer artesanal (160g), queijo, tomate, bacon, alface, cheddar e molho especial.",
    preco: 24.0,
    categoria: "Hamburguer Premium",
    imagem: "x-real.jpg",
    acrescimos: [],
  },
  {
    id: 9,
    nome: "X-REAL DUPLO",
    descricao: "2X Hambúrguer artesanal (160g), queijo, tomate, bacon, alface, cheddar e molho especial.",
    preco: 32.0,
    categoria: "Hamburguer Premium",
    imagem: "x-real-duplo.jpg",
    acrescimos: [],
  },
  {
    id: 10,
    nome: "X-PRINCIPE",
    descricao: "Hambúrguer artesanal (80g), queijo, tomate, bacon, alface, cheddar e molho especial.",
    preco: 17.0,
    categoria: "Hamburguer Premium",
    imagem: "x-principe.jpg",
    acrescimos: [],
  },
  {
    id: 11,
    nome: "X-PRINCIPE DUPLO",
    descricao: "2X Hambúrguer artesanal (80g), queijo, tomate, bacon, alface, cheddar e molho especial.",
    preco: 23.0,
    categoria: "Hamburguer Premium",
    imagem: "x-principe-duplo.jpg",
    acrescimos: [],
  },
];

const acrescimos = [
  { nome: "SMASH BURGUER 60G", preco: 3.0 },
  { nome: "BURGUER ARTESANAL 80G", preco: 4.0 },
  { nome: "BURGUER ARTESANAL 160G", preco: 8.0 },
  { nome: "MOLHO CHEDDAR", preco: 2.5 },
  { nome: "BACON", preco: 3.5 },
  { nome: "OVO", preco: 1.5 },
  { nome: "PRESUNTO", preco: 2.5 },
  { nome: "QUEIJO", preco: 3.0 },
  { nome: "MOLHO DO REI", preco: 3.5 },
];

cardapio.forEach((lanche) => {
  lanche.acrescimos = acrescimos;
});

cardapio.sort((a, b) => a.preco - b.preco);
acrescimos.sort((a, b) => a.preco - b.preco);

let carrinho = [];
let produtoSelecionado = null;

function gerarIdPedido() {
  const numeros = Math.floor(Math.random() * 100).toString().padStart(2, "0");
  const letras = String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                 String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `REI${numeros}${letras}`;
}

function exibirCardapio() {
  const cardapioDiv = document.getElementById("cardapio");
  cardapioDiv.innerHTML = "";

  const categorias = [...new Set(cardapio.map((item) => item.categoria))];

  categorias.forEach((categoria) => {
    const categoriaDiv = document.createElement("div");
    categoriaDiv.className = "categoria";
    categoriaDiv.innerHTML = `<h3>${categoria}</h3>`;

    const itensCategoria = cardapio.filter((item) => item.categoria === categoria);
    itensCategoria.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='placeholder.jpg';">
        <div>
          <h3>${item.nome}</h3>
          <p>${item.descricao}</p>
          <p>R$ ${item.preco.toFixed(2)}</p>
        </div>
      `;
      itemDiv.onclick = () => abrirPopup(item.id);
      categoriaDiv.appendChild(itemDiv);
    });

    cardapioDiv.appendChild(categoriaDiv);
  });
}

function abrirPopup(id) {
  produtoSelecionado = cardapio.find((item) => item.id === id);
  document.getElementById("popup-nome").innerText = produtoSelecionado.nome;
  document.getElementById("popup-descricao").innerText = produtoSelecionado.descricao;
  document.getElementById("popup").style.display = "flex";
  document.getElementById("popup").classList.add("active");

  const listaAcrescimos = document.getElementById("lista-acrescimos");
  listaAcrescimos.innerHTML = produtoSelecionado.acrescimos
    .map(
      (acrescimo) => `
      <label>
        ${acrescimo.nome} (+ R$ ${acrescimo.preco.toFixed(2)})
        <input type="checkbox" value="${acrescimo.nome}" data-preco="${acrescimo.preco}">
      </label>
    `
    )
    .join("");
}

function fecharPopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("popup").classList.remove("active");
}

function adicionarAoCarrinho() {
  if (!produtoSelecionado) return;

  const quantidade = parseInt(document.getElementById("quantidade-popup").value);
  const observacoes = document.getElementById("observacoes").value;

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

  const itemExistente = carrinho.find((item) => 
    item.nome === itemCarrinho.nome &&
    item.observacoes === itemCarrinho.observacoes &&
    JSON.stringify(item.acrescimos) === JSON.stringify(itemCarrinho.acrescimos)
  );

  if (itemExistente) {
    itemExistente.quantidade += itemCarrinho.quantidade;
  } else {
    carrinho.push(itemCarrinho);
  }

  atualizarCarrinho();
  fecharPopup();
  mostrarMensagem("Item adicionado ao carrinho!");
}

function atualizarCarrinho() {
  const itensCarrinho = document.getElementById("itens-carrinho");
  const subtotalCarrinho = document.getElementById("subtotal-carrinho");
  const valorTaxaEntrega = document.getElementById("valor-taxa-entrega");
  const totalCarrinho = document.getElementById("total-carrinho");

  itensCarrinho.innerHTML = "";

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}
      <div class="acrescimos">
        ${item.acrescimos.map((acrescimo) => `
          <div>+ ${acrescimo.nome} - R$ ${acrescimo.preco.toFixed(2)}</div>
        `).join("")}
      </div>
      ${item.observacoes ? `<div class="observacoes">Obs: ${item.observacoes}</div>` : ""}
      <div class="quantidade-container">
        <button onclick="alterarQuantidade(${index}, -1)">-</button>
        <input type="number" id="quantidade-${index}" value="${item.quantidade}" min="1" onchange="atualizarQuantidade(${index})">
        <button onclick="alterarQuantidade(${index}, 1)">+</button>
      </div>
      <div class="divisoria"></div>
    `;

    itensCarrinho.appendChild(li);
  });

  const subtotal = carrinho.reduce((sum, item) => {
    const valorAcrescimos = item.acrescimos.reduce((sumAcrescimo, acrescimo) => sumAcrescimo + acrescimo.preco, 0);
    return sum + (item.preco + valorAcrescimos) * item.quantidade;
  }, 0);
  subtotalCarrinho.innerText = subtotal.toFixed(2);

  const metodoRetirada = document.getElementById("metodo-retirada").value;
  const taxaEntrega = metodoRetirada === "Receber em Casa" ? 3.0 : 0.0;
  valorTaxaEntrega.innerText = taxaEntrega.toFixed(2);

  const total = subtotal + taxaEntrega;
  totalCarrinho.innerText = total.toFixed(2);

  atualizarContadorCarrinho();
}

function alterarQuantidade(index, delta) {
  const item = carrinho[index];
  const novaQuantidade = item.quantidade + delta;

  if (novaQuantidade <= 0) {
    carrinho.splice(index, 1);
  } else {
    item.quantidade = novaQuantidade;
    document.getElementById(`quantidade-${index}`).value = novaQuantidade;
  }

  atualizarCarrinho();
}

function atualizarQuantidade(index) {
  const item = carrinho[index];
  const novaQuantidade = parseInt(document.getElementById(`quantidade-${index}`).value);

  if (novaQuantidade <= 0) {
    carrinho.splice(index, 1);
  } else {
    item.quantidade = novaQuantidade;
  }

  atualizarCarrinho();
}

function alternarCarrinho() {
  const carrinhoPopup = document.getElementById("carrinho-popup");
  carrinhoPopup.classList.toggle("active");
}

function atualizarContadorCarrinho() {
  const contador = document.getElementById("contador-carrinho");
  contador.innerText = carrinho.reduce((total, item) => total + item.quantidade, 0);
}

function alterarQuantidadePopup(delta) {
  const quantidadeInput = document.getElementById("quantidade-popup");
  let quantidade = parseInt(quantidadeInput.value);
  quantidade = Math.max(1, quantidade + delta);
  quantidadeInput.value = quantidade;
}

function finalizarPedido() {
  document.getElementById("finalizar-pedido-popup").style.display = "flex";
  document.getElementById("finalizar-pedido-popup").classList.add("active");
}

function fecharFinalizarPedido() {
  document.getElementById("finalizar-pedido-popup").style.display = "none";
  document.getElementById("finalizar-pedido-popup").classList.remove("active");
}

function salvarDadosUsuario() {
  const dadosUsuario = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    rua: document.getElementById("rua").value,
    numero: document.getElementById("numero").value,
    bairro: document.getElementById("bairro").value,
    metodoPagamento: document.getElementById("metodo-pagamento").value,
    metodoRetirada: document.getElementById("metodo-retirada").value,
  };
  localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
}

function carregarDadosUsuario() {
  const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));
  if (dadosUsuario) {
    document.getElementById("nome").value = dadosUsuario.nome;
    document.getElementById("telefone").value = dadosUsuario.telefone;
    document.getElementById("rua").value = dadosUsuario.rua;
    document.getElementById("numero").value = dadosUsuario.numero;
    document.getElementById("bairro").value = dadosUsuario.bairro;
    document.getElementById("metodo-pagamento").value = dadosUsuario.metodoPagamento;
    document.getElementById("metodo-retirada").value = dadosUsuario.metodoRetirada;
  }
}

function mostrarMensagem(mensagem) {
  const mensagemPopup = document.getElementById("mensagem-popup");
  mensagemPopup.innerText = mensagem;
  mensagemPopup.classList.add("active");

  setTimeout(() => {
    mensagemPopup.classList.remove("active");
  }, 3000);
}

// Configurações da API do Google Sheets
const SPREADSHEET_ID = "12PbQKCJkZIM0A_JKKnq-q6zRDGn72lW8hZwC8sJXA8w"; // ID da sua planilha
const SHEET_NAME = "Pedidos"; // Nome da aba onde os dados serão salvos
const CLIENT_EMAIL = "gerenciamento-de-pedidos@xenon-muse-453216-r2.iam.gserviceaccount.com"; // E-mail da conta de serviço
const PRIVATE_KEY = "530f64b1fe3809f050aa52d8c3cf0c5f4c4287eb"; // Chave privada

// Função para salvar o pedido no Google Sheets
async function salvarPedidoNoGoogleSheets(pedido) {
  const { google } = require("googleapis"); // Se estiver usando Node.js
  const sheets = google.sheets({ version: "v4" });

  const authClient = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  try {
    // Autenticar
    await authClient.authorize();

    // Preparar os dados
    const valores = [
      [
        pedido.idPedido,
        pedido.nome,
        pedido.telefone,
        pedido.endereco,
        pedido.metodoPagamento,
        pedido.metodoRetirada,
        pedido.itens.join(", "),
        pedido.subtotal,
        pedido.taxaEntrega,
        pedido.total,
        new Date().toLocaleString(),
      ],
    ];

    // Enviar os dados para a planilha
    const response = await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`, // Intervalo onde os dados serão adicionados
      valueInputOption: "RAW",
      resource: {
        values: valores,
      },
    });

    console.log("Pedido salvo no Google Sheets:", response.data);
    return true;
  } catch (error) {
    console.error("Erro ao salvar o pedido no Google Sheets:", error);
    return false;
  }
}

// Função para enviar o pedido
async function enviarPedido() {
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const rua = document.getElementById("rua").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const bairro = document.getElementById("bairro").value.trim();

  if (!nome || !telefone || !rua || !numero || !bairro) {
    mostrarMensagem("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const endereco = `${rua}, ${numero}, ${bairro}`;
  const metodoPagamento = document.getElementById("metodo-pagamento").value;
  const metodoRetirada = document.getElementById("metodo-retirada").value;
  const idPedido = gerarIdPedido();

  const itens = carrinho.map((item) => {
    return `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
  });

  const subtotal = carrinho.reduce((sum, item) => {
    const valorAcrescimos = item.acrescimos.reduce((sumAcrescimo, acrescimo) => sumAcrescimo + acrescimo.preco, 0);
    return sum + (item.preco + valorAcrescimos) * item.quantidade;
  }, 0);

  const taxaEntrega = metodoRetirada === "Receber em Casa" ? 3.0 : 0.0;
  const totalFinal = subtotal + taxaEntrega;

  // Preparar o objeto do pedido
  const pedido = {
    idPedido,
    nome,
    telefone,
    endereco,
    metodoPagamento,
    metodoRetirada,
    itens,
    subtotal,
    taxaEntrega,
    total: totalFinal,
  };

  // Salvar o pedido no Google Sheets
  const sucesso = await salvarPedidoNoGoogleSheets(pedido);

  if (sucesso) {
    // Enviar pedido para o WhatsApp
    const pedidoTexto = formatarPedidoTexto(nome, telefone, idPedido, carrinho, metodoPagamento, metodoRetirada, endereco);
    const linkWhatsApp = `https://wa.me/5533998521968?text=${encodeURIComponent(pedidoTexto)}`;
    window.open(linkWhatsApp, "_blank");

    carrinho = [];
    atualizarCarrinho();
    fecharFinalizarPedido();
    mostrarMensagem("Pedido enviado com sucesso! Obrigado.");
  } else {
    mostrarMensagem("Erro ao salvar o pedido. Tente novamente.");
  }
}

// Função para gerar um ID de pedido único
function gerarIdPedido() {
  const numeros = Math.floor(Math.random() * 100).toString().padStart(2, "0");
  const letras = String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                 String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `REI${numeros}${letras}`;
}

// Função para formatar o texto do pedido
function formatarPedidoTexto(nome, telefone, idPedido, carrinho, metodoPagamento, metodoRetirada, endereco) {
  let pedidoTexto = `*Rei do Burguer Pedidos*:\n\n`;
  pedidoTexto += `Meu nome é *${nome}*, Contato: *${telefone}*\n`;
  pedidoTexto += `*ID do Pedido:* ${idPedido}\n\n`;
  pedidoTexto += `*Pedido:*\n`;

  carrinho.forEach((item) => {
    pedidoTexto += `${item.quantidade}x - ${item.nome}\n`;
    pedidoTexto += `(R$ ${item.preco.toFixed(2)})\n`;
    pedidoTexto += `R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;

    if (item.acrescimos.length > 0) {
      pedidoTexto += `  ${item.acrescimos.map((acrescimo) => `${acrescimo.nome} (+ R$ ${acrescimo.preco.toFixed(2)})`).join(", ")}\n`;
    }

    if (item.observacoes) {
      pedidoTexto += `Obs: ${item.observacoes}\n`;
    }

    pedidoTexto += "*________________________________*\n";
  });

  const subtotal = carrinho.reduce((sum, item) => {
    const valorAcrescimos = item.acrescimos.reduce((sumAcrescimo, acrescimo) => sumAcrescimo + acrescimo.preco, 0);
    return sum + (item.preco + valorAcrescimos) * item.quantidade;
  }, 0);

  const taxaEntrega = metodoRetirada === "Receber em Casa" ? 3.0 : 0.0;
  const totalFinal = subtotal + taxaEntrega;

  pedidoTexto += `*Encomenda: R$ ${subtotal.toFixed(2)}*\n`;
  pedidoTexto += `*Frete: R$ ${taxaEntrega.toFixed(2)}*\n`;
  pedidoTexto += `*Total: R$ ${totalFinal.toFixed(2)}*\n\n`;
  pedidoTexto += `*Pagamento em: ${metodoPagamento}*\n`;

  if (metodoRetirada === "Receber em Casa") {
    pedidoTexto += `*Endereço: ${endereco}*\n`;
  } else {
    pedidoTexto += `*Vou retirar no local*\n`;
  }

  pedidoTexto += "*________________________________*";

  return pedidoTexto;
}

// Função para mostrar mensagens ao usuário
function mostrarMensagem(mensagem) {
  const mensagemPopup = document.getElementById("mensagem-popup");
  mensagemPopup.innerText = mensagem;
  mensagemPopup.classList.add("active");

  setTimeout(() => {
    mensagemPopup.classList.remove("active");
  }, 3000);
}


window.onload = () => {
  exibirCardapio();
  carregarDadosUsuario();
};
