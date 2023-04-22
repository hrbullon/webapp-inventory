import React, { useState, useEffect, Fragment } from 'react';

import Moment from 'moment';
import swal from 'sweetalert';
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

import { deleteSale, getAllSales } from 'src/services/salesServices';

import { Document } from 'src/components/report/Document';
import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from '../../components/loader/EclipseComponent';

import { confirmDelete, formatNumber } from 'src/helpers/helpers';
import { getDataExport, getTotal, prepareList } from './selector';

export const Table = () => {

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [sale, setSale] = useState({});
    const [sales, setSales] = useState([]);
    const [copies, setCopies] = useState([]);

    const [totalSales, setTotalSales] = useState({
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
            name: 'Cliente',
            sortable:true,
            selector: row => row.name,
        },
        {
            name: 'Fecha',
            sortable:true,
            selector: row => row.date ? Moment(row.date).format('DD/MM/YYYY') : "",
        },
        {
            name: 'Tasa cambio.',
            sortable:true,
            right: true,
            selector: row => (row.exchange_amount),
        },
        {
            name: 'Monto $US',
            sortable:true,
            right: true,
            selector: row => (row.total_amount),
        },
        {
            name: 'Monto Bs.',
            sortable:true,
            right: true,
            selector: row => (row.total_amount_converted)
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
                    { key == 0  &&
                    <button onClick={ (e) => handleShowSale(row)  } className='btn btn-sm btn-info m-1'>
                        <CIcon icon={ icon.cilShortText }/>
                    </button>}
                    { row.state === "Completada" &&
                    <button onClick={ (e) => handleDeleteSale(row)  } className='btn btn-sm btn-danger'>
                        <CIcon icon={ icon.cilBackspace }/>
                    </button>}
                </Fragment>)
            },
        }
    ];

    useEffect(() => {
        fetchSales();
    }, []);

    const handleDeleteSale = async (sale) => {

        confirmDelete(`Quiere anular la venta: ${sale.code}`, async () => {
            
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
        });
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

        let newTotals = getTotal(res.sales);
        setTotalSales({...totalSales, ...newTotals})
    }

    return (
    <Fragment>

        <Link to="/sales/create" title='Registrar venta' className="btn btn-sm btn-primary float-end">
            <CIcon icon={icon.cilPlus}/> 
        </Link>
        <h5 className="card-title">Todas las ventas</h5>

        <ButtonsExport 
            data={ getDataExport(sales, totalSales.total, totalSales.totalConverted) } 
            headerOptions={ headerOptions } 
            title="Listado de Ventas" 
            fileName="Reporte-ventas"/>

        <FormSearch setSales={ setSales } rows={copies}/>

        <DataTable 
            columns={columns}
            data={sales}
            progressPending={ loading }
            progressComponent={ <EclipseComponent/> }
            paginationComponentOptions={ config.paginationComponentOptions }
            footer={{
                exchange_amount: "Total ventas",
                total_amount: formatNumber(totalSales.total),
                total_amount_converted: formatNumber(totalSales.totalConverted)
            }}
            noDataComponent={"No hay datos para mostrar"}/>

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
