import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { formDefault } from './config';

export const FormSearch = ({ setApiUrl }) => {

  const { 
    reset, 
    register, 
    getValues, 
    handleSubmit 
  } = useForm({});

  const navigate = useNavigate();

  const handleFilter = async data => {

    const queryString = new URLSearchParams(data).toString();
    const apiUrlLocal = `${queryString}`;
  
    navigate(`?${apiUrlLocal}`);
    setApiUrl(`daily_sales?${apiUrlLocal}`);

  };

  const handleReset = () => { 
      
    const { checkout_register, start_date, end_date, user } = getValues();

    if( 
        checkout_register !== "" || 
        start_date !== "" || 
        end_date !== "" || 
        user !== "" 
    ) {

        reset(formDefault);

        const queryString = new URLSearchParams(formDefault).toString();
        const apiUrlLocal = `${queryString}`;

        navigate(`?${apiUrlLocal}`);
        setApiUrl(`daily_sales?${apiUrlLocal}`);

    }
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)}>
      <div className='row mt-4'>
          <div className='col-3'>
              <input 
                  type="text" 
                  className='form-control' 
                  {...register("checkout_register") } 
                  placeholder='Buscar por caja'/>  
          </div>
          <div className='col-3'>
              <input 
                  type="text" 
                  className='form-control' 
                  {...register("user") } 
                  placeholder='Buscar por vendedor'/>  
          </div>
          <div className='col-3'>
              <input 
                  type="date" 
                  className='form-control'
                  {...register("start_date") } 
                  placeholder='Buscar por fecha desde'/>  
          </div>
          <div className='col-3'>
              <input 
                  type="date" 
                  className='form-control' 
                  {...register("end_date") } 
                  placeholder='Buscar por fecha hasta'/>  
          </div>
          <div className='col'>
              <button 
                  type='button' 
                  onClick={ handleReset } 
                  title='Limpiar formulario'
                  className='btn btn-secondary float-end mt-2 mb-2'>
                  
                  <CIcon icon={ icon.cilReload } /> 
              
              </button>
              <button 
                  type='submit' 
                  title='Filtrar datos'
                  className='btn btn-primary float-end  mt-2 mb-2 m-2'>

                  <CIcon icon={ icon.cilFilter } /> 
              
              </button>
          </div>
      </div>  
    </form>
  )
}
