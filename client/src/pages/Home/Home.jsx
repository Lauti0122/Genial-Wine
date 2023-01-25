import React, { useState } from 'react'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import { NavBar } from '../../components/NavBar';

export  function Home() {
  
  
  const [ input, setInput ] = useState({
    id: "",
    nombre: "",
    anio: "",
    tipo: ""
  });

  const [ wines, setWines ] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      input.id = uuid();
      const myDB = doc(db, "wines", input.id);
      await setDoc(myDB, input);
    }
    catch (error) {
      console.log(error.message);
    }
    // console.log(input)
  }

  const setInfo = async () => {
    const querySnapshot = await getDocs(collection(db, "wines"));
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({...doc.data(), id: doc.id });
    })
    setWines(docs);
  }

  const getInfo = async () => {
    console.log(wines)
  }

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  } 

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input type="text" name="nombre" value={input.nombre} onChange={handleChange} />
        <br />
        <label>Año</label>
        <input type="text" name="anio" value={input.anio} onChange={handleChange} />
        <br />
        <label>Tipo</label>
        <input type="text" name="tipo" value={input.tipo} onChange={handleChange} />
        <br />
        <button>Enviar</button>
      </form>
      <button type="button" onClick={setInfo}>Set info</button>
      <button type="button" onClick={getInfo}>Get info</button>

      {
        wines?.map(wine => (
          <p>{wine.nombre}</p>
        ))
      }
    </>
  )
}
