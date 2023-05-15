import { CAlert } from '@coreui/react';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ActionButtons } from 'src/components/forms/ActionButtons'
import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { AuthContext } from 'src/context/AuthContext';

import { startCreatingTransactions } from 'src/actions/transaction';
import swal from 'sweetalert';
import { VIEW_MESSAGE } from 'src/strings';

const Cash = () => {

    const dispatch = useDispatch();
    const context = useContext(AuthContext);

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();

    const transactionsType = [
        {
            id: 3,
            name:"CHECKOUT_IN_CASH",
            description: "Ingreso de efectivo"
        },
        {
            id: 4,
            name:"CHECKOUT_OUT_CASH",
            description: "Retiro de efectivo"
        }
    ]

    const onSubmit = (data) => {
        
        let checkoutId = JSON.parse(localStorage.getItem("checkoutId"))

        let body = { ...data };
        body.checkout_id = checkoutId;
        body.user_id = context.user.id;
        
        let res = dispatch( startCreatingTransactions(body) );

        res.then( (response) => {
            if(response.transaction){
                reset();
                swal("Completado!", VIEW_MESSAGE.DATA_SAVED_SUCCESSFULLY, "success");
            }
        })
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <CAlert color="primary" visible={ (Object.entries(errors).length > 0 ) }>
            Los campos con <b>*</b> son obligatorios
        </CAlert>
        <div class="mb-3">
            <label>Tipo de operación</label>
            <select 
                class="form-select" 
                name="transaction_id"
                {...register("transaction_id", { required: true }) }>
                {   
                    transactionsType.map( item => { 
                        return <option key={ item.name } value={ item.id }>{ item.description }</option>
                    })
                }
            </select>
            <ErrorValidate error={ errors.transaction_id } />
        </div>
        <div class="mb-3">
            <label>Motivo</label>
            <textarea 
                class="form-control" 
                name="note" 
                rows="3"
                {...register("note", { required: true }) }></textarea>
            <ErrorValidate error={ errors.note } />
        </div>
        <div class="mb-3">
            <label>Cantidad</label>
            <input 
                type="number" 
                class="form-control" 
                name="amount"
                autoComplete='autoComplete'
                {...register("amount", { required: true }) }/>
            <ErrorValidate error={ errors.amount } />
        </div>
        <ActionButtons />
    </form>
  )
}

export default Cash;
