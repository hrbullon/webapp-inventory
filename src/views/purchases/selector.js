import { formatNumber } from "src/helpers/helpers";

export const defaultValues = {
    code:'----',
    document:'',
    date: '',
    description: '',
    exchange_amount:0,
    total_amount:0,
    total_amount_converted:0,
    purchase_details: []
}

export const defaultValuesDetails = {
    defaultValues: {
        product: {},
        quantity: 1,
        price:"",
        priceConverted:"",
        salePrice: ""
    }
}

export const errorsDefault = {
    document:"",
    date: "",
    exchange_amount:"",
    purchase_details:""
}

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
   
    rows = data.map(({id, user_id, PurchaseDetails,...rest}) => rest);
    
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

    return rows
}

export const addRowDetail = (product, priceOne, priceTwo, quantity, salePrice) => {
    return  {
        product_id: product.id,
        code: product.code,
        description: product.name,
        quantity:quantity,
        price: priceOne,
        subtotal_amount: (priceOne*quantity),
        price_converted: priceTwo,
        salePrice: salePrice,
        subtotal_amount_converted: (priceTwo*quantity)
    };
}