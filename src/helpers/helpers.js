import swal from "sweetalert";

import config from "../config/config.json";
import { CLG_MESSAGE } from "src/strings";
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
    .then(response => {

        if(response.status == 401){

            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("checkoutId");
            localStorage.removeItem("started_session_pos");

            window.location.href = "#/auth/login";
        }
        
        return response.json();
    })
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

export const formatDocument = (event) => {

    const string = event.target.value.slice(0,1);

    if(string !== ""){
      const value = event.target.value.replace(/\D/g,'').slice(0, 9);
      event.target.value = `${string.toUpperCase()}-${value}`;
      return event.target.value;
    }
}

export const formatNumber = (number) => {
    return number.toLocaleString('es', {minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const getTotalByColum = (rows, column) => {
    return rows.reduce((acum, row) =>  { return acum += Number(row[column]) }, 0);
}

export const getTotalDetail = (items) => {

    let total = 0;
    let totalConverted = 0;

    items.map( item => {  total += item.subtotal_amount });
    items.map( item => {  totalConverted += item.subtotal_amount_converted });
    return { total, totalConverted };
}

export const printHTML = (id) => {

    var content = document.getElementById(id).innerHTML;
    var printWindow = window.open('', '');
    
    printWindow.document.write('<html><head>');
    printWindow.document.write('<link href="/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">');
    printWindow.document.write('</head><body >');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
        console.log(printWindow);
    }, 1000);
}

export const confirmDelete = (message, callback) => {
    
    swal({
        title: 'Estás seguro?',
        text: message,
        icon: 'warning',
        dangerMode: true,
        buttons: {
            cancel: {
              text: "Cancelar",
              value: null,
              visible: true,
              closeModal: true,
            },
            confirm: {
              text: "Procesar",
              className: "primary",
              value: true,
              visible: true,
              closeModal: true
            }
        }
      }).then( (result) => { 
        if (result) {
            callback();
        }
      });
}

export const confirmSave = (callback) => {

    swal({
        title: 'Estás seguro?',
        text: 'Desea guardar los cambios',
        icon: 'info',
        dangerMode: false,
        buttons: {
            cancel: {
              text: "Cancelar",
              value: null,
              visible: true,
              closeModal: true,
            },
            confirm: {
              text: "Procesar",
              className: "primary",
              value: true,
              visible: true,
              closeModal: true
            }
        }
      }).then( (result) => { 
        if (result) {
            callback();
        }
    });

}

export const customerNofound = (document, navigate) => {
    swal({
        title:'Oops',
        text:'Cliente no registrado en el Sistema',
        icon: "warning",
        buttons: {
            cancel: true,
            roll: {
                text: "Registrar cliente",
                value: "customer_register",
            },
        }
    }).then((result) => {
        if(result == "customer_register"){
            navigate(`/customers/create?document=${ document }`);
        }
    })
}

export const handleLoadingError = () => {
    console.error(CLG_MESSAGE.ERROR_DATA_LOADING);            
}

export const handleSavingError = () => {
    console.error(CLG_MESSAGE.ERROR_DATA_SAVING);            
}