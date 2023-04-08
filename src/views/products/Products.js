import React, { Fragment, useState, useEffect  } from 'react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { CardProduct } from 'src/components/product/CardProduct';
import { getAllProducts } from 'src/services/productsServices';
import { Link } from 'react-router-dom';
import { FormSearch } from './FormSearch';

const Products = () => {
  
    const [copies, setCopies] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await getAllProducts();
        setCopies(res.products);
        setProducts(res.products);
    }

    return (
        <Fragment>
            <div className='row'>
                <div className='col-12'>
                    <Link to="/products/create" className='btn btn-sm btn-primary float-end'>
                        <CIcon icon={icon.cilPlus} title='Crear nuevo producto'/> 
                    </Link>
                </div>
            </div>

            <FormSearch setProducts={ setProducts } rows={ copies }/>

            <div className='row'>
                { products.map( product => <CardProduct key={product.id} product={product}/>) }
            </div>
        </Fragment>
    )
}

export default Products
