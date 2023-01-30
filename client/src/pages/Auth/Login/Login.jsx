import React, { useState } from 'react';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { Container, Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useNavigate, Link  } from "react-router-dom";
import { initialValues, validationSchema } from './Login.data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export  function Login() {


  const navigate = useNavigate();

  
  const notify = (errors) => toast(errors, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true, 
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  
  const [errors, setErrors] = useState("");



 const loginGoogle = async () => {

    try { 
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    }
    catch (error) {
      console.log(`error1: ${error}`);
    }
  }




  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),

    onSubmit: async (formValue)=>{
        try {
                const result = await signInWithEmailAndPassword(auth, formValue.email, formValue.password);
                navigate("/");
                console.log(result, "logueado");
              
      }catch(error){
        if(error.code === 'auth/user-not-found'){
         
          setErrors("User not found");
          notify("User not found");
        }
        if(error.code === 'auth/wrong-password'){
          setErrors("Incorrect password")
          notify("Incorrect password");
          
        }
        else{
          console.log(error.code);
        }
      }
    }
  })

console.log(errors)
  return (
    <>
      <Link to="/" style={{ margin:"20px"}}>
          <ArrowBackIosIcon style={{ marginTop:"20px" }}/>
      </Link>
    <Container
    style={{
      textAlign:"center",
      display:"flex",
      alignItems:"center",
      flexDirection:"column",
      justifyContent:"center",
      height: "100vh"
    }}>
      {errors ? <ToastContainer /> : null }
      
      <h1>Login</h1>
    <Form  style={{width:"30%"}} onSubmit={formik.handleSubmit}>

    <Form.Input
     type='text' 
     placeholder="email..." 
     name="email" 
     onChange={formik.handleChange} 
     error={formik.errors.email && true}
    />

    <Form.Input
     type='password' 
     placeholder="password..." 
     name="password" 
     onChange={formik.handleChange} 
     error={formik.errors.password && true}
    />
    <Button type='submit'>Login</Button>
    </Form>
    <br />
    <Button onClick={loginGoogle}>Login with Google</Button>
    <h3><Link to={"/auth/reset-password"}>Forgot Password?</Link></h3>
    <h3>Don't have an account yet? <Link to={"/auth/register"}>Register</Link> </h3>
    </Container>
    </>
  )
}
