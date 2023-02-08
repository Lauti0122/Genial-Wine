import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createCheckout, setPaymentInfo } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const PaymentMethod = ({activeStep, handleBack, handleNext, steps}) => {


  const dispatch = useDispatch();
  const paymentInfo = useSelector((state => state.payment_info))



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
        // total_price: item.price * item.quantity
      }
    });
  
    
    dispatch(createCheckout(e.target.value, products)); 
    setMethod(e.target.value);
  }

  const handleSubmit = () => {
    dispatch(setPaymentInfo({
      ...paymentInfo,
      payment_method:method
    }
    ))
    handleNext();
  }

  return (
    <>
      <select name="method" onChange={handleChangeMethod} defaultValue="">
        <option disabled value="">Method</option>
        <option value="mercado_pago">Mercado Pago</option>
        <option value="paypal">PayPal</option>
      </select>
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
    </>
  )
}

export default PaymentMethod;