
import { Fragment } from 'react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { CBadge } from '@coreui/react';
import { Link } from 'react-router-dom';

export const getColumns = (callback) => {

    return [
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
                        <button onClick={ (e) => callback(row) } className='btn btn-sm btn-danger' title="Desactivar usuario">
                            <CIcon icon={ icon.cilLockLocked }/>
                        </button>
                    }
                    { row.state == "0" &&
                        <button onClick={ (e) => callback(row) } className='btn btn-sm btn-success' title="Activar usuario">
                            <CIcon icon={ icon.cilLockUnlocked }/>
                        </button>
                    }
                </Fragment>
            )
          },
        },
    ]
    
}