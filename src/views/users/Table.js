import React, { useState, useEffect, Fragment } from 'react';

import swal from 'sweetalert';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import DataTable from 'react-data-table-component';

import config from '../../config/config.json';

import { Link } from 'react-router-dom';

import EclipseComponent from 'src/components/loader/EclipseComponent';

import { deleteUser, getAllUsers } from 'src/services/usersServices';
import { FormSearch } from './FormSearch';
import { CBadge } from '@coreui/react';

export const Table = () => {

    const [loading, setLoading] = useState(false);
    const [copies, setCopies] = useState([]);
    const [users, setUsers] = useState([]);

    const columns = [
        {
            name: 'DNI',
            sortable:true,
            selector: row => row.dni,
        },
        {
          name: 'Nombre',
          sortable:true,
          selector: row => row.firstname,
        },
        {
          name: 'Apellido',
          sortable:true,
          selector: row => row.lastname,
        },
        {
          name: 'Cuenta',
          sortable:true,
          selector: row => row.account,
        },
        {
          name: 'Estado',
          sortable:true,
          selector: row => <CBadge color={ row.state == "1" ? "success" : "danger" }>{ row.state == "1" ? "Activo" : "Inactivo" }</CBadge>
        },
        {
          name: 'Acciones',
          right: true,
          selector: row => {
            return (
                <Fragment>
                    <Link to={ `/users/update/${row.id}` } className='btn btn-sm btn-primary m-1' title="Editar usuario">
                        <CIcon icon={ icon.cilPencil }/>
                    </Link>
                    { row.state == "1" &&
                        <button onClick={ (e) => handleChangeStateUser(row) } className='btn btn-sm btn-danger' title="Desactivar usuario">
                            <CIcon icon={ icon.cilLockLocked }/>
                        </button>
                    }
                    { row.state == "0" &&
                        <button onClick={ (e) => handleChangeStateUser(row) } className='btn btn-sm btn-success' title="Activar usuario">
                            <CIcon icon={ icon.cilLockUnlocked }/>
                        </button>
                    }
                </Fragment>
            )
          },
        },
    ]

    useEffect(() => {
        fetchUsers();
    }, []);
    
    const fetchUsers = async () => {
        setLoading(true);
        const res = await getAllUsers();
        setCopies(res.users);
        setUsers(res.users);
        setLoading(false);
    }

    const handleChangeStateUser = async (user) => {
        
        const res = await deleteUser(user);
    
        if(res.user){
          fetchUsers();
          swal("Listo","Usuario desactivado!!","success");
        }
    }

    return (
    <Fragment>
        <Link to="/users/create" title='Registrar nuevo usuario' className="btn btn-sm btn-primary float-end">
            <CIcon icon={icon.cilPlus}/> 
        </Link>

        <h5 className="card-title">Listado de usuarios</h5>
        
        <FormSearch setUsers={ setUsers } rows={ copies }/>

        <DataTable 
            columns={columns}
            data={users}
            progressPending={ loading }
            progressComponent={ <EclipseComponent/> }
            paginationComponentOptions={ config.paginationComponentOptions }
            noDataComponent={"No hay datos para mostrar"}/>
        
    </Fragment>
  )
}
