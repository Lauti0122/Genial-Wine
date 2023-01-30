import React, {useState} from 'react'
import { Container, Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './Register.data'
import { auth } from '../../../firebase'
import { createUserWithEmailAndPassword} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { postUser } from '../../../redux/actions'
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export  function Register() {

  const dispatch = useDispatch()
  const navigate = useNavigate("/auth/login");


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
          country:formValue.country,
          photo:"https://firebasestorage.googleapis.com/v0/b/genial-wine.appspot.com/o/logo.png?alt=media&token=2cb43561-757d-4e10-939b-44b6608e746c"
        }))
        navigate("/auth/login");
       
      }catch(error){
        //MOSTRAR ERROR
        if (error.code === 'auth/email-already-in-use'){
          
          setErrors("Email already exists");
          notify("Email already exists");
        }
        if(error.code === 'auth/weak-password'){
          
          setErrors("Password should be at least 6 characters");
          notify("Password should be at least 6 characters");
        }
        else{
          console.log(error.code)
        }
       
      }

    }
  })

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
    error={formik.errors.password }
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
    </>
  )
}
