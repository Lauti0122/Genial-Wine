import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createCheckout, setPaymentInfo } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import imageMP from '../../../assets/mercadopago.png';
import imagePP from '../../../assets/paypal.png';
import { ContainerImagePayment, ContainerPaymentBtn } from './PaymentMethod.Styles';

const PaymentMethod = ({activeStep, handleBack, handleNext, steps}) => {


  const dispatch = useDispatch();

  const refPayment = useRef('');

  const paymentInfo = useSelector((state => state.payment_info))

  const cart = useSelector(state => state.cart);


  const handleChangeMP = () => {
      refPayment.current = "mercado_pago"
    
  }

  const handleChangePP = () => {
    refPayment.current = "paypal"
  }

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

 

  const handleSubmit = () => {
    dispatch(setPaymentInfo({
      ...paymentInfo,
      payment_method:refPayment.current
    }
    ))

    dispatch(createCheckout(refPayment.current, { products: products })); 

    handleNext();
  }

  return (
  <>
  <ContainerPaymentBtn>
    <button  onClick={handleChangeMP}>
      <ContainerImagePayment>
        <img  src={imageMP} alt="mercado_pago" />
      </ContainerImagePayment>
    </button>
    
    <button  onClick={handleChangePP}>
      <ContainerImagePayment>
        <img  src={imagePP} alt="paypal" />
      </ContainerImagePayment>
    </button>
   </ContainerPaymentBtn>
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