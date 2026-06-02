import { database } from "./database.js";
import { cart } from "./cart.js";

const mainSectionEl = document.querySelector(".main");
const params = new URLSearchParams(window.location.search);

let productId = Number(params.get('id'));

// Use .find() for better performance and readability
const product = database.find(product => product.id === productId);









if (product) {
  mainSectionEl.innerHTML = `
    <section class="images">
      <img src="${product.preview}">
    </section>
    <section class="details">
      <h1 class="product-name">${product.name}</h1>
      <p class="product-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam perspiciatis soluta velit voluptate a consequuntur fugit earum voluptates atque hic.</p>
      <span class="product-price">$${product.price.toFixed(2)}</span>
      <button class="buy-now-btn">Buy Now</button>
      <button class="add-to-cart-btn">Add to Cart</button>
      <section class="product-features">
        <div class="product-features-title">
          <h3>Product Features <i class="fa-solid fa-angle-down product-features-tittle-icon"></i></h3>
        </div>
        <ul class="product-features-list">
          <li>- Lorem ipsum dolor sit amet consectetur.</li>
          <li>- Lorem ipsum dolor sit amet consectetur.</li>
          <li>- Lorem ipsum dolor sit amet consectetur.</li>
          <li>- Lorem ipsum dolor sit amet consectetur.</li>
          <li>- Lorem ipsum dolor sit amet consectetur.</li>
        </ul>
      </section>
    </section>
    `;

    const productFeatureTitle = document.querySelector(".product-features-title");
    const productFeatureTittleIcon = document.querySelector(".product-features-tittle-icon");
    const productFeatureList = document.querySelector(".product-features-list");

    productFeatureTitle.addEventListener("click", () => {
      if (productFeatureTittleIcon.classList.contains("fa-angle-up")) {
        productFeatureTittleIcon.classList.remove("fa-angle-up");
        productFeatureTittleIcon.classList.add("fa-angle-down");
        productFeatureList.classList.remove("product-features-list-active");
      } else {
        productFeatureTittleIcon.classList.remove("fa-angle-down");
        productFeatureTittleIcon.classList.add("fa-angle-up");
        productFeatureList.classList.add("product-features-list-active");
      }
    });



    const addToCartBtn = document.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      const cartItem = {
        id: cart.length ? cart[cart.length - 1].id + 1 : 1,
        productId: product.id,
        quantity: 1,
      };
      const isInCart = cart.some((item) => item.productId === product.id);
      if (!isInCart) {
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });

} else {
    productContainerEl.innerHTML = `<h1>Product Not Found</h1>`;
}