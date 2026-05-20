import { database } from "./database.js";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const gridContainer = document.querySelector(".grid-container");
const cartBtn = document.querySelector(".cart-btn");
const cartCloseBtn = document.querySelector(".cart-close-btn");
const cartsGridEl = document.querySelector(".carts-grid");
const subtotalEl = document.querySelector(".subtotal");
const cartCountEl = document.querySelector(".cart-item-count");

cartBtn.addEventListener("click", () => {
  const carts = document.querySelector(".carts");
  carts.style.transform = "translateX(0)";
});

cartCloseBtn.addEventListener("click", () => {
  const carts = document.querySelector(".carts");
  carts.style.transform = "translateX(1000px)";
});

render();

function render() {
  generateHtml();
  carts();
  subtotal();
  cartCount();
}

// Attach listeners to product grid items
function attachProductListeners() {
  const heartBtn = document.querySelectorAll(".heart");

  heartBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const isInCart = cart.some((item) => item.productId === id);

      if (!isInCart) {
        // Add to cart if not present
        const cartItem = {
          id: cart.length ? cart[cart.length - 1].id + 1 : 1,
          productId: id,
          quantity: 1,
        };
        cart.push(cartItem);
      } else {
        // Remove from cart if already present
        cart = cart.filter((item) => item.productId !== id);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      render();
    });
  });
}

function generateHtml() {
  let html = "";

  database.forEach((product) => {
    const isInCart = cart.some((item) => item.productId === product.id);
    const heartClass = isInCart ? "fa-solid" : "fa-regular";
    html += `
            <div class="content-container">
                <img src="${product.image}" class="image">
                <div class="info">
                    <p class="name">${product.name}</p>
                    <span>$${product.price}</span>
                </div>
                <div class="action">
                    <button class="buy-btn">Buy</button>
                    <i class="${heartClass} fa-heart heart" data-id="${product.id}"></i>
                </div>
            </div>
        `;
  });
  gridContainer.innerHTML = html;
  attachProductListeners();
}

function carts() {
  let html = "";
  cart.forEach((item) => {
    const product = database.find((product) => product.id === item.productId);
    if (product) {
      html += `
            <div class="cart-container">
                <img src="${product.image}">
                <div class="cart-info-action-container">
                    <div class="cart-info">
                    <p class="name">${product.name}</p>
                    <span>$${product.price}</span>
                    </div>
                    <div class="cart-action">
                    <span class="cart-quantity">
                        <i class="fa-solid fa-minus quantity-minus-btn" data-id="${product.id}"></i>
                        <span class="quantity">${item.quantity}</span>
                        <i class="fa-solid fa-plus quantity-plus-btn" data-id="${product.id}"></i>
                    </span>
                    <span class="cart-remove" data-id="${product.id}">Remove</span>
                    </div>
                </div>
            </div>
        `;
    }
  });
  cartsGridEl.innerHTML = html;

  attachCartListeners();
}

// Attach listeners to items inside the cart sidebar
function attachCartListeners() {
  document.querySelectorAll(".cart-remove").forEach((btn) => {
    btn.addEventListener("click", () => cartRemove(btn));
  });

  document.querySelectorAll(".quantity-plus-btn").forEach((btn) => {
    btn.addEventListener("click", () => cartQuantity(btn, "plus"));
  });

  document.querySelectorAll(".quantity-minus-btn").forEach((btn) => {
    btn.addEventListener("click", () => cartQuantity(btn, "minus"));
  });
}

function cartRemove(btn) {
  const id = Number(btn.dataset.id);
  cart = cart.filter((item) => item.productId !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  render();
}

function cartQuantity(btn, operation) {
  const id = Number(btn.dataset.id);
  cart = cart.map((cartItem) => {
    if (cartItem.productId === id) {
      if (operation === "plus" && cartItem.quantity < 3) {
        cartItem.quantity++;
      } else if (operation === "minus" && cartItem.quantity > 1) {
        cartItem.quantity--;
      }
    }
    return cartItem;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  render();
}

function subtotal() {
  let total = 0;
  cart.forEach((item) => {
    const product = database.find((product) => product.id === item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  });
  if (subtotalEl) {
    subtotalEl.innerHTML = `$${total.toFixed(2)}`;
  }
}


function cartCount(){
  let count = 0;
  cart.forEach((item) => {
      count += item.quantity;
  })  
  if (cartCountEl) {
    cartCountEl.innerHTML = cart.length;
  }
  cartCountEl.textContent = count;
};
