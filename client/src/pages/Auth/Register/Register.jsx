import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { v4 as uuid } from "uuid";

export function Register() {

  const [input, setInput] = useState({
    id: "",
    email: "",
    nombre: "",
    apellido: "",
    contra: "",
    pais: "",
    ciudad: ""
  });

  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, input.email, input.contra);
      //Crear el documento de usuario
      input.id = uuid();
      const myDB = doc(db, "users", input.id);
      await setDoc(myDB, input);
    }
    catch (error) {
      if (error.code === 'auth/email-already-in-use') console.log("Email ya en uso");
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
        <label>Pais</label>
        <input type="text" name="pais" value={input.pais} onChange={handleChange} />
        <label>Ciudad</label>
        <input type="text" name="ciudad" value={input.ciudad} onChange={handleChange} />
        <button>Enviar</button>
      </form>
    </>
  )
}