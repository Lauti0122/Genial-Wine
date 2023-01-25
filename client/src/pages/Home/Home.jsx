import React, { useState, useEffect } from 'react'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'
import { auth, db } from "../../firebase";
import { v4 as uuid } from "uuid";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, postUser } from "../../redux/actions";


export  function Home() {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [ loginInfo, setLoginInfo ] = useState({});

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
  
  useEffect(() => {
    dispatch(getUsers());
    onAuthStateChanged(auth, (user) => {
      let fullname = user?.displayName.split(" ");
      setLoginInfo({
        name: fullname[0],
        lastname: fullname[1],
        email: user.email,
        photo: user.photoURL
      })
    })
  }, [])

  useEffect(() => {
    if (loginInfo.hasOwnProperty("name")) {
      const userFound = users?.find(u => u.email === loginInfo.email);
      if (!userFound) dispatch(postUser(loginInfo));
    }
  }, [loginInfo])
  

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
