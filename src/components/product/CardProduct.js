import React from 'react';
import { Link } from 'react-router-dom';

export const CardProduct = ({ product }) => {

  return (
    <div className='col-4 mt-4'>
        <div className="card">
            <img src={ product.image }  className="card-img-top" alt="..."/>
            <div className="card-body">
                <Link to={`/products/update/${product.id}`}><b>{ product.name }</b></Link><br/>
                <b>{ product.code }</b><br/>
                <small>{ product.description }</small>
            </div>
        </div>
    </div>
  )
}
