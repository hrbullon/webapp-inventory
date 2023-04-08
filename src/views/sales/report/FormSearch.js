import React from 'react'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';

export const FormSearch = ({ setSales, rows }) => {

    const { register, handleSubmit, reset } = useForm();

    const handleFilter = (data) => {
       
        let filtered = rows
        .filter( item => {
            return item.code && item.code.toLowerCase().includes(data.sale_code.toLowerCase()) && 
            item.code_product && item.code_product.toLowerCase().includes(data.code.toLowerCase()) &&
            item.description && item.description.toLowerCase().includes(data.product.toLowerCase())
        })

        setSales(filtered);
    }

    const handleReset = () => {
        reset({
            sale_code:'',
            code:'',
            product:''
        });

        handleFilter({
            sale_code:'',
            code:'',
            product:''
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)}>
            <div className='row mt-4'>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='off' {...register("sale_code") }  placeholder='Buscar por nro de venta'/>  
                </div>
                <div className='col-3'>
                    <input type="text" className='form-control' autoComplete='off' {...register("code") }  placeholder='Buscar por codigo producto'/>  
                </div>
                <div className='col-3'>
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
