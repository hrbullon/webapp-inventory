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

import { deleteSale, getAllSales } from 'src/services/salesServices';

import { Document } from 'src/components/report/Document';
import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from '../../components/loader/EclipseComponent';

import { formatCurrency, formatNumber } from 'src/helpers/helpers';

export const Table = () => {

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [sale, setSale] = useState({});
    const [sales, setSales] = useState([]);
    const [copies, setCopies] = useState([]);

    const headerOptions = [
        {
            name:"id",
            prompt:"Nro"
        },
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
            prompt:"Monto $US.",
            align:"right"
        },
        {
            name:"total_amount_converted",
            prompt:"Monto Bs.",
            align:"right"
        },
        {
            name:"state",
            prompt:"Estado",
            align:"center"
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

    useEffect(() => {
        fetchSales();
    }, []);

    const handleDeleteSale = async (sale) => {

        swal({
            title: 'Estás seguro?',
            text: `Quiere anular la venta: ${sale.code}`,
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
                const deleted = await deleteSale(sale.id);
                
                if(deleted.sale){
                    swal(
                      'Venta anulada completada!',
                      'Se anuló la venta correctamente!',
                      'success'
                    );
                    fetchSales();
                }else{
                    swal("Error","No se encontró la venta solicitada");
                }
            }
          })
    }

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
                id: sale.id.toString(),
                name: sale.Customer.name,
                code: sale.code,
                date: sale.date,
                Customer: sale.Customer,
                SaleDetails: sale.SaleDetails,
                exchange_amount: sale.exchange_amount,
                total_amount: sale.total_amount,
                total_amount_converted: sale.total_amount_converted,
                state: sale.state == "1"? "Completada" : "Anulada"
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

        <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Detalles de Venta</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <Document data={ sale } details={ sale.SaleDetails } doc={ "sale" }/>
            </CModalBody>
            <CModalFooter>
            </CModalFooter>
        </CModal>
    </Fragment>
  )
}
