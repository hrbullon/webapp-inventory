import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'react-data-table-component-footer';
import { Link } from 'react-router-dom';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import config from '../../config/config.json';
import { getColums, headerOptions } from './config-table';

import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from '../../components/loader/EclipseComponent';

import { formatNumber } from 'src/helpers/helpers';
import { getDataExport, getTotal, prepareList } from './selector';
import { startDeletingSale } from 'src/actions/sales';
import { ViewModal } from 'src/components/modal/ViewModal';

export const Table = () => {

    const dispatch = useDispatch();
    const sales = useSelector((state) => state.sales);
    const loading = useSelector((state) => state.loading);

    const [visible, setVisible] = useState(false);
    const [sale, setSale] = useState({});
    const [items, setItems] = useState([]);

    const [totalSales, setTotalSales] = useState({
        total:0,
        totalConverted:0,
    });

    useEffect(() => {
      if(sales && sales !== undefined){
        const rows = prepareList(sales);
        setItems(rows);

        let newTotals = getTotal(sales);
        setTotalSales({...totalSales, ...newTotals})
        
      }
    }, [sales])
    

    const handleDeleteSale = async sale => dispatch( startDeletingSale(sale) );

    const handleShowSale = (sale) => {
        setSale(sale);
        setVisible(true);
    }

    return (
    <Fragment>

        <Link to="/sales/create" title='Registrar venta' className="btn btn-sm btn-primary float-end">
            <CIcon icon={icon.cilPlus}/> 
        </Link>
        <h5 className="card-title">Todas las ventas</h5>

        <ButtonsExport 
            data={ getDataExport(items, totalSales.total, totalSales.totalConverted) } 
            headerOptions={ headerOptions } 
            title="Listado de Ventas" 
            fileName="Reporte-ventas"/>

        <FormSearch/>

        <DataTable 
            columns={ getColums( handleShowSale, handleDeleteSale ) }
            data={items}
            progressPending={ loading }
            progressComponent={ <EclipseComponent/> }
            paginationComponentOptions={ config.paginationComponentOptions }
            footer={{
                exchange_amount: "Total ventas",
                total_amount: formatNumber(totalSales.total),
                total_amount_converted: formatNumber(totalSales.totalConverted)
            }}
            noDataComponent={"No hay datos para mostrar"}/>
        
        <ViewModal 
            visible={ visible }
            setVisible={ setVisible }
            title="Detalles de Venta" 
            data={ sale } 
            details={ sale.SaleDetails } 
            doc={ "sale" }/>    
    </Fragment>
  )
}
