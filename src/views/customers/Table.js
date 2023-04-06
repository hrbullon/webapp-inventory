import React, { useState, useEffect, Fragment } from 'react';

import swal from 'sweetalert';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { Link } from 'react-router-dom';
import { deleteCustomer, getAllCustomers } from 'src/services/customersServices';

export const Table = () => {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const res = await getAllCustomers();
        setCustomers(res.customers);
    }

    const handleDeleteCustomer = async (customer) => {
        const res = await deleteCustomer(customer.id);
    
        if(res.customer){
          const filtered = customers.filter( item => item.id !== customer.id );
          setCustomers(filtered);
          swal("Listo","Datos eliminados!!","success");
        }
    }

    return (
    <Fragment>
        <Link to="/customers/create" title='Registrar nuevo cliente' className="btn btn-sm btn-primary float-end">
            <CIcon icon={icon.cilPlus}/> 
        </Link>
        <h5 className="card-title">Listado de clientes</h5>
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    customers.map( (customer, index ) => { 
                        return (
                            <tr key={ customer.id }>
                                <td>{ index+1 }</td>
                                <td>{ customer.dni }</td>
                                <td>{ customer.name }</td>
                                <td>{ customer.phone }</td>
                                <td>{ customer.email }</td>
                                <td>
                                    <Link to={ `/customers/update/${customer.id}` } className='btn btn-sm btn-primary m-1'>
                                        <CIcon icon={ icon.cilPencil }/>
                                    </Link>
                                    <button onClick={ (e) => handleDeleteCustomer(customer) } className='btn btn-sm btn-danger'>
                                        <CIcon icon={ icon.cilDelete }/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </Fragment>
  )
}
