import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartAction } from '../../redux/actions';

const Cart = () => {
  
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch()

  return (
    <>
      {
        cartItems.length ?
         cartItems.map(item => (
          <div>
            <span>Vino: {item.name} x{item.quantity} | <button onClick={() => dispatch(cartAction(item.id, "ADD_TO_CART"))}>+</button><button onClick={() => dispatch(cartAction(item.id, "REMOVE_ONE_FROM_CART"))}>-</button> | </span>
            <span>Precio unitario: ${item.price} | </span>
            <span>Precio total: ${parseFloat(item.price * item.quantity).toFixed(2)} | </span>
            <button onClick={() => dispatch(cartAction(item.id, "REMOVE_ALL_FROM_CART"))}>Eliminar</button>
          </div>
        ))
        : <p>The cart is empty</p>
      }
    </>
  )
}

export default Cart;