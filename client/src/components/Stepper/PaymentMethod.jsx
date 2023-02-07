import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PaymentMethod = () => {

  const dispatch = useDispatch();
  const payment_info = useSelector(state => state.payment_info);
  const cart = useSelector(state => state.cart);

  const [method, setMethod] = useState("");

  const handleChangeMethod = (e) => {
    const products = cart.map(item => {
      return {
        id: item.id,
        name: item.name,
        images: item.images[0],
        quantity: item.quantity,
        price: item.price,
        total_price: item.price * item.quantity
      }
    });
    dispatch(createPayment(e.target.value, products)); 
    setMethod(e.target.value);
  }


  return (
    <>
      <h2>Payment Method</h2>
      <select name="method" value={method} onChange={handleChangeMethod} defaultValue="">
        <option disabled value="">Method</option>
        <option value="mercado_pago">Mercado Pago</option>
        <option value="paypal">PayPal</option>
      </select>
    </>
  )
}

export default PaymentMethod;