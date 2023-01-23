import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

export function Login() {

  const [input, setInput] = useState({
    email: "",
    contra: ""
  })

  const [logged, setLogged] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setLogged(user ? true : false));
  }, [])
  

  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, input.email, input.contra);
      console.log(result);
    }
    catch (error) {
      console.log(error)
    }
  }

  const loginGoogle = async () => {
    try { 
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log(result.user);
    }
    catch (error) {
      console.log(error);
    }
  }

  const logout = async () => {
    await signOut(auth);
  }

  return (
    <>
      {logged ? "Iniciado" : "No iniciado"}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={input.email} onChange={handleChange} />
        <label>Contraseña</label>
        <input type="password" name="contra" value={input.contra} onChange={handleChange} />
        <button>Enviar</button>
      </form>
      <p>Crack! tambien te podes unir con google <button type="button" onClick={loginGoogle}>Soy GOOGLE</button></p>
      <p><button type="button" onClick={logout}>Deslogearse</button></p>
    </>
  )
}