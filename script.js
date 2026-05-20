import { database } from "./database.js";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const gridContainer = document.querySelector(".grid-container");
const cartBtn = document.querySelector(".cart-btn");
const cartCloseBtn = document.querySelector(".cart-close-btn");

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
  addToCart();
}

function addToCart() {
  const heartBtn = document.querySelectorAll(".heart");

  heartBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("fa-solid")) {
        btn.classList.remove("fa-solid");
        btn.classList.add("fa-regular");
      } else {
        btn.classList.remove("fa-regular");
        btn.classList.add("fa-solid");
      }
      const id = Number(btn.dataset.id);
      if (btn.classList.contains("fa-solid")) {
        const cartItem = {
          id: cart.length ? cart[cart.length - 1].id + 1 : 1,
          productId: id,
        };
        cart.push(cartItem);
      } else {
        cart = cart.filter((item) => item.productId !== id);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      carts();
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
}

function carts() {
  const cartsGridEl = document.querySelector(".carts-grid");
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
                        <i class="fa-solid fa-minus"></i>
                        <span>1</span>
                        <i class="fa-solid fa-plus"></i>
                    </span>
                    <span>Remove</span>
                    </div>
                </div>
            </div>
        `;
    }
  });
  cartsGridEl.innerHTML = html;
}
