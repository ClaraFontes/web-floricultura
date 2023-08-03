document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-carrinho-btn");
    const finalizarCompraBtn = document.querySelectorAll(".finalizar-compra-btn")
    const cartItemsList = document.getElementById("itens-carrinho");
    const cartTotal = document.getElementById("carrinho-total");
    const viewCartBtn = document.getElementById("meu-carrinho-btn");
    const carrinhoPopup = document.getElementById("pop_up-carrinho");
    const mensagemSucesso = document.getElementById("mensagem-de-sucesso");
    let listaProdutos = "";
    let cart = [];
    let isCartVisible = false;

    // Event listener para abrir o pop-up do carrinho
    viewCartBtn.addEventListener("click", function () {
        isCartVisible = !isCartVisible;
        carrinhoPopup.style.display = isCartVisible ? "block" : "none";
        renderCartItems();
        renderCartTotal();
    });

    // Event listener para fechar o pop-up do carrinho ao clicar no botão de fechar
    const closePopups = document.querySelectorAll(".close-pop_up-carrinho");
    closePopups.forEach(closeBtn => {
        closeBtn.addEventListener("click", function () {
            carrinhoPopup.style.display = "none";
            mensagemSucesso.style.display = "none";
        });
    });

   // Event listener para adicionar um produto ao carrinho
   addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
        const productId = button.getAttribute("data-id");
        const productName = button.getAttribute("data-name");
        const productPrice = parseFloat(button.getAttribute("data-price"));
        addToCart(productId, productName, productPrice);
        showmensagemSucesso();
        renderCartItems();
        renderCartTotal();
    });
});

    // Função para adicionar um produto ao carrinho
    function addToCart(productId, productName, productPrice) {
        const existingProduct = cart.find(product => product.id === productId);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }
    }

    // Função para exibir a mensagem de sucesso e escondê-la após alguns segundos
    function showmensagemSucesso() {
        mensagemSucesso.style.display = "block";
        setTimeout(() => {
            mensagemSucesso.style.display = "none";
        }, 2000);
    }

    // Função para renderizar os itens do carrinho
    function renderCartItems() {
        cartItemsList.innerHTML = ""; // Limpa o conteúdo atual do carrinho

        cart.forEach(product => {
            const listItem = document.createElement("li");
            listItem.textContent = `${product.name} - R$ ${product.price.toFixed(2)} - Quantidade: ${product.quantity}`;
            cartItemsList.appendChild(listItem);
            listaProdutos = listItem;
        });
    }

    // Função para calcular e renderizar o total do carrinho
    function renderCartTotal() {
        const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
        cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    // pop_up
    const pop_up = document.getElementById("pop_up-produto");
    const pop_upNomeProduto = document.getElementById("pop_up-nome-produto");
    const pop_upImagemProduto = document.getElementById("pop_up-imagem-produto");
    const pop_upPrecoProduto = document.getElementById("pop_up-preco-produto");
    const closeBtn = document.querySelector(".close-pop_up");
    const addCarrinhoPop_upBtn = document.querySelector(".add-carrinho-pop_up-btn");

    // Event listener para abrir o pop_up ao clicar no botão "Ver Mais" no card de produto
    const verMaisBtns = document.querySelectorAll(".ver-mais-btn");
    verMaisBtns.forEach(btn => {
        btn.addEventListener("click", function (event) {
            const produtoCard = event.target.closest(".card");
            const idProduto = produtoCard.getAttribute("data-id");
            const NomeProduto = produtoCard.getAttribute("data-name");
            const PrecoProduto = parseFloat(produtoCard.getAttribute("data-price"));
            pop_upImagemProduto.src = produtoCard.querySelector("img").src;
            pop_upNomeProduto.textContent = NomeProduto;
            pop_upPrecoProduto.textContent = `R$ ${PrecoProduto}`;
            pop_up.style.display = "block";

            // Event listener para adicionar o produto ao carrinho a partir do pop-up
            addCarrinhoPop_upBtn.addEventListener("click", function () {
                addToCart(idProduto, NomeProduto, PrecoProduto);
                showmensagemSucesso();
                renderCartItems();
                renderCartTotal();
            });
        });
    });

    // Event listener para fechar o pop_up
    closeBtn.addEventListener("click", function () {
        pop_up.style.display = "none";
    });

    // FINALIZAR COMPRA
    function findInCart() {
        if (listaProdutos != "") {
            validarFormulario();
        } else {
            alert('Seu Carrinho está vazio. Adicione algum produto.');
            carrinhoPopup.style.display = "none";
        }
    }

    finalizarCompraBtn.forEach(button => {
        button.addEventListener("click", function () {
            findInCart();
        });
    });
      
    function validarFormulario() {
        const nome = document.getElementById('nome').value;
      //   const telefone = document.getElementById('telefone').value;
        const telefone = document.getElementById('telefone').value.replace(/\D/g, '');
        const cidade = document.getElementById('cidade').value;
        const bairro = document.getElementById('bairro').value;
        const rua = document.getElementById('rua').value;
        const numero = document.getElementById('numero').value;
        
        if ((nome == "") || (bairro == "") || (telefone == "") || (rua == "") || (numero == "")) {
            alert('Preencha todos os campos.');
            return;
        }

        if (telefone.length !== 11) {
          console.log(telefone.length)
          alert('O campo Telefone deve conter exatamente 11 dígitos numéricos.');
          return;
      }
  
        if (cidade === '') {
          alert('Selecione uma cidade.');
          return;
        }
  
        alert('Compra finalizada com sucesso!');
        document.getElementById('formulario').reset();
      }

      document.getElementById('finalizar').addEventListener('click', validarFormulario);

});
