import React from 'react'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';

export const FormSearch = ({ setCustomers, rows }) => {

    const { register, handleSubmit, reset } = useForm();

    const handleFilter = (data) => {
       
        let filtered = rows
        .filter( item => {
            return item.dni && item.dni.toLowerCase().includes(data.dni.toLowerCase()) && 
            item.name && item.name.toLowerCase().includes(data.name.toLowerCase()) &&
            item.phone && item.phone.toLowerCase().includes(data.phone.toLowerCase()) && 
            item.email && item.email.toLowerCase().includes(data.email.toLowerCase())
        })

        setCustomers(filtered);
    }

    const handleReset = () => {
        reset({
            dni:'',
            name:'',
            phone:'',
            email:''
        });

        handleFilter({
            dni:'',
            name:'',
            phone:'',
            email:''
        })
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
