import { findAllByCheckoutSessionId, checkStartedTransaction, createCheckoutOpen, createInAndOutCash, getCheckoutRegisterSummary } from "src/services/checkoutRegisterServices";
import { CLG_MESSAGE } from "src/strings";

export const startGettingAllByCheckoutSessionId = (checkout_session_id) => {
    return async (dispatch) => { 
        try {
            let results = await findAllByCheckoutSessionId(checkout_session_id);
            dispatch({ type: "set", checkout_register_items: results.checkout_register_items });
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startCheckingStarted = (checkoutSessionId) => {
    return async (dispatch) => { 
        try {
            return await checkStartedTransaction(checkoutSessionId);
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startGettingCheckoutRegistersSummary = (checkoutSessionId) => {
    return async (dispatch) => { 
        try {
            let results = await getCheckoutRegisterSummary(checkoutSessionId);
            dispatch({ type: "set", checkoutRegisterSummary: results.summary });
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startCreatingCheckoutOpen = (data) => {
    return async (dispatch) => { 
        try {
            return await createCheckoutOpen(data);
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_SAVING);            
        }
    }
}

export const startCreatingInAndOutCash = (data) => {
    return async (dispatch) => { 
        try {
            const result = await createInAndOutCash(data);
            dispatch({ type: "set", checkoutInAndOut:  result.checkout_register });

        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_SAVING);            
        }
    }
}