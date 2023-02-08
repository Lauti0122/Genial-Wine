import React, {useEffect, useState} from 'react';
import { filterWines, getAllWines, orderWines } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { WineCard } from '../../components/WineCard';
import { ContainerWine, Container } from './Wines.Style';

const grapes = ["Malbec", "Cabernet Franc", "Merlot", "Petit Verdot", "Oporto", "Chardonnay", "Sauvignon Blanc", "Viognier", "Gewürztraminer", "Blend"]

export  function Wines() {

  const dispatch = useDispatch();
  const wines = useSelector(state => state.wines)
  const [byType, setByType] = useState("");
  const [byGrape, setByGrape] = useState("");
  const [name, setName] = useState("");

  const handleFilterByType = (e) => {
    setByType(e.target.value)
    dispatch(filterWines(e.target.value, byGrape, null));
  }

  const handleFilterByGrape = (e) => {
    setByGrape(e.target.value);
    dispatch(filterWines(byType, e.target.value, null));
  }

  const handleOrder = (e) => {
    dispatch(orderWines(e.target.value));
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
    dispatch(filterWines(byType, byGrape, e.target.value));
  }

  useEffect(() => {
    dispatch(getAllWines())
  }, [dispatch])
  
  return (
    <>
      <div style={{ display: "flex"}}>
      <label>Filter by Type </label>
        <select name="byType" value={byType} onChange={handleFilterByType}>
          <option disabled value="">Type</option>
          <option value="all">All</option>
          <option value="red">Red</option>
          <option value="white">White</option>
          <option value="rose">Rose</option>
        </select>
        <label style={{ marginLeft: 12 }}>Filter by Grape </label>
        <select name="byGrape" value={byGrape} onChange={handleFilterByGrape}>
          <option disabled value="">Grape</option>
          <option value="all">All</option>
          {
            grapes.map(grape => (
              <option value={grape} key={grape}>{grape}</option>
            ))
          }
        </select>
        <label style={{ marginLeft: 12}}>Order</label>
        <select name="order" onChange={handleOrder}>
          <option disabled value="">Order wines</option>
          <option value="low">Low Price</option>
          <option value="high">High Price</option>
        </select>
        <input style={{ marginLeft: 42}} type="text" value={name} placeholder="Search by name..." onChange={handleChangeName} />
      </div>
      <p>Quantity of wines {wines.length}</p>
      <Container>
        {
          wines.length > 0 
          ? wines.map(wine=>{
            return (
              <ContainerWine key={wine.id}>
                <WineCard
                  id={wine.id}
                  name={wine.name}
                  price={wine.price}
                  country={wine.country}
                  region={wine.region}
                  type={wine.type}
                  grape_type={wine.grape_type}
                  description={wine.description}
                  capacity={wine.capacity}
                  year={wine.year}
                  images={wine.images}
                />
              </ContainerWine>
            )
          })
        : <p>Not wines availables</p>
        }
      </Container>
    </>
  )
}
