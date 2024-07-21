import { createDiscount, deleteDiscount } from "src/services/discountServices";
import { CLG_MESSAGE } from "src/strings";

export const startCreatingDiscount = (data) => {
    return async (dispatch) => { 
        try {
            const res = await createDiscount(data);
            dispatch({ type: "set", discount: [...res.discount]});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startDeletingDiscount = (id) => {
    return async (dispatch) => { 
        try {
            const res = await deleteDiscount(id);
            dispatch({ type: "set", discount: [...res.discount]});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}
