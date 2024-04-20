import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react';

import { AuthContext } from 'src/context/AuthContext';
import { startCreatingTransactions } from 'src/actions/transaction';
import { useForm } from 'react-hook-form';

export const Open = () => {
    
    const dispatch = useDispatch();
    const context = useContext(AuthContext);

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();

    const { id: userId, firstname, lastname } = context.user;

    const [visible, setVisible] = useState(false);
    const [startedSale, setStartedSale] = useState(false);

    const today = new Date(Date.now()).toLocaleDateString();

    const handleStartTransactions = () => {
        
        // Get reference to the select element
        let selectElement = document.getElementsByName("checkout_id")[0];
        let selectedIndex = selectElement.selectedIndex;
        let selectedOption = selectElement.options[selectedIndex];
        let selectedText = selectedOption.text;

        let checkoutId = getValues("checkout_id");

        let started = dispatch( startCreatingTransactions({
            checkout_id: checkoutId,
            user_id: userId,
            transaction_id:1,
            note:`Apertura de caja: ${selectedText}`,
            amount: getValues("amount")
        }) );

        started.then( resp => {
            if(resp){
                setStartedSale(true);
                localStorage.setItem("checkoutId", checkoutId);
                localStorage.setItem("session_pos", resp.transaction.checkout_session_id);
                localStorage.setItem("started_session_pos", true);
                window.location.href = "/#/pos";
            }
        })
    }

    return (
    <div className="card">
        <div className="card-body text-center">
            { startedSale == false &&
            <button className='btn btn-large btn-primary' onClick={ () => setVisible(true) }>Iniciar ventas</button>}
        </div>
        <CModal  visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Datos de inicio</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <label><b>Usuario:</b></label> { `${firstname} ${lastname}` }<br/>
                <label><b>Fecha:</b></label> { today } <br/>
                
                <label><b>Nro de caja:</b></label>
                <select 
                    name='checkout_id'
                    className='form-control mt-2 mb-2'
                    {...register("checkout_id", { required: true }) }>
                    <option value="4883646e-3d83-4850-9efb-b1ca032a7b81" key="1">POS001</option>
                </select>

                <label><b>Fondo de caja:</b></label>
                <input 
                    type="number" 
                    name="amount" 
                    className='form-control mt-2' 
                    autoComplete='autoComplete'
                    {...register("amount", { required: true }) }/>

                <button type='submit' onClick={ () => handleStartTransactions() } className='btn btn-primary mt-2'>
                    <CIcon icon={icon.cilCog} title='Guardar datos'/> Procesar
                </button>

            </CModalBody>
        </CModal>
    </div>
  )
}

export default Open;
