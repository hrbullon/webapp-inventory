import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { formatCurrency } from 'src/helpers/helpers';
import { startCreatingDiscount } from 'src/actions/discount';

export const Form = ({ sale, saleId}) => {

    const dispatch = useDispatch();

    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalDiscountConverted, setTotalDiscountConverted] = useState(0);

    const handleApplyDiscount = async () => {

        const data = {
            sale_id: saleId,
            discount: totalDiscount,
            discount_converted: totalDiscountConverted,
        };

        dispatch( startCreatingDiscount(data) );

    }

    return (
    <>
        <h4>Monto total venta</h4>
        <b className='text-danger'> { formatCurrency(sale.total_amount) }</b><br/>  
        <b className='text-danger'> Bs { (sale.total_amount_converted) }</b><br/><br/>
        
        <label> Porcentaje %</label>
        <input 
            type='number' 
            value={ totalDiscount }  
            onChange={ (e) => setTotalDiscount(e.target.value) } 
            className='form-control'/>

        <label> Monto $USD</label>
        <input  
            type='number' 
            value={ totalDiscount }  
            onChange={ (e) => setTotalDiscount(e.target.value) } 
            className='form-control'/>
        
        <label> Monto Bs</label>
        <input  
            type='number' 
            value={ totalDiscountConverted }  
            onChange={ (e) => setTotalDiscountConverted(e.target.value) } 
            className='form-control'/>
        
        <button 
            className="btn btn-primary float-end mt-2" 
            onClick={  handleApplyDiscount } >
               <CIcon icon={ icon.cilCheckCircle } /> Aplicar
        </button>

    </>
  )
}
