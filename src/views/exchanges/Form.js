import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { ActionButtons } from 'src/components/forms/ActionButtons';

//Actions exchange
import { startGettingExchanges, startSendingExchange } from 'src/actions/exchange';
import { VIEW_MESSAGE } from 'src/strings';

export const Form = ({ exchange }) => {

    const dispatch = useDispatch();
    const exchangeSaved = useSelector( (state) => state.exchangeSaved );

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        reset(exchange);
    }, [exchange]);

    useEffect(() => {
        if(exchangeSaved){
            swal("Completado!", VIEW_MESSAGE.DATA_SAVED_SUCCESSFULLY, "success");
            dispatch( startGettingExchanges() );
            reset();
        }
    }, [exchangeSaved])
    
    const onSubmit = async data => { dispatch( startSendingExchange(data) ) };

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
