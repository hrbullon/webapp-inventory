import React, { useState, useEffect } from 'react';

import { CTable } from '@coreui/react';

const Inventory = () => {

    const [items, setItems] = useState([]);
    const columns = [
        {
          key: 'id',
          label: '#',
          _props: { scope: 'col' },
        },
        {
          key: 'name',
          label: 'Nombre',
          _props: { scope: 'col' },
        },
        {
          key: 'code',
          label: 'Codigo',
          _props: { scope: 'col' },
        },
        {
          key: 'quantity',
          label: 'Stock',
          _props: { scope: 'col' },
        },
        {
          key: 'price',
          label: 'Price',
          _props: { scope: 'col' },
        }
    ]


    useEffect(() => {
        let rows = [];

        [1,2,3,4,5,6,7,8,9,10].map( item => {
            rows.push({
                id: item,
                name: 'Mouse',
                code: '00002',
                quantity: '24',
                price: '10',
                _cellProps: { id: { scope: 'row' } },
            });
        })

        setItems(rows);

    }, [])
    

    return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Listado de existencia</h5>
            <CTable columns={columns} items={items} />
        </div>
    </div>
  )
}

export default Inventory;
