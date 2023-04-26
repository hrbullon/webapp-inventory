import React from 'react';
import { useDispatch } from 'react-redux'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';

import { startGettingCustomers } from '../../actions/customer';

export const FormSearch = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm({ defaultValues:{} });

    const handleFilter = (data) => { dispatch( startGettingCustomers(data) ) }

    const handleReset = () => {
        reset({});
        handleFilter()
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)}>
            <div className='row mt-4'>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='off' {...register("dni") }  placeholder='Buscar por DNI'/>  
                </div>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='off' {...register("name") }  placeholder='Buscar por Nombre'/>  
                </div>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='off' {...register("phone") }  placeholder='Buscar por teléfono'/>  
                </div>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='off' {...register("email") }  placeholder='Buscar por correo'/>  
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
