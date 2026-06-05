import { database } from "./database.js";

const productCardEl = document.querySelector(".product-card");
const productPriceEl = document.querySelector(".price-breakdown");

const params = new URLSearchParams(window.location.search);

let productId = Number(params.get('id'));

if (productCardEl){
  productCardEl.innerHTML = generateProductCardHtml(productId);
}

if (productPriceEl){
  productPriceEl.innerHTML = generateProductPriceHtml(productId);
}


function generateProductCardHtml(productId) {
  const product = database.find((p) => p.id === productId);
  return `
    <div class="product-image">
      <a href="product.html?id=${product.id}"><img src="${product.preview}" alt="Product Image"></a>
    </div>
    <div class="product-details">
      <h1 class="product-name">${product.name}</h1>
      <span class="product-price">$${product.price.toFixed(2)}</span>
    </div>
  `;
}

function generateProductPriceHtml(productId) {
  const product = database.find((p) => p.id === productId);
  return `
    <div class="price-row"><span>Subtotal</span><span>$${product.price.toFixed(2)}</span></div>
    <div class="price-row"><span>Shipping</span><span class="free-badge">Free</span></div>
    <hr>
    <div class="price-row total"><span>Total</span><span>$${product.price.toFixed(2)}</span></div>
  `;
}