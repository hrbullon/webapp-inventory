import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'react-data-table-component';

import config from '../../config/config.json';
import { getColumns } from "./config-table";

import EclipseComponent from 'src/components/loader/EclipseComponent';
import { FormSearch } from './FormSearch';

//Exchanges actions
import { startGettingExchanges } from 'src/actions/exchange';

export const Table = ({ setExchange }) => {

    const dispatch = useDispatch();
    const exchanges = useSelector((state) => state.exchanges);
    const columns = getColumns( setExchange );

    useEffect( () => {
        dispatch( startGettingExchanges() );
    }, []);

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Listado de tasas de cambio</h5>
                
                <FormSearch/>    

                <DataTable 
                    columns={columns}
                    data={exchanges}
                    progressComponent={ <EclipseComponent/> }
                    paginationComponentOptions={ config.paginationComponentOptions }
                    noDataComponent={"No hay datos para mostrar"}/>  
            </div>
        </div>
    )
}
