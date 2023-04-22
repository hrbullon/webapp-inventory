import { Fragment } from 'react';
import Moment from 'moment';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

const { formatNumber } = require("src/helpers/helpers");

export const headerOptions = [
    {
        name:"code",
        prompt:"Nro Control",
        width: 30
    },
    {
        name:"name",
        prompt:"Cliente",
        width: 70
    },
    {
        name:"date",
        prompt:"Fecha",
        width: 30
    },
    {
        name:"description",
        prompt:"Descripcion",
        width: 40
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

export const columns = [
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
        selector: row => Moment(row.date).format('DD/MM/YYYY'),
    },
    {
        name: 'Tasa cambio.',
        sortable:true,
        right: true,
        selector: row => formatNumber(row.exchange_amount),
    },
    {
        name: 'Monto $US',
        sortable:true,
        right: true,
        selector: row => formatNumber(row.total_amount),
    },
    {
        name: 'Monto Bs.',
        sortable:true,
        right: true,
        selector: row => formatNumber(row.total_amount_converted)
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
        selector: row => {
            return (<Fragment>
                <button onClick={ (e) => handleShowSale(row)  } className='btn btn-sm btn-info m-1'>
                    <CIcon icon={ icon.cilShortText }/>
                </button>
                { row.state === "Completada" &&
                <button onClick={ (e) => handleDeleteSale(row)  } className='btn btn-sm btn-danger'>
                    <CIcon icon={ icon.cilBackspace }/>
                </button>}
            </Fragment>)
        },
    },
];
