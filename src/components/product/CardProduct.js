import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from 'src/helpers/helpers';
import { AuthContext } from 'src/context/AuthContext';

export const CardProduct = ({ product }) => {

  let { user } = useContext(AuthContext);

  return (
    <div className='col-4 mt-4'>
        <div className="card">
            <img src={ product.image } height={250} className="card-img-top" alt={product.name}/>
            <div className="card-body">
                { user.role == "ADM_ROLE" &&
                <Link to={`/products/update/${product.id}`}>
                  <b>{ product.name }</b>
                </Link>}
                { user.role !== "ADM_ROLE" && 
                  <b>{ product.name }</b>
                }<br/>
                <b>{ formatCurrency(product.price) }</b><br/>
                <small>{ product.description }</small>
            </div>
        </div>
    </div>
  )
}
