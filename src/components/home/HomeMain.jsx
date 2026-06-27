import database from "../../data/database.js";
import HomeProductCart from "./HomeProductCart.jsx";

function HomeMain({ cartItem, setCartItem, activeCategory, setShowAlertId }) {
  return (
    <main id="product-grid" className="catalog-grid">
      {database
        .filter((product) => {
          // 1. If 'All' is selected, show every item
          if (activeCategory === "All") return true;

          // 2. Otherwise, check if lowercase type matches lowercase state
          return product.type === activeCategory.toLowerCase();
        })
        .map((product) => (
          <HomeProductCart
            setShowAlertId={setShowAlertId}
            key={product.id}
            product={product}
            cartItem={cartItem}
            setCartItem={setCartItem}
          />
        ))}
    </main>
  );
}

export default HomeMain;