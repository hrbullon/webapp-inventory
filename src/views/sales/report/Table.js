import React, { Fragment, useState, useEffect }from 'react';

import DataTable from 'react-data-table-component';

import config from '../../../config/config.json';

import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from 'src/components/loader/EclipseComponent';

import { getAllSalesMonth, getAllSalesToday } from 'src/services/salesServices';

export const Table = ({ type, title, fileName }) => {

    const [loading, setLoading] = useState(false);
    const [sales, setSales] = useState([]);
    const [copies, setCopies] = useState([]);

    const headerOptions = [
        {
            name:"code",
            prompt:"Nro. Venta"
        },
        {
            name:"code_product",
            prompt:"Código Producto"
        },
        {
            name:"description",
            prompt:"Descripción",
        },
        {
            name:"quantity",
            prompt:"Cantidad",
            align:"right"
        },
        {
            name:"exchange_amount",
            prompt:"Tasa cambio",
            align:"right"
        },
        {
            name:"price",
            prompt:"Precio",
            align:"right"
        },
        {
            name:"subtotal_amount",
            prompt:"Monto Bs.",
            align:"right"
        }
    ];

    const columns = [
        {
            name: 'Nro. Venta',
            sortable:true,
            selector: row => row.code,
        },
        {
            name: 'Código Producto',
            sortable:true,
            selector: row => row.code_product,
        },
        {
            name: 'Descripción',
            sortable:true,
            selector: row => row.description,
        },
        {
            name: 'Cantidad',
            sortable:true,
            right: true,
            selector: row => row.quantity,
        },
        {
            name: 'Tasa Cambio',
            sortable:true,
            right: true,
            selector: row => row.exchange_amount,
        },
        {
            name: 'Precio',
            sortable:true,
            right: true,
            selector: row => row.price,
        },
        {
            name: 'Subtotal',
            sortable:true,
            right: true,
            selector: row => row.subtotal_amount,
        },
    ];

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

        const rows = prepareList(res.sales);

        setSales(rows);
        setCopies(rows);
        setLoading(false);
    }

    const prepareList = data => {

        let rows = [];

        data.map( item => {

            const row = {
                code: item.Sale.code,
                code_product: item.code,
                description: item.description,
                quantity: item.quantity,
                exchange_amount: item.Sale.exchange_amount,
                price: item.price,
                subtotal_amount: item.subtotal_amount
            };

            rows.push(row);
        });

        return rows;
    }

    return (
    <Fragment>
        <h5 className="card-title">{ title }</h5>
        
        <ButtonsExport 
            data={ sales } 
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
            noDataComponent={"No hay datos para mostrar"}
        />
    </Fragment>
  )
}
