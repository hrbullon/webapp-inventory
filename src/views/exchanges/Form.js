import React from 'react';

import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { ActionButtons } from 'src/components/forms/ActionButtons';

import useExchanges from './useExchanges';

export const Form = () => {

    const { sendFormData, register, handleSubmit, errors } = useExchanges();

    const onSubmit = async data => sendFormData(data);

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <h5 className="card-title">Datos de Tasa de cambio</h5>
        <div className="mb-3">
            <input 
                type="date" 
                name="date" 
                placeholder="Fecha"
                className="form-control"
                {...register("date", { required: true }) }/>
            <ErrorValidate error={ errors.date } />
        </div>
        <div className="mb-3">
            <input 
                type="text" 
                name="amount" 
                placeholder="Monto"
                className="form-control"
                {...register("amount", { required: true }) }/>
            <ErrorValidate error={ errors.amount } />
        </div>
        <div className="mb-3">
            <input 
                type="text" 
                name="description" 
                className="form-control"
                placeholder="Descripción"
                {...register("description", { required: true, maxLength: 45 }) }/>
            <ErrorValidate error={ errors.description } />
        </div>
        <ActionButtons />
    </form> 
  )
}
