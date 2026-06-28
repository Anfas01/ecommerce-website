import { Link } from "react-router-dom"

function CartItemCard({ cartItem, setCartItem }) {

  const removeCartItem = (id) => {
    setCartItem((prevCartItem) => prevCartItem.filter((item) => item.id !== id));
  };

  const increaseCartItemQuantity = (id) => {
    setCartItem((prevCartItem) => prevCartItem.map((item) => {
      if (item.id === id) {
        if (item.quantity >= 3) return item;
        return { ...item, quantity: item.quantity + 1 }
      }
      return item;
    }))
  };

  const decreaseCartItemQuantity = (id) => {
    setCartItem((prevCartItem) => prevCartItem.map((item) => {
      if (item.id === id) {
        if (item.quantity <= 1) return item;
        return { ...item, quantity: item.quantity - 1 }
      }
      return item;
    }))
  };

  return (
    <div className="cart-row-item">
      <Link to={`/product/${cartItem.id}`}>
        <img src={cartItem.image} className="cart-row-item__thumb" />
      </Link>
      <div className="cart-row-item__details">
        <div className="cart-row-item__title-row">
          <p className="cart-row-item__title">{cartItem.name}</p>
          <span>${(cartItem.price ?? 0).toFixed(2)}</span>
        </div>
        <div className="cart-row-item__action-row">
          <div>
            <span style={{"marginRight":"10px"}}>Qty :</span>
            <span className="cart-row-item__quantity-selector">
              <i onClick={() => decreaseCartItemQuantity(cartItem.id)} className="fa-solid fa-minus cart-row-item__step-icon js-qty-minus"></i>
              <span className="cart-row-item__numeric-display">{cartItem.quantity}</span>
              <i onClick={() => increaseCartItemQuantity(cartItem.id)} className="fa-solid fa-plus cart-row-item__step-icon js-qty-plus"></i>
            </span>
          </div>
          <span onClick={() => removeCartItem(cartItem.id)} className="cart-row-item__remove-trigger" data-id="${systemProductMetadataMatch.id}">Remove</span>
        </div>
      </div>
    </div>
  )
}

export default CartItemCard
