import { 
    createTransaction, 
    checkStartedTransaction, 
    getAllTransactionsByCheckoutId } 
from "src/services/transactionsServices";

import { CLG_MESSAGE } from "src/strings";

export const startGettingTransactionsByCheckoutId = (checkoutId) => {
    return async (dispatch) => { 
        try {
            let results = await getAllTransactionsByCheckoutId(checkoutId);
            dispatch({ type: "set", transactions: results.transactions });
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

export const startCreatingTransactions = (data) => {
    return async (dispatch) => { 
        try {
            return await createTransaction(data);
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}
