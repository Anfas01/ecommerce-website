import { database } from "./database.js";
import { cart } from "./cart.js";

const mainSectionEl = document.querySelector(".main");
const params = new URLSearchParams(window.location.search);

let productId = Number(params.get('id'));

// Use .find() for better performance and readability
const product = database.find(product => product.id === productId);

rennder();


function rennder () {
  if (product) {

  const isInCart = cart.some((item) => item.productId === product.id);
  const btnText = isInCart ? "Added to Cart" : "Add to Cart";
  const addedClass = isInCart ? "added-to-cart" : "";
  const icon = isInCart ? `<i class="fa-solid fa-check"></i>` : "";


  mainSectionEl.innerHTML = `
    <section class="images">
      <img src="${product.preview}" alt="${product.name}">
    </section>
    <section class="details">
      <h1 class="product-name">${product.name}</h1>
      <p class="product-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam perspiciatis soluta velit voluptate a consequuntur fugit earum voluptates atque hic.</p>
      <span class="product-price">$${product.price.toFixed(2)}</span>
      <button class="buy-now-btn">Buy Now</button>
      <button class="add-to-cart-btn ${addedClass}">${icon} ${btnText}</button>
      <section class="product-features">
        <div class="product-features-title">
          <h3>Product Features <i class="fa-solid fa-angle-down product-features-tittle-icon"></i></h3>
        </div>
        <ul class="product-features-list">
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
        </ul>
      </section>
    </section>
    `;

    const productFeatureTitle = document.querySelector(".product-features-title");
    const productFeatureTittleIcon = document.querySelector(".product-features-tittle-icon");
    const productFeatureList = document.querySelector(".product-features-list");

    // Optimized with .toggle() for cleaner readability
    productFeatureTitle.addEventListener("click", () => {
      const isActive = productFeatureList.classList.toggle("product-features-list-active");
      
      if (isActive) {
        productFeatureTittleIcon.classList.replace("fa-angle-down", "fa-angle-up");
      } else {
        productFeatureTittleIcon.classList.replace("fa-angle-up", "fa-angle-down");
      }
    });

    const addToCartBtn = document.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      
      if (!isInCart) {
        const cartItem = {
          id: cart.length ? cart[cart.length - 1].id + 1 : 1,
          productId: product.id,
          quantity: 1,
        };
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        document.dispatchEvent(new Event("cartChanged"));
        rennder();
      } else {
        const index = cart.findIndex((item) => item.productId === product.id);
        if (index !== -1) {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          document.dispatchEvent(new Event("cartChanged"));
          rennder();
        }
      }
    });

} else {
    // FIXED: Changed from productContainerEl to mainSectionEl
    mainSectionEl.innerHTML = `<h1>Product Not Found</h1>`;
}
}