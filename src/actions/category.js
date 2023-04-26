import { 
    createCategory, 
    updateCategory,
    getAllCategories } 
from "src/services/categoriesServices";

import { CLG_MESSAGE } from "src/strings";

export const startGettingCategory = (data) => {
    return async (dispatch) => { 
        try {
            const res = await getAllCategories(data);
            dispatch({ type: "set", categories: [...res.categories]});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startSendingCategory = (data) => {
    return async (dispatch) => { 

        try {
            
            let res = null;
    
            if(!data.id){
                res = await createCategory(data);
            }else{
                res = await updateCategory(data.id, data);
            }

            if(res.category){
                dispatch({ type:"set", categorySaved: res.category })
            }
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_SAVING);       
        }
    }
}