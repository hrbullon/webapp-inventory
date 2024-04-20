import swal from "sweetalert";

import { confirmDelete } from "src/helpers/helpers";
import { closeSale, deleteSale, getAllSales, getAllSalesMonth, getAllSalesToday, getSalesSummary } from "src/services/salesServices";
import { CLG_MESSAGE, VIEW_MESSAGE } from "src/strings";

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
                setTimeout( () => {
                    window.location.reload();
                }, 2000)
                
            }else{
                swal("Error", VIEW_MESSAGE.DATA_SAVED_FAILED);
            }
        });
    }
}

export const startClosingSale = (saleId) => {
    return async (dispatch) => {

        confirmDelete(`Quiere finalizar la venta`, async () => {
                
            const closed = await closeSale(saleId);
                
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

export const startGettingSaleSummary = ( checkoutId, date ) => {
    return async (dispatch) => { 
        const res  = await getSalesSummary( checkoutId, date );
        if(res.summary){
            let salesSummary = res.summary;
            dispatch({ type: "set", salesSummary });
        }else{
            swal("Error", VIEW_MESSAGE.ERROR_DATA_LOADING);
        }
    }
}
