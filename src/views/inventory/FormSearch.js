import React from 'react'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';

export const FormSearch = ({ setProducts, fetchProducts, rows }) => {

    const { register, handleSubmit, reset } = useForm();

    const handleFilter = (data) => {
       
        let filtered = rows
        .filter( item => {
            return item.code && item.code.toLowerCase().includes(data.code.toLowerCase()) &&
            item.name && item.name.toLowerCase().includes(data.product.toLowerCase())
        })

        setProducts(filtered);
    }

    const handleReset = () => {
        reset({
            code:'',
            product:''
        });

        fetchProducts();
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)}>
            <div className='row mt-4'>
                <div className='col-4'>
                    <input type="text" className='form-control' autoComplete='off' {...register("code") }  placeholder='Buscar por codigo producto'/>  
                </div>
                <div className='col-4'>
                    <input type="text" className='form-control' autoComplete='off' {...register("product") }  placeholder='Buscar por nombre producto'/>  
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
