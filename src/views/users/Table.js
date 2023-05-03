import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import DataTable from 'react-data-table-component';

import config from '../../config/config.json';
import { getColumns } from './table-config';

import { Link } from 'react-router-dom';

import EclipseComponent from 'src/components/loader/EclipseComponent';

import { FormSearch } from './FormSearch';
import { startDeletingUser } from 'src/actions/users';

export const Table = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const users = useSelector((state) => state.users);
    
    const handleChangeStateUser = async user => dispatch( startDeletingUser(user) )

    return (
    <Fragment>
        <Link to="/users/create" title='Registrar nuevo usuario' className="btn btn-sm btn-primary float-end">
            <CIcon icon={icon.cilPlus}/> 
        </Link>

        <h5 className="card-title">Listado de usuarios</h5>
        
        <FormSearch/>

        <DataTable 
            columns={ getColumns(handleChangeStateUser) }
            data={users}
            progressPending={ loading }
            progressComponent={ <EclipseComponent/> }
            paginationComponentOptions={ config.paginationComponentOptions }
            noDataComponent={"No hay datos para mostrar"}/>
        
    </Fragment>
  )
}
