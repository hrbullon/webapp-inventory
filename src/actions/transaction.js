import { checkStartedTransaction, createTransaction } from "src/services/transactionsServices";

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
