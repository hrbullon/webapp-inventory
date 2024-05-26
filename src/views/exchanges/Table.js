import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'

import DataTable from 'react-data-table-component';

import config from '../../config/config.json';
import { getColumns } from "./config-table";

import EclipseComponent from 'src/components/loader/EclipseComponent';
import { FormSearch } from './FormSearch';

import useExchanges from './useExchanges';

export const Table = () => {

    const { settingExchange, gettingExchanges } = useExchanges();

    const exchanges = useSelector((state) => state.exchanges);

    const columns = getColumns( settingExchange );

    useEffect( () => { gettingExchanges() }, []);

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
