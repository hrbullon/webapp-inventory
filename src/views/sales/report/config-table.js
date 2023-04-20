export const headerOptions = [
    {
        name:"code",
        prompt:"Nro. Venta",
        width: 25,
    },
    {
        name:"code_product",
        prompt:"Cod. Producto",
        width: 20,
    },
    {
        name:"description",
        prompt:"Descripción",
        width: 50,
    },
    {
        name:"quantity",
        prompt:"Cantidad",
        align:"center",
        width: 25,
    },
    {
        name:"exchange_amount",
        prompt:"Tasa cambio",
        align:"center",
        width: 25,
    },
    {
        name:"price",
        prompt:"Precio $US",
        align:"center",
        width: 30,
    },
    {
        name:"subtotal_amount",
        prompt:"Sub. $US",
        align:"center",
        width: 25,
    },
    {
        name:"price_converted",
        prompt:"Precio Bs.",
        align:"center",
        width: 25,
    },
    {
        name:"subtotal_amount_converted",
        prompt:"Sub. Bs.",
        align:"center",
        width: 30,
    }
];

export const columns = [
    {
        name: 'Nro. Venta',
        sortable:true,
        selector: row => row.code,
    },
    {
        name: 'Código Producto',
        sortable:true,
        selector: row => row.code_product,
    },
    {
        name: 'Descripción',
        sortable:true,
        selector: row => row.description,
    },
    {
        name: 'Cantidad',
        sortable:true,
        right: true,
        selector: row => row.quantity,
    },
    {
        name: 'Tasa Cambio',
        sortable:true,
        right: true,
        selector: row => row.exchange_amount,
    },
    {
        name: 'Precio $US',
        sortable:true,
        right: true,
        selector: row => row.price,
    },
    {
        name: 'Subtotal $US',
        sortable:true,
        right: true,
        selector: row => row.subtotal_amount,
    },
    {
        name: 'Precio Bs.',
        sortable:true,
        right: true,
        selector: row => row.price_converted,
    },
    {
        name: 'Subtotal Bs.',
        sortable:true,
        right: true,
        selector: row => row.subtotal_amount_converted,
    },
];