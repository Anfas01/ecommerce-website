import { Link } from "react-router-dom";

function HomeProductCart({ product, cartItem, setCartItem, setShowAlertId }) {

  const isInCart = cartItem.some((item) => item.id === product.id);
  const statusModifierClass = isInCart ? "product-card-unit__btn--active" : "";

  const handleAddToCart = (product) => {
    if (isInCart) {
      setCartItem((prevCartItem) => prevCartItem.filter((item) => item.id !== product.id));
      return;
    };
    setShowAlertId(product.id);
    const item = { ...product, quantity: 1 };
    setCartItem((prevCartItem) => [...prevCartItem, item]);
  }



  return (
    <div className="product-card-unit">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} className="product-card-unit__image" />
      </Link>
      <div className="product-card-unit__meta">
        <p className="product-card-unit__name">{product.name}</p>
        <span className="product-card-unit__price">${product.price.toFixed(2)}</span>
      </div>
      <div className="product-card-unit__action-block">
        <Link className="product-card-unit__btn" to={`/buy/${product.id}`}>Buy</Link>
        <button onClick={() => handleAddToCart(product)} className={`product-card-unit__btn ${statusModifierClass} btn-add-to-cart`} data-id="${product.id}">{isInCart ? (
          <>
            Added to Cart <i className="fa-solid fa-check"></i>
          </>
        ) : (
          "Add to Cart"
        )}
        </button>
      </div>
    </div>
  )
}

export default HomeProductCart