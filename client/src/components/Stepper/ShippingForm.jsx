import React, { useState } from 'react';

const ShippingForm = () => {

  const [input, setInput] = useState({
    email: "",
    address: "",
    country: "",
    city: "",
    cp: "",
    phone: ""
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value  });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    input.cp = parseInt(input.cp);
    console.log(input);
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
      <br />
      {/* <button onClick={(() => redirect(payment_info.init_point)} disabled={!payment_info)}>Finalizar compra</button> */}
      {/* <button type="button" target="_blank" onClick={() => window.location.href = payment_info?.init_point}>Checkout</button> */}
    </div>
  )
}

export default ShippingForm;