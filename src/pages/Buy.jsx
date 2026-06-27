import BackBtn from '../components/BackBtn';
import './Checkout-and-Buy.css';
import { useParams } from 'react-router-dom';
import database from '../data/database';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Buy() {

  const { id } = useParams();
  const product = database.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (operator) => {
    if (operator === "+") {
      if (quantity >= 3) return;
      setQuantity((prevQuantity) => prevQuantity + 1);
    };
    if (operator === "-") {
      if (quantity <= 1) return;
      setQuantity((prevQuantity) => prevQuantity - 1);
    };
  };

  return (
    <>
      <BackBtn />
      <main className="transaction-container">
        <section className="transaction-container__form-pane customer-form">
          <h2 className="customer-form__title">Delivery Details</h2>
          <form className="customer-form__body">

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
          <div className="invoice-panel__sticky-wrapper">
            <h2 className="invoice-panel__section-title">Order Summary</h2>
            <div className="invoice-panel__single-product-card target-express-product-card">

              <div className="invoice-panel__single-thumb">
                <Link to={`/product/${product.id}`}>
                  <img src={`../${product.image}`} />
                </Link>
              </div>
              <div className="invoice-panel__single-meta">
                <h1 className="invoice-panel__single-name">{product.name}</h1>
                <span className="invoice-panel__single-price">${product.price.toFixed(2)}</span>
                <div>qty:
                  <span>
                    <i onClick={() => handleQuantityChange("-")} className="fa-solid fa-minus qty-minus"></i>
                    <span className="qty-value">{quantity}</span>
                    <i onClick={() => handleQuantityChange("+")} className="fa-solid fa-plus qty-plus"></i>
                  </span>
                </div>
              </div>

            </div>
            <div className="invoice-panel__pricing-breakdown target-express-pricing-summary"></div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Buy;