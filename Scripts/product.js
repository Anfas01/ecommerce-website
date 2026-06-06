/**
 * ==========================================================================
 * COMPONENT SPECIFIC CONTROLLER DRIVER: PRODUCT PREVIEW SYSTEM ENGINE
 * ==========================================================================
 */

import { database } from "./database.js";
import { cart } from "./cart.js";

// --- Route Parameter Extraction Infrastructure Parsing Sequence ---
const mainLayoutContainerEl = document.querySelector(".product-viewer-layout");
const routeQueryParameters = new URLSearchParams(window.location.search);
const activeProductId = Number(routeQueryParameters.get("id"));

// Extract structured matching criteria index references mapping array objects
const productRecord = database.find((item) => item.id === activeProductId);

/**
 * Main Template Compilation Lifecycle Call
 */
function renderProductViewDetails() {
  if (!mainLayoutContainerEl) return;

  if (!productRecord) {
    mainLayoutContainerEl.innerHTML = `
      <div style="text-align:center; padding:100px 20px; width:100%;">
        <h1 style="font-size:2rem; margin-bottom:10px;">Product Not Found</h1>
        <p style="color:#666;">The asset link target requested reference configuration matches no active inventory metrics.</p>
      </div>`;
    return;
  }

  // Evaluate reactive storage configuration metrics variables
  const isCurrentlyInCart = cart.some((item) => item.productId === productRecord.id);
  const actionTextDisplay = isCurrentlyInCart ? "Added to Cart" : "Add to Cart";
  const stylingContextModifier = isCurrentlyInCart ? "product-panel-btn--success-state" : "";
  const dynamicFeedbackIconMarkup = isCurrentlyInCart ? `<i class="fa-solid fa-check"></i>` : "";

  mainLayoutContainerEl.innerHTML = `
    <section class="product-viewer-layout__gallery">
      <img src="${productRecord.image}" alt="${productRecord.name} detailed profile snapshot" class="product-viewer-layout__showcase-img">
    </section>
    <section class="product-viewer-layout__panel">
      <h1 class="product-name product-panel-title">${productRecord.name}</h1>
      <p class="product-panel-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam perspiciatis soluta velit voluptate a consequuntur fugit earum voluptates atque hic.</p>
      <span class="product-panel-price">$${productRecord.price.toFixed(2)}</span>
      
      <button class="product-panel-btn product-panel-btn--primary btn-buy-direct">Buy Now</button>
      <button class="product-panel-btn product-panel-btn--secondary ${stylingContextModifier} btn-toggle-cart">
        ${dynamicFeedbackIconMarkup} ${actionTextDisplay}
      </button>

      <section class="accordion-specs">
        <div class="accordion-specs__trigger" role="button" aria-expanded="false" tabindex="0">
          <h3>Product Features</h3>
          <i class="fa-solid fa-angle-down accordion-arrow-icon"></i>
        </div>
        <ul class="accordion-specs__list">
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
        </ul>
      </section>
    </section>
  `;

  initializeInteractiveFeatures();
}

/**
 * Attaches Events Hooks To Dynamically Rendered Layout Target Node Fragments
 */
function initializeInteractiveFeatures() {
  const accordionTriggerNode = mainLayoutContainerEl.querySelector(".accordion-specs__trigger");
  const accordionArrowIcon = mainLayoutContainerEl.querySelector(".accordion-arrow-icon");
  const accordionListNode = mainLayoutContainerEl.querySelector(".accordion-specs__list");
  const cartToggleActionBtn = mainLayoutContainerEl.querySelector(".btn-toggle-cart");
  const buyDirectActionBtn = mainLayoutContainerEl.querySelector(".btn-buy-direct");

  // Accordion Expand/Collapse Processing Logic Mapping
  if (accordionTriggerNode && accordionListNode && accordionArrowIcon) {
    accordionTriggerNode.addEventListener("click", () => {
      const transitionsStateIsActive = accordionListNode.classList.toggle("accordion-specs__list--expanded");
      accordionTriggerNode.setAttribute("aria-expanded", transitionsStateIsActive ? "true" : "false");
      
      if (transitionsStateIsActive) {
        accordionArrowIcon.classList.replace("fa-solid", "fa-solid"); // Sanity safe link check
        accordionArrowIcon.style.transform = "rotate(180deg)";
      } else {
        accordionArrowIcon.style.transform = "rotate(0deg)";
      }
    });
  }

  // Direct Checkout Redirect Link Binding Routing Control
  if (buyDirectActionBtn) {
    buyDirectActionBtn.addEventListener("click", () => {
      window.location.href = `buy.html?id=${productRecord.id}`;
    });
  }

  // Cart Local Storage Mutation State Transition Processing Matrix
  if (cartToggleActionBtn) {
    cartToggleActionBtn.addEventListener("click", () => {
      const currentCartIndex = cart.findIndex((item) => item.productId === productRecord.id);

      if (currentCartIndex === -1) {
        const generatedStructuralId = cart.length ? cart[cart.length - 1].id + 1 : 1;
        cart.push({
          id: generatedStructuralId,
          productId: productRecord.id,
          quantity: 1
        });
      } else {
        cart.splice(currentCartIndex, 1);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      document.dispatchEvent(new Event("cartChanged"));
      renderProductViewDetails();
    });
  }
}

// Initial Boot Orchestrator Pipeline Trigger Execution
renderProductViewDetails();