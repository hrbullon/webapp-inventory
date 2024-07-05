import { getAllCheckouts } from "src/services/chekoutService";

import { CLG_MESSAGE } from "src/strings";

export const startGettingCheckoutList = (data) => {
    return async (dispatch) => { 
        try {
            const res = await getAllCheckouts();
            dispatch({ type: "set", checkouts: [...res.checkouts]});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}