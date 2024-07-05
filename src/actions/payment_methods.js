import { getAllPaymentMethods } from "src/services/paymentMethodsService";

import { CLG_MESSAGE } from "src/strings";

export const startGettingPaymentMethods = (data) => {
    return async (dispatch) => { 
        try {
            const res = await getAllPaymentMethods();
            dispatch({ type: "set", payment_methods: [...res.paymentMethods]});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}