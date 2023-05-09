import { getAllCustomers, getCustomerById, createCustomer, updateCustomer } from 'src/services/customersServices';

import swal from 'sweetalert';
import { CLG_MESSAGE } from "src/strings";
import { VIEW_MESSAGE } from '../strings';

export const startResetingCustomer = () => {
    return async (dispatch) => { 
        dispatch({ type: "set", customer: null, customerSaved: null });
    }
}

export const startGettingCustomers = (data) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: "set", loading: true });
            const res = await getAllCustomers(data);
            dispatch({ type: "set", customers: [...res.customers], loading: false});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startGettingCustomerByID = (id) => {
    return async (dispatch) => { 
        try {
            const res = await getCustomerById(id);
            dispatch({ type: "set", customer: {...res.customer}});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startSendingCustomer = (data) => {
    return async (dispatch) => { 

        try {
            
            let res = null;
    
            if(!data.id){
                res = await createCustomer(data);
            }else{
                res = await updateCustomer(data.id, data);
            }

            if(res.customer){
                swal("Completado!", VIEW_MESSAGE.DATA_SAVED_SUCCESSFULLY, "success");
                dispatch({ type:"set", customerSaved: res.customer });
                return res.customer;
            }
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_SAVING);       
        }
    }
}