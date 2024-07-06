export const parseDailySalesData = (data) => {
    
    let parsedData = [];

    if(data.length > 0){
        data.map( (item) => {
            parsedData.push({
                daily_sale_id: item.id, 
                ...item,
            })
        });
    }

    return parsedData;
};