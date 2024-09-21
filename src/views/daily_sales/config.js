import { Fragment } from "react";
import { Link } from "react-router-dom";

import moment from "moment";

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { formatCurrency, formatNumber, getTotalByColum } from "src/helpers/helpers";

export const formDefault = {
    checkout_register:'',
    user:'',
    start_date:'',
    end_date:'',
}

export const headerOptions = [
    'Fecha', 'Cant. Ventas', 'Monto inicial',
    'T. Venta','Cambio','Ingresos','Salidas',
    'Cobrado','Efec. Final','Vendedor','Caja'
];

export const getFooterSummary = (items) => {

    const count_sales = getTotalByColum(items,'count_sales');
    const total_amount_sales = getTotalByColum(items,'total_amount_sales');
    const total_amount_real_sale = getTotalByColum(items,'real_total_sale');

    if(count_sales && total_amount_sales && total_amount_real_sale){

        return {
            user: 'C. ventas',
            count_sales: formatNumber( count_sales ),
            total_amount_cash_starting: 'Total ventas',
            total_amount_sales: formatCurrency( total_amount_sales ),
            total_amount_out_cash: 'Total cobrada',
            real_total_sale: formatCurrency( total_amount_real_sale ),
        };
    }
}

export const getColums = ( ) => {

    const columns = [
        {
            name: 'Caja',
            sortable:true,
            right: true,
            sortField: "checkout_register",
            selector: row => (row.checkout),
        },
        {
            name: 'Fecha',
            sortable:true,
            sortField: "date",
            selector: row => row.date? moment(row.date).format('DD/MM/YYYY') : ""
        },
        {
            name: 'Usuario',
            sortable:true,
            right: true,
            sortField: "user_id",
            selector: row => (row.user),
        },
        {   
            name: 'Cantidad Ventas',
            sortable:true,
            right: true,
            sortField: 'count_sales',
            selector: row => (row.count_sales),
        },
        {
            name: 'Monto Inicial $US (Efec.)',
            sortable:true,
            right: true,
            sortField: 'total_amount_cash_starting',
            selector: row => (row.total_amount_cash_starting),
        },
        {
            name: 'Monto Ventas (Total) $US',
            sortable:true,
            right: true,
            sortField: 'total_amount_sales',
            selector: row => (row.total_amount_sales),
        },
        {
            name: 'Monto Cambio/Vueltos $US',
            sortable:true,
            right: true,
            sortField: 'total_amount_change',
            selector: row => (row.total_amount_change),
        },
        {
            name: 'Ingreso Caja $US',
            sortable:true,
            right: true,
            sortField: 'total_amount_in_cash',
            selector: row => (row.total_amount_in_cash),
        },
        {
            name: 'Salida Caja $US',
            sortable:true,
            right: true,
            sortField: 'total_amount_out_cash',
            selector: row => (row.total_amount_out_cash),
        },
        {
            name: 'Monto Venta (Cobrado) $US',
            sortable:true,
            right: true,
            sortField: 'real_total_sale',
            selector: row => (row.real_total_sale),
        },
        {
            name: 'Monto Final $US (Efec.)',
            sortable:true,
            right: true,
            sortField: 'total_amount_cash_ending',
            selector: row => (row.total_amount_cash_ending),
        },
        {
            name: 'Acciones',
            sortable:false,
            right: true,
            selector: row => {
                return (
                    <Fragment>
                        { row.checkout_session_id &&
                        <Link to={ `/daily_sales/${row.checkout_session_id}` } className='btn btn-sm btn-primary m-1'>
                            <CIcon icon={ icon.cilInfo }/>
                        </Link>}
                    </Fragment>
                )
            },
        }
    ];

    return columns;
}

export const getDataExport = (data) => {
        
    let rows = data.map(({id, daily_sale_id, checkout_session_id,...rest}) => rest);

    const count_sales = getTotalByColum(rows,'count_sales');
    const total_amount_sales = getTotalByColum(rows,'total_amount_sales');
    const total_amount_real_sale = getTotalByColum(rows,'real_total_sale');

    let array = rows.map(obj => [
        moment(obj.date).format("DD-MM-YYYY"), 
        formatNumber(obj.count_sales), 
        formatNumber(obj.total_amount_cash_starting),
        formatNumber(obj.total_amount_sales),
        formatNumber(obj.total_amount_change),
        formatNumber(obj.total_amount_in_cash),
        formatNumber(obj.total_amount_out_cash),
        formatNumber(obj.real_total_sale),
        formatNumber(obj.total_amount_cash_ending),
        obj.user,
        obj.checkout,
    ]);

    array.push([
        "",
        formatNumber(count_sales),
        "",
        formatNumber(total_amount_sales),
        "",
        "",
        "",
        formatNumber(total_amount_real_sale),
    ]);    

    return array;
}