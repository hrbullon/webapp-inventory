import React, { useState, useEffect, Fragment } from 'react';

import Moment from 'moment';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import DataTable from 'react-data-table-component';

import { 
    CModal, 
    CModalBody, 
    CModalFooter, 
    CModalHeader, 
    CModalTitle } 
from '@coreui/react';

import { Link } from 'react-router-dom';

import config from '../../config/config.json';

import { getAllSales } from 'src/services/salesServices';

import { View } from './View';
import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from '../../components/loader/EclipseComponent';

import { formatCurrency } from 'src/helpers/helpers';

export const Table = () => {

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [sale, setSale] = useState({});
    const [sales, setSales] = useState([]);
    const [copies, setCopies] = useState([]);

    const headerOptions = [
        {
            name:"name",
            prompt:"Cliente"
        },
        {
            name:"code",
            prompt:"Nro Control"
        },
        {
            name:"date",
            prompt:"Fecha",
        },
        {
            name:"exchange_amount",
            prompt:"Tasa cambio",
            align:"right"
        },
        {
            name:"total_amount",
            prompt:"Monto Bs.",
            align:"right"
        },
        {
            name:"total_amount_converted",
            prompt:"Monto $US.",
            align:"right"
        },
    ];

    const columns = [
        {
            name: 'Cliente',
            sortable:true,
            selector: row => row.name,
        },
        {
            name: 'Nro Control',
            sortable:true,
            selector: row => row.code,
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
            selector: row => formatCurrency(row.exchange_amount,true),
        },
        {
            name: 'Monto',
            sortable:true,
            right: true,
            selector: row => formatCurrency(row.total_amount, true),
        },
        {
            name: 'Monto',
            sortable:true,
            right: true,
            selector: row => formatCurrency(row.total_amount_converted)
        },
        {
            name: 'Accion',
            right: true,
            selector: row => {
                return (<button onClick={ (e) => handleShowSale(row)  } className='btn btn-sm btn-info'>
                            <CIcon icon={ icon.cilShortText }/>
                        </button>)
            },
        },
    ];

    useEffect(() => {
        fetchSales();
    }, []);

    const handleShowSale = (sale) => {
        setSale(sale);
        setVisible(true);
    }

    const fetchSales = async () => {
        setLoading(true);
        const res = await getAllSales();
        const rows = prepareList(res.sales);
        setSales(rows);
        setCopies(rows);
        setLoading(false);
    }

    const prepareList = data => {

        let rows = [];

        data.map( sale => {

            const row = {
                name: sale.Customer.name,
                code: sale.code,
                date: sale.date,
                Customer: sale.Customer,
                SaleDetails: sale.SaleDetails,
                exchange_amount: sale.exchange_amount,
                total_amount: sale.total_amount,
                total_amount_converted: sale.total_amount_converted,
            };

            rows.push(row);
        });

        return rows;
    }

    return (
    <Fragment>

        <Link to="/sales/create" title='Registrar venta' className="btn btn-sm btn-primary float-end">
            <CIcon icon={icon.cilPlus}/> 
        </Link>
        <h5 className="card-title">Todas las ventas</h5>

        <ButtonsExport 
            data={ sales } 
            headerOptions={ headerOptions } 
            title="Listado de Ventas" 
            fileName="Reporte-ventas"/>

        <FormSearch setSales={ setSales } rows={copies}/>

        <DataTable 
            columns={columns}
            data={sales}
            pagination={ true }
            progressPending={ loading }
            progressComponent={ <EclipseComponent/> }
            paginationComponentOptions={ config.paginationComponentOptions }
            noDataComponent={"No hay datos para mostrar"}
        />

        <CModal size="lg" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Detalles de Venta</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <View data={ sale }/>
            </CModalBody>
            <CModalFooter>
            </CModalFooter>
        </CModal>
    </Fragment>
  )
}
