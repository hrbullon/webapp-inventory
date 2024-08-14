import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { formatCurrency, formatNumber } from 'src/helpers/helpers';
import { startCreatingDiscount } from 'src/actions/discount';
import { NumericFormat } from 'react-number-format';
import { CFormInput } from '@coreui/react';

export const Form = ({ sale, saleId}) => {

    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, reset } = useForm();
    
    const discountSaved = useSelector( state => state.discountSaved );

    useEffect(() => {
        if(discountSaved){
            reset({
                discount: "",
                discount_converted:"",
                description:""
            });
        }
    }, [discountSaved])

    const onSubmit = (data) => {
        data.sale_id = saleId;
        dispatch( startCreatingDiscount(data) );
    }

    const calculateAmounts = (inputName, value) => {

        if(inputName == "discount"){
          if(value !== ""){
            setValue('discount', parseFloat(value.replaceAll(".","").replace(",",".")));
            let total_amount_converted = parseFloat(value.replaceAll(".","").replace(",","."))*sale.exchange_amount;
            setValue('discount_converted', Number(total_amount_converted.toFixed(2)));
            document.getElementById("discount_converted").value = formatNumber(total_amount_converted);
          }else{
            setValue('discount_converted', 0);
            document.getElementById("discount_converted").value = "0";
          }
        }
        
        if(inputName == "discount_converted"){
          
          if(value !== ""){
            setValue('discount_converted', parseFloat(value.replaceAll(".","").replace(",",".")));
            let total_amount = parseFloat(value.replaceAll(".","").replace(",","."))/sale.exchange_amount;
            setValue('discount', Number(total_amount.toFixed(2)));
            document.getElementById("discount").value = formatNumber(total_amount);
          }else{
            setValue('discount', 0);
            document.getElementById("discount").value = "0";
          }
        }
      }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Monto total venta</h4>
        <b className='text-danger'> { formatCurrency(sale.total_amount) }</b><br/>  
        <b className='text-danger'> Bs { (sale.total_amount_converted) }</b><br/><br/>
        
        <label> Monto $USD</label>

        <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            prefix=""
            allowNegative={false}
            customInput={inputProps => (
              <CFormInput
                {...inputProps}
                id="discount"
                type="text" 
                size="lg" 
                autoComplete='autoComplete'
                placeholder="0,00" 
                aria-label="Monto $US."
                onKeyUp={ (e) => calculateAmounts('discount', e.target.value) }
              />
            )}
          />
        
        <label> Monto Bs</label>

        <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            prefix=""
            allowNegative={false}
            customInput={inputProps => (
              <CFormInput
                {...inputProps}
                id="discount_converted"
                type="text" 
                size="lg" 
                autoComplete='autoComplete'
                placeholder="0,00" 
                aria-label="Monto Bs."
                onKeyUp={ (e) => calculateAmounts('discount_converted', e.target.value) }
              />
            )}
          />

        <label> Observación</label>

        <textarea name="description" {...register("description") } className='form-control' rows={3} />
        
        <button type='submit' className="btn btn-primary float-end mt-2">
            <CIcon icon={ icon.cilCheckCircle } /> Aplicar
        </button>

    </form>
  )
}
