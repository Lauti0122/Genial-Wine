import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import {initialValues} from './MyProfile.data';
import { useDispatch, useSelector } from 'react-redux';
import {updateUser, getUserByEmail} from '../../../redux/actions/index';
import { Container, Form, Button } from 'semantic-ui-react';
import {onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase';


export  function MyProfile() {

    const [emailUser, setEmailUser] = useState("");

    const dispatch = useDispatch();
  
    const user = useSelector(state => state.user);
  
    useEffect(() => {
       onAuthStateChanged(auth, (user) => {
        setEmailUser(user.email)
      });
    }, [])
  
    useEffect(() => {
      if (emailUser !== "") dispatch(getUserByEmail(emailUser))
    }, [])

    const formik = useFormik({
        initialValues: initialValues(),
        // validationSchema:validationSchema(),

        onSubmit: (formValue)=>{
            console.log(formValue)
            try{
                 dispatch(updateUser({
                        name: formValue.name ? formValue.name : user.name ,
                        lastname: formValue.lastname ? formValue.lastname : user.lastname,
                        city: formValue.city ? formValue.city : user.city,
                        phone: formValue.phone ? formValue.phone : user.phone,
                        cp: formValue.cp ? formValue.cp : user.cp,
                        address: formValue.address ? formValue.address : user.address,
                        birthday: formValue.birthday ? formValue.birthday : user.birthday

                    }, emailUser))
                    window.location.reload(true);

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
          height: "100vh",
         
        }}
        >
        <h1>{user.name} {user.lastname}</h1>
        <img style={{ width:"150px", height:"150px", border:"1px solid black", borderRadius: "99px", marginBottom:"3em" }} src={user.photo} alt="" />
       <Form  style={{width:"30%"}} onSubmit={formik.handleSubmit}>
        <Form.Input
             type='text' 
             placeholder="name..." 
             name="name" 
             onChange={formik.handleChange} 
             defaultValue={user.name}
            //  error={formik.errors.name && true}
        />

        <Form.Input
             type='text' 
             placeholder="lastname..." 
             name="lastname" 
             onChange={formik.handleChange} 
             defaultValue={user.lastname}
            //  error={formik.errors.email && true}
        />

        <Form.Input
             type='text' 
             placeholder="email..." 
             defaultValue={user.email}
             disabled
            //  error={formik.errors.email && true}
        />  

        <Form.Input
             type='text' 
             placeholder="phone..." 
             name="phone" 
             onChange={formik.handleChange}
             defaultValue={user.phone}
             
            //  error={formik.errors.email && true}
        />  
        <Form.Input
             type='text' 
             placeholder="postal code..." 
             name="cp" 
             onChange={formik.handleChange}
             defaultValue={user.cp}
             
            //  error={formik.errors.email && true}
        /> 

         <Form.Input
             type='text' 
             placeholder="city..." 
             onChange={formik.handleChange}
             name="city" 
             defaultValue={user.city}
             
            //  error={formik.errors.email && true}
        /> 


        <Form.Input
             type='text' 
             placeholder="address..." 
             name="address" 
             onChange={formik.handleChange}
             defaultValue={user.address}
             
            //  error={formik.errors.email && true}
        />

        <Form.Input
             type='date' 
             placeholder="birthday..." 
             name="birthday" 
             onChange={formik.handleChange}
             defaultValue={user.birthday}
             
            //  error={formik.errors.email && true}
        />

        <Button type='submit'>Update</Button>
       </Form>
    </Container>
  )
}
