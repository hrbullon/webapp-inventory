export const parseDailySalesData = (data) => {
    
    let parsedData = [];

    if(data.length > 0){
        data.map( (item) => {
            
            //let { id, name } = item.Checkout;
            //let userFullname = `${item.User.firstname} ${item.User.lastname}`;
            
            //delete item.Checkout;
            //delete item.User;
    
            parsedData.push({
                daily_sale_id: item.id, 
                ...item,
            })
        });
    }

    return parsedData;
};