import BackBtn from '../components/BackBtn'
import CheckoutMain from '../components/checkout/CheckoutMain'
import './Checkout-and-Buy.css'

function Checkout({ cartItem, setCartItem }) {
  return (
    <>
      <BackBtn />
      <CheckoutMain cartItem={cartItem} setCartItem={setCartItem}/>
    </>
  )
}

export default Checkout