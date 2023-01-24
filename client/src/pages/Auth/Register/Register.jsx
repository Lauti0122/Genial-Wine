import React from 'react'
import {Container, Form, Button} from 'semantic-ui-react'
import {useFormik} from 'formik'
import {initialValues, validationSchema} from './Register.data'
import {auth} from '../../../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useDispatch} from 'react-redux'
import {postUser} from '../../../redux/actions'

export  function Register() {

  const dispatch = useDispatch()


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema:validationSchema(),
    onSubmit: async (formValue)=>{
      try{
        await createUserWithEmailAndPassword(auth, formValue.email, formValue.password);
        dispatch(postUser({
        name:formValue.name,
        lastname:formValue.lastname,
        email:formValue.email,
        country:formValue.country
        }))
      }catch(error){
        //MOSTRAR ERROR
        if (error.code === 'auth/email-already-in-use') console.log("Email already exists");
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
      <h1>Register</h1>
    <Form style={{width:"30%"}} onSubmit={formik.handleSubmit}>
    <Form.Input
     type='text' 
     placeholder="Name..." 
     name="name" 
     onChange={formik.handleChange} 
     error={formik.errors.name && true}
     />

    <Form.Input
     type='text' 
     placeholder="Lastname..." 
     name="lastname" 
     onChange={formik.handleChange} 
     error={formik.errors.lastname && true}
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
    placeholder="Email..." 
    name="email" 
    onChange={formik.handleChange} 
    error={formik.errors.email && true}
    />

    <Form.Input 
    type='password' 
    placeholder="Password..." 
    name="password" 
    onChange={formik.handleChange} 
    error={formik.errors.password && true}
    />

    <Form.Input 
    type='password' 
    placeholder="Repeat Password..." 
    name="repeatPassword" 
    onChange={formik.handleChange} 
    error={formik.errors.repeatPassword && true}
    />

    <Button type='submit'>Register</Button>

    </Form>

    </Container>
  )
}
