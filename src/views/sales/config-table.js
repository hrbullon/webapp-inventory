import { Fragment } from "react";

import moment from "moment";
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { CBadge } from "@coreui/react";


export const getColums = ( firstCb, secondCb ) => {

    const columns = [
        {
            name: 'Nro Control',
            sortable:true,
            selector: row => row.code,
        },
        {
            name: 'Cliente',
            sortable:true,
            selector: row => row.name,
        },
        {
            name: 'Fecha',
            sortable:true,
            selector: row => row.date ? moment(row.date).format('DD/MM/YYYY') : "",
        },
        {
            name: 'Tasa cambio.',
            sortable:true,
            right: true,
            selector: row => (row.exchange_amount),
        },
        {
            name: 'Monto $US',
            sortable:true,
            right: true,
            selector: row => (row.total_amount),
        },
        {
            name: 'Monto Bs.',
            sortable:true,
            right: true,
            selector: row => (row.total_amount_converted)
        },
        {
            name: 'Estado',
            sortable:true,
            right: true,
            selector: row => <CBadge color={ row.state == "Completada" ? "success" : "danger" }>{ row.state }</CBadge>
        },
        {
            name: 'Accion',
            right: true,
            selector: (row, key) => {
                return (<Fragment>
                    { row.id &&
                    <button onClick={ (e) => firstCb(row)  } className='btn btn-sm btn-info m-1'>
                        <CIcon icon={ icon.cilShortText }/>
                    </button>}
                    { row.state === "Completada" &&
                    <button onClick={ (e) => secondCb(row)  } className='btn btn-sm btn-danger'>
                        <CIcon icon={ icon.cilBackspace }/>
                    </button>}
                </Fragment>)
            },
        }
    ];

    return columns;
}

export const headerOptions = [
    {
        name:"code",
        prompt:"Nro Control",
        width: 20
    },
    {
        name:"name",
        prompt:"Cliente",
        width: 50
    },
    {
        name:"date",
        prompt:"Fecha",
        width: 30
    },
    {
        name:"description",
        prompt:"Descripcion",
        width: 60
    },
    {
        name:"exchange_amount",
        prompt:"Tasa cambio",
        align:"center",
        width: 20
    },
    {
        name:"total_amount",
        prompt:"Monto $US.",
        align:"center",
        width: 30
    },
    {
        name:"total_amount_converted",
        prompt:"Monto Bs.",
        align:"center",
        width: 30
    },
    {
        name:"state",
        prompt:"Estado",
        align:"center",
        width: 20
    },
];