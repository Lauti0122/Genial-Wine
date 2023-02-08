import React from 'react';
import { Container, ContImage } from './WineCardStyle';
import { Link } from 'react-router-dom';
import { cartAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export function WineCard({ id, name, price, country, region, type, grape_type, capacity, images, year, key }) {

  const dispatch = useDispatch();

  const addToCart = (id) => {

    dispatch(cartAction(id, "ADD_TO_CART"));
  }

  return (
    <Container>
      <Link to={`/wine/${id}`} style={{ color:'black' }}>
        <ContImage>
          <img src={images[0]} alt="" width="160px" height="180px" />
        </ContImage>
        <h4>{name}</h4>
        <p>Price: ${price}</p>
        <span>Country: {country}, {region}</span>
        <p>Type: {type}</p>
        {/* <p>Grape Type:</p>
        {grape_type.map((gt, i) => {
          return (
            <div key={i}>
              {`${gt}`}
            </div>
          )
        })} */}
        <p>Year: {year}</p>
      </Link>
        <button type="button" onClick={() => addToCart(id)}>Add to cart</button>
    </Container>
  )
}
