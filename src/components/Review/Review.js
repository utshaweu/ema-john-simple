import React from 'react';
import { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {

  const [cart, setCart] = useState([]);

  const [orderPlace, setOrderPlace] = useState(false);

  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push('/shipment');  }


  const removeProduct = (productKey) => {
    console.log("remove", productKey);
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  }

  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    const cartProducts = productKeys.map( key => {
      const product = fakeData.find(pd => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, [])

  let thankyou;
  if(orderPlace){
    thankyou = <img src={happyImage} alt="/"></img>
  }

  return (
    <div className="twin-container">
      {/* <h3>Cart Item: {cart.length}</h3> */}
      <div className="product-container">
        {
          cart.map(pd => <ReviewItem 
            removeProduct={removeProduct}
            key={pd.key}
            product={pd}></ReviewItem>)
        }
        {
          thankyou
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
        </Cart>
      </div>
      
    </div>
  );
};

export default Review;