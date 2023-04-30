import { Fragment } from 'react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { formatCurrency } from "src/helpers/helpers"

export const getColumns = ( callback ) => {

    const config = [
        {
            name: 'Desccripción',
            sortable:true,
            selector: row => row.description,
        },
        {
            name: 'Fecha',
            sortable:true,
            selector: row => row.date,
        },
        {
            name: 'Monto',
            sortable:true,
            selector: row => formatCurrency(row.amount, true),
        },
        {
            name: 'Acciones',
            sortable:true,
            right: true,
            selector: row => {
                return (
                    <Fragment>
                        <button onClick={ (e) => callback(row) } className='btn btn-sm btn-primary m-2'>
                            <CIcon icon={ icon.cilPencil }/>
                        </button>
                    </Fragment>
                )
            },
        }
    ]

    return config;
}

