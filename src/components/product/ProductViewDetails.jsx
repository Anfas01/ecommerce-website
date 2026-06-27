import { Link } from 'react-router-dom';
import { useState } from 'react';

function ProductViewDetails({ product, cartItem, setCartItem }) {

  const isInCart = cartItem.some((item) => item.id === product.id);
  const statusModifierClass = isInCart ? "product-panel-btn--success-state" : "";

  const handleAddToCart = (product) => {
    if (isInCart) {
      setCartItem((prevCartItem) => prevCartItem.filter((item) => item.id !== product.id));
      return;
    }
    const item = { ...product, quantity: 1 }
    setCartItem((prevCartItem) => [...prevCartItem, item])
  };

  const [isProductFeaturesExpanded, setIsProductFeaturesExpanded,] = useState(false);

  return (
    <>
      <section className="product-viewer-layout__gallery">
        <img src={`../${product.image}`} alt={product.name} className="product-viewer-layout__showcase-img" />
      </section>
      <section className="product-viewer-layout__panel">
        <h1 className="product-name product-panel-title">{product.name}</h1>
        <p className="product-panel-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam perspiciatis soluta velit voluptate a consequuntur fugit earum voluptates atque hic.</p>
        <span className="product-panel-price">${product.price.toFixed(2)}</span>

        <Link to={`/buy/${product.id}`}>
          <button className="product-panel-btn product-panel-btn--primary btn-buy-direct">Buy Now</button>
        </Link>
        <button onClick={() => handleAddToCart(product)} className={`product-panel-btn product-panel-btn--secondary ${statusModifierClass} btn-toggle-cart`}>
          {isInCart ? (
            <>
              Added to Cart <i className="fa-solid fa-check"></i>
            </>
          ) : (
            "Add to Cart"
          )}
        </button>

        <section className="accordion-specs">
          <div onClick={() => setIsProductFeaturesExpanded(!isProductFeaturesExpanded)} className="accordion-specs__trigger" role="button" aria-expanded="false" tabindex="0">
            <h3>Product Features</h3>
            <i className={`fa-solid fa-angle-${isProductFeaturesExpanded ? "up" : "down"} accordion-arrow-icon`}></i>
          </div>
          <ul className={`accordion-specs__list ${isProductFeaturesExpanded ? "accordion-specs__list--expanded" : ""}`}>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
            <li>Lorem ipsum dolor sit amet consectetur.</li>
          </ul>
        </section>
      </section>
    </>
  )
}

export default ProductViewDetails