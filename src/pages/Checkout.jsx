import BackBtn from '../components/BackBtn'
import CheckoutMain from '../components/checkout/CheckoutMain'
import './Checkout-and-Buy.css'

function Checkout({ cartItem}) {
  return (
    <>
      <BackBtn />
      <CheckoutMain cartItem={cartItem}/>
    </>
  )
}

export default Checkout