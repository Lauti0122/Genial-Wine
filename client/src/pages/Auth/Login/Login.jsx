import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import {Container, Form, Button} from 'semantic-ui-react';
import {useFormik} from 'formik';
import {initialValues, validationSchema} from './Login.data'
import {useDispatch} from 'react-redux'

export  function Login() {

  const [logged, setLogged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
        onAuthStateChanged(auth, (user) => setLogged(user ? true : false));
      }, [])

 const loginGoogle = async () => {
    try { 
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log(result.user);
      let fullName = result.user.displayName
      fullName = fullName.split(" ")
      
      // dispatch(postUser({
      //     name: fullName[0],
      //     lastname: fullName[1],
      //     email: result.user.email
      // }))
      
      
    }
    catch (error) {
      console.log(error);
    }
  }

  const logout = async () => {
    await signOut(auth);
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),

    onSubmit: async (formValue)=>{
        try {
                const result = await signInWithEmailAndPassword(auth, formValue.email, formValue.password);
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
      {logged ? "Iniciado" : "No iniciado"}
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
    </Container>
  )
}
