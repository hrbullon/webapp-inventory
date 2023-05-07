import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';


import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { Link } from 'react-router-dom';

import { formatCurrency } from 'src/helpers/helpers';
import { AuthContext } from 'src/context/AuthContext';

import { startDeletingProduct } from 'src/actions/product';

export const CardProduct = ({ product }) => {

  const dispatch = useDispatch();
  let { user } = useContext(AuthContext);

  const handleDelete = (product) => dispatch( startDeletingProduct(product) );

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
                { user.role == "ADM_ROLE" && 
                <div class="d-grid gap-2">
                  <button onClick={ (e) => handleDelete(product) } className='btn btn-danger btn-block' title='Eliminar producto'>
                    <CIcon icon={ icon.cilTrash }/>
                  </button>
                </div>}
            </div>
        </div>
    </div>
  )
}
