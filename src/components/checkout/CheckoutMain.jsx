import CheckoutProductCart from "./CheckoutProductCard"



function CheckoutMain({ cartItem, setCartItem }) {

  const totalItems = cartItem.reduce((total, item) => total + item.quantity, 0);
  const subTotal = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = totalItems > 0 ? 5.99 : 0;
  const grandTotal = subTotal + shippingFee;

  return (
    <main className="transaction-container">
      <section className="transaction-container__form-pane customer-form">
        <h2 className="customer-form__title">Delivery Details</h2>
        <form className="customer-form__body" onSubmit={(e) => {
          e.preventDefault();
          setCartItem([]);
        }
        }>

          <div className="customer-form__row">
            <div className="customer-form__input-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" name="firstname" placeholder="John" required />
            </div>
            <div className="customer-form__input-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" name="lastname" placeholder="Doe" required />
            </div>
          </div>

          <div className="customer-form__input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="john.doe@example.com" required />
          </div>

          <div className="customer-form__input-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="(555) 000-0000" required />
          </div>

          <hr className="customer-form__divider" />

          <div className="customer-form__input-group">
            <label htmlFor="address">Street Address</label>
            <input type="text" id="address" name="address" placeholder="123 Main St, Apt 4B" required />
          </div>

          <div className="customer-form__row customer-form__row--address-breakdown">
            <div className="customer-form__input-group customer-form__input-group--flex-two">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" placeholder="New York" required />
            </div>
            <div className="customer-form__input-group customer-form__input-group--flex-half">
              <label htmlFor="state">State</label>
              <input type="text" id="state" name="state" placeholder="NY" required />
            </div>
            <div className="customer-form__input-group customer-form__input-group--flex-one">
              <label htmlFor="zipcode">ZIP Code</label>
              <input type="text" id="zipcode" name="zipcode" placeholder="10001" required />
            </div>
          </div>

          <button type="submit" className="customer-form__submit-btn">Confirm Order</button>
        </form>
      </section>

      <section className="transaction-container__summary-pane invoice-panel">
        <div className="invoice-panel__scroll-container target-checkout-items-list">

          {cartItem.length === 0 && (
            <p style={{ textAlign: "center", padding: "40px", color: "#666" }}>
              Your validation checkout basket structure records contain no items.
            </p>
          )}

          {cartItem.map((item) => (
            <CheckoutProductCart key={item.id} product={item} />
          ))}

        </div>
        <div className="invoice-panel__pricing-breakdown target-checkout-pricing-summary">
          <div className="invoice-panel__billing-row">
            <span>Subtotal &middot; {totalItems} items</span>
            <span>${(subTotal ?? 0).toFixed(2)}</span>
          </div>
          <div className="invoice-panel__billing-row">
            <span>Shipping</span>
            <span>${(shippingFee ?? 0).toFixed(2)}</span>
          </div>
          <div className="invoice-panel__billing-row invoice-panel__billing-row--bold-total">
            <span>Total</span>
            <span>${(grandTotal ?? 0).toFixed(2)}</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CheckoutMain