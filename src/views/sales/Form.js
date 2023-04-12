import React, { Fragment, useState, useEffect } from 'react'

import swal from 'sweetalert';
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import config from"../../config/config.json";

import { CardBasic } from './CardBasic';
import { CardTotal } from 'src/components/cards/CardTotal';
import { TableDetails } from 'src/components/product/TableDetails';

import { getAllProducts } from 'src/services/productsServices';
import { getCustomerByDni } from 'src/services/customersServices'
import { prepareOptions } from 'src/helpers/helpers';
import { createSale } from 'src/services/salesServices';
import { getLastExchange } from 'src/services/exchangesServices';
import { formatCurrency } from 'src/helpers/helpers';

const Form = () => {

    const [sale, setSale] = useState({
        code:'----',
        customer_id: null,
        date: new Date(Date.now()).toLocaleDateString(),
        exchange_amount:0,
        total_amount:0,
        total_amount_converted:0,
        sale_details: []
    });
    
    const [customer, setCustomer] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchAll();
    }, []);
    
    useEffect(() => {

        if(sale.sale_details.length > 0){
            
            let total = 0;
            let totalConverted = 0;

            sale.sale_details.map( item => {  total += item.subtotal_amount });
            sale.sale_details.map( item => {  totalConverted += item.subtotal_amount_converted });
            
            setSale({ ...sale, total_amount: total, total_amount_converted: totalConverted});
        }
    }, [sale.sale_details]);

    const fetchAll = async () => {
        const res = await getAllProducts();
        setProducts(res.products);
        const items = await prepareOptions(res.products);
        setOptions(items);
        const resExchange = await getLastExchange();
        setSale({ ...sale, exchange_amount: resExchange.exchanges[0].amount});
    }

    const handleFindCustomer = async (evt) => {
        if(evt.key == "Enter"){
            const res = await getCustomerByDni(evt.target.value);
            if(res.customer){
                setSale({ ...sale, 
                    customer_id: res.customer.id,
                })
                setCustomer(res.customer);
            }else{
                setCustomer({});

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
                        window.open(`${config.BASE_URL}/#/customers/create`, '_blank');
                    }
                })
            }
        }
    }

    const handleChangingProduct = (input) => {
        
        const product = products.filter( item => item.id === input.value )[0];
        const price_converted = (Number(product.price)*sale.exchange_amount);
        
        const item = {
            product_id: product.id,
            code: product.code,
            description: product.name,
            quantity:quantity,
            price: product.price,//$US by default
            subtotal_amount: (Number(product.price)*quantity),//$US by default
            price_converted: price_converted,//For example Bs
            subtotal_amount_converted: (price_converted*quantity)//For example Bs
        };

        setSale({ ...sale, 
            sale_details: [ ...sale.sale_details, item]
        })
    }

    const handleSubmit = async () => {

        let res = await createSale(sale);
        if(res.sale){
            swal("Completado!", "Datos guardados!", "success");
            window.location.href = "/#/sales";
        }else{
            swal("Oops","Algo salio mal al guardar los datos","warning");
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-8">
                    <div className="mb-3">
                        <input type="text" name="name" autoFocus className="form-control" onKeyUp={ (e) => handleFindCustomer(e) } placeholder="Seleccione un cliente"/>
                    </div>
                    <CardBasic customer={customer} />
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body bg-info">
                            { sale.exchange_amount && 
                                <b style={{ fontSize: "29px"}}>Tasa: {  formatCurrency(sale.exchange_amount, true) }</b>
                            }    
                        </div>
                    </div>
                    <CardTotal model={sale} />
                </div>
                <div className="col-12 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-6">
                                    <Select options={options} onChange={handleChangingProduct}/>
                                </div>
                                <div className="col-6">
                                    <input type="number" name="quantity" value={ quantity } onChange={ (e) => setQuantity(e.target.value) } autoComplete='off' className="form-control"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <TableDetails items={ sale.sale_details } model={sale} setModel={setSale}/>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-2">
                    <button type='button' onClick={ handleSubmit } className='btn btn-primary'>
                        <CIcon icon={icon.cilSave} title='Guardar datos'/> Guardar
                    </button>
                    <button type='reset' className='btn btn-secondary m-2'>
                        <CIcon icon={icon.cilReload} title='Cancelar'/> Cancelar
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default Form
