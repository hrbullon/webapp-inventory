import React, { Fragment, useState, useEffect }from 'react';

import DataTable from 'react-data-table-component';

import config from '../../../config/config.json';

import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from 'src/components/loader/EclipseComponent';

import { getAllSalesMonth, getAllSalesToday } from 'src/services/salesServices';
import { formatCurrency, formatNumber } from 'src/helpers/helpers';
import { CWidgetStatsB } from '@coreui/react';

export const Table = ({ type, title, fileName }) => {

    const [loading, setLoading] = useState(false);
    const [sales, setSales] = useState([]);
    const [copies, setCopies] = useState([]);

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [aveExchange, setAveExchange] = useState(0);
    const [bestSeller, setBestSeller] = useState({
        description: "",
        quantity:0
    });

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
            prompt:"Precio $US",
            align:"right"
        },
        {
            name:"subtotal_amount",
            prompt:"Subtotal $US",
            align:"right"
        },
        {
            name:"price_converted",
            prompt:"Precio Bs.",
            align:"right"
        },
        {
            name:"subtotal_amount_converted",
            prompt:"Subtotal Bs.",
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
            name: 'Precio $US',
            sortable:true,
            right: true,
            selector: row => row.price,
        },
        {
            name: 'Subtotal $US',
            sortable:true,
            right: true,
            selector: row => row.subtotal_amount,
        },
        {
            name: 'Precio Bs.',
            sortable:true,
            right: true,
            selector: row => row.price_converted,
        },
        {
            name: 'Subtotal Bs.',
            sortable:true,
            right: true,
            selector: row => row.subtotal_amount_converted,
        },
    ];

    useEffect(() => {
        fetchSaleDetails();
    }, []);

    
    const totalize = (sales) => {

        let totalQuantity = 0;
        let totalSales = 0;
        let totalExchanges = 0;
        
        sales.map( item => {

            totalQuantity += Number(item.quantity);
            totalExchanges += Number(item.Sale.exchange_amount);
            totalSales += Number(item.subtotal_amount);

            let average = (totalExchanges/sales.length);
            setAveExchange(average);
        });

        setTotalSales(totalSales);
        setTotalQuantity(totalQuantity);
    }

    const getBestSeller = (sales) => {

        const totals = sales.reduce((acc, cur) => {
            acc[cur.description] = (acc[cur.description] || 0) + Number(cur.quantity);
            return acc;
        }, {});

        const items = []; 
        
        Object.keys(totals).map( item => {
            items.push({
                description: item,
                quantity: totals[item]
            })
        })

        if(items.length > 0 ){
            const maxQuantityItem = items.reduce((prev, curr) => {
                return (curr.quantity > prev.quantity) ? curr : prev;
            });
    
            setBestSeller({
                description: maxQuantityItem.description,
                quantity: maxQuantityItem.quantity
            });
        }
        
    }

    const fetchSaleDetails = async () => {

        setLoading(true);

        let res;
        
        if(type == "today"){
            res = await getAllSalesToday();
        }
        
        if(type == "month"){
            res = await getAllSalesMonth();
        }
        
        totalize(res.sales);
        getBestSeller(res.sales);

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
                code_product: item.code? item.code.toString() : "S/I",
                description: item.description,
                quantity: item.quantity,
                exchange_amount: formatNumber(item.Sale.exchange_amount),
                price: formatNumber(item.price),
                subtotal_amount: formatNumber(item.subtotal_amount),
                price_converted: formatNumber(item.price_converted),
                subtotal_amount_converted: formatNumber(item.subtotal_amount_converted)
            };

            rows.push(row);
        });

        return rows;
    }

    return (
    <Fragment>
        <h5 className="card-title">{ title }</h5>
        
        <div className='row mt-5 justify-content-end'>
            <div className='col-3'>
                <CWidgetStatsB
                    className="mb-3"
                    progress={{ color: 'success', value: 100 }}
                    text="Mas vendido"
                    title={ bestSeller.description }
                    value={ bestSeller.quantity }
                />
            </div>
            <div className='col-3'>
                <CWidgetStatsB
                    className="mb-3"
                    progress={{ color: 'success', value: 100 }}
                    text="Productos vendidos"
                    title="Total productos"
                    value={ totalQuantity }
                />
            </div>
            <div className='col-3'>
                <CWidgetStatsB
                    className="mb-3"
                    progress={{ color: 'success', value: 100 }}
                    text="Monto acumulado"
                    title="Total de ventas"
                    value={ formatCurrency(totalSales) }
                />
            </div>
            <div className='col-3'>
                <CWidgetStatsB
                    className="mb-3"
                    progress={{ color: 'info', value: 100 }}
                    text="Tasa de cambio promedio"
                    title="Tasa de cambio"
                    value={ formatCurrency(aveExchange, true) }
                />
            </div>
        </div>

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
            noDataComponent={"No hay datos para mostrar"} />

        
    </Fragment>
  )
}
