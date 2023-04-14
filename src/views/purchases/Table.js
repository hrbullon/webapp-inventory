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

import { getAllPurchases } from 'src/services/purchasesServices';

import { Document } from 'src/components/report/Document';
import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from '../../components/loader/EclipseComponent';

import { formatCurrency } from 'src/helpers/helpers';

export const Table = () => {

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [purchase, setPurchase] = useState({});
    const [purchases, setPurchases] = useState([]);
    const [copies, setCopies] = useState([]);

    const headerOptions = [
        {
            name:"code",
            prompt:"Nro Control"
        },
        {
            name:"document",
            prompt:"Nro Fact/Doc"
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
            selector: row => Moment(row.date).format('DD/MM/YYYY'),
        },
        {
            name: 'Tasa cambio.',
            sortable:true,
            right: true,
            selector: row => formatCurrency(row.exchange_amount,true),
        },
        {
            name: 'Monto $US',
            sortable:true,
            right: true,
            selector: row => formatCurrency(row.total_amount, true),
        },
        {
            name: 'Monto Bs.',
            sortable:true,
            right: true,
            selector: row => formatCurrency(row.total_amount_converted)
        },
        {
            name: 'Accion',
            right: true,
            selector: row => {
                return (<button onClick={ (e) => handleShowPurchase(row)  } className='btn btn-sm btn-info'>
                            <CIcon icon={ icon.cilShortText }/>
                        </button>)
            },
        },
    ];

    useEffect(() => {
        fetchSales();
    }, []);

    const handleShowPurchase = (purchase) => {
        setPurchase(purchase);
        setVisible(true);
    }

    const fetchSales = async () => {
        setLoading(true);
        const res = await getAllPurchases();
        const rows = prepareList(res.purchases);
        setPurchases(rows);
        setCopies(rows);
        setLoading(false);
    }

    const prepareList = data => {

        let rows = [];

        data.map( purchase => {

            const row = {
                code: purchase.code,
                document: purchase.document,
                date: purchase.date,
                PurchaseDetails: purchase.PurchaseDetails,
                exchange_amount: purchase.exchange_amount,
                total_amount: purchase.total_amount,
                total_amount_converted: purchase.total_amount_converted,
            };

            rows.push(row);
        });

        return rows;
    }

    return (
    <Fragment>

        <Link to="/purchases/create" title='Registrar venta' className="btn btn-sm btn-primary float-end">
            <CIcon icon={icon.cilPlus}/> 
        </Link>
        <h5 className="card-title">Todas las compras</h5>

        <ButtonsExport 
            data={ purchases } 
            headerOptions={ headerOptions } 
            title="Listado de Ventas" 
            fileName="Reporte-ventas"/>

        <FormSearch setPurchases={ setPurchases } rows={copies}/>

        <DataTable 
            columns={columns}
            data={purchases}
            pagination={ true }
            progressPending={ loading }
            progressComponent={ <EclipseComponent/> }
            paginationComponentOptions={ config.paginationComponentOptions }
            noDataComponent={"No hay datos para mostrar"}
        />

        <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Detalles de Compra</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <Document data={ purchase } details={ purchase.PurchaseDetails }/>
            </CModalBody>
            <CModalFooter>
            </CModalFooter>
        </CModal>
    </Fragment>
  )
}
