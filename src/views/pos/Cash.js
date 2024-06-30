import { CAlert } from '@coreui/react';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ActionButtons } from 'src/components/forms/ActionButtons'
import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { AuthContext } from 'src/context/AuthContext';

import { startCreatingInAndOutCash } from 'src/actions/checkout_register';
import swal from 'sweetalert';
import { VIEW_MESSAGE } from 'src/strings';
import { useEffect } from 'react';

const Cash = () => {

    const dispatch = useDispatch();
    const context = useContext(AuthContext);

    const checkoutInAndOut = useSelector((state) => state.checkoutInAndOut);

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

    useEffect(() => {
        if(checkoutInAndOut){
            reset();
            swal("Completado!", VIEW_MESSAGE.DATA_SAVED_SUCCESSFULLY, "success");   
        }
    }, [checkoutInAndOut])
    

    const onSubmit = (data) => {
        
        let checkout_session_id = localStorage.getItem("checkout_session_id");

        let body = { ...data };
        body.checkout_session_id = checkout_session_id;
        
        dispatch( startCreatingInAndOutCash(body) );
        
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Entrada/Salida de efectivo</h5>

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
                        autoComplete='autoComplete'
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
            </div>
        </div>
    </form>
  )
}

export default Cash;
