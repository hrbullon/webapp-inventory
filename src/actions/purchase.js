import swal from "sweetalert";

import { confirmDelete } from "src/helpers/helpers";
import { 
    getAllPurchases, 
    createPurchase, 
    deletePurchase } 
from "src/services/purchasesServices";
import { CLG_MESSAGE, VIEW_MESSAGE } from "src/strings";

export const startGettingPurchases = (data) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: "set", loading: true });
            const res = await getAllPurchases(data);
            dispatch({ type: "set", purchases: [...res.purchases], loading: false});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startCreatingPurchase = (data) => {
    return async (dispatch) => { 
        try {
            const res = await createPurchase(data);
            dispatch({ type: "set", purchase: {...res.purchase}});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}


export const startDeletingPurchase = (data) => {
    return async (dispatch) => {
        confirmDelete(`Quiere anular la compra: ${data.code}`, async () => {
                
            const deleted = await deletePurchase(data.id);
                
            if(deleted.sale){
                swal(
                  'Compra anulada completada!',
                  'Se anuló la compra correctamente!',
                  'success'
                );
                //dispatch( startGettingSales({ code:"", customer: "", start_date:"", end_date: "" }) );
            }else{
                swal("Error", VIEW_MESSAGE.DATA_SAVED_FAILED);
            }
        });
    }
}