import React, { Fragment, useState, useEffect }from 'react';

import DataTable from 'react-data-table-component-footer';

import config from '../../../config/config.json';
import { headerOptions, columns } from './config-table';

import { FormSearch } from './FormSearch';
import { BadgesTotal } from './BadgesTotal';

import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from 'src/components/loader/EclipseComponent';

import { getAllSalesMonth, getAllSalesToday } from 'src/services/salesServices';
import { formatNumber } from 'src/helpers/helpers';

import { getBestSeller, 
         getDataExport, 
         prepareList, 
         totalize } from './selector';

export const Table = ({ type, title, fileName }) => {

    const [loading, setLoading] = useState(false);
    const [sales, setSales] = useState([]);
    const [copies, setCopies] = useState([]);

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalSalesConverted, setTotalSalesConverted] = useState(0);
    const [aveExchange, setAveExchange] = useState(0);
    const [bestSeller, setBestSeller] = useState({
        description: "",
        quantity:0
    });

    useEffect(() => {
        fetchSaleDetails();
    }, []);
   
    const fetchSaleDetails = async () => {

        setLoading(true);

        let res;
        
        if(type == "today"){
            res = await getAllSalesToday();
        }
        
        if(type == "month"){
            res = await getAllSalesMonth();
        }
        
        const { average, totalSales, totalSalesConverted ,totalQuantity } = totalize(res.sales);

        setAveExchange(average);
        setTotalSales(totalSales);
        setTotalSalesConverted(totalSalesConverted);
        setTotalQuantity(totalQuantity);

        const { quantity, description } = getBestSeller(res.sales);

        setBestSeller({
            description: description,
            quantity: quantity
        });

        const rows = prepareList(res.sales);

        setSales(rows);
        setCopies(rows);
        setLoading(false);
    }

    return (
    <Fragment>
        <h5 className="card-title">{ title }</h5>
        
        <BadgesTotal
            bestSeller={ bestSeller } 
            totalSales={ totalSales } 
            aveExchange={ aveExchange }
            totalQuantity={ totalQuantity } />
        
        <ButtonsExport 
            data={ getDataExport(sales, totalSales, totalSalesConverted) } 
            headerOptions={ headerOptions } 
            title={ title } 
            fileName={ fileName }/>

        <FormSearch setSales={ setSales } rows={copies}/>

        <DataTable 
            columns={columns}
            data={sales}
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
