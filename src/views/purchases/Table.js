import React, { useState, useEffect, Fragment } from 'react';

import swal from 'sweetalert';
import Moment from 'moment';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import DataTable from 'react-data-table-component';

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

import { deletePurchase, getAllPurchases } from 'src/services/purchasesServices';

import { Document } from 'src/components/report/Document';
import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from '../../components/loader/EclipseComponent';

import { formatCurrency, formatNumber } from 'src/helpers/helpers';

export const Table = () => {

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [purchase, setPurchase] = useState({});
    const [purchases, setPurchases] = useState([]);
    const [copies, setCopies] = useState([]);

    const headerOptions = [
        {
            name:"id",
            prompt:"Nro"
        },
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
        {
            name:"state",
            prompt:"Estado",
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
            selector: row => formatNumber(row.total_amount),
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
            selector: row => {
                return (<Fragment>
                            <button onClick={ (e) => handleShowPurchase(row)  } className='btn btn-sm btn-info m-1'>
                                <CIcon icon={ icon.cilShortText }/>
                            </button>
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

        swal({
            title: 'Estás seguro?',
            text: `Quiere anular la compra: ${purchase.document}`,
            icon: 'warning',
            dangerMode: true,
            buttons: {
                cancel: {
                  text: "Cancelar",
                  value: null,
                  visible: true,
                  closeModal: true,
                },
                confirm: {
                  text: "Anular",
                  value: true,
                  visible: true,
                  closeModal: true
                }
            }
          }).then( async (result) => {
            if (result) {
                const deleted = await deletePurchase(purchase.id);
                
                if(deleted.purchase){
                    swal(
                      'Compra anulada completada!',
                      'Se anuló la compra correctamente!',
                      'success'
                    );
                    fetchPurchases();
                }else{
                    swal("Error","No se encontró la compra solicitada");
                }
            }
          })
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
    }

    const prepareList = data => {

        let rows = [];

        data.map( purchase => {

            const row = {
                id: purchase.id.toString(),
                code: purchase.code,
                document: purchase.document,
                description: purchase.description,
                date: purchase.date,
                PurchaseDetails: purchase.PurchaseDetails,
                exchange_amount: purchase.exchange_amount,
                total_amount: purchase.total_amount,
                total_amount_converted: purchase.total_amount_converted,
                state: purchase.state == "1"? "Completada" : "Anulada"
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
                <Document data={ purchase } details={ purchase.PurchaseDetails } doc={ "purchase" }/>
            </CModalBody>
            <CModalFooter>
            </CModalFooter>
        </CModal>
    </Fragment>
  )
}
