import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import PaymentStepper from '../Stepper/Stepper';
import { ContainerPayment } from './Payment.Styles';

const Payment = () => {

  const dispatch = useDispatch();
  const checkout = useSelector(state => state.checkout);
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);

 

  return (
    < ContainerPayment >

      <PaymentStepper />
      
    </ ContainerPayment>
  )
}

export default Payment;