import { database } from "./database.js";
import { cart, generateCartHtml, subtotal, cartCount } from "./cart.js";

// ==========================================
// DOM ELEMENTS
// ==========================================
const gridContainer = document.querySelector(".grid-container");
const header = document.querySelector("header");
const cartBtn = document.querySelector(".cart-btn");
const cartsSidebar = document.querySelector(".carts");

// Notification Alert Elements
const alertContainer = document.querySelector(".alert-container");
const alertItemImgEl = document.querySelector(".alert-item-img");
const alertItemNameEl = document.querySelector(".alert-item-name");
const alertItemPriceEl = document.querySelector(".alert-item-price");
const alertItemQuantityEl = document.querySelector(".alert-item-quantity");
const alertCloseBtn = document.querySelector(".alert-close-btn");
const alertItemViewCartBtn = document.querySelector(".alert-item-view-cart-btn");

// Navigation Elements
const categoryHeaderEl = document.querySelectorAll(".navigation-list-category-header");

// ==========================================
// STATE & APP VARIABLES
// ==========================================
let alertContainerTimeout;
let lastScrollY = window.scrollY;

// ==========================================
// UI HELPERS
// ==========================================
const openCartSidebar = () => {
  cartsSidebar.style.transform = "translateX(0)";
};

// ==========================================
// EVENT LISTENERS
// ==========================================

// Cart Visibility Triggers
if (cartBtn) {
  cartBtn.addEventListener("click", openCartSidebar);
}

if (alertItemViewCartBtn) {
  alertItemViewCartBtn.addEventListener("click", () => {
    openCartSidebar();
    alertContainer.classList.remove("alert-container-show");
    clearTimeout(alertContainerTimeout);
  });
}

if (alertCloseBtn) {
  alertCloseBtn.addEventListener("click", () => {
    alertContainer.classList.remove("alert-container-show");
    clearTimeout(alertContainerTimeout);
  });
}

// Category Filter Switcher
categoryHeaderEl.forEach((categoryHeader) => {
  categoryHeader.addEventListener("click", () => {
    document.querySelector(".navigation-list-category-header-active")
      ?.classList.remove("navigation-list-category-header-active");
    categoryHeader.classList.add("navigation-list-category-header-active");
    render();
  });
});

// Sticky Header Scroll Handler
window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY <= 0) {
    header.classList.add("header-topped");
  } else if (window.scrollY > lastScrollY) {
    // Scrolling Down
    header.classList.remove("header-topped");
    header.classList.add("header-hidden");
  } else {
    // Scrolling Up
    header.classList.remove("header-topped");
    header.classList.remove("header-hidden");
  }
  lastScrollY = window.scrollY;
});

// Listen for data changes in cart.js to trigger a UI refresh
document.addEventListener("cartChanged", render);

// ==========================================
// CORE APP ENGINE (LIFECYCLE)
// ==========================================

/**
 * Centralized render function keeping the UI synchronous with modern state updates.
 */
export function render() {
  generateHtml();
  generateCartHtml();
  subtotal();
  cartCount();
}

// Initial App Execution Trigger
render();

// ==========================================
// RENDERING & LAYOUT METHODS
// ==========================================

/**
 * Parses through the product database and sets up structural layout logic.
 */
function generateHtml() {
  let html = "";
  const activeCategoryEl = document.querySelector(".navigation-list-category-header-active");

  // Safety check: if we aren't on the main shop page (no grid or active category), exit early
  if (!gridContainer || !activeCategoryEl) return;

  const categoryType = activeCategoryEl.textContent;

  database.forEach((product) => {
    html += generateCategoryHtml(product, categoryType);
  });
  
  gridContainer.innerHTML = html;
  attachProductListeners();
}

/**
 * Generates the HTML string template for matching target inventory elements.
 */
function generateCategoryHtml(product, categoryType) {
  const activeCategory = categoryType.toLowerCase();
  
  if (activeCategory === "all" || product.type === activeCategory) {
    const isInCart = cart.some((item) => item.productId === product.id);
    const btnText = isInCart ? "Added to Cart" : "Add to Cart";
    const addedClass = isInCart ? "added" : "";
    const icon = isInCart ? `<i class="fa-solid fa-check"></i>` : "";
    
    return `
      <div class="content-container">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" class="image">
        </a>  
        <div class="info">
          <p class="name">${product.name}</p>
          <span>$${product.price.toFixed(2)}</span>
        </div>
        <div class="action">
          <a class="buy-btn" href="productCheckout.html?id=${product.id}">Buy</a>
          <button class="add-to-cart-btn ${addedClass}" data-id="${product.id}">
            ${btnText} ${icon}
          </button>
        </div>
      </div>
    `;
  }
  return "";
}

/**
 * Configures actions and interactive nodes inside injected card templates.
 */
function attachProductListeners() {
  const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");

  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const isInCart = cart.some((item) => item.productId === id);

      if (!isInCart) {
        const cartItem = {
          id: cart.length ? cart[cart.length - 1].id + 1 : 1,
          productId: id,
          quantity: 1,
        };
        cart.push(cartItem);

        const product = database.find((p) => p.id === id);
        showAlert(product);
      } else {
        const index = cart.findIndex((item) => item.productId === id);
        if (index !== -1) {
          cart.splice(index, 1);
        }
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      render();
    });
  });
}

/**
 * Triggers UI modal component popups displaying live updates of added variants.
 */
function showAlert(product) {
  if (!product) return;

  clearTimeout(alertContainerTimeout);
  alertContainer.classList.add("alert-container-show");
  
  alertItemImgEl.src = product.image;
  alertItemNameEl.textContent = product.name;
  alertItemPriceEl.textContent = `$${product.price.toFixed(2)}`;
  alertItemQuantityEl.textContent = "qty: 1";
  
  alertContainerTimeout = setTimeout(() => {
    alertContainer.classList.remove("alert-container-show");
  }, 3000);
}