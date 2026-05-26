import { database } from "./database.js";
import { render } from "./script.js";

// Global cart state, initialized from localStorage to persist data across page reloads
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM element references for the shopping cart UI
const cartsGridEl = document.querySelector(".carts-grid");
const subtotalEl = document.querySelector(".subtotal");
const cartCloseBtn = document.querySelector(".cart-close-btn");
const cartCountEl = document.querySelector(".cart-item-count");

/**
 * Handles closing the cart sidebar by sliding it out of view.
 */
cartCloseBtn.addEventListener("click", () => {
  const carts = document.querySelector(".carts");
  carts.style.transform = "translateX(1000px)";
});


/**
 * Iterates through the cart array and generates the HTML for the sidebar.
 * If the cart is empty, it displays a placeholder message.
 */
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
  // Re-attach listeners every time the HTML is re-generated
  attachCartListeners();
}

/**
 * Attaches event listeners to the dynamic elements inside the cart (Remove, Plus, Minus buttons).
 */
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

/**
 * Removes an item from the cart based on the product ID.
 * @param {HTMLElement} btn - The button element containing the data-id.
 */
function cartRemove(btn) {
  const id = Number(btn.dataset.id);
  cart = cart.filter((item) => item.productId !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  render();
}

/**
 * Increases or decreases the quantity of a specific cart item.
 * @param {HTMLElement} btn - The button element containing the data-id.
 * @param {string} operation - Either 'plus' or 'minus'.
 */
function cartQuantity(btn, operation) {
  const id = Number(btn.dataset.id);
  cart = cart.map((cartItem) => {
    if (cartItem.productId === id) {
      if (operation === "plus" && cartItem.quantity < 3) {
        // Limits maximum quantity to 3 items
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

/**
 * Calculates the total cost of all items currently in the cart.
 */
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

/**
 * Updates the numeric badge showing the total number of items in the cart.
 */
export function cartCount() {
  let count = 0;
  cart.forEach((item) => {
    count += item.quantity;
  });
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
}