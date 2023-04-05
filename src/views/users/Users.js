import React, { useState, useEffect, Fragment } from 'react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { CTable } from '@coreui/react';
import { Link } from 'react-router-dom';

const Users = () => {

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
          key: 'lastname',
          label: 'Apelldio',
          _props: { scope: 'col' },
        },
        {
          key: 'dni',
          label: 'DNI',
          _props: { scope: 'col' },
        },
        {
          key: 'user',
          label: 'Cuenta',
          _props: { scope: 'col' },
        },
        {
          key: 'state',
          label: 'Estado',
          _props: { scope: 'col' },
        },
        {
          key: 'action',
          label: 'Acciones',
          _props: { scope: 'col' },
        }
    ]


    useEffect(() => {
        let rows = [];

        [1,2,3,4].map( item => {
            rows.push({
                id: item,
                name: 'Haderson',
                lastname: 'Bullon',
                dni: '24213122',
                user: 'hbullon',
                state: 'activo',
                _cellProps: { id: { scope: 'row' } },
            });
        })

        setItems(rows);

    }, [])
    

    return (
    <Fragment>
        <div className='row'>
            <div className='col-12 mb-4'>
                <Link to="/users/create" className='btn btn-sm btn-primary float-end'>
                    <CIcon icon={icon.cilPlus} title='Crear nuevo usuario'/> 
                </Link>
            </div>
        </div>
        <div className='row'>
            <div className='col-12'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Listado de usuarios</h5>
                        <CTable columns={columns} items={items} />
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Users;
