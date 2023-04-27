import { CLG_MESSAGE } from "src/strings";

import { getAllProducts } from 'src/services/productsServices';

export const startGettingProducts = (data) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: "set", loading: true });
            const res = await getAllProducts(data);
            dispatch({ type: "set", products: [...res.products], loading: false});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}
