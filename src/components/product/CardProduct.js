import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from 'src/helpers/helpers';

export const CardProduct = ({ product }) => {

  return (
    <div className='col-4 mt-4'>
        <div className="card">
            <img src={ product.image } height={250} className="card-img-top" alt={product.name}/>
            <div className="card-body">
                <Link to={`/products/update/${product.id}`}><b>{ product.name }</b></Link><br/>
                <b>{ formatCurrency(product.price) }</b><br/>
                <small>{ product.description }</small>
            </div>
        </div>
    </div>
  )
}
