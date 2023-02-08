import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import PaymentStepper from '../Stepper/Stepper';

const Payment = () => {

  const dispatch = useDispatch();
  const checkout = useSelector(state => state.checkout);
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);

 

  return (
    <div>
      <PaymentStepper />
      {/* <button onClick={(() => redirect(payment_info.init_point)} disabled={!payment_info)}>Finalizar compra</button> */}
      {/* <button type="button" target="_blank" onClick={() => window.location.href = payment_info?.init_point}>Checkout</button> */}
    </div>
  )
}

export default Payment;