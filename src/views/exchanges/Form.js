import React, { useState, useEffect } from 'react';

import swal from 'sweetalert';
import { useForm } from 'react-hook-form';

import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { ActionButtons } from 'src/components/forms/ActionButtons';
import { createExchange, updateExchange } from 'src/services/exchangesServices';

export const Form = ({ exchange, fetchExchanges }) => {

    const [idExchange, setIdExchange] = useState(0);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        reset(exchange);
        setIdExchange(exchange.id);
    }, [exchange]);

    const onSubmit = async data => {
        
        let res;
    
        if(!idExchange){
            res = await createExchange(data);
        }else{
            res = await updateExchange(idExchange, data);
        }
    
        if(res.exchange){
          (idExchange)? reset(data) : reset();
          fetchExchanges();
          swal("Listo","Datos guardados correctamente!!","success");
        }else{
          swal("Oops","Algo salio mal al guardar los datos","warning");
        }
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <h5 className="card-title">Datos de Tasa de cambio</h5>
        <div className="mb-3">
            <input type="date" name="date" {...register("date", { required: true }) } className="form-control" placeholder="Fecha"/>
            <ErrorValidate error={ errors.date } />
        </div>
        <div className="mb-3">
            <input type="text" name="amount" {...register("amount", { required: true }) } className="form-control" placeholder="Monto"/>
            <ErrorValidate error={ errors.amount } />
        </div>
        <div className="mb-3">
            <input type="text" name="description" {...register("description", { required: true, maxLength: 45 }) } className="form-control" placeholder="Descripción "/>
            <ErrorValidate error={ errors.description } />
        </div>
        <ActionButtons />
    </form> 
  )
}
