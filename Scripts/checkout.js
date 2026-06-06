/**
 * ==========================================================================
 * CONTROLLER DRIVER MODULE: MULTI-ITEM BASKET CHECKOUT SYSTEM
 * ==========================================================================
 */

import { cart } from "./cart.js";
import { database } from "./database.js";

const checkoutItemsContainerNode = document.querySelector(".target-checkout-items-list");
const checkoutSummaryCalculationsNode = document.querySelector(".target-checkout-pricing-summary");

if (checkoutItemsContainerNode) {
  checkoutItemsContainerNode.innerHTML = buildCheckoutItemsHTML();
}

if (checkoutSummaryCalculationsNode) {
  checkoutSummaryCalculationsNode.innerHTML = buildCheckoutTotalsHTML();
}

/**
 * Iterates through active array object structures compiling text markup code templates
 */
function buildCheckoutItemsHTML() {
  if (!cart.length) {
    return `<p style="text-align:center; padding:40px; color:#666;">Your validation checkout basket structure records contain no items.</p>`;
  }

  return cart.map((cartItem) => {
    const productMatch = database.find((p) => p.id === cartItem.productId);
    if (!productMatch) return "";

    return `
      <div class="invoice-item-row-card">
        <div class="invoice-item-row-card__thumb-box">
          <a href="product.html?id=${productMatch.id}">
            <img src="${productMatch.preview}" alt="${productMatch.name} overview content visual">
          </a>
          <span class="invoice-item-row-card__badge-count">${cartItem.quantity}</span>
        </div>
        <div class="invoice-item-row-card__meta">
          <p class="invoice-item-row-card__name">${productMatch.name}</p>
          <span class="invoice-item-row-card__price-tag">$${productMatch.price.toFixed(2)}</span>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * Computes billing mathematical operations dynamically mapping variable array rows
 */
function buildCheckoutTotalsHTML() {
  const accumulatedItemsQuantityCount = cart.reduce((total, explicitItem) => total + explicitItem.quantity, 0);
  const logisticalShippingFeeMetric = accumulatedItemsQuantityCount === 0 ? 0 : 5.99;
  
  const financialSubtotalSumValue = cart.reduce((accTotal, itemReference) => {
    const assetMetaMatch = database.find((p) => p.id === itemReference.productId);
    return assetMetaMatch ? accTotal + (assetMetaMatch.price * itemReference.quantity) : accTotal;
  }, 0);

  return `
    <div class="invoice-panel__billing-row">
      <span>Subtotal &middot; ${accumulatedItemsQuantityCount} items</span>
      <span>$${financialSubtotalSumValue.toFixed(2)}</span>
    </div>
    <div class="invoice-panel__billing-row">
      <span>Shipping</span>
      <span>$${logisticalShippingFeeMetric.toFixed(2)}</span>
    </div>
    <div class="invoice-panel__billing-row invoice-panel__billing-row--bold-total">
      <span>Total</span>
      <span>$${(financialSubtotalSumValue + logisticalShippingFeeMetric).toFixed(2)}</span>
    </div>
  `;
}