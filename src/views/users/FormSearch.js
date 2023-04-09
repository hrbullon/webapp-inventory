import React from 'react'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';

export const FormSearch = ({ setUsers, rows }) => {

    const { register, handleSubmit, reset } = useForm();

    const handleFilter = (data) => {
       
        let filtered = rows
        .filter( item => {
            return item.dni && item.dni.toLowerCase().includes(data.dni.toLowerCase()) && 
            item.firstname && item.firstname.toLowerCase().includes(data.firstname.toLowerCase()) &&
            item.lastname && item.lastname.toLowerCase().includes(data.lastname.toLowerCase()) && 
            item.account && item.account.toLowerCase().includes(data.account.toLowerCase())
        })

        setUsers(filtered);
    }

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
                    <input type="text" className='form-control' autoComplete='off' {...register("dni") }  placeholder='Buscar por DNI'/>  
                </div>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='off' {...register("firstname") }  placeholder='Buscar por Nombre'/>  
                </div>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='off' {...register("lastname") }  placeholder='Buscar por Apellido'/>  
                </div>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='off' {...register("account") }  placeholder='Buscar por cuenta de usuario'/>  
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
