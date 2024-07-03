import { Fragment } from "react";

import moment from "moment";
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { Link } from "react-router-dom";

export const getColums = ( ) => {

    const columns = [
        {
            name: 'Caja',
            sortable:true,
            right: true,
            selector: row => (row.checkout_name),
        },
        {
            name: 'Usuario',
            sortable:true,
            right: true,
            selector: row => (row.user_fullname),
        },
        {
            name: 'Fecha',
            sortable:true,
            selector: row => row.date ? moment(row.date).format('DD/MM/YYYY') : "",
        },
        {
            name: 'Cantidad Ventas',
            sortable:true,
            right: true,
            selector: row => (row.count_sales),
        },
        {
            name: 'Monto Inicial $US (Efec.)',
            sortable:true,
            right: true,
            selector: row => (row.total_amount_cash_starting),
        },
        {
            name: 'Monto Total Ventas $US',
            sortable:true,
            right: true,
            selector: row => (row.total_amount_sales),
        },
        {
            name: 'Monto Cambio/Vueltos $US',
            sortable:true,
            right: true,
            selector: row => (row.total_amount_change),
        },
        {
            name: 'Ingreso Caja $US',
            sortable:true,
            right: true,
            selector: row => (row.total_amount_in_cash),
        },
        {
            name: 'Salida Caja $US',
            sortable:true,
            right: true,
            selector: row => (row.total_amount_out_cash),
        },
        {
            name: 'Monto Real Venta $US',
            sortable:true,
            right: true,
            selector: row => (row.real_total_sale),
        },
        {
            name: 'Monto Final $US (Efec.)',
            sortable:true,
            right: true,
            selector: row => (row.real_total_sale),
        },
        {
            name: 'Acciones',
            sortable:false,
            right: true,
            selector: row => {
                return (
                    <Fragment>
                        <Link to={ `/daily_sales/${row.checkout_session_id}` } className='btn btn-sm btn-primary m-1'>
                            <CIcon icon={ icon.cilInfo }/>
                        </Link>
                    </Fragment>
                )
            },
        }
    ];

    return columns;
}

export const headerOptions = [
    {
        name: 'checkout',
        prompt: 'Caja',
        width: 20
    },
    {
        name:'date',
        prompt: 'Fecha',
        width: 20
    },
    {
        name: 'Cantidad Ventas',
        prompt: '',
        width: 30
    },
    {
        name: 'Monto Inicial $US (Efec.)',
        sortable:true,
        right: true,
        selector: row => (row.total_amount_cash_starting),
    },
    {
        name: 'Monto Total Ventas $US',
        sortable:true,
        right: true,
        selector: row => (row.total_amount_sales),
    },
    {
        name: 'Monto Cambio/Vueltos $US',
        sortable:true,
        right: true,
        selector: row => (row.total_amount_change),
    },
    {
        name: 'Ingreso Caja $US',
        sortable:true,
        right: true,
        selector: row => (row.total_amount_in_cash),
    },
    {
        name: 'Salida Caja $US',
        sortable:true,
        right: true,
        selector: row => (row.total_amount_out_cash),
    },
    {
        name: 'Monto Real Venta $US',
        sortable:true,
        right: true,
        selector: row => (row.real_total_sale),
    },
    {
        name: 'Monto Final $US (Efec.)',
        sortable:true,
        right: true,
        selector: row => (row.real_total_sale),
    },
];