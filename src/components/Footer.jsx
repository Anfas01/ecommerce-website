

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__section site-footer__section--about">
          <h2 className="site-footer__logo">E-Commerce Store</h2>
          <p className="site-footer__description">Your one-stop shop for the latest trends. High quality, affordable prices,
            and fast shipping worldwide.</p>
        </div>

        <div className="site-footer__section site-footer__section--links">
          <h3>Quick Links</h3>
          <ul className="site-footer__list">
            <li><a href="#all">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="site-footer__section site-footer__section--categories">
          <h3>Shop</h3>
          <ul className="site-footer__list">
            <li><a href="#all">All Products</a></li>
            <li><a href="#shirts">Shirts</a></li>
            <li><a href="#tshirts">T-Shirts</a></li>
            <li><a href="#pants">Pants</a></li>
          </ul>
        </div>

        <div className="site-footer__section site-footer__section--socials">
          <h3>Follow Us</h3>
          <div className="site-footer__social-icons">
            <a href="#" aria-label="Visit Facebook Page">FB</a>
            <a href="#" aria-label="Visit Instagram Profile">IG</a>
            <a href="#" aria-label="Visit Twitter Stream">TW</a>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>&copy; 2026 E-Commerce Store. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer