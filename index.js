document.addEventListener("DOMContentLoaded", () => {
  const orderTotal = document.querySelector(".order__total--price");
  const cantidadArticulos = document.querySelector(".cantidadArticulos");

  // Inicializar total y carrito vacío
  let totalPrice = 0;
  let cartItems = [];

  orderTotal.textContent = "$0.00";
  cantidadArticulos.textContent = "0";

  // Cargar JSON y procesarlo
  fetch("./data.json")
    .then(response => response.json())
    .then(data => {
      console.log({ data });
      renderCards(data);
    })
    .catch(error => console.error("Error cargando el JSON:", error));

  // Función para generar tarjetas dinámicamente
  function renderCards(products) {
    const container = document.querySelector(".cards-container");

    products.forEach((product, index) => {
      const card = document.createElement("section");
      card.classList.add("card");

      card.innerHTML = `
        <div class="card__img card__img-${index + 1}">
          <button class="carrito" type="button" data-index="${index}">
            <img class="carrito__img" src="${product.image.desktop}" alt="Carrito"/>
            <p class="carrito__add">Add to Cart</p>
          </button>
        </div>
        <p class="card__name">${product.category}</p>
        <p class="card__fullName">${product.name}</p>
        <p class="card__price">$${product.price.toFixed(2)}</p>
      `;

      container.appendChild(card);
    });

    // Agregar evento a los botones de carrito
    document.querySelectorAll(".carrito").forEach(button => {
      button.addEventListener("click", event => {
        const index = event.currentTarget.getAttribute("data-index");
        addToCart(products[index]);
      });
    });
  }

  // Función para agregar productos al carrito
  function addToCart(product) {
    const existingItem = cartItems.find(item => item.name === product.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    updateCart();
  }

  // Función para actualizar el carrito y el total
  function updateCart() {
    // Calcular el precio total usando reduce
    totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    orderTotal.textContent = `$${totalPrice.toFixed(2)}`;
    cantidadArticulos.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    renderCartItems();
  }

  // Función para renderizar los productos en el carrito
  //TODO: poner el diseño correcto de los productos en el carrito
  function renderCartItems() {
    const cartList = document.querySelector(".pedido__img");
    cartList.innerHTML = ""; // Limpiar contenido previo

    cartItems.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
        <p>${item.name} (${item.quantity}x)</p>
        <p>$${(item.price * item.quantity).toFixed(2)}</p>
      `;

      cartList.appendChild(cartItem);
    });

    // Mostrar mensaje si el carrito está vacío
    const emptyCartMessage = document.querySelector(".pedido__p");
    emptyCartMessage.style.display = cartItems.length === 0 ? "block" : "none";
  }
});


/**
 * TODO:
 * 1. Mejorar el diseño de la tarjeta en el resumen del carrito
 * 2. Agregar las funcionalidades de eliminar productos
 * 3. Mostrar el control de cantidades en la tarjeta de los producots
 * 4. Al darle click ya sea en el mas o en el meno, debe aumentar y disminuir el numero de producto correspondiente y por ende el total y cantidad
 * 5. si se disminuye un producto que tiene una unica unidad agregada, se debe eliminar del carrito
 * 6. Actualizar active states. Ver ejemplo en la seccion de design.
 * 
 * TBD
 * 
 */