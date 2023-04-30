import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import config from '../../config/config.json';
import { headerOptions, columns } from './config-table';

import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from 'src/components/loader/EclipseComponent';

//Actions customers
import { startGettingCustomers } from '../../actions/customer';

export const Table = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const customers = useSelector((state) => state.customers);

    useEffect(() => {
        dispatch( startGettingCustomers() );
    }, []);
    
    return (
    <Fragment>
        <Link to="/customers/create" title='Registrar nuevo cliente' className="btn btn-sm btn-primary float-end">
            <CIcon icon={icon.cilPlus}/> 
        </Link>

        <h5 className="card-title">Listado de clientes</h5>

        { customers && 
            <ButtonsExport 
                data={ customers.map(({id, address,...rest}) => rest) } 
                headerOptions={ headerOptions } 
                title="Listado de clientes" 
                fileName="Reporte de clientes"/>
        }

        <FormSearch/>    
        
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
