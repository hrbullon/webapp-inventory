import { useEffect } from 'react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { CFormCheck, CFormInput, CFormLabel, CInputGroup, CInputGroupText } from '@coreui/react';

import { useForm } from 'react-hook-form';
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingPayment } from 'src/actions/payment';
import { formatNumber } from 'src/helpers/helpers';
import { startGettingPaymentMethods } from 'src/actions/payment_methods';

export const FormPayment = ({ sale, saleId }) => {

  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  const payment_methods = useSelector( (state) => state.payment_methods );

  useEffect(() => {
      dispatch( startGettingPaymentMethods() );
  }, [])

  const onSubmit = (data) => {

    const checkout_session_id = localStorage.getItem("checkout_session_id");

    const model = { 
      customer_id: sale.customer_id,
      payment_method_id: data.payment_method,
      reference: data.reference,
      exchange_amount: sale.exchange_amount,
      total_amount: data.total_amount,
      total_amount_converted:data.total_amount_converted,
      state:1,
      payment_details: [
        {
            payment_id:0,
            sale_id: saleId,
            total_amount: data.total_amount,
            total_amount_converted:data.total_amount_converted
        }
    ]}

    if(checkout_session_id){ model.checkout_session_id = checkout_session_id }

    dispatch( startCreatingPayment(model) );

  };

  const calculateAmounts = (inputName, value) => {

    if(inputName == "total_amount"){
      if(value !== ""){
        setValue('total_amount', parseFloat(value.replaceAll(".","").replace(",",".")));
        let total_amount_converted = parseFloat(value.replaceAll(".","").replace(",","."))*sale.exchange_amount;
        setValue('total_amount_converted', total_amount_converted);
        document.getElementById("total_amount_converted").value = formatNumber(total_amount_converted);
      }else{
        setValue('total_amount_converted', 0);
        document.getElementById("total_amount_converted").value = "0";
      }
    }
    
    if(inputName == "total_amount_converted"){
      
      if(value !== ""){
        setValue('total_amount_converted', parseFloat(value.replaceAll(".","").replace(",",".")));
        let total_amount = parseFloat(value.replaceAll(".","").replace(",","."))/sale.exchange_amount;
        setValue('total_amount', total_amount);
        document.getElementById("total_amount").value = formatNumber(total_amount);
      }else{
        setValue('total_amount', 0);
        document.getElementById("total_amount").value = "0";
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        
        <CFormLabel className="col-form-label">Tipo de Pago</CFormLabel>
        
        <div class="mb-3">
          
          { payment_methods &&
            payment_methods.map( method => {

              return (
              <CFormCheck 
                inline 
                type="radio" 
                name="payment_method" 
                value={ method.id } 
                label={ method.description } 
                {...register('payment_method')}/>)
              
            })
          }

        </div>

        <div class="mb-3">
          <CFormLabel className="col-form-label">Monto Bs</CFormLabel>
          
          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            prefix=""
            allowNegative={false}
            customInput={inputProps => (
              <CFormInput 
                {...inputProps}
                id="total_amount_converted"
                type="text" 
                size="lg" 
                autoComplete='autoComplete'
                placeholder="0,00" 
                aria-label="Monto Bs."
                onKeyUp={ (e) => calculateAmounts('total_amount_converted', e.target.value) }
              />
            )}
          />
        </div>

        <div class="mb-3">
          <CFormLabel className="col-form-label">Monto $USD</CFormLabel>
          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            prefix=""
            allowNegative={false}
            customInput={inputProps => (
              <CFormInput 
                {...inputProps}
                id="total_amount"
                type="text" 
                size="lg" 
                autoComplete='autoComplete'
                placeholder="0,00" 
                aria-label="Monto $USD" 
                onKeyUp={ (e) => calculateAmounts('total_amount', e.target.value) }
              />
            )}
          />
        </div>

        <div class="mb-3">
          <CFormLabel className="col-form-label">Número de Referencia</CFormLabel>
          <CFormInput 
            type="text" 
            size="lg" 
            placeholder="xxxxxxxx" 
            aria-label="Referencia" 
            autoComplete='autoComplete'
            {...register('reference')}/>
        </div>
        
        <div class="mb-3">

          <CFormLabel className="col-form-label">Cambio / Vuelto</CFormLabel>
          
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon1">$USD</CInputGroupText>

            <input 
              type="number" 
              size="lg" 
              disabled
              className={`form-control form-control-lg ${ (sale.total_amount-sale.total_amount_paid) == 0? "bg-success" : "bg-warning" }`  }
              value={ (sale.total_amount - sale.total_amount_paid)*-1 }
              placeholder="0,00" 
              aria-label="Cambio / Vuelto"/>

            <CInputGroupText id="basic-addon1">Bs.</CInputGroupText>
            
            <input 
              type="number" 
              size="lg" 
              disabled
              className={`form-control form-control-lg ${ (sale.total_amount-sale.total_amount_paid) == 0? "bg-success" : "bg-warning" }`  }
              value={ ((sale.total_amount - sale.total_amount_paid) * sale.exchange_amount)*-1 }
              placeholder="0,00" 
              aria-label="Cambio / Vuelto"/>

          </CInputGroup>
         
        </div>
        <div class="mb-3 text-right">
            { sale.total_amount-sale.total_amount_paid > 0 &&
            <button type="submit" class="btn btn-warning">
              <CIcon icon={icon.cilPlus} title='Agregar pago'/>
                Agregar
            </button>}
          
        </div>
    </form>
  )
}
