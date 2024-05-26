import { login } from 'src/services/authServices';

import { CLG_MESSAGE } from "src/strings";
import swal from 'sweetalert';

export const startAuthLogin = (data) => {
    return async (dispatch) => { 
        try {
            const res = await login(data);

            if(res.user && res.token){
                dispatch({ type: "set", authorized: { ...res }});
            }else{
                swal("Error!", res.message , "warning");
            }
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}