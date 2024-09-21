import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import DataTable from 'react-data-table-component-footer';
import EclipseComponent from '../loader/EclipseComponent';

import config from '../../config/config.json';
import { fetchData } from 'src/helpers/helpers';

export const DatatableComponent = ({ url, columns, items, setItems, footer }) => {

    const [ page,    setPage ]    = useState(1);
    const [ perPage, setPerPage ] = useState(10);
    const [ total,   setTotal ]   = useState(0);
    const [ order,   setOrder ]   = useState('id');
    const [ sort,    setSort ]    = useState('desc');

    const navigate = useNavigate();
    const loading    = useSelector((state) => state.loading);

    useEffect(() => {
        if(url){
            gettingData();
        }
    }, [ url ])
     
    useEffect(() => {
        if(page){
            gettingData();
        }
    }, [page, perPage, sort]);

    const gettingData = async () => {

        if(url){
        
            const base = `${url}&page=${page}&per_page=${perPage}&order=${order}&sort=${sort}`;
            const response = await fetchData(base, 'GET');
            
            setItems(response.data.items);
            setTotal(response.data.totalItems);
        }
    }

    const handlePageChange = (newPage) => {
        
        setPage(newPage);

        const queryParams = new URLSearchParams(url);

        queryParams.set('page', newPage);
        queryParams.set('per_page', perPage);

        const splitUrl = queryParams.toString().split('%3F');

        navigate(`?${splitUrl[1]}`);
    }

    const handlePerRowsChange = (newPerPage) => {

        setPerPage(newPerPage);

        const queryParams = new URLSearchParams(url);
        queryParams.set('per_page', newPerPage);

        //Remove string before ? on url
        const splitUrl = queryParams.toString().split('%3F');

        navigate(`?${splitUrl[1]}`);
    }

    const handleSortChange = async (column, sortDirection) => { 
        setOrder(column.sortField);
        setSort(sortDirection);
    }

    return (
        <DataTable 
            columns={ columns }
            data={items}
            pagination
            sortServer
            paginationServer
            progressPending={ loading }
            paginationPerPage={ perPage }
            paginationTotalRows={ total }
            onSort={ handleSortChange }
            onChangePage={ handlePageChange }
            onChangeRowsPerPage={ handlePerRowsChange }
            progressComponent={ <EclipseComponent/> }
            footer={ footer }
            paginationComponentOptions={ config.paginationComponentOptions }
            noDataComponent={"No hay datos para mostrar"}
        />
    )
}
