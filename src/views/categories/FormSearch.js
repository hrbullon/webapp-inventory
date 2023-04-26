import React from 'react'
import { useDispatch } from 'react-redux'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';
import { startGettingCategory } from 'src/actions/category';

export const FormSearch = () => {

    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm();
    
    const handleFilter = (data) => {
        dispatch( startGettingCategory(data.name) );
    }

    const handleReset = () => {
        reset({ name:'' });
        handleFilter({ name:'' });
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)}>
            <div className='row mt-4'>
                <div className='col-8'>
                    <input type="text" className='form-control' autoComplete='off' {...register("name") }  placeholder='Buscar por nombre'/>  
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
