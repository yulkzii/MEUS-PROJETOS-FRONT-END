const form = document.querySelector("form");
const lista = document.querySelector(".produtos");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = form.elements[0].value;
  const descricao = form.elements[1].value;
  const preco = form.elements[2].value;
  const prazo = form.elements[3].value;
  const imagem = form.elements[4].files[0];
  const disponivel = document.getElementById("disponivel").checked;

  if (!imagem) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const novoProduto = document.createElement("div");
    novoProduto.classList.add("produto");

    if (!disponivel) {
      novoProduto.classList.add("indisponivel");
      novoProduto.innerHTML = `
        <img src="${event.target.result}" alt="${nome}">
        <p class="nome-produto">${nome}</p>
        <p class="descricao-produto">${descricao}</p>
        <p class="preco-produto">R$ ${parseFloat(preco).toFixed(2)}</p>
        <button class="ativar">Ativar</button>
        <button class="excluir">Excluir</button>
      `;
    } else {
      novoProduto.innerHTML = `
        <img src="${event.target.result}" alt="${nome}">
        <p class="nome-produto">${nome}</p>
        <p class="descricao-produto">${descricao}</p>
        <p class="preco-produto">R$ ${parseFloat(preco).toFixed(2)}</p>
        <button class="editar">Editar</button>
        <button class="excluir">Excluir</button>
      `;
    }

    lista.appendChild(novoProduto);
    form.reset();
    document.getElementById("disponivel").checked = true;
  };
  reader.readAsDataURL(imagem);
});

document.addEventListener("click", function (e) {
  const produto = e.target.closest(".produto");
  if (!produto) return;

  if (e.target.classList.contains("excluir")) {
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("editar")) {
    const nome = produto.querySelector("p.nome-produto").textContent;
    const descricao = produto.querySelector("p.descricao-produto").textContent;
    const preco = produto.querySelector("p.preco-produto").textContent.replace("R$ ", "");

    form.elements[0].value = nome;
    form.elements[1].value = descricao;
    form.elements[2].value = parseFloat(preco);
    produto.remove();
  }

  if (e.target.classList.contains("ativar")) {
    produto.classList.remove("indisponivel");
    e.target.remove();

    const btnEditar = document.createElement("button");
    btnEditar.classList.add("editar");
    btnEditar.textContent = "Editar";

    const btnExcluir = produto.querySelector(".excluir");
    produto.insertBefore(btnEditar, btnExcluir);
  }
});