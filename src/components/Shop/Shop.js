import React from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import { useState } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {

  const first10 = fakeData.slice(0,10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  const handlerAddProduct = (product) => {
    // console.log("clicked", product);
    const newCart = [...cart, product];
    setCart(newCart); 

  }

  return (
    <div className="shop-container">
      <div className="product-container">
        <ul>
          {
            products.map(pd => <Product
               product={pd}
               handlerAddProduct={handlerAddProduct}
            ></Product>)
          }
        </ul>
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;