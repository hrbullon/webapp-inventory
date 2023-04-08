import React, { useState, useEffect, Fragment } from 'react';

import swal from 'sweetalert';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import DataTable from 'react-data-table-component';

import config from '../../config/config.json';

import { Link } from 'react-router-dom';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import { FormSearch } from './FormSearch';
import EclipseComponent from 'src/components/loader/EclipseComponent';

import { deleteCustomer, getAllCustomers } from 'src/services/customersServices';

export const Table = () => {

    const [loading, setLoading] = useState(false);
    const [copies, setCopies] = useState([]);
    const [customers, setCustomers] = useState([]);

    const headerOptions = [
        {
            name:"dni",
            prompt:"DNI"
        },
        {
            name:"name",
            prompt:"Nombre"
        },
        {
            name:"phone",
            prompt:"Teléfono"
        },
        {
            name:"email",
            prompt:"Correo"
        }
    ];

    const columns = [
        {
            name: 'DNI',
            sortable:true,
            selector: row => row.dni,
        },
        {
            name: 'Nombre',
            sortable:true,
            selector: row => row.name,
        },
        {
            name: 'Teléfono',
            sortable:true,
            selector: row => row.phone,
        },
        {
            name: 'Correo',
            sortable:true,
            selector: row => row.email,
        },
        {
            name: 'Acciones',
            sortable:false,
            right: true,
            selector: row => {
                return (
                    <Fragment>
                        <Link to={ `/customers/update/${row.id}` } className='btn btn-sm btn-primary m-1'>
                            <CIcon icon={ icon.cilPencil }/>
                        </Link>
                        <button onClick={ (e) => handleDeleteCustomer(row) } className='btn btn-sm btn-danger'>
                            <CIcon icon={ icon.cilDelete }/>
                        </button>
                    </Fragment>
                )
            },
        }

    ];

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        const res = await getAllCustomers();
        setCopies(res.customers);
        setCustomers(res.customers);
        setLoading(false);

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

        <ButtonsExport 
            data={ customers } 
            headerOptions={ headerOptions } 
            title="Listado de clientes" 
            fileName="Reporte de clientes"/>

        <FormSearch setCustomers={ setCustomers } rows={copies}/>    
        
        <DataTable 
            columns={columns}
            data={customers}
            progressPending={ loading }
            progressComponent={ <EclipseComponent/> }
            paginationComponentOptions={ config.paginationComponentOptions }
            noDataComponent={"No hay datos para mostrar"}/>
        
    </Fragment>
  )
}
