import React, { Fragment } from 'react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import DataTable from 'react-data-table-component';

import config from '../../config/config.json';

import { deleteCategory } from 'src/services/categoriesServices';
import EclipseComponent from 'src/components/loader/EclipseComponent';
import { FormSearch } from './FormSearch';

export const Table = ({ setCategory, categories, setCategories, data }) => {

    const columns = [
        {
            name: 'Nombre',
            sortable:true,
            selector: row => row.name,
        },
        {
            name: 'Acciones',
            sortable:true,
            selector: row => {
                return (
                    <Fragment>
                        <button onClick={ (e) => setCategory(row) } className='btn btn-sm btn-primary'>
                            <CIcon icon={ icon.cilPencil }/>
                        </button>
                        <button onClick={ (e) => handleDeleteCategory(row) } className='btn btn-sm btn-danger'>
                            <CIcon icon={ icon.cilDelete }/>
                        </button>
                    </Fragment>
                )
            },
        }
    ]

    const handleDeleteCategory = async (category) => {

        const res = await deleteCategory(category.id);
    
        if(res.category){
          const filtered = categories.filter( item => item.id !== category.id );
          setCategories(filtered);
          swal("Listo","Datos eliminados!!","success");
        }
    }
    
    return (

        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Listado de categorías</h5>
                
                <FormSearch setCategories={ setCategories } rows={data}/>    

                <DataTable 
                    columns={columns}
                    data={categories}
                    progressComponent={ <EclipseComponent/> }
                    paginationComponentOptions={ config.paginationComponentOptions }
                    noDataComponent={"No hay datos para mostrar"}/>  
            </div>
        </div>
    )
}
