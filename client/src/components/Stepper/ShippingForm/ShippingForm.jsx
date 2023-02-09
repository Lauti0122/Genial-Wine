import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { setPaymentInfo } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Container, Form} from 'semantic-ui-react';
import { initialValues } from './ShippingForm.data';

const ShippingForm = ({activeStep, handleBack, handleNext, steps}) => {

  const dispatch = useDispatch();
  const paymentInfo = useSelector((state => state.payment_info))


  const formik = useFormik({
    initialValues: initialValues(),
    // validationSchema:validationSchema(),
  })


  const handleSubmit = () => {
    dispatch(setPaymentInfo({
      ...paymentInfo,
      shipping: formik.values
    }
    ))
    handleNext();
  }

  

  return (
    <div>
  <Container
    style={{
      textAlign:"center",
      display:"flex",
      alignItems:"center",
      flexDirection:"column",
      justifyContent:"center",
      height: "50vh"
    }}>
    
      {/* {errors ? <ToastContainer /> : null } */}
      <h1>Shipping Address</h1>
    <Form style={{width:"30%"}} >
    <Form.Input
     type='text' 
     placeholder="Email..." 
     name="email" 
     onChange={formik.handleChange} 
    //  error={formik.errors.name && true}
     />

    <Form.Input
     type='text' 
     placeholder="Address..." 
     name="address" 
     onChange={formik.handleChange} 
    //  error={formik.errors.lastname && true}
     />
    <Form.Input
     type='text' 
     placeholder="Country..." 
     name="country" 
     onChange={formik.handleChange} 
     error={formik.errors.country && true}
     />

    <Form.Input 
    type='text' 
    placeholder="City..." 
    name="city" 
    onChange={formik.handleChange} 
    // error={formik.errors.email && true}
    />

    <Form.Input 
    type='text' 
    placeholder="Postal Code..." 
    name="cp" 
    onChange={formik.handleChange} 
    error={formik.errors.password }
    />

    <Form.Input 
    type='text' 
    placeholder="Phone..." 
    name="phone" 
    onChange={formik.handleChange} 
    // error={formik.errors.repeatPassword && true}
    />

    </Form>

    </Container>

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
     
    </div>
  )
}

export default ShippingForm;