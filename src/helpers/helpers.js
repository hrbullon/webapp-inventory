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