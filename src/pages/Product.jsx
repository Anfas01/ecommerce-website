
import BackBtn from '../components/BackBtn';
import './Product.css'
import { useParams } from 'react-router-dom';
import ProductViewDetails from '../components/product/ProductViewDetails';
import database from '../data/database';

function Product({ cartItem, setCartItem }) {

  const { id } = useParams();
  const product = database.find((item) => item.id === Number(id));

  return (
    <>
      <BackBtn />
      <main className="product-viewer-layout">
        <ProductViewDetails cartItem={cartItem} setCartItem={setCartItem} product={product} />
      </main>
    </>
  );
}

export default Product