import React from 'react';
import { useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';

//Actions product
import { startGettingProducts } from 'src/actions/product';

export const FormSearch = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    const handleFilter = (data) => { dispatch( startGettingProducts(data) )  }

    const handleReset = () => {
        reset({ search:'' });
        handleFilter({ search:'' });
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)}>
            <div className='row mt-4'>
                <div className='col-6'>
                    <input 
                        type="text" 
                        {...register("search") }  
                        className='form-control' 
                        autoComplete='autoComplete' 
                        placeholder='Buscar por codigo o descripción del producto'/>  
                </div>
                <div className='col'>
                    <button type='button' onClick={ handleReset } className='btn btn-secondary float-end mt-2 mb-2' title='Limpiar formulario'>
                        <CIcon icon={ icon.cilReload } /> 
                    </button>
                    <button type='submit' className='btn btn-primary float-end  mt-2 mb-2 m-2' title='Filtrar datos'>
                        <CIcon icon={ icon.cilFilter } /> 
                    </button>
                </div>
            </div>  
        </form>
    )
}
