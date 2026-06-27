import { useState } from "react"
import './Home.css'
import Hero from "../components/home/Hero"
import Header from "../components/home/Header"
import Cart from "../components/home/cart/Cart"
import Toolbar from '../components/home/Toolbar'
import HomeMain from '../components/home/HomeMain'
import Alert from '../components/home/Alert'
import Footer from '../components/Footer'


function Home({ cartItem, setCartItem }) {

  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAlertId, setShowAlertId] = useState(null);

  return (
    <>
      <Hero />
      <Header
        setIsCartOpen={setIsCartOpen}
        cartItem={cartItem} />
      <Cart
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartItem={cartItem}
        setCartItem={setCartItem} />
      <Toolbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory} />
      <HomeMain
        setShowAlertId={setShowAlertId}
        cartItem={cartItem}
        setCartItem={setCartItem}
        activeCategory={activeCategory} />
      <Alert
        setShowAlertId={setShowAlertId}
        showAlertId={showAlertId}
        setIsCartOpen={setIsCartOpen} />
      <Footer />
    </>
  )
}

export default Home