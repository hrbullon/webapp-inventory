import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import swal from 'sweetalert';
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { CardBasic } from './CardBasic';
import { CardTotal } from 'src/components/cards/CardTotal';
import { TableDetails } from 'src/components/product/TableDetails';

import { getAllProducts, getProductById } from 'src/services/productsServices';
import { getCustomerByDni } from 'src/services/customersServices'
import { createSale } from 'src/services/salesServices';
import { getLastExchange } from 'src/services/exchangesServices';

import { formatDocument, prepareOptions } from 'src/helpers/helpers';
import { formatCurrency } from 'src/helpers/helpers';

const Form = () => {

    const customerSaved = useSelector( (state) => state.customerSaved );

    const [sale, setSale] = useState({
        code:'----',
        customer_id: null,
        date: new Date(Date.now()).toLocaleDateString(),
        description:'',
        exchange_amount:0,
        total_amount:0,
        total_amount_converted:0,
        sale_details: []
    });
    

    const [dni, setDni] = useState("");
    const [visible, setVisible] = useState(false);
    const [customer, setCustomer] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        if(customerSaved && customerSaved !== undefined){
            setSale({
                ...sale,
                customer_id: customerSaved.id
            })
            setCustomer(customerSaved);
            setVisible(false);
        }
    }, [customerSaved])
    
    
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
                setDni(evt.target.value);
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
                        setVisible(true);
                    }
                })
            }
        }else{
            return formatDocument(evt);
        }
    }

    const handleChangingProduct = async (input) => {
        
        const res = await getProductById(input.value);
        const { product } = res;

        const productFiltered = sale.sale_details.filter( item => item.product_id == product.id );
        let total = productFiltered.reduce((acum, product) => acum + Number(product.quantity), 0);

        if(Number(product.quantity) >= (total+Number(quantity))) {

            const price_converted = (Number(product.price)*sale.exchange_amount);
            const item = {
                product_id: product.id,
                code: product.code,
                description: product.name,
                quantity:quantity,
                price: product.price,
                subtotal_amount: (Number(product.price)*quantity),
                price_converted: price_converted,
                subtotal_amount_converted: (price_converted*quantity)
            };
    
            setSale({ ...sale, 
                sale_details: [ ...sale.sale_details, item]
            })
        }else{
            swal("Alerta", `Cantidad: ${ quantity } no disponible, quedan ${ (product.quantity-total) }`,'warning');
        }
        
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

                <div className='col-12'>
                    <div className="card mt-3">
                        <div className="card-body">
                            <div className="mb-3">
                                <textarea name="description" value={ sale.description } onChange={ (e) => setSale({...sale, description: e.target.value })} className="form-control" placeholder="Aqui puede colocar una descripción o comentario"/>
                            </div>
                        </div>
                    </div>
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
