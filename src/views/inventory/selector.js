export const prepareList = data => {

    let rows = [];

    data.map( item => {

        let subtotal = (Number(item.price)*Number(item.quantity));
        
        const row = {
            code: item.code,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            subtotal: subtotal.toString()
        };

        rows.push(row);
    });

    return rows;
}

export const getTotal = data => {
    return data.reduce( (acum, item) => acum += Number(item.subtotal), 0 );
}