import React, {useEffect, useState} from 'react';
import { getAllWines } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { WineCard } from '../../components/WineCard';
import { ContainerWine, Container } from './Wines.Style';
export  function Wines() {

  const dispatch = useDispatch();
  const wines = useSelector(state => state.wines)
  
  useEffect(() => {
    dispatch(getAllWines())
   
  }, [dispatch])
  
  return (
    <Container>
      {wines.map(wine=>{
        return (
          <ContainerWine>
          <WineCard
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
      })}
    </Container>
  )
}
