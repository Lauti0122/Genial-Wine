import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getWineByID } from '../../redux/actions';

export  function WineDetail() {

    const {id} = useParams();
    const dispatch = useDispatch();
    const wine = useSelector(state => state.wine);

    useEffect(() => {
            dispatch(getWineByID(id))
    }, [dispatch, id])
    

  return (
    <>
    <img src={wine.images} alt={wine.name} />
    <div>{ wine.name }</div>
    <div>{ wine.description }</div>
    </>
  )
}
