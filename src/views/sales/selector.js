import { formatNumber } from "src/helpers/helpers";

export const prepareList = data => {

    let rows = [];

    data.map( sale => {

        const row = {
            id: sale.id.toString(),
            code: sale.code,
            name: sale.Customer.name,
            date: sale.date,
            description: sale.description? sale.description : "N/A",
            Customer: sale.Customer,
            SaleDetails: sale.SaleDetails,
            exchange_amount: sale.exchange_amount,
            total_amount: sale.total_amount,
            total_amount_converted: sale.total_amount_converted,
            state: sale.state === "0"? "Pendiente" : sale.state === "1"?  "Completada" : "Anulada"
        };

        rows.push(row);
    });

    return rows;
}

export const getTotal = data => {
    const total = data.reduce( (acum, item) => acum += Number(item.total_amount), 0 );
    const totalConverted = data.reduce( (acum, item) => acum += Number(item.total_amount_converted), 0 );
    return { total, totalConverted }
}

export const addRowDetail = ({ product, quantity, sale, serial }) => {

    const price_converted = (Number(product.price)*sale.exchange_amount);

    const item = {
        product_id: product.id,
        code: product.code,
        serial: serial,
        description: product.name,
        quantity:quantity,
        price: product.price,
        subtotal_amount: (Number(product.price)*quantity),
        price_converted: price_converted,
        subtotal_amount_converted: (price_converted*quantity)
    };

    return item;
}

export const getDataExport = (data, totalAmount, totalAmountConverted) => {

    let rows = data.map(({id, Customer, SaleDetails, Sale,...rest}) => rest);

    rows.push({
        code: "",
        name: "",
        date: "",
        description:"",
        exchange_amount: "Total ventas",
        total_amount: formatNumber(totalAmount),
        total_amount_converted: formatNumber(totalAmountConverted),
        state:""
    });

    return rows
}