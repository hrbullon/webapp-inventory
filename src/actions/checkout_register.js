import { findAllByCheckoutSessionId, checkStartedTransaction } from "src/services/checkoutRegisterServices";
import { CLG_MESSAGE } from "src/strings";

export const startGettingAllByCheckoutSessionId = (checkoutSessionId) => {
    return async (dispatch) => { 
        try {
            let results = await findAllByCheckoutSessionId(checkoutSessionId);
            dispatch({ type: "set", checkout_register_items: results.checkout_register_items });
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startCheckingStarted = (checkoutId) => {
    return async (dispatch) => { 
        try {
            return await checkStartedTransaction(checkoutId);
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}