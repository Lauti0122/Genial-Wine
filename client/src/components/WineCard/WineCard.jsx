import React from 'react';
import { Container } from './WineCardStyle';

export  function WineCard({id,name,price,country,region,type,grape_type,capacity,images,year}) {
  return (
    <Container>

            <img src={images[0]} alt="" width="250px" height="250px" />
            <h4>{name}</h4>
            <h4>Price: {price} USD</h4>
            <h4>Country: {country}</h4>
            <h4>Region: {region}</h4>
            <h4>Type: {type}</h4>
            <h4>Grape Type:</h4>
            {grape_type.map ((gt, i) =>{
                return (
                    <div key={i}>
                       {`${gt}`}
                    </div>
                )
            })}
              
            
            <h4>Capacity: {capacity}</h4>
            <h4>Year: {year}</h4>



    </Container>
  )
}
