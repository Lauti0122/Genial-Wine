import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { setPaymentInfo } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const ShippingForm = ({activeStep, handleBack, handleNext, steps}) => {

  const dispatch = useDispatch();
  const paymentInfo = useSelector((state => state.payment_info))

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

  const handleSubmit = () => {
    dispatch(setPaymentInfo({
      ...paymentInfo,
      shipping: input
    }
    ))
    handleNext();
  }

  

  return (
    <div>
      <form >
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
      </form>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleSubmit}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
      <br />
      {/* <button onClick={(() => redirect(payment_info.init_point)} disabled={!payment_info)}>Finalizar compra</button> */}
      {/* <button type="button" target="_blank" onClick={() => window.location.href = payment_info?.init_point}>Checkout</button> */}
    </div>
  )
}

export default ShippingForm;