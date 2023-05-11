import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react';

import { AuthContext } from 'src/context/AuthContext';
import { startCheckingStarted } from 'src/actions/sales';

export const Open = () => {
    
    const dispatch = useDispatch();
    const context = useContext(AuthContext);

    const [visible, setVisible] = useState(false);
    const [startedSale, setStartedSale] = useState(false);

    useEffect( ()=> {
        
        if(context.user.role == "STD_ROLE"){
          
          let started = dispatch( startCheckingStarted() );
  
          started.then( resp => {
            if(resp){
                setStartedSale(true);
                localStorage.setItem("started_session_pos", true);
                window.location.href = "/#/pos";
            }
          })
        }
    }, [])

    return (
    <div class="card">
        <div class="card-body text-center">
            { startedSale == false &&
            <button className='btn btn-large btn-primary' onClick={ () => setVisible(true) }>Iniciar ventas</button>}
        </div>
        <CModal  visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>Datos de inicio</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <label><b>Usuario:</b></label> Hadersson Bullón <br/>
                <label><b>Fecha:</b></label> 10/05/2023 <br/>
                <label><b>Hora:</b></label> 8:40AM <br/>
                
                <label><b>Fondo de caja:</b></label><br/>
                <input type="number" name="amount" className='form-control mt-2' autoComplete='autoComplete'/>

                <button type='submit' className='btn btn-primary mt-2'>
                    <CIcon icon={icon.cilCog} title='Guardar datos'/> Procesar
                </button>

            </CModalBody>
        </CModal>
    </div>
  )
}

export default Open;
