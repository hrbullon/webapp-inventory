import React, { Fragment, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { CardProduct } from 'src/components/product/CardProduct';

import { FormSearch } from './FormSearch';
import { AuthContext } from 'src/context/AuthContext';

//Actions products
import { startGettingProducts } from '../../actions/product';
import { ADMIN_ROLE } from 'src/constants/variables';

const Products = () => {

    let { user } = useContext(AuthContext);

    const dispatch = useDispatch()
    const products = useSelector((state) => state.products);
  
    useEffect(() => { dispatch( startGettingProducts() )  }, []);

    return (
        <Fragment>
            { user.role == ADMIN_ROLE &&
            <div className='row'>
                <div className='col-12'>
                    <Link to="/products/create" className='btn btn-sm btn-primary float-end'>
                        <CIcon icon={icon.cilPlus} title='Crear nuevo producto'/> 
                    </Link>
                </div>
            </div>}

            <FormSearch/>
            
            <div className='row'>
                { products && products.map( product => <CardProduct key={product.id} product={product}/>) }
            </div>
        </Fragment>
    )
}

export default Products
