import { database } from "./database.js";
import { render } from "./script.js";

// ==========================================
// STATE & APP VARIABLES
// ==========================================
// Global cart state, initialized from localStorage to persist data across page reloads
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM element references for the shopping cart UI
const cartsGridEl = document.querySelector(".carts-grid");
const subtotalEl = document.querySelector(".subtotal");
const cartCloseBtn = document.querySelector(".cart-close-btn");
const cartCountEl = document.querySelector(".cart-item-count");

// ==========================================
// EVENT LISTENERS
// ==========================================
cartCloseBtn.addEventListener("click", () => {
  const carts = document.querySelector(".carts");
  if (carts) {
    carts.style.transform = "translateX(1000px)";
  }
});

// ==========================================
// EVENT HANDLERS & INTERNAL FUNCTIONS
// ==========================================

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
  let itemChanged = false;

  cart = cart.map((cartItem) => {
    if (cartItem.productId === id) {
      if (operation === "plus" && cartItem.quantity < 3) {
        cartItem.quantity++;
        itemChanged = true;
      } else if (operation === "minus" && cartItem.quantity > 1) {
        cartItem.quantity--;
        itemChanged = true;
      }
    }
    return cartItem;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  
  // 1. Re-render the HTML first so the new quantity exists in the DOM
  render(); 

  // 2. If an item changed, find THAT SPECIFIC element and animate it
  if (itemChanged) {
    // Look up the specific element container by its data-id instead of relative step navigation
    const cartContainer = btn.closest(".cart-container");
    const quantitySpan = cartContainer?.querySelector(".quantity");
    
    if (quantitySpan) {
      quantitySpan.classList.remove("slide-up-animation");
      void quantitySpan.offsetWidth; // Force a CSS reflow
      quantitySpan.classList.add("slide-up-animation");
    }
  }
}

// ==========================================
// EXPORTED API METHODS
// ==========================================

/**
 * Iterates through the cart array and generates the HTML for the sidebar.
 * If the cart is empty, it displays a placeholder message.
 */
export function generateCartHtml() {
  let html = "";

  if (cart.length > 0) {
    // Render from newest added to oldest
    cart.slice().reverse().forEach((item) => {
      const product = database.find((p) => p.id === item.productId);
      if (product) {
        html += `
          <div class="cart-container">
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-info-action-container">
              <div class="cart-info">
                <p class="name">${product.name}</p>
                <span>$${product.price.toFixed(2)}</span>
              </div>
              <div class="cart-action">
                <span class="cart-quantity">Qty:<br>
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
    html = '<p style="text-align: center; padding: 20px;">Your cart is empty.</p>';
  }

  cartsGridEl.innerHTML = html;
  attachCartListeners();
}

/**
 * Calculates the total cost of all items currently in the cart.
 */
export function subtotal() {
  const total = cart.reduce((sum, item) => {
    const product = database.find((p) => p.id === item.productId);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  if (subtotalEl) {
    const formattedTotal = `$${total.toFixed(2)}`;
    if (subtotalEl.innerHTML !== formattedTotal) {
      subtotalEl.classList.remove("slide-up-animation");
      void subtotalEl.offsetWidth; // Force a CSS reflow
      subtotalEl.innerHTML = formattedTotal;
      subtotalEl.classList.add("slide-up-animation");
    }
  }
}

/**
 * Updates the numeric badge showing the total number of items in the cart.
 */
export function cartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountEl) {
    cartCountEl.classList.remove("slide-up-animation");
    void cartCountEl.offsetWidth; // Force a CSS reflow
    cartCountEl.textContent = count;
    cartCountEl.classList.add("slide-up-animation");
  }
}