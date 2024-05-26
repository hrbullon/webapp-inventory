import { 
    createExchange, 
    updateExchange,
    getAllExchanges, 
    getLastExchange} 
from "src/services/exchangesServices";

import { handleLoadingError, handleSavingError } from "src/helpers/helpers";

export const startGettingExchanges = (data) => {
    return async (dispatch) => { 
        try {
            const res = await getAllExchanges(data);
            dispatch({ type: "set", exchanges: [...res.exchanges]});
        } catch (error) {
            handleLoadingError();
        }
    }
}

export const startGettingLastExchange = () => {
    return async (dispatch) => { 
        try {
            const res = await getLastExchange();
            dispatch({ type: "set", lastExchange: {...res.exchanges[0] }});
        } catch (error) {
            handleLoadingError();
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
                dispatch({ type:"set", exchangeSaved: res.exchange });
            }
        } catch (error) {
            handleSavingError();       
        }
    }
}