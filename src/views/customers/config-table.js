import { Fragment } from "react";
import { Link } from "react-router-dom";

import CIcon from "@coreui/icons-react";
import * as icon from '@coreui/icons';

export const headerOptions = [
    {
        name:"dni",
        prompt:"Cédula/RIF",
        width: 40
    },
    {
        name:"name",
        prompt:"Nombre",
        width: 100
    },
    {
        name:"phone",
        prompt:"Teléfono",
        width: 60
    },
    {
        name:"email",
        prompt:"Correo",
        width: 60
    }
];

export const columns = [
    {
        name: 'CED/RIF',
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
                </Fragment>
            )
        },
    }

];