import { 
    createPayment, 
    deletePayment, 
    getAllPaymentsBySale, 
    getPaymentSummary } 
from "src/services/paymentsServices";

import { CLG_MESSAGE } from "src/strings";

export const startGettingPayments = (saleId) => {
    return async (dispatch) => { 
        try {
            const res = await getAllPaymentsBySale(saleId);

            let payments = [];

            res.payments.map( item => {
                payments.push({
                    payment_id: item.id,
                    payment_method: item.PaymentMethod.description,
                    reference: item.reference !=="" ? item.reference : "S/I",
                    total_amount: item.total_amount,
                    total_amount_converted: item.total_amount_converted,
                });
            })

            dispatch({ type: "set", payments: [...payments]});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startCreatingPayment = (data) => {
    return async (dispatch) => { 

        try {
            
            let res = null;
    
            if(!data.id){
                res = await createPayment(data);
            }

            if(res.payment){
                dispatch({ type:"set", paymentSaved: data })
                dispatch( startGettingPayments(data.payment_details[0].sale_id) );
            }
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_SAVING);       
        }
    }
}


export const startGettingPaymentSummary = ( checkoutSessionId ) => {
    return async (dispatch) => { 
        const res  = await getPaymentSummary( checkoutSessionId );
        if(res.summary){
            let paymentSummary = res.summary;
            dispatch({ type: "set", paymentSummary });
        }else{
            swal("Error", VIEW_MESSAGE.ERROR_DATA_LOADING);
        }
    }
}

export const startDeletingPayment = ( saleId, paymentId ) => {
    return async (dispatch) => { 
        const res  = await deletePayment( paymentId );
        if(res.deleted){
            dispatch( startGettingPayments(saleId) );
        }else{
            swal("Error", VIEW_MESSAGE.ERROR_DATA_LOADING);
        }
    }
}