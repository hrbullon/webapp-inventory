import { getAllDailySales } from "src/services/daylySalesServices";
import { CLG_MESSAGE } from "src/strings";

export const startGettingDailySales = (data) => {
    return async (dispatch) => { 
        try {
            
            dispatch({ type: "set", loading: true });
            
            const res = await getAllDailySales(data);
            
            dispatch({ 
                type: "set", 
                dailySales: [...res.data.items], 
                loading: false, 
                perPage: res.data.per_page,
                totalRows: res.data.totalItems 
            });

        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }        
    }
}