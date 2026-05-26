import { database } from "./database.js";

const productContainerEl = document.querySelector(".product-container");
const params = new URLSearchParams(window.location.search);

let productId = Number(params.get('id'));

// Use .find() for better performance and readability
const product = database.find(product => product.id === productId);

if (product) {
    productContainerEl.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
    `;
} else {
    productContainerEl.innerHTML = `<h1>Product Not Found</h1>`;
}