export const fetchData = async ( url, method , body = {}) => {
    
    let options = {}

    if(method == "GET" || method == "HEAD"){
        options = { 
            method: method, 
            headers: { 'Content-Type': 'application/json' },
        }
    }else{
        options = { 
            method: method, 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
    }
    
    return await fetch(url, options)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
}

export const prepareOptions = (data) => {
    let items = []
    
    Object.keys(data).map( (key) => {
        items.push({ value: data[key].id, label: data[key].name }) 
    })

    return items
}

export const deleteItem = (data, deleted) => {

    let updatedArray = []

    Object.keys(data).map( (key) => {
        if(data[key].product_id !== deleted.product_id){
            updatedArray.push({ ...data[key] }) 
        }
    })

    return updatedArray
}