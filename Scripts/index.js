/**
 * ==========================================================================
 * HOMEPAGE MASTER APPLICATION INTERACTIVE LIFECYCLE CONTROLLER
 * ==========================================================================
 */

import { database } from "./database.js";
import { cart, generateCartHtml, subtotal, cartCount } from "./cart.js";

// --- System Global State Variables ---
let alertContainerTimeout = null;
let lastScrollY = window.scrollY;

// --- Node Cache Architecture Object Selection ---
const DOM = {
  gridContainer: document.querySelector(".catalog-grid"),
  header: document.querySelector(".site-header"),
  cartBtn: document.querySelector(".cart-trigger-btn"),
  cartSidebar: document.querySelector(".cart-sidebar"),
  
  // Alert Notifications Group
  toast: document.querySelector(".toast-alert"),
  toastImg: document.querySelector(".preview-item__image"),
  toastName: document.querySelector(".preview-item__name"),
  toastPrice: document.querySelector(".preview-item__price"),
  toastQty: document.querySelector(".preview-item__qty"),
  toastClose: document.querySelector(".toast-alert__close"),
  toastViewCart: document.querySelector(".btn-view-cart"),
  toastBuyNowLink: document.querySelector(".btn-buy-now"),
  toastPreviewLink: document.querySelector(".preview-item__link-wrapper"),
  
  // Navigation Architecture Modules
  menuToggle: document.querySelector(".site-header__menu-toggle"),
  menuClose: document.querySelector(".navigation-drawer__close"),
  navDrawer: document.querySelector(".navigation-drawer"),
  categoryLinks: document.querySelectorAll(".navigation-drawer__link")
};

// --- Functional Action Core Methods ---
const openCartSidebar = () => {
  if (!DOM.cartSidebar) return;
  DOM.cartSidebar.classList.add("cart-sidebar--open");
  DOM.cartSidebar.setAttribute("aria-hidden", "false");
};

const closeCartSidebar = () => {
  if (!DOM.cartSidebar) return;
  DOM.cartSidebar.classList.remove("cart-sidebar--open");
  DOM.cartSidebar.setAttribute("aria-hidden", "true");
};

// --- Event Handlers Setup Framework ---
if (DOM.cartBtn) DOM.cartBtn.addEventListener("click", openCartSidebar);

if (DOM.toastViewCart) {
  DOM.toastViewCart.addEventListener("click", () => {
    openCartSidebar();
    DOM.toast.classList.remove("toast-alert--visible");
    clearTimeout(alertContainerTimeout);
  });
}

if (DOM.toastClose) {
  DOM.toastClose.addEventListener("click", () => {
    DOM.toast.classList.remove("toast-alert--visible");
    clearTimeout(alertContainerTimeout);
  });
}

// Mobile Hamburger Architecture Bindings
if (DOM.menuToggle && DOM.navDrawer) {
  DOM.menuToggle.addEventListener("click", () => {
    DOM.navDrawer.classList.add("navigation-drawer--active");
  });
}

if (DOM.menuClose && DOM.navDrawer) {
  DOM.menuClose.addEventListener("click", () => {
    DOM.navDrawer.classList.remove("navigation-drawer--active");
  });
}

// Category Navigation Filter Handler Matrix
DOM.categoryLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".navigation-drawer__link--active")
      ?.classList.remove("navigation-drawer__link--active");
    
    link.classList.add("navigation-drawer__link--active");

    // FIXED: Live responsive state check correctly shuts drawer container layout automatically
    if (DOM.navDrawer.classList.contains("navigation-drawer--active")) {
      DOM.navDrawer.classList.remove("navigation-drawer--active");
    }
    
    render();
  });
});

// Structural Header Scroll Controller Pattern Matrix
window.addEventListener("scroll", () => {
  if (!DOM.header) return;

  const isMenuOpen = DOM.navDrawer?.classList.contains("navigation-drawer--active");
  if (isMenuOpen) {
    DOM.header.classList.remove("site-header__hidden-mobile");
    return;
  }

  const currentScrollY = window.scrollY;

  if (currentScrollY <= 0) {
    DOM.header.classList.add("site-header--transparent");
    DOM.header.classList.remove("site-header--hidden");
  } else if (currentScrollY > lastScrollY && currentScrollY > 60) {
    // Scroll Down Sequence Trigger
    DOM.header.classList.remove("site-header--transparent");
    DOM.header.classList.add("site-header--hidden");
  } else {
    // Scroll Up Sequence Viewport Configuration
    DOM.header.classList.remove("site-header--hidden");
    DOM.header.classList.remove("site-header--transparent");
  }
  lastScrollY = currentScrollY;
});

// React natively to globally managed storage operations
document.addEventListener("cartChanged", render);

/**
 * Synchronous UI Render Orchestrator Pipeline
 */
export function render() {
  generateCatalogMarkup();
  generateCartHtml();
  subtotal();
  cartCount();
}

/**
 * Catalogs Markup Parsing Logic Mapping
 */
function generateCatalogMarkup() {
  if (!DOM.gridContainer) return;
  
  const activeLink = document.querySelector(".navigation-drawer__link--active");
  if (!activeLink) return;

  const filterCategory = activeLink.textContent.trim().toLowerCase();
  
  const catalogHtml = database.map((product) => {
    const productType = product.type.toLowerCase();
    if (filterCategory !== "all" && productType !== filterCategory) return "";

    const isInCart = cart.some((item) => item.productId === product.id);
    const labelText = isInCart ? "Added to Cart" : "Add to Cart";
    const statusModifierClass = isInCart ? "product-card-unit__btn--active" : "";
    const statusIconMarkup = isInCart ? `<i class="fa-solid fa-check"></i>` : "";

    return `
      <div class="product-card-unit">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" class="product-card-unit__image" alt="${product.name} visual content">
        </a>  
        <div class="product-card-unit__meta">
          <p class="product-card-unit__name">${product.name}</p>
          <span class="product-card-unit__price">$${product.price.toFixed(2)}</span>
        </div>
        <div class="product-card-unit__action-block">
          <a class="product-card-unit__btn" href="buy.html?id=${product.id}">Buy</a>
          <button class="product-card-unit__btn ${statusModifierClass} btn-add-to-cart" data-id="${product.id}">
            ${labelText} ${statusIconMarkup}
          </button>
        </div>
      </div>
    `;
  }).join("");

  DOM.gridContainer.innerHTML = catalogHtml;
  bindCatalogActionListeners();
}

/**
 * Event-Binding Strategy Engine for Dynamically Injected Product Elements
 */
function bindCatalogActionListeners() {
  DOM.gridContainer.querySelectorAll(".btn-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = Number(button.dataset.id);
      const cartItemIndex = cart.findIndex((item) => item.productId === targetId);

      if (cartItemIndex === -1) {
        const uniqueId = cart.length ? cart[cart.length - 1].id + 1 : 1;
        cart.push({ id: uniqueId, productId: targetId, quantity: 1 });

        const selectedProduct = database.find((p) => p.id === targetId);
        triggerToastNotification(selectedProduct);
      } else {
        cart.splice(cartItemIndex, 1);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      render();
    });
  });
}

/**
 * Toast Component Dispatch Message Framework
 */
function triggerToastNotification(product) {
  if (!product || !DOM.toast) return;

  clearTimeout(alertContainerTimeout);
  DOM.toast.classList.add("toast-alert--visible");
  
  DOM.toastImg.src = product.image;
  DOM.toastImg.alt = product.name;
  DOM.toastName.textContent = product.name;
  DOM.toastPrice.textContent = `$${product.price.toFixed(2)}`;
  DOM.toastQty.textContent = "qty: 1";

  if (DOM.toastBuyNowLink) DOM.toastBuyNowLink.href = `buy.html?id=${product.id}`;
  if (DOM.toastPreviewLink) DOM.toastPreviewLink.href = `product.html?id=${product.id}`;
  
  alertContainerTimeout = setTimeout(() => {
    DOM.toast.classList.remove("toast-alert--visible");
  }, 3000);
}

// Initial Boot Trigger Execution Call
render();