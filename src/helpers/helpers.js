import config from "../config/config.json";
const { API_URL } = config;

export const fetchData = async ( url, method , body = {}, multipart = false) => {
    
    let options = {}

    const token = localStorage.getItem("token");

    if(method == "GET" || method == "HEAD"){
        options = { 
            method: method, 
            headers: { 
                'Content-Type': 'application/json',
                'token':token
            },
        }
    }else{
        options = { 
            method: method, 
            headers: multipart?  { 'token' : token } : { 'Content-Type': 'application/json', 'token': token },
            body: (multipart)? body : JSON.stringify(body)
        }
    }
    
    return await fetch(`${API_URL}/${url}`, options)
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

export const formatCurrency = (amount, local = false) => {

    if(!local){
        return new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD' 
        }).format(amount);    
    }

    if(local){
        return new Intl.NumberFormat('es-VE', { 
            style: 'currency', 
            currency: 'VES'
        }).format(amount);    
    }
}

export const printHTML = (id) => {

    var content = document.getElementById(id).innerHTML;
    var printWindow = window.open('', '');
    
    printWindow.document.write('<html><head>');
    printWindow.document.write('<link href="/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">');
    printWindow.document.write('</head><body >');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
        console.log(printWindow);
    }, 1000);
}