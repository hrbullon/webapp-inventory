import { 
    createDiscount, 
    deleteDiscount, 
    getDiscountsByCheckoutSession, 
    getDiscountsBySale 
} from "src/services/discountServices";

import { CLG_MESSAGE } from "src/strings";

export const startGettingDiscountBySale = (saleId) => {
    return async (dispatch) => { 
        try {
            const res = await getDiscountsBySale(saleId);
            dispatch({ type: "set", discounts: [...res.discounts]});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startGettingDiscountByCheckoutSession = (checkoutSessionId) => {
    return async (dispatch) => { 
        try {
            const res = await getDiscountsByCheckoutSession(checkoutSessionId);
            dispatch({ type: "set", discountSummary: [...res.discounts]});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startCreatingDiscount = (data) => {
    return async (dispatch) => { 
        try {
            const res = await createDiscount(data);
            if(res.discount){
                dispatch({ type: "set", discountSaved: res.discount});
                dispatch( startGettingDiscountBySale(data.sale_id) );
            }
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startDeletingDiscount = (saleId, id) => {
    return async (dispatch) => { 
        try {
            const res = await deleteDiscount(id);
            if(res.discount){
                dispatch( startGettingDiscountBySale(saleId) );
            }
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}
