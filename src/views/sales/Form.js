import React, { Fragment, useState, useEffect } from 'react'

import swal from 'sweetalert';
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import config from"../../config/config.json";

import { CardBasic } from './CardBasic';
import { CardSale } from './CardSale';
import { SaleDetails } from './SaleDetails';

import { getAllProducts } from 'src/services/productsServices';
import { getCustomerByDni } from 'src/services/customersServices'
import { prepareOptions } from 'src/helpers/helpers';
import { createSale } from 'src/services/salesServices';

const Form = () => {

    const [sale, setSale] = useState({
        code:'----',
        customer_id: null,
        date: new Date(Date.now()).toLocaleDateString(),
        total_amount:0,
        sale_details: []
    });
    console.log(config)
    const [customer, setCustomer] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);
    
    useEffect(() => {
        if(sale.sale_details.length > 0){
            let total = 0;
            sale.sale_details.map( item => {  total += item.subtotal_amount });
            setSale({ ...sale, total_amount: total});
        }
    }, [sale.sale_details]);

    const fetchProducts = async () => {
        const res = await getAllProducts();
        setProducts(res.products);
        const items = await prepareOptions(res.products);
        setOptions(items);
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

        const item = {
            product_id: product.id,
            description: product.name,
            quantity:quantity,
            price: product.price,
            subtotal_amount: (Number(product.price)*quantity)
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
                    <CardSale sale={sale} />
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
                            <SaleDetails items={ sale.sale_details } sale={sale} setSale={setSale}/>
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
