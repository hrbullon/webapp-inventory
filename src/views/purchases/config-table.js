import moment from "moment";
import CIcon from "@coreui/icons-react";
import * as icon from '@coreui/icons';

import { CBadge } from "@coreui/react";
import { Fragment } from "react";

export const headerOptions = [
    {
        name:"code",
        prompt:"Nro Control",
        width: 30
    },
    {
        name:"document",
        prompt:"Nro Fact/Doc",
        width: 30
    },
    {
        name:"date",
        prompt:"Fecha",
        width: 30
    },
    {
        name:"description",
        prompt:"Descripción",
        width: 60
    },
    {
        name:"exchange_amount",
        prompt:"Tasa cambio",
        align:"right",
        width: 30
    },
    {
        name:"total_amount",
        prompt:"Monto Bs.",
        align:"right",
        width: 30
    },
    {
        name:"total_amount_converted",
        prompt:"Monto $US.",
        align:"right",
        width: 30
    },
    {
        name:"state",
        prompt:"Estado",
        align:"right",
        width: 30
    },
];

export const getColumns = (firstCb, secondCb) => {
    const columns = [
        {
            name: 'Nro Control',
            sortable:true,
            selector: row => row.code,
        },
        {
            name: 'Nro Fact/Doc',
            sortable:true,
            selector: row => row.document,
        },
        {
            name: 'Fecha',
            sortable:true,
            selector: row => row.date? moment(row.date).format('DD/MM/YYYY') : "",
        },
        {
            name: 'Tasa cambio.',
            sortable:true,
            right: true,
            selector: row => row.exchange_amount,
        },
        {
            name: 'Monto $US',
            sortable:true,
            right: true,
            selector: row => row.total_amount,
        },
        {
            name: 'Monto Bs.',
            sortable:true,
            right: true,
            selector: row => row.total_amount_converted
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
        },
    ];

    return columns;
}