import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';

//Actions purchase
import { startGettingPurchases } from 'src/actions/purchase';

export const FormSearch = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit, reset, getValues } = useForm();

    useEffect(() => { dispatch( startGettingPurchases(getValues()) ) }, [])

    const handleFilter = async data => { dispatch(startGettingPurchases(data)) }

    const handleReset = () => {
        reset({
            code:'',
            document:'',
            start_date:'',
            end_date:''
        });

        handleFilter({
            code:'',
            document:'',
            start_date:'',
            end_date:''
        })
    }

    return (
    <form onSubmit={handleSubmit(handleFilter)}>
        <div className='row mt-4'>
            <div className='col-3'>
                <input type="text" className='form-control' autoComplete='autoComplete' {...register("code") } placeholder='Buscar por nro de control'/>  
            </div>
            <div className='col-3'>
                <input type="text" className='form-control' autoComplete='autoComplete' {...register("document") } placeholder='Buscar por nro de Fact/Doc'/>  
            </div>
            <div className='col-3'>
                <input type="date" className='form-control' autoComplete='autoComplete' {...register("start_date") } placeholder='Buscar por fecha desde'/>  
            </div>
            <div className='col-3'>
                <input type="date" className='form-control' autoComplete='autoComplete' {...register("end_date") } placeholder='Buscar por fecha hasta'/>  
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
