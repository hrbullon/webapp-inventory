import { formatNumber } from "src/helpers/helpers";

export const totalize = (data) => {
   
    let average = 0;
    let totalQuantity = 0;
    let totalSales = 0;
    let totalSalesConverted = 0;
    let totalExchanges = 0;
    
    if(Object.keys(data).length > 0){
        data.map( item => {
    
            totalQuantity += Number(item.quantity);
            totalExchanges += Number(item.Sale.exchange_amount);
            totalSales += Number(item.subtotal_amount);
            totalSalesConverted += Number(item.subtotal_amount_converted);
    
        });
        average = data.length > 0| (totalExchanges/data.length);
    }

    return {
        average,
        totalSales,
        totalQuantity,
        totalSalesConverted
    }
}

export const getBestSeller = (data) => {

    const totals = data.reduce((acc, cur) => {
        acc[cur.description] = (acc[cur.description] || 0) + Number(cur.quantity);
        return acc;
    }, {});

    const items = []; 
    
    Object.keys(totals).map( item => {
        items.push({
            description: item,
            quantity: totals[item]
        })
    })

    if(items.length > 0 ){
        const maxQuantityItem = items.reduce((prev, curr) => {
            return (curr.quantity > prev.quantity) ? curr : prev;
        });

        return {
            description: maxQuantityItem.description,
            quantity: maxQuantityItem.quantity
        };
    }

    return {
        description:"",
        quantity: 0
    }
}

export const prepareList = data => {

    let rows = [];

    data.map( item => {

        const row = {
            code: item.Sale.code,
            code_product: item.code? item.code.toString() : "S/I",
            description: item.description,
            quantity: item.quantity,
            exchange_amount: formatNumber(item.Sale.exchange_amount),
            price: formatNumber(item.price),
            subtotal_amount: formatNumber(item.subtotal_amount),
            price_converted: formatNumber(item.price_converted),
            subtotal_amount_converted: formatNumber(item.subtotal_amount_converted)
        };

        rows.push(row);
    });

    return rows;
}

export const getDataExport = (data, totalAmount, totalAmountConverted) => {

    let rows = data.map(({Customer, SaleDetails, Sale,...rest}) => rest);

    rows.push({
        code: "",
        code_product: "",
        description:"",
        quantity: "",
        exchange_amount: "",
        price: "Total $US",
        subtotal_amount: formatNumber(totalAmount),
        price_converted: "Total Bs.",
        subtotal_amount_converted: formatNumber(totalAmountConverted)
    });

    return rows
}

export const getSalesAndPaymentsWIthTotalAmount = (items, type) => {
    
    let rows = [...items];
    
    let totalQuantity = 0;
    let totalAmount = 0;
    let totalAmountConverted = 0;

    items.map( (item) => {
        totalQuantity += Number(item.quantity);
        totalAmount += Number(item.total_amount);
        totalAmountConverted += Number(item.total_amount_converted);
    })

    if(type == "sales"){
        rows.push({ 
            product: "",
            quantity: formatNumber(totalQuantity),
            total_amount: formatNumber(totalAmount),
            total_amount_converted: formatNumber(totalAmountConverted),
        });
    }else{
        rows.push({ 
            payment_method: "",
            total_amount: formatNumber(totalAmount),
            total_amount_converted: formatNumber(totalAmountConverted),
        });
    }

    return rows;
}