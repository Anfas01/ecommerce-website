import { Link } from "react-router-dom"

function CheckoutProductCart({ product }) {
  return (
    <div className="invoice-item-row-card">
      <div className="invoice-item-row-card__thumb-box">
        <Link to={`/product/${product.id}`} className="invoice-item-row-card__thumb">
          <img src={product.image} />
        </Link>
        <span className="invoice-item-row-card__badge-count">{product.quantity}</span>
      </div>
      <div className="invoice-item-row-card__meta">
        <p className="invoice-item-row-card__name">{product.name}</p>
        <span className="invoice-item-row-card__price-tag">${product.price.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default CheckoutProductCart