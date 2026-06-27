import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Buy from "./pages/Buy"
import Checkout from "./pages/Checkout"
import Product from "./pages/Product"
import { useState } from "react"

function App() {

  const [cartItem, setCartItem] = useState([]);

  return (
    <Routes>

      <Route
        path="/" element={<Home
          cartItem={cartItem}
          setCartItem={setCartItem} />} />
      <Route
        path="/buy/:id" element={<Buy />} />
      <Route
        path="/checkout" element={<Checkout
          cartItem={cartItem} />} />
      <Route
        path="/product/:id" element={<Product
          cartItem={cartItem}
          setCartItem={setCartItem} />} />



      <Route path="*" element={<h1 style={{
        textAlign: "center",
        marginTop: "100px",
        fontSize: "3rem",
      }}>404</h1>} />

    </Routes>
  )
}

export default App
