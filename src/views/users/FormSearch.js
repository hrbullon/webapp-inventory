import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';
import { startGettingUsers } from 'src/actions/users';

export const FormSearch = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit, getValues, reset } = useForm();

    useEffect(() => { dispatch( startGettingUsers(getValues()) ) }, [])

    const handleFilter = data => dispatch( startGettingUsers(data) )

    const handleReset = () => {
        reset({
            dni:'',
            firstname:'',
            lastname:'',
            phone:'',
            account:''
        });

        handleFilter({
            dni:'',
            firstname:'',
            lastname:'',
            phone:'',
            account:''
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)}>
            <div className='row mt-4'>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='autoComplete' {...register("dni") }  placeholder='Buscar por DNI'/>  
                </div>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='autoComplete' {...register("firstname") }  placeholder='Buscar por Nombre'/>  
                </div>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='autoComplete' {...register("lastname") }  placeholder='Buscar por Apellido'/>  
                </div>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='autoComplete' {...register("account") }  placeholder='Buscar por cuenta de usuario'/>  
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
