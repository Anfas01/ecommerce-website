/**
 * ==========================================================================
 * GLOBAL APPLICATION ARCHITECTURE FRAMEWORK SYSTEM: MODULE ENGINE CORE CART
 * ==========================================================================
 */

import { database } from "./database.js";

// --- State Machine Lifecycle Engine Initialization Configuration ---
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Cache Core Sticky Architectural Dom Layout Nodes Structure Objects
const DOM = {
  containerDrawerAside: document.querySelector(".cart-sidebar"),
  targetGridElementsBox: document.querySelector(".cart-sidebar__items-grid"),
  subtotalFieldLabelNode: document.querySelector(".summary-checkout__price-value"),
  closeSidebarTriggerBtn: document.querySelector(".cart-sidebar__close"),
  badgeItemsCounterNode: document.querySelector(".cart-trigger-btn__counter")
};

// --- Structural Animation Reflow Helper Method ---
const triggerElementReflowAnimation = (elementNodeTarget) => {
  if (!elementNodeTarget) return;
  elementNodeTarget.classList.remove("utility-slide-up-animation");
  void elementNodeTarget.offsetWidth; // Explicit mechanical layout reflow command execution trigger
  elementNodeTarget.classList.add("utility-slide-up-animation");
};

// Toggle Sidebar Flyout Operational Visibility Triggers Bindings
if (DOM.closeSidebarTriggerBtn) {
  DOM.closeSidebarTriggerBtn.addEventListener("click", () => {
    if (DOM.containerDrawerAside) {
      DOM.containerDrawerAside.classList.remove("cart-sidebar--open");
      DOM.containerDrawerAside.setAttribute("aria-hidden", "true");
    }
  });
}

/**
 * Event-Binding Delegation Routine Engine System for dynamically created inner items elements
 */
function bindInteractiveCartUiControls() {
  document.querySelectorAll(".cart-row-item__remove-trigger").forEach((removeAnchorNode) => {
    removeAnchorNode.addEventListener("click", () => {
      const activeId = Number(removeAnchorNode.dataset.id);
      cart = cart.filter((item) => item.productId !== activeId);
      persistCartStateAndSyncUI();
    });
  });

  document.querySelectorAll(".js-qty-plus").forEach((incrementBtnNode) => {
    incrementBtnNode.addEventListener("click", () => modifyItemQuantity(Number(incrementBtnNode.dataset.id), "increment"));
  });

  document.querySelectorAll(".js-qty-minus").forEach((decrementBtnNode) => {
    decrementBtnNode.addEventListener("click", () => modifyItemQuantity(Number(decrementBtnNode.dataset.id), "decrement"));
  });
}

/**
 * Processes arithmetic state value step changes safely inside localized boundary rules criteria limits
 */
function modifyItemQuantity(productIdTargetKey, operationalVarianceType) {
  let changeHasBeenValidated = false;

  cart = cart.map((targetCartRecordUnit) => {
    if (targetCartRecordUnit.productId === productIdTargetKey) {
      if (operationalVarianceType === "increment" && targetCartRecordUnit.quantity < 3) {
        targetCartRecordUnit.quantity++;
        changeHasBeenValidated = true;
      } else if (operationalVarianceType === "decrement" && targetCartRecordUnit.quantity > 1) {
        targetCartRecordUnit.quantity--;
        changeHasBeenValidated = true;
      }
    }
    return targetCartRecordUnit;
  });

  persistCartStateAndSyncUI();

  if (changeHasBeenValidated) {
    const contextualTargetRowWrapperNode = document.querySelector(`.cart-row-item [data-id="${productIdTargetKey}"]`).closest(".cart-row-item");
    const localizedTextCounterNode = contextualTargetRowWrapperNode?.querySelector(".cart-row-item__numeric-display");
    triggerElementReflowAnimation(localizedTextCounterNode);
  }
}

/**
 * Commits updates to LocalStorage and dispatches synchronization events across app boundaries
 */
function persistCartStateAndSyncUI() {
  localStorage.setItem("cart", JSON.stringify(cart));
  document.dispatchEvent(new Event("cartChanged"));
}

/**
 * Compiles structural templates for the active lines collection drawer sidebar
 */
export function generateCartHtml() {
  if (!DOM.targetGridElementsBox) return;

  if (cart.length === 0) {
    DOM.targetGridElementsBox.innerHTML = `<p style="text-align: center; padding: 40px; color:#666;">Your cart is currently empty.</p>`;
    return;
  }

  // Parse layout from top down showing newest items first
  const internalCompiledHTMLTemplate = cart.slice().reverse().map((item) => {
    const systemProductMetadataMatch = database.find((product) => product.id === item.productId);
    if (!systemProductMetadataMatch) return "";

    return `
      <div class="cart-row-item">
        <a href="product.html?id=${systemProductMetadataMatch.id}">
          <img src="${systemProductMetadataMatch.image}" alt="${systemProductMetadataMatch.name} thumbnail reference view" class="cart-row-item__thumb">
        </a>
        <div class="cart-row-item__details">
          <div class="cart-row-item__title-row">
            <p class="cart-row-item__title">${systemProductMetadataMatch.name}</p>
            <span>$${systemProductMetadataMatch.price.toFixed(2)}</span>
          </div>
          <div class="cart-row-item__action-row">
            <span class="cart-row-item__quantity-selector">
              <i class="fa-solid fa-minus cart-row-item__step-icon js-qty-minus" data-id="${systemProductMetadataMatch.id}"></i>
              <span class="cart-row-item__numeric-display">${item.quantity}</span>
              <i class="fa-solid fa-plus cart-row-item__step-icon js-qty-plus" data-id="${systemProductMetadataMatch.id}"></i>
            </span>
            <span class="cart-row-item__remove-trigger" data-id="${systemProductMetadataMatch.id}">Remove</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  DOM.targetGridElementsBox.innerHTML = internalCompiledHTMLTemplate;
  bindInteractiveCartUiControls();
}

/**
 * Computes billing aggregate figures dynamically mapping active state values rows variables
 */
export function subtotal() {
  const financialSubtotalSumValue = cart.reduce((totalAccumulator, currentLoopItem) => {
    const productRecordAssetMetaMatch = database.find((p) => p.id === currentLoopItem.productId);
    return productRecordAssetMetaMatch ? totalAccumulator + (productRecordAssetMetaMatch.price * currentLoopItem.quantity) : totalAccumulator;
  }, 0);

  if (DOM.subtotalFieldLabelNode) {
    const calculatedStringValueOutputLiteral = `$${financialSubtotalSumValue.toFixed(2)}`;
    if (DOM.subtotalFieldLabelNode.innerHTML !== calculatedStringValueOutputLiteral) {
      DOM.subtotalFieldLabelNode.innerHTML = calculatedStringValueOutputLiteral;
      triggerElementReflowAnimation(DOM.subtotalFieldLabelNode);
    }
  }
}

/**
 * Synchronizes the visual numeric metric notification badges items count display indicators
 */
export function cartCount() {
  const aggregatedTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (DOM.badgeItemsCounterNode) {
    DOM.badgeItemsCounterNode.textContent = aggregatedTotalCount;
    triggerElementReflowAnimation(DOM.badgeItemsCounterNode);
  }
}