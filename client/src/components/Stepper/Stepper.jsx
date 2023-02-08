import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import ShippingForm from './ShippingForm';
import PaymentMethod from './PaymentMethod';

const steps = ['Shipping Info', 'Payment Method', 'Finish Payment'];

const PaymentStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
 

  const handleNext = () => {
  
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const render = (step) => {
    switch(step) {
      case 0: return <ShippingForm handleBack={handleBack} handleNext={handleNext}  activeStep={activeStep} steps={steps} />
      case 1: return <PaymentMethod handleBack={handleBack} handleNext={handleNext} activeStep={activeStep} steps={steps} /> 
    }
  }

  return (
    <Box sx={{ width: '60%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
     
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (

        <React.Fragment>

          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>

          </Box>
          
        </React.Fragment>
      ) : (
        <React.Fragment>

          {render(activeStep)}
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>*/}
         
        </React.Fragment>
      )}
    </Box>
  );
}

export default PaymentStepper;  