

function Header({ setIsCartOpen, cartItem }) {

  const cartItemCount = cartItem.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="site-header ">

      <div className="search-bar">
        <input type="text" placeholder="Search for products..." className="search-input" />
          <button className="search-submit" aria-label="Submit search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
      </div>


      <div className="site-header__cart-zone">
        <button onClick={() => setIsCartOpen(true)} className="cart-trigger-btn" aria-label="Open Cart View">
          Cart (<span className="cart-trigger-btn__counter">{cartItemCount}</span>)
        </button>
      </div>
    </header>
  );
}

export default Header