import React from "react";
import {useFormik} from "formik";
import { initialValues, validationSchema } from './ResetPassword.data';
import { Container, Form, Button } from 'semantic-ui-react';
import {sendPasswordResetEmail} from "firebase/auth"
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

export  function ResetPassword() {

    const navegation = useNavigate();

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:validationSchema(),

        onSubmit: async (formValue)=>{
            try{
                    await sendPasswordResetEmail(auth, formValue.email)
                    navegation('/auth/login')

            }catch(error){
                console.log(error)
            }
        }
    })

  return (
    <Container
    style={{
        textAlign:"center",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        justifyContent:"center",
        height: "100vh"
      }}
    >
        <h1>Reset Password</h1>
       <Form  style={{width:"30%"}} onSubmit={formik.handleSubmit}>

        <Form.Input 
         type='text' 
         placeholder="email..." 
         name="email" 
         onChange={formik.handleChange} 
         error={formik.errors.email && true}
        />

        <Button type="submit">Reset Password</Button>
       </Form>
        
    </Container>
  )
}
