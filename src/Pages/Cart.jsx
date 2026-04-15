import React, { useState } from 'react';
import './Cart.css'
import { AllProducts } from '../data'
import { Link } from 'react-router-dom';

const Cart = ({cart, setCart}) => {
    
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 5.99 : 0; 
    const tax = subtotal * 0.10;
    const total = subtotal + shipping + tax;

    const removeFromCart = async (itemObject) => {
      const updatedCart = cart.filter(item => item.id !== itemObject.id || item.size !== itemObject.size );
        setCart(updatedCart);

    localStorage.setItem('snapcart_items', JSON.stringify(updatedCart));
    
    };

    const updateQuantity = (id, amount, size) => 
    {
     const updatedCart = cart.map(item => { if (item.id === id && item.size === size) {return {...item, quantity: Math.max(1, item.quantity + amount) };
    }
    return item;
    });

    setCart(updatedCart);
    localStorage.setItem('snapcart_items', JSON.stringify(updatedCart));
};

  return (
    <>
      <section id="cart">
        <div className="cart__title--container">
            <h2 className="your_cart">Your Cart</h2>
        </div>

        <div className="no_items--container">
          {cart.length === 0 ? (
            <>
          <h3 className="no_items">Your Cart is Empty</h3>
          <div className="btn__container">
          <Link to="/products"><button className="browse__btn--cart">Browse Products</button></Link></div>
         </> 
       
        ) : (

        <div className="cart__container">
            <div className="card-details">
                {cart.map((item) => {
                  return (
                <div key={`${item.id}-${item.size}`} className="cart__item-card"> <img className="cart-item-image" src={item.image} alt={item.name}  />
                    <div>
                        <h4 className="item_name">{item.name}</h4>
                        {item.size && <p className="item_size">Size: {item.size}</p>}
                        <div className="quantity-controls">
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, -1, item.size)}>  - </button>
                          <span className="qty-number">{item.quantity}</span>
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, 1, item.size)}>  +  </button>
                          </div>
                        <p className="item_quantity">Quantity: {item.quantity}</p>
                 </div>
                 <span className="item_price">${item.price.toFixed(2)}</span>

                 <button onClick={() => removeFromCart(item)} className="remove-btn">Remove</button>
                 </div>
                  );
                })}
                </div>

                <div className="cart-summary">
                    <h3 className="order_summary">Order Summary</h3>
                    <div className="summary-line"><span className="cart">Price:</span><span className="cart_price">${subtotal.toFixed(2)} </span></div>
                    <div className="summary-line"><span className="cart">Shipping:</span><span className="cart_price">${shipping.toFixed(2)} </span></div>
                    <div className="summary-line"><span className="cart">Tax:</span><span className="cart_price">${tax.toFixed(2)} </span></div>
                    
                    <div className="summary-line--total"><span className="cart">Total:</span><span className="cart_price"> ${total.toFixed(2)}</span></div>
                    <button className="checkout_btn">Proceed to Checkout</button>
                </div>
                </div>
        )}
        </div>
      </section>
     
    </>
  );
};

export default Cart
