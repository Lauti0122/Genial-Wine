import React from 'react';
import { Container } from './WineCardStyle';
import { Link } from 'react-router-dom';

export function WineCard({ id, name, price, country, region, type, grape_type, capacity, images, year }) {
  return (
    <Container>
      <Link to={`/wine/${id}`}>
        <img src={images[0]} alt="" width="160px" height="180px" />
        <h4>{name}</h4>
        <p>Price: {price} USD</p>
        <p>Country: {country}</p>
        <p>Region: {region}</p>
        <p>Type: {type}</p>
        <p>Grape Type:</p>
        {grape_type.map((gt, i) => {
          return (
            <div key={i}>
              {`${gt}`}
            </div>
          )
        })}
        <p>Capacity: {capacity}</p>
        <p>Year: {year}</p>

      </Link>

    </Container>
  )
}
