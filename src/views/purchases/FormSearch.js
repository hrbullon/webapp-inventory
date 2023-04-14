import React from 'react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from 'react-hook-form';

export const FormSearch = ({ setPurchases, rows }) => {

    const { register, handleSubmit, reset } = useForm();

    const handleFilter = async data => { 
        
        let filtered = rows
        .filter( item => {
            return item.code && item.code.toLowerCase().includes(data.code.toLowerCase()) &&
            item.document && item.document.toLowerCase().includes(data.document.toLowerCase())
        })

        if(data.start_date !== "" && data.end_date !== ""){
            const filteredRows = filtered.filter(item => {
                    const currentDate = item.date;
                    return currentDate >= data.start_date && currentDate <= data.end_date;
                
            });

            setPurchases(filteredRows);
        }else{
            setPurchases(filtered);
        }
    }

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
                <input type="text" className='form-control' autoComplete='off' {...register("code") } placeholder='Buscar por nro de control'/>  
            </div>
            <div className='col-3'>
                <input type="text" className='form-control' autoComplete='off' {...register("document") } placeholder='Buscar por nro de Fact/Doc'/>  
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
