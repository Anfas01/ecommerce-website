import {cart} from "./cart.js";
import {database} from "./database.js";

const checkoutItemsEl = document.querySelector(".cart-scroll-area");
const checkoutPriceEl = document.querySelector(".pricing-breakdown");

if (checkoutItemsEl){
  checkoutItemsEl.innerHTML = generateCheckoutItemsHtml();
}

if (checkoutPriceEl){
  checkoutPriceEl.innerHTML = generateCheckoutPriceHtml();
}

function generateCheckoutItemsHtml () {
  let html = ``;
  
  // If cart is empty, return early with the empty message
  if (!cart.length) {
    return html + `<p class="cart-empty-message">Your cart is empty</p>`;
  }
  
  cart.forEach(cartItem => {
    const product = database.find((p) => p.id === cartItem.productId);

    if (product) {
      html += `
        <div class="cart-item-card">
          <div class="item-thumbnail">
            <a href="product.html?id=${product.id}"><img src="${product.preview}" alt="Jersey product thumbnail"></a>
            <span class="item-badge-count">${cartItem.quantity}</span>
          </div>
          <div class="item-meta">
            <p class="product-title">${product.name}</p>
            <span class="product-price">$${product.price.toFixed(2)}</span>
          </div>
        </div>
      `;
    }
  });

  return html; 
}

function generateCheckoutPriceHtml () {
 
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const shipping = totalItems === 0 ? 0 : 5.99;
  let totalItemsPrice = 0;

  cart.forEach(item => {
    const product = database.find((p) => p.id === item.productId);
    if (product) {
      totalItemsPrice += product.price * item.quantity;
    }
  });




  let html = `
    <div class="pricing-row">
      <span>Subtotal &middot; ${totalItems} items</span>
      <span>$${totalItemsPrice.toFixed(2)}</span>
    </div>
    <div class="pricing-row">
      <span>Shipping</span>
      <span>$${shipping.toFixed(2)}</span>
    </div>
    <div class="pricing-row final-total-row">
      <span>Total</span>
      <span>$${(totalItemsPrice + shipping).toFixed(2)}</span>
    </div>
  `;

  return html;
}