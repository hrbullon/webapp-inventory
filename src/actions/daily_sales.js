import { getAllDailySales } from "src/services/daylySalesServices";
import { CLG_MESSAGE } from "src/strings";

export const startGettingDailySales = () => {
    return async (dispatch) => { 
        try {
            dispatch({ type: "set", loading: true });
            const res = await getAllDailySales();
            dispatch({ type: "set", dailySales: [...res.dailySales], loading: false});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }        
    }
}