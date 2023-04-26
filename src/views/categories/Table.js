import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import DataTable from 'react-data-table-component';

import config from '../../config/config.json';

import EclipseComponent from 'src/components/loader/EclipseComponent';
import { FormSearch } from './FormSearch';

//Actions Category
import { startGettingCategory } from 'src/actions/category';

export const Table = () => {

    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories);
    
    useEffect( () => {
        dispatch( startGettingCategory() );
    }, []);
    
    const columns = [
        {
            name: 'Nombre',
            sortable:true,
            selector: row => row.name,
        },
        {
            name: 'Acciones',
            sortable:true,
            right: true,
            selector: row => {
                return (
                    <Fragment>
                        <button onClick={ (e) => dispatch({ type: "set", category: {...row } }) } className='btn btn-sm btn-primary m-2'>
                            <CIcon icon={ icon.cilPencil }/>
                        </button>
                    </Fragment>
                )
            },
        }
    ]
    
    return (

        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Listado de categorías</h5>
                
                <FormSearch/>    

                <DataTable 
                    columns={columns}
                    data={categories}
                    pagination={ true }
                    progressComponent={ <EclipseComponent/> }
                    paginationComponentOptions={ config.paginationComponentOptions }
                    noDataComponent={"No hay datos para mostrar"}/>  
            </div>
        </div>
    )
}
