import React, { useState, useEffect, Fragment } from 'react';

import swal from 'sweetalert';
import Moment from 'moment';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import DataTable from 'react-data-table-component-footer';

import { 
    CBadge,
    CModal, 
    CModalBody, 
    CModalFooter, 
    CModalHeader, 
    CModalTitle } 
from '@coreui/react';

import { Link } from 'react-router-dom';

import config from '../../config/config.json';
import { headerOptions } from './config-table';
import { getDataExport, getTotal, prepareList } from './selector';

import { deletePurchase, getAllPurchases } from 'src/services/purchasesServices';

import { Document } from 'src/components/report/Document';
import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from '../../components/loader/EclipseComponent';

import { confirmDelete, formatNumber } from 'src/helpers/helpers';

export const Table = () => {

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [purchase, setPurchase] = useState({});
    const [purchases, setPurchases] = useState([]);
    const [copies, setCopies] = useState([]);

    const [totalPurchases, setTotalPurchases] = useState({
        total:0,
        totalConverted:0,
    });

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
            selector: row => row.date? Moment(row.date).format('DD/MM/YYYY') : "",
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
                            <button onClick={ (e) => handleShowPurchase(row)  } className='btn btn-sm btn-info m-1'>
                                <CIcon icon={ icon.cilShortText }/>
                            </button>}
                            { row.state === "Completada" &&
                            <button onClick={ (e) => handleDeletePurchase(row)  } className='btn btn-sm btn-danger'>
                                <CIcon icon={ icon.cilBackspace }/>
                            </button>}
                        </Fragment>)
            },
        },
    ];

    useEffect(() => {
        fetchPurchases();
    }, []);


    const handleDeletePurchase = async (purchase) => {

        confirmDelete(`Quiere anular la compra: ${purchase.document}`, async () => {
            
            const deleted = await deletePurchase(purchase.id);
                
            if(deleted.purchase){
                swal(
                  'Compra anulada completada!',
                  'Se anuló la venta correctamente!',
                  'success'
                );
                fetchPurchases();
            }else{
                swal("Error","No se encontró la compra solicitada");
            }
        });
    }

    const handleShowPurchase = (purchase) => {
        setPurchase(purchase);
        setVisible(true);
    }

    const fetchPurchases = async () => {
        setLoading(true);
        const res = await getAllPurchases();
        const rows = prepareList(res.purchases);
        setPurchases(rows);
        setCopies(rows);
        setLoading(false);

        let newTotals = getTotal(res.purchases);
        setTotalPurchases({...totalPurchases, ...newTotals})
    }

    return (
    <Fragment>

        <Link to="/purchases/create" title='Registrar venta' className="btn btn-sm btn-primary float-end">
            <CIcon icon={icon.cilPlus}/> 
        </Link>
        <h5 className="card-title">Todas las compras</h5>

        <ButtonsExport 
            data={ getDataExport(purchases, totalPurchases.total, totalPurchases.totalConverted) } 
            headerOptions={ headerOptions } 
            title="Listado de compras" 
            fileName="Reporte-compras"/>

        <FormSearch setPurchases={ setPurchases } rows={copies}/>

        <DataTable 
            columns={columns}
            data={purchases}
            pagination={ true }
            progressPending={ loading }
            progressComponent={ <EclipseComponent/> }
            paginationComponentOptions={ config.paginationComponentOptions }
            noDataComponent={"No hay datos para mostrar"}
            footer={{
                exchange_amount: "Total compras",
                total_amount: formatNumber(totalPurchases.total),
                total_amount_converted: formatNumber(totalPurchases.totalConverted)
            }}
        />

        <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Detalles de Compra</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <Document data={ purchase } details={ purchase.PurchaseDetails } doc={ "purchase" }/>
            </CModalBody>
            <CModalFooter>
            </CModalFooter>
        </CModal>
    </Fragment>
  )
}
