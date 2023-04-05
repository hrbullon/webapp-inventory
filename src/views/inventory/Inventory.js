import React, { useState, useEffect } from 'react';

import { CTable } from '@coreui/react';
import { getAllProducts } from 'src/services/productsServices';

const Inventory = () => {

    const [ products, setProducts ] = useState([]);

    const columns = [
        {
          key: 'id',
          label: '#',
        },
        {
          key: 'name',
          label: 'Nombre',
        },
        {
          key: 'code',
          label: 'Codigo',
        },
        {
          key: 'quantity',
          label: 'Stock',
        },
        {
          key: 'price',
          label: 'Price',
        }
    ]

    useEffect(() => {
      fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await getAllProducts();
        setProducts(res.products);
    }
    
    return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Listado de existencia</h5>
            <CTable columns={columns} items={products} />
        </div>
    </div>
  )
}

export default Inventory;
