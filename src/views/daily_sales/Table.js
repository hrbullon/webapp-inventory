import { Fragment, useEffect, useState } from "react"

import config from '../../config/config.json';

import DataTable from "react-data-table-component-footer";
import EclipseComponent from "src/components/loader/EclipseComponent";

import { useDispatch, useSelector } from "react-redux";
import { startGettingDailySales } from "src/actions/daily_sales";
import { parseDailySalesData } from "./dailySalesParser";
import { getColums } from "./config-table";

export const Table = ({ title, today = null }) => { 

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const dailySales = useSelector((state) => state.dailySales);

    const [items, setItems] = useState([])

    useEffect(() => {
      dispatch( startGettingDailySales() );
    }, []);

    useEffect(() => {

        if(dailySales){
            const parsedData = parseDailySalesData( dailySales );
            setItems(parsedData);
        }

    }, [dailySales])

    return (
        <Fragment>
        <DataTable 
            columns={ getColums() }
            data={items}
            progressPending={ loading }
            progressComponent={ <EclipseComponent/> }
            paginationComponentOptions={ config.paginationComponentOptions }
            noDataComponent={"No hay datos para mostrar"}/>
        </Fragment>
    )
}