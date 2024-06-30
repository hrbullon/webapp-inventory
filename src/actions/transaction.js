import { 
    createTransaction, 
    checkStartedTransaction, 
    getAllTransactionsBySession, 
    getTransactionSummary,
    closeTransactionCheckout } 
from "src/services/transactionsServices";

import { CLG_MESSAGE } from "src/strings";

export const startGettingTransactionsBySession = (checkout_session_id) => {
    return async (dispatch) => { 
        try {
            let results = await getAllTransactionsBySession(checkout_session_id);
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

export const startGettingTransactionsSummary = (checkout_session_id) => {
    return async (dispatch) => { 
        try {
            let results = await getTransactionSummary(checkout_session_id);
            dispatch({ type: "set", transactionSummary: results.summary });
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startClosingTransactionCheckout = (checkout_session_id) => {
    return async (dispatch) => { 
        try {
            let checkoutClosed = await closeTransactionCheckout(checkout_session_id);
            dispatch({ type: "set", checkoutClosed });
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}
