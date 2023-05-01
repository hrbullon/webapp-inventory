import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';
import { startGettingSales } from 'src/actions/sales';

export const FormSearch = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit, getValues, reset } = useForm({});

    useEffect(() => { dispatch( startGettingSales(getValues()) ) }, [])

    const handleFilter = async data => dispatch( startGettingSales(data) )

    const handleReset = () => {
        reset({
            customer:'',
            code:'',
            start_date:'',
            end_date:''
        });

        handleFilter({
            customer:'',
            code:'',
            start_date:'',
            end_date:''
        })
    }

    return (
    <form onSubmit={handleSubmit(handleFilter)}>
        <div className='row mt-4'>
            <div className='col-3'>
                <input type="text" className='form-control' autoComplete='off' {...register("code") } placeholder='Buscar por nro de control'/>  
            </div>
            <div className='col-3'>
                <input type="text" className='form-control' autoComplete='off' {...register("customer") }  placeholder='Buscar por cliente'/>  
            </div>
            <div className='col-3'>
                <input type="date" className='form-control' autoComplete='off' {...register("start_date") } placeholder='Buscar por fecha desde'/>  
            </div>
            <div className='col-3'>
                <input type="date" className='form-control' autoComplete='off' {...register("end_date") } placeholder='Buscar por fecha hasta'/>  
            </div>
            <div className='col'>
                <button type='button' onClick={ handleReset } className='btn btn-secondary float-end mt-2 mb-2' title='Limpiar formulario'>
                    <CIcon icon={ icon.cilReload } /> 
                </button>
                <button type='submit' className='btn btn-primary float-end mt-2 mb-2 m-2' title='Filtrar datos'>
                    <CIcon icon={ icon.cilFilter } /> 
                </button>
            </div>
        </div>  
    </form>
    )
}
