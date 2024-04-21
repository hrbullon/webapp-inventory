import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { ADMIN_ROLE } from "../../constants/variables";
import { formatCurrency } from 'src/helpers/helpers';
import { AuthContext } from 'src/context/AuthContext';

import { Image } from './Image';
import { ButtonRemove } from './ButtonRemove';

export const CardProduct = ({ product }) => {

  let { user } = useContext(AuthContext);

  return (
    <div className='col-4 mt-4'>
        <div className="card">
            
            <Image name={ product.name } url={ product.image }/>
            
            <div className="card-body">

                { user.role === ADMIN_ROLE ? (
                  
                  <Link to={`/products/update/${product.id}`}>
                    <b>{product.name}</b>
                  </Link>

                ) : (
                  <b>{product.name}</b>
                )}

                <br/>
                
                <b>{ formatCurrency(product.price) }</b><br/>
                
                <small>{ product.description }</small>

                { user.role == ADMIN_ROLE && 
                  
                  <div className="d-grid gap-2">
                    <ButtonRemove product={ product }/>
                  </div>
                }
            </div>
        </div>
    </div>
  )
}
