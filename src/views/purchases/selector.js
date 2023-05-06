import { formatNumber } from "src/helpers/helpers";

export const prepareList = data => {

    let rows = [];

    if(Object.entries( data ).length > 0 ){
        data.map( purchase => {

            const row = {
                ...purchase,
                exchange_amount: purchase.exchange_amount,
                total_amount: purchase.total_amount,
                total_amount_converted: purchase.total_amount_converted,
                state: purchase.state == "1"? "Completada" : "Anulada"
            };
    
            rows.push(row);
        });
    }

    return rows;
}

export const getTotal = data => {
    const total = data.reduce( (acum, item) => acum += Number(item.total_amount), 0 );
    const totalConverted = data.reduce( (acum, item) => acum += Number(item.total_amount_converted), 0 );
    return { total, totalConverted }
}

export const getDataExport = (data, totalAmount, totalAmountConverted) => {

    let rows = [];

    if((Object.entries(data).length > 0)){
        
        let rows = data.map(({id, user_id, PurchaseDetails,...rest}) => rest);
        
        rows.push({
            code: "",
            date: "",
            description:"",
            document: "",
            exchange_amount: "Total ventas",
            state:"",
            total_amount: formatNumber(totalAmount),
            total_amount_converted: formatNumber(totalAmountConverted),
        });
    }

    return rows
}