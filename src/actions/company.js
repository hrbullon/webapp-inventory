
import swal from 'sweetalert';
import { CLG_MESSAGE } from "src/strings";
import { VIEW_MESSAGE } from '../strings';

import { getCompanyById, updateCompany } from 'src/services/companiesServices';

export const startGettingCompany = (idCompany) => {
    return async (dispatch) => { 
        try {
            const res = await getCompanyById(idCompany);
            dispatch({ type: "set", company: {...res.company}});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startSendingCompany = (data) => {
    return async (dispatch) => { 
        try {
            
            let res = await updateCompany(data.id, data);

            if(res.company){
                dispatch({ type:"set", companySaved: res.company });
                swal("Completado!", VIEW_MESSAGE.DATA_SAVED_SUCCESSFULLY, "success");
            }
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_SAVING);       
        }
    }
}