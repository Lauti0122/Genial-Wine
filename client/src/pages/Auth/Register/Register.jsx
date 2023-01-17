import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export function Register() {

  const [input, setInput] = useState({
    email: "",
    nombre: "",
    apellido: "",
    contra: ""
  });

  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, input.email, input.contra);
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
        <label>Nombre</label>
        <input type="text" name="nombre" value={input.nombre} onChange={handleChange} />
        <label>Apellido</label>
        <input type="text" name="apellido" value={input.apellido} onChange={handleChange} />
        <label>Contraseña</label>
        <input type="password" name="contra" value={input.contra} onChange={handleChange} />
        <button>Enviar</button>
      </form>
    </>
  )
}