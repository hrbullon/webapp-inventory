import React, { useState, useEffect, Fragment } from 'react';

import Moment from 'moment';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { getAllSales } from 'src/services/salesServices';
import { Link } from 'react-router-dom';

export const Table = () => {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        const res = await getAllSales();
        setSales(res.sales);
    }

    return (
    <Fragment>
        <Link to="/sales/create" title='Registrar venta' className="btn btn-sm btn-primary float-end">
            <CIcon icon={icon.cilPlus}/> 
        </Link>
        <h5 className="card-title">Todas las ventas</h5>
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Nro Control</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    sales.map( (sale, index ) => { 
                        return (
                            <tr key={ sale.id }>
                                <td>{ index+1 }</td>
                                <td>{ sale.Customer.name }</td>
                                <td>{ sale.code }</td>
                                <td>{ Moment(sale.createdAt).format('DD/MM/YYYY') }</td>
                                <td>{ sale.total_amount }</td>
                                <td></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </Fragment>
  )
}
