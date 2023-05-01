import swal from "sweetalert";

import { confirmDelete } from "src/helpers/helpers";
import { deleteSale, getAllSales } from "src/services/salesServices";
import { CLG_MESSAGE, VIEW_MESSAGE } from "src/strings";

export const startGettingSales = (data) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: "set", loading: true });
            const res = await getAllSales(data);
            dispatch({ type: "set", sales: [...res.sales], loading: false});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startDeletingSale = (data) => {
    return async (dispatch) => {
        confirmDelete(`Quiere anular la venta: ${data.code}`, async () => {
                
            const deleted = await deleteSale(data.id);
                
            if(deleted.sale){
                swal(
                  'Venta anulada completada!',
                  'Se anuló la venta correctamente!',
                  'success'
                );
                dispatch( startGettingSales() );
            }else{
                swal("Error", VIEW_MESSAGE.DATA_SAVED_FAILED);
            }
        });
    }
}