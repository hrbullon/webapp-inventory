import { 
    createTransaction, 
    checkStartedTransaction, 
    getAllTransactionsBySession, 
    getTransactionSummary,
    closeTransactionCheckout } 
from "src/services/transactionsServices";

import { CLG_MESSAGE } from "src/strings";

export const startGettingTransactionsBySession = (sessionPOS) => {
    return async (dispatch) => { 
        try {
            let results = await getAllTransactionsBySession(sessionPOS);
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

export const startGettingTransactionsSummary = (sessionPOS, date) => {
    return async (dispatch) => { 
        try {
            let results = await getTransactionSummary(sessionPOS, date);
            dispatch({ type: "set", transactionSummary: results.summary });
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startClosingTransactionCheckout = (sessionPOS, date) => {
    return async (dispatch) => { 
        try {
            let checkoutClosed = await closeTransactionCheckout(sessionPOS, date);
            dispatch({ type: "set", checkoutClosed });
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}
