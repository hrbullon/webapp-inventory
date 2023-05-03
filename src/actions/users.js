import { confirmDelete } from "src/helpers/helpers";

import swal from "sweetalert";

import { 
    createUser, 
    deleteUser, 
    getAllUsers, 
    getUserById, 
    updateUser } 
from "src/services/usersServices";
import { CLG_MESSAGE, VIEW_MESSAGE } from "src/strings";

export const startGettingUsers = (data) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: "set", loading: true });
            const res = await getAllUsers(data);
            dispatch({ type: "set", users: [...res.users], loading: false});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startGettingUserById = (data) => {
    return async (dispatch) => { 
        try {
            const res = await getUserById(data);
            dispatch({ type: "set", user: {...res.user} });
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startSendingUser = (data) => {
    return async (dispatch) => { 

        try {
            
            let res = null;
    
            if(!data.id){
                res = await createUser(data);
            }else{
                res = await updateUser(data.id, data);
            }

            if(res.user){
                dispatch({ type:"set", userSaved: res.user })
                swal("Completado!", VIEW_MESSAGE.DATA_SAVED_SUCCESSFULLY, "success");
            }
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_SAVING);       
        }
    }
}

export const startDeletingUser = (data) => {
    return async (dispatch) => {
        confirmDelete(`Quiere activar/desactivar el usuario: ${data.account}`, async () => {
                
            const deleted = await deleteUser(data);
                
            if(deleted.user){
                swal("Listo","Usuario desactivado!!","success");
                dispatch( startGettingUsers({ dni:'', firstname:'', lastname:'', phone:'', account:''  }) );
            }else{
                swal("Error", VIEW_MESSAGE.DATA_SAVED_FAILED);
            }
        });
    }
}