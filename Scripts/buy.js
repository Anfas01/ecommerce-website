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

// Extract structured matching target query configuration indexes reference mapping objects
const matchingDatabaseProductItem = database.find((p) => p.id === routingProductIdTargetKey);

if (expressItemUnitCardContainer && matchingDatabaseProductItem) {
  expressItemUnitCardContainer.innerHTML = `
    <div class="invoice-panel__single-thumb">
      <a href="product.html?id=${matchingDatabaseProductItem.id}">
        <img src="${matchingDatabaseProductItem.image}" alt="${matchingDatabaseProductItem.name} capture profile visual link">
      </a>
    </div>
    <div class="invoice-panel__single-meta">
      <h1 class="invoice-panel__single-name">${matchingDatabaseProductItem.name}</h1>
      <span class="invoice-panel__single-price">$${matchingDatabaseProductItem.price.toFixed(2)}</span>
    </div>
  `;
}

if (expressPricingCalculationsSummaryNode && matchingDatabaseProductItem) {
  expressPricingCalculationsSummaryNode.innerHTML = `
    <div class="invoice-panel__billing-row">
      <span>Subtotal</span>
      <span>$${matchingDatabaseProductItem.price.toFixed(2)}</span>
    </div>
    <div class="invoice-panel__billing-row">
      <span>Shipping</span>
      <span class="invoice-panel__shipping-badge-free">Free</span>
    </div>
    <hr style="border:0; border-top: 1px solid var(--color-border); margin:4px 0;">
    <div class="invoice-panel__billing-row invoice-panel__billing-row--bold-total">
      <span>Total</span>
      <span>$${matchingDatabaseProductItem.price.toFixed(2)}</span>
    </div>
  `;
}