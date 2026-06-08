/**
 * ==========================================================================
 * CONTROLLER DRIVER MODULE: EXPRESS SINGLE ACQUISITION TRANSACTION DIRECT ENGINE
 * ==========================================================================
 */

import { database } from "./database.js";

const expressItemUnitCardContainer = document.querySelector(".target-express-product-card");
const expressPricingCalculationsSummaryNode = document.querySelector(".target-express-pricing-summary");

const locationSearchUrlRouterParams = new URLSearchParams(window.location.search);
const routingProductIdTargetKey = Number(locationSearchUrlRouterParams.get("id"));

const matchingDatabaseProductItem = database.find((p) => p.id === routingProductIdTargetKey);

// 1. Establish a single source of truth for the quantity state
let currentQuantity = 1; 

function render() {
  if (!matchingDatabaseProductItem) return;

  const currentSubtotal = matchingDatabaseProductItem.price * currentQuantity;

  if (expressItemUnitCardContainer) {
    // Inject the currentQuantity dynamically rather than hardcoding "1"
    expressItemUnitCardContainer.innerHTML = `
      <div class="invoice-panel__single-thumb">
        <a href="product.html?id=${matchingDatabaseProductItem.id}">
          <img src="${matchingDatabaseProductItem.image}" alt="${matchingDatabaseProductItem.name} capture profile visual link">
        </a>
      </div>
      <div class="invoice-panel__single-meta">
        <h1 class="invoice-panel__single-name">${matchingDatabaseProductItem.name}</h1>
        <span class="invoice-panel__single-price">$${matchingDatabaseProductItem.price.toFixed(2)}</span>
        <div>qty: 
          <span>
            <i class="fa-solid fa-minus qty-minus"></i>
              <span class="qty-value">${currentQuantity}</span>
            <i class="fa-solid fa-plus qty-plus"></i>  
          </span>
        </div>
      </div>
    `;
  }

  if (expressPricingCalculationsSummaryNode) {
    // Dynamically calculate subtotals and totals based on currentQuantity
    expressPricingCalculationsSummaryNode.innerHTML = `
      <div class="invoice-panel__billing-row">
        <span>Subtotal</span>
        <span>$${currentSubtotal.toFixed(2)}</span>
      </div>
      <div class="invoice-panel__billing-row">
        <span>Shipping</span>
        <span class="invoice-panel__shipping-badge-free">Free</span>
      </div>
      <hr style="border:0; border-top: 1px solid var(--color-border); margin:4px 0;">
      <div class="invoice-panel__billing-row invoice-panel__billing-row--bold-total">
        <span>Total</span>
        <span>$${currentSubtotal.toFixed(2)}</span>
      </div>
    `;
  }

  // 2. Re-bind event listeners since the old buttons were deleted during innerHTML overwrites
  setupEventListeners();
}

function setupEventListeners() {
  const qtyMinusBtnEl = document.querySelector(".qty-minus");
  const qtyPlusBtnEl = document.querySelector(".qty-plus");

  if (qtyMinusBtnEl) qtyMinusBtnEl.onclick = () => modifyItemQuantity("decrement");
  if (qtyPlusBtnEl) qtyPlusBtnEl.onclick = () => modifyItemQuantity("increment");
}

function modifyItemQuantity(operation) {
  if (operation === "increment") {
    if (currentQuantity >= 3) return; // Numeric limit check
    currentQuantity++;
  } else if (operation === "decrement") {
    if (currentQuantity <= 1) return;
    currentQuantity--;
  }
  
  // Re-render everything with the updated state
  render();
}

// Initial invocation to populate the UI
render();