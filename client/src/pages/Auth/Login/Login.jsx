import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { Container, Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useNavigate, Link  } from "react-router-dom";
import { initialValues, validationSchema } from './Login.data'


export  function Login() {

  // const [logged, setLogged] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => setLogged(user ? true : false));
  // }, [])


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
          console.log("User not found")
        }
        if(error.code === 'auth/wrong-password'){
          console.log("Incorrect password")
        }
        else{
          console.log(error.code);
        }
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
    }}>
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
  )
}
