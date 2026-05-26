import { database } from "./database.js";
import { cart, generateCartHtml, subtotal, cartCount } from "./cart.js";

const gridContainer = document.querySelector(".grid-container");
// Cart trigger button (header icon)
const cartBtn = document.querySelector(".cart-btn");

/**
 * Opens the cart sidebar by resetting the transform property.
 */
cartBtn.addEventListener("click", () => {
  const carts = document.querySelector(".carts");
  carts.style.transform = "translateX(0)";
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
