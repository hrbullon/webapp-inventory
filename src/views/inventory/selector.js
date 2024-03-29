import { formatNumber } from "src/helpers/helpers";

export const prepareList = data => {

    let rows = [];

    data.map( item => {

        let subtotal = (Number(item.price)*Number(item.quantity));
        
        const row = {
            code: item.code? item.code : "S/I",
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            subtotal: formatNumber(subtotal.toString())
        };

        rows.push(row);
    });

    return rows;
}

export const getTotal = data => {
    return data.reduce( (acum, item) => acum += Number(item.subtotal), 0 );
}

export const getDataExport = (data, totalAmount) => {

    let rows = data.map(({...rest}) => rest);

    rows.push({
        code: "",
        name: "",
        quantity: "",
        price: "Total $US",
        subtotal: formatNumber(totalAmount),
    });

    return rows
}