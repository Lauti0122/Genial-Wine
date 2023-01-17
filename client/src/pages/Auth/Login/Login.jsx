import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export function Login() {

  const [input, setInput] = useState({
    email: "",
    contra: ""
  })

  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      await signInWithEmailAndPassword(auth, input.email, input.contra);

      alert("Entro!!!!");
    }
    catch (error) {
      console.log(error)
    }
  }

  const loginGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
     <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={input.email} onChange={handleChange} />
        <label>Contraseña</label>
        <input type="password" name="contra" value={input.contra} onChange={handleChange} />
        <button>Enviar</button>
      </form>
      <p>Crack! tambien te podes unir con google <button type="button" onClick={loginGoogle}>Soy GOOGLE</button></p>
    </>
  )
}