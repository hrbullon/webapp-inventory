import swal from "sweetalert";

import { confirmDelete } from "src/helpers/helpers";
import { 
        closeSale, 
        createSale, 
        deleteSale, 
        getAllSales, 
        createSaleDetails,
        getAllSalesMonth, 
        getAllSalesToday, 
        getSalesSummary, 
        getSaleById} 
from "src/services/salesServices";

import { CLG_MESSAGE, VIEW_MESSAGE } from "src/strings";

export const startCreatingSale = (data) => {
    return async (dispatch) => { 
        try { 
            let res = await createSale(data);
            if(res.sale){
                dispatch({ type: "set", saleCreated: res.sale });
            }
        }catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startGettingSaleById = (saleId) => {
    return async (dispatch) => { 
        try { 
            let res = await getSaleById(saleId);
            if(res.sale){
                dispatch({ type: "set", saleLoaded: res.sale });
            }
        }catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startCreatingSaleDetails = (data) => {
    return async (dispatch) => { 
        try { 
            let res = await createSaleDetails(data);
            if(res.sale){
                dispatch({ type: "set", saleDetailsCreated: res.sale });
            }
        }catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startGettingSales = (data, date = null) => {
    return async (dispatch) => { 
        try {
            let params = data;
           
            if(date.today !== null){
                let { today } = date;
                params = { ...data, start_date: today, end_date: today };
            }

            dispatch({ type: "set", loading: true });
            const res = await getAllSales(params);
            dispatch({ type: "set", sales: [...res.sales], loading: false});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startGettingSalesByMonth = (data) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: "set", loading: true });
            const res = await getAllSalesMonth(data);
            dispatch({ type: "set", salesDetails: [...res.sales], loading: false});
        } catch (error) {
            console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
        }
    }
}

export const startGettingSalesByDay = (data) => {
    return async (dispatch) => { 
        try {
            dispatch({ type: "set", loading: true });
            const res = await getAllSalesToday(data);
            dispatch({ type: "set", salesDetails: [...res.sales], loading: false});
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
                
                //Page reload
                /* setTimeout( () => {
                    window.location.reload();
                }, 2000) */
                
            }else{
                swal("Error", VIEW_MESSAGE.DATA_SAVED_FAILED);
            }
        });
    }
}

export const startClosingSale = (data) => {
    return async (dispatch) => {

        confirmDelete(`Quiere finalizar la venta`, async () => {
                
            const closed = await closeSale(data);
                
            if(closed.sale){
                swal(
                  'Venta finalizada!',
                  'Se completó la venta correctamente!',
                  'success'
                );
                
                dispatch({ type: "set", saleClosed: true });

            }else{
                swal("Error", VIEW_MESSAGE.DATA_SAVED_FAILED);
            }
        });
    }
}

export const startGettingSaleSummary = ( checkout_session_id ) => {
    return async (dispatch) => { 
        const res  = await getSalesSummary( checkout_session_id );
        if(res.summary){
            let salesSummary = res.summary;
            dispatch({ type: "set", salesSummary });
        }else{
            swal("Error", VIEW_MESSAGE.ERROR_DATA_LOADING);
        }
    }
}
