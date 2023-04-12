import React from 'react'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';

export const FormSearch = ({ setExchanges, rows }) => {

    const { register, handleSubmit, reset } = useForm();

    const handleFilter = (data) => {
       
        let filtered = rows
        .filter( item => {
            return (item.description && item.description.toLowerCase().includes(data.search.toLowerCase()) &&
            item.date && item.date.toLowerCase().includes(data.date.toLowerCase())) ||
            item.amount && item.amount.toLowerCase().includes(data.search.toLowerCase()) &&
            item.date && item.date.toLowerCase().includes(data.date.toLowerCase())
        })
        
        setExchanges(filtered);
    }

    const handleReset = () => {
        reset({ search:'', date:'' });
        handleFilter({ search:'', date:'' });
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)}>
            <div className='row mt-4'>
                <div className='col-4'>
                    <input type="text" name='search' className='form-control' autoComplete='off' {...register("search") }  placeholder='Escriba para buscar...'/>  
                </div>
                <div className='col-4'>
                    <input type="date" name='date' className='form-control' autoComplete='off' {...register("date") }  placeholder='Buscar por fecha'/>  
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
