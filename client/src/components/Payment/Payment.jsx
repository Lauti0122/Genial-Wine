import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';
import { createPayment } from '../../redux/actions';

const Payment = () => {

  const dispatch = useDispatch();
  const payment_info = useSelector(state => state.payment_info);
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);

  const [input, setInput] = useState({
    email: "",
    address: "",
    country: "",
    city: "",
    cp: "",
    phone: ""
  });

  const [method, setMethod] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value  });
  }

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
    dispatch(createPayment(e.target.value, { email: user?.email }, products)); 
    setMethod(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    input.cp = parseInt(input.cp);
    console.log(input);
  }

  const redirect = (url) => {
    window.open(url);
  }

  return (
    <div>
      <h2>Shipping address</h2>
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input type="email" name="email" value={input.email} onChange={handleChange} />
        <br />
        <label>Address: </label>
        <input type="text" name="address" value={input.address} onChange={handleChange} />
        <br />
        <label>Country: </label>
        <input type="text" name="country" value={input.country} onChange={handleChange} />
        <br />
        <label>City: </label>
        <input type="text" name="city" value={input.city} onChange={handleChange} />
        <br />
        <label>Postal Code: </label>
        <input type="number" name="cp" value={input.cp} onChange={handleChange} />
        <br />
        <label>Phone: </label>
        <input type="text" name="phone" value={input.phone} onChange={handleChange} />
        <br />
        <button>Aceptar</button>
      </form>
      <h2>Payment Method</h2>
      <select name="method" onChange={handleChangeMethod} defaultValue="">
        <option disabled value="">Method</option>
        <option value="mercado_pago">Mercado Pago</option>
        <option value="paypal">PayPal</option>
      </select>
      <br />
      <button onClick={() => redirect(payment_info.init_point)} disabled={!payment_info}>Checkout</button>
      {/* <button type="button" target="_blank" onClick={() => window.location.href = payment_info?.init_point}>Checkout</button> */}
    </div>
  )
}

export default Payment;