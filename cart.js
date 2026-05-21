import { database } from "./database.js";
import { render } from "./script.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartsGridEl = document.querySelector(".carts-grid");
const subtotalEl = document.querySelector(".subtotal");
const cartCloseBtn = document.querySelector(".cart-close-btn");
const cartCountEl = document.querySelector(".cart-item-count");



cartCloseBtn.addEventListener("click", () => {
  const carts = document.querySelector(".carts");
  carts.style.transform = "translateX(1000px)";
});



export function generateCartHtml() {
  let html = "";

  if (cart.length > 0) {
    cart.forEach((item) => {
      const product = database.find((product) => product.id === item.productId);
      if (product) {
        html += `
              <div class="cart-container">
                  <img src="${product.image}">
                  <div class="cart-info-action-container">
                      <div class="cart-info">
                      <p class="name">${product.name}</p>
                      <span>$${product.price.toFixed(2)}</span>
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
  } else {
    html =
      '<p style="text-align: center; padding: 20px;">Your cart is empty.</p>';
  }

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

export function subtotal() {
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

export function cartCount() {
  let count = 0;
  cart.forEach((item) => {
    count += item.quantity;
  });
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
}