import React, { useState, useEffect, Fragment } from 'react';

import swal from 'sweetalert';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import config from '../../config/config.json';
import { headerOptions, columns } from './config-table';

import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from 'src/components/loader/EclipseComponent';

import { deleteCustomer, getAllCustomers } from 'src/services/customersServices';

export const Table = () => {

    const [loading, setLoading] = useState(false);
    const [copies, setCopies] = useState([]);
    const [customers, setCustomers] = useState([]);

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
            data={ customers.map(({id, address,...rest}) => rest) } 
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
