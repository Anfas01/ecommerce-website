import { useEffect } from "react";
import { Link } from "react-router-dom";
import database from "../../data/database";

function Alert({ setShowAlertId, showAlertId, setIsCartOpen }) {
  // 💡 Automatically hide the alert after 3 seconds
  useEffect(() => {
    if (showAlertId) {
      const timer = setTimeout(() => {
        setShowAlertId(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlertId, setShowAlertId]);

  const product = database.find((item) => item.id === showAlertId) || database[0];

  const handleViewCartBtn = () => {
    setShowAlertId(null);
    setIsCartOpen(true);
  }

  return (
    <section
      className={`toast-alert ${showAlertId ? "toast-alert--visible" : ""}`}
      aria-live="polite"
    >
      <div className="toast-alert__body">
        <div className="toast-alert__header">
          <div className="toast-alert__status">
            <i className="fa-solid fa-check" aria-hidden="true"></i>
            <span>Item added to your cart</span>
          </div>
          <button
            className="toast-alert__close"
            aria-label="Close notification"
            onClick={() => setShowAlertId(null)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="toast-alert__preview preview-item">
          <Link className="preview-item__link-wrapper" to={`/product/${product.id}`}>
            <img className="preview-item__image" src={`../${product.image}`} alt={product.name} />
          </Link>
          <div className="preview-item__meta">
            <div className="preview-item__name">{product.name}</div>
            <div className="preview-item__details">
              <div className="preview-item__price">${product.price.toFixed(2)}</div>
              <div className="preview-item__qty">Qty: 1</div>
            </div>
          </div>
        </div>

        <div className="toast-alert__actions">
          <button onClick={handleViewCartBtn} className="toast-alert__btn toast-alert__btn--secondary btn-view-cart">View Cart</button>
          <Link className="toast-alert__link-btn btn-buy-now" to={`/buy/${product.id}`}>
            <button className="toast-alert__btn toast-alert__btn--primary">Buy Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Alert;