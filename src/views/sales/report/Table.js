import React, { Fragment, useState, useEffect }from 'react';
import { useSelector } from 'react-redux';

import DataTable from 'react-data-table-component-footer';

import config from '../../../config/config.json';
import { headerOptions, columns } from './config-table';

import { FormSearch } from './FormSearch';
import { BadgesTotal } from './BadgesTotal';

import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from 'src/components/loader/EclipseComponent';

import { formatNumber } from 'src/helpers/helpers';

import { getBestSeller, 
         getDataExport, 
         prepareList, 
         totalize } from './selector';

export const Table = ({ type, title, fileName }) => {

    const sales = useSelector((state) => state.salesDetails);
    const loading = useSelector((state) => state.loading);

    const [items, setItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalSalesConverted, setTotalSalesConverted] = useState(0);
    const [aveExchange, setAveExchange] = useState(0);
    const [bestSeller, setBestSeller] = useState({
        description: "",
        quantity:0
    });

    useEffect(() => {
    
      if(sales && sales !== undefined){

            const { average, totalSales, totalSalesConverted ,totalQuantity } = totalize(sales);

            setAveExchange(average);
            setTotalSales(totalSales);
            setTotalSalesConverted(totalSalesConverted);
            setTotalQuantity(totalQuantity);

            const { quantity, description } = getBestSeller(sales);

            setBestSeller({
                description: description,
                quantity: quantity
            });

            const rows = prepareList(sales);
            setItems(rows);
      }
    }, [sales])

    return (
    <Fragment>
        <h5 className="card-title">{ title }</h5>
        
        <BadgesTotal
            bestSeller={ bestSeller } 
            totalSales={ totalSales } 
            aveExchange={ aveExchange }
            totalQuantity={ totalQuantity } />
        
        <ButtonsExport 
            data={ getDataExport(items, totalSales, totalSalesConverted) } 
            headerOptions={ headerOptions } 
            title={ title } 
            fileName={ fileName }/>

        <FormSearch type={ type }/>

        <DataTable 
            columns={columns}
            data={items}
            progressPending={ loading }
            progressComponent={ <EclipseComponent/> }
            paginationComponentOptions={ config.paginationComponentOptions }
            footer={{
                price: "Total $US",
                subtotal_amount: formatNumber( totalSales ),
                price_converted: "Total Bs.",
                subtotal_amount_converted: formatNumber( totalSalesConverted )
            }}
            noDataComponent={"No hay datos para mostrar"}/>
    </Fragment>
  )
}
