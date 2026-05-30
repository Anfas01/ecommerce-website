import { database } from "./database.js";
import { cart, generateCartHtml, subtotal, cartCount } from "./cart.js";

const gridContainer = document.querySelector(".grid-container");
// Cart trigger button (header icon)
const cartBtn = document.querySelector(".cart-btn");
// Header element
const header = document.querySelector("header");

const alertContainer = document.querySelector(".alert-container");
const alertItemImgEl = document.querySelector(".alert-item-img");
const alertItemNameEl = document.querySelector(".alert-item-name");
const alertItemPriceEl = document.querySelector(".alert-item-price");
const alertItemQuantityEl = document.querySelector(".alert-item-quantity");
const alertCloseBtn = document.querySelector(".alert-close-btn");
const alertItemViewCartBtn = document.querySelector(".alert-item-view-cart-btn");
const categoryHeaderEl = document.querySelectorAll(".navigation-list-category-header");

let alertContainerTimeout;

alertCloseBtn.addEventListener("click", () => {
  alertContainer.classList.remove("alert-container-show");
  clearTimeout(alertContainerTimeout);
});

alertItemViewCartBtn.addEventListener("click", () => {
  const carts = document.querySelector(".carts");
  carts.style.transform = "translateX(0)";
  alertContainer.classList.remove("alert-container-show");
  clearTimeout(alertContainerTimeout);
});

/**
 * Opens the cart sidebar by resetting the transform property.
 */
cartBtn.addEventListener("click", () => {
  const carts = document.querySelector(".carts");
  carts.style.transform = "translateX(0)";
});


categoryHeaderEl.forEach((categoryHeader) => {
  categoryHeader.addEventListener("click", () => {
    document.querySelector(".navigation-list-category-header-active").classList.remove("navigation-list-category-header-active");
    categoryHeader.classList.add("navigation-list-category-header-active");
  });
});

// Initial page load render
render();

/**
 * Centralized render function that keeps the UI in sync with the current state.
 * Called after any state change (adding/removing items, changing quantities).
 */
export function render() {
  generateHtml();
  generateCartHtml();
  subtotal();
  cartCount();
}

/**
 * Attaches listeners to product card actions.
 * Currently handles the 'heart' icon which acts as a toggle to add/remove from cart.
 */
function attachProductListeners() {
  const heartBtn = document.querySelectorAll(".heart");

  heartBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const isInCart = cart.some((item) => item.productId === id);

      if (!isInCart) {
        // If not in cart, create a new cart entry with a unique ID
        const cartItem = {
          // Simple logic to increment ID based on last item
          id: cart.length ? cart[cart.length - 1].id + 1 : 1,
          productId: id,
          quantity: 1,
        };
        cart.push(cartItem);

        const product = database.find((product) => product.id === id);
        alert(product);




      } else {
        // If already in cart, remove it (toggle behavior)
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
 * Loops through the product database and builds the HTML for the main grid.
 * Dynamically sets the heart icon class based on whether the product is in the cart.
 */
function generateHtml() {
  let html = "";

  database.forEach((product) => {
    const isInCart = cart.some((item) => item.productId === product.id);
    const heartClass = isInCart ? "fa-solid" : "fa-regular";
    html += `
            <div class="content-container">
                <a href="product.html?id=${product.id}">
                  <img src="${product.image}" class="image">
                </a>  
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


let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY <= 0) {
    header.classList.add("header-topped");
  }
  else if (window.scrollY > lastScrollY) {
    // Scrolling Down
    header.classList.remove("header-topped");
    header.classList.add("header-hidden");
  } else {
    // Scrolling Up
    header.classList.remove("header-topped");
    header.classList.remove("header-hidden");
  } 
  // Update the last scroll position
  lastScrollY = window.scrollY;
});




function alert(product){
  if (product) {
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
};