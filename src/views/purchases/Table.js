import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import DataTable from 'react-data-table-component-footer';

import { Link } from 'react-router-dom';

import config from '../../config/config.json';
import { getColumns, headerOptions } from './config-table';
import { getDataExport, getTotal, prepareList } from './selector';

import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from '../../components/loader/EclipseComponent';

import { formatNumber } from 'src/helpers/helpers';
import { startDeletingPurchase } from 'src/actions/purchase';
import { ViewModal } from 'src/components/modal/ViewModal';

export const Table = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading );
    const purchases = useSelector((state) => state.purchases );

    const [items, setItems] = useState({});
    const [visible, setVisible] = useState(false);
    const [purchase, setPurchase] = useState({});

    const [totalPurchases, setTotalPurchases] = useState({
        total:0,
        totalConverted:0,
    });

    useEffect(() => {
       if(purchases && purchases !== undefined){
            const rows = prepareList(purchases);
            setItems(rows);
            
            let newTotals = getTotal(purchases);
            setTotalPurchases({...totalPurchases, ...newTotals})
       }
    }, [purchases]);

    const handleDeletePurchase = async purchase => dispatch( startDeletingPurchase(purchase) )

    const handleShowPurchase = (purchase) => {
        setPurchase(purchase);
        setVisible(true);
    }

    return (
    <Fragment>

        <Link to="/purchases/create" title='Registrar venta' className="btn btn-sm btn-primary float-end">
            <CIcon icon={icon.cilPlus}/> 
        </Link>
        <h5 className="card-title">Todas las compras</h5>

        <ButtonsExport 
            data={ getDataExport(items, totalPurchases.total, totalPurchases.totalConverted) } 
            headerOptions={ headerOptions } 
            title="Listado de compras" 
            fileName="Reporte-compras"/>

        <FormSearch/>

        <DataTable 
            columns={ getColumns( handleShowPurchase, handleDeletePurchase) }
            data={items}
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

        <ViewModal 
            visible={ visible }
            setVisible={ setVisible }
            title="Detalles de Compra" 
            data={ purchase } 
            details={ purchase.PurchaseDetails } 
            doc={ "purchase" }/>
    </Fragment>
  )
}
