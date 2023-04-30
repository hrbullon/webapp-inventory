import swal from "sweetalert";

import { 
    createExchange, 
    updateExchange,
    getAllExchanges } 
from "src/services/exchangesServices";

import { CLG_MESSAGE, VIEW_MESSAGE } from "src/strings";

export const startGettingExchanges = (data) => {
    return async (dispatch) => { 
        try {
            const res = await getAllExchanges(data);
            dispatch({ type: "set", exchanges: [...res.exchanges]});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startSendingExchange = (data) => {
    return async (dispatch) => { 

        try {
            
            let res = null;
    
            if(!data.id){
                res = await createExchange(data);
            }else{
                res = await updateExchange(data.id, data);
            }

            if(res.exchange){

                dispatch( startGettingExchanges() )
                swal("Completado!", VIEW_MESSAGE.DATA_SAVED_SUCCESSFULLY, "success");
            }
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_SAVING);       
        }
    }
}