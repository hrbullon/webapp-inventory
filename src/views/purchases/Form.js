import React, { Fragment, useState, useEffect } from 'react'

import swal from 'sweetalert';
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { prepareOptions } from 'src/helpers/helpers';
import { TableDetails } from 'src/components/product/TableDetails';
import { CardTotal } from 'src/components/cards/CardTotal';

import { formatCurrency } from 'src/helpers/helpers';

import { getAllProducts } from 'src/services/productsServices';
import { createPurchase } from 'src/services/purchasesServices';
import { getLastExchange } from 'src/services/exchangesServices';

const Form = () => {

    const [purchase, setPurchase] = useState({
        code:'----',
        document:'',
        date: '',
        description: '',
        exchange_amount:0,
        total_amount:0,
        total_amount_converted:0,
        purchase_details: []
    });
    
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchAll();
    }, []);
    
    useEffect(() => {

        if(purchase.purchase_details.length > 0){
            
            let total = 0;
            let totalConverted = 0;

            purchase.purchase_details.map( item => {  total += item.subtotal_amount });
            purchase.purchase_details.map( item => {  totalConverted += item.subtotal_amount_converted });

            setPurchase({ ...purchase, total_amount: total, total_amount_converted: totalConverted});
        }
    }, [purchase.purchase_details]);

    const fetchAll = async () => {
        const res = await getAllProducts();
        setProducts(res.products);
        const items = await prepareOptions(res.products);
        setOptions(items);
        const resExchange = await getLastExchange();
        setPurchase({ ...purchase, exchange_amount: resExchange.exchanges[0].amount});
    }

    const handleChangingProduct = (input) => {
        
        const product = products.filter( item => item.id === input.value )[0];
        const price_converted = (Number(product.price)*purchase.exchange_amount);
        
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

        setPurchase({ ...purchase, 
            purchase_details: [ ...purchase.purchase_details, item]
        })
    }

    const handleSubmit = async () => {

        let res = await createPurchase(purchase);
        if(res.purchase){
            swal("Completado!", "Datos guardados!", "success");
            //window.location.href = "/#/purchases";
        }else{
            swal("Oops","Algo salio mal al guardar los datos","warning");
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-3">
                                <label>Fecha de factura/documento</label>
                                
                                <input 
                                    type="date" 
                                    name="date" 
                                    className='form-control' 
                                    value={ purchase.date } 
                                    onChange={ (e) => setPurchase({...purchase, date: e.target.value}) }    
                                    placeholder='Seleccione una fecha de factura o documento' />

                            </div>
                            <div className="mb-3">
                                <label>Nro Factura/Documento</label>
                                
                                <input 
                                    type="text" 
                                    name="document" 
                                    className='form-control' 
                                    value={ purchase.document } 
                                    onChange={ (e) => setPurchase({...purchase, document: e.target.value}) }    
                                    placeholder='Seleccione una fecha de factura o documento' />

                            </div>
                            <div className="mb-3">
                                <label>Observaciones</label>

                                <textarea 
                                    name="description" 
                                    className='form-control' 
                                    value={ purchase.description } 
                                    onChange={ (e) => setPurchase({...purchase, description: e.target.value}) }    
                                    placeholder='Escriba un comentario u observación si lo considera necesario' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body bg-info">
                            { purchase.exchange_amount && 
                                <b style={{ fontSize: "29px"}}>Tasa: {  formatCurrency(purchase.exchange_amount, true) }</b>
                            }    
                        </div>
                    </div>
                    <CardTotal model={purchase} />
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
                            <TableDetails items={ purchase.purchase_details } model={purchase} setModel={setPurchase}/>
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
