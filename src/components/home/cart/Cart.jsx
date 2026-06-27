import { Link } from "react-router-dom"
import CartItemCard from "./CartItemCard"

function Cart({ isCartOpen, setIsCartOpen, cartItem, setCartItem }) {


  return (
    <aside className={isCartOpen ? "cart-sidebar cart-sidebar--open" : `cart-sidebar `} >
      <div className="cart-sidebar__header">
        <button onClick={() => setIsCartOpen(false)} className="cart-sidebar__close" aria-label="Close shopping cart">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2 className="cart-sidebar__title">
          Cart <i className="fa-solid fa-cart-arrow-down" aria-hidden="true"></i>
        </h2>
      </div>

      <div className="cart-sidebar__items-grid">
        {cartItem.length === 0 && (
          <p style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            Your cart is currently empty.
          </p>
        )}
        {cartItem.map(item => (
          <CartItemCard key={item.id} cartItem={item} setCartItem={setCartItem} />
        ))}
      </div>

      <div className="cart-sidebar__footer summary-checkout">
        <div className="summary-checkout__subtotal-row">
          <span>Subtotal</span>
          <span className="summary-checkout__price-value"></span>
        </div>
        <Link to="/checkout" className="summary-checkout__action-btn">Checkout</Link>
      </div>

    </aside>
  )
}

export default Cart