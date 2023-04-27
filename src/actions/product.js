import { CLG_MESSAGE } from "src/strings";
import { VIEW_MESSAGE } from '../strings';

import swal from "sweetalert";
import { getAllProducts } from 'src/services/productsServices';

import { 
    createProduct, 
    updateProduct,
    getProductById 
}

from "../services/productsServices";

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

export const startGettingProductById = (idProduct) => {
    return async (dispatch) => { 
        try {
            const res = await getProductById(idProduct);
            dispatch({ type: "set", product: {...res.product}});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startSendingProduct = (data, id) => {
    return async (dispatch) => { 
        try {
            
            let res;

            if(!id){
                res = await createProduct(data);
            }else{
                res = await updateProduct(data, id);
            }

            if(res.product){
                swal("Completado!", VIEW_MESSAGE.DATA_SAVED_SUCCESSFULLY, "success");
            }
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_SAVING);       
        }
    }
}
