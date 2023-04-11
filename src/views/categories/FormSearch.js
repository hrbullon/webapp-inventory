import React from 'react'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';

export const FormSearch = ({ setCategories, rows }) => {

    const { register, handleSubmit, reset } = useForm();

    const handleFilter = (data) => {
       
        let filtered = rows
        .filter( item => {
            return item.name && item.name.toLowerCase().includes(data.name.toLowerCase()) })

        setCategories(filtered);
    }

    const handleReset = () => {
        reset({ name:'' });
        handleFilter({ name:'' });
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)}>
            <div className='row mt-4'>
                <div className='col-8'>
                    <input type="text" className='form-control' autocomplete='off' {...register("name") }  placeholder='Buscar por nombre'/>  
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