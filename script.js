import { database } from "./database.js";
import { cart, generateCartHtml, subtotal, cartCount } from "./cart.js";

const gridContainer = document.querySelector(".grid-container");
const cartBtn = document.querySelector(".cart-btn");

cartBtn.addEventListener("click", () => {
  const carts = document.querySelector(".carts");
  carts.style.transform = "translateX(0)";
});

render();

export function render() {
  generateHtml();
  generateCartHtml();
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
