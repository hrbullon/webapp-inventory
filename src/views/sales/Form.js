import React, { Fragment, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { CardBasic } from './CardBasic';
import { CardTotal } from 'src/components/cards/CardTotal';
import { CardExchange } from 'src/components/cards/CardExchange';

import { TableDetails } from 'src/components/product/TableDetails';

import { customerNofound, formatDocument, formatNumber } from 'src/helpers/helpers';

import { startGettingLastExchange } from 'src/actions/exchange';

import { AddDetails } from './AddDetails';
import { ModalPayment } from '../payments/ModalPayment';
import { ModalDiscount } from 'src/components/discount/ModalDiscount';
import { getCustomerByDni } from 'src/services/customersServices';
import { startClosingSale, startCreatingSale, startGettingSaleById } from 'src/actions/sales';
import { startGettingDiscountBySale } from 'src/actions/discount';

const Form = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const saleClosed = useSelector( (state) => state.saleClosed );
    const exchange = useSelector(( state ) => state.lastExchange );

    const discounts = useSelector(( state ) => state.discounts );
    const saleLoaded  = useSelector( (state) => state.saleLoaded );
    const saleCreated  = useSelector( (state) => state.saleCreated );
    const customerSaved = useSelector( (state) => state.customerSaved );
    const saleDetailsCreated   = useSelector( (state) => state.saleDetailsCreated   );

    const checkout_session_id = localStorage.getItem("checkout_session_id");
    const [saleId, setSaleId] = useState( JSON.parse(localStorage.getItem("sale_id")));

    const [sale, setSale] = useState({
        code:'----',
        type_of_sale:1,
        customer_id: null,
        date: new Date(Date.now()).toLocaleDateString(),
        description:'',
        checkout_session_id: checkout_session_id? checkout_session_id : '',
        exchange_amount:0,
        subtotal_amount:0,
        discount_amount:0,
        total_amount:0,
        subtotal_amount_converted:0,
        discount_amount_converted:0,
        total_amount_converted:0,
        total_amount_paid:0,
        SaleDetails: []
    });
    
    const [dni, setDni] = useState("");
    const [customer, setCustomer] = useState({});
    const [totalDiscount, setTotalDiscount] = useState({
        discount:0,
        discount_converted:0
    });

    useEffect(() => {
        dispatch( startGettingLastExchange() );
        dispatch( startGettingDiscountBySale(saleId) );
    }, []);

    useEffect(() => {
      if(saleId){
        dispatch( startGettingSaleById( saleId ) );
      }
    }, [saleId])

    useEffect(() => {
        if(saleLoaded){
            setSale(saleLoaded);
            setCustomer(saleLoaded.Customer);
        }
    }, [saleLoaded])

    useEffect(() => {
        if(exchange && exchange !== undefined){
            setSale({ ...sale, exchange_amount: exchange.amount});
        }
    }, [ exchange ]);

    useEffect(() => {
        if(saleCreated){
            //Save id on saleId
            setSaleId(saleCreated.id);
            ///Save on local in case of error to refresh and get data from localstorage
            localStorage.setItem('sale_id', saleCreated.id);
        }
    }, [saleCreated])

    useEffect(() => {
        if(saleDetailsCreated){
            setSale({
                ...sale,
                ...saleDetailsCreated 
            })
        }
    }, [saleDetailsCreated])
    
    useEffect(() => {
        if(sale && sale.id == undefined && sale.customer_id){
           dispatch( startCreatingSale( sale ) );
        }
    }, [sale])

    useEffect(() => {
        if(customerSaved && customerSaved !== undefined){
            setCustomer(customerSaved);
        }
    }, [customerSaved])

    useEffect(() => {
        if(customer && customer !== undefined){
            setSale({ ...sale, id: saleId, customer_id: customer.id });
        }
    }, [customer])

    useEffect(() => {

        if(saleClosed) {
            localStorage.removeItem('sale_id');
            window.location.reload();
        }
      
    }, [saleClosed])

    useEffect(() => {
        if(discounts){

            const discount = discounts.reduce((acum, value) => { return acum + value.discount }, 0);
            const discount_converted = discounts.reduce((acum, value) => { return acum + value.discount_converted }, 0);
            setTotalDiscount({...totalDiscount, discount, discount_converted});

            dispatch( startGettingSaleById( saleId ) );
        }
    }, [discounts])

    const handleFinnish  = async () => {
        dispatch( startClosingSale({ sale_id: saleId, description: sale.description }) );
    }

    const handleFindCustomer = async (evt) => {
        
        if(evt.key == "Enter"){

            const document = evt.target.value;
            const res = await getCustomerByDni(document);

            if(res.customer){
                setCustomer(res.customer);
            }else{

                setDni(document);
                setCustomer({});
                //Show modal Customer No Found
                customerNofound(document, navigate);
            }

        }else{
            return formatDocument(evt);
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-7">
                    <div className="card">
                        <div className="card-body bg-ligth">
                            <input 
                                type="text" 
                                name="name" 
                                autoComplete='autoComplete' 
                                autoFocus 
                                className="form-control m-1" 
                                placeholder="Seleccione un cliente"
                                onKeyUp={ (e) => handleFindCustomer(e) } 
                            />
                        </div>
                    </div>
                    <CardBasic customer={customer} />
                </div>

                <div className="col-5">
                    <CardExchange exchange_amount={ sale.exchange_amount } />
                    <CardTotal model={sale} />
                </div>

                <div className='col-12'>
                    <div className="card mt-3">
                        <div className="card-body">
                            <div className="mb-3">
                                <textarea 
                                    name="description" 
                                    value={ sale.description } 
                                    className="form-control" 
                                    placeholder="Aqui puede colocar una descripción o comentario"
                                    onChange={ (e) => setSale({...sale, description: e.target.value })} 
                                />
                            </div>
                        </div>
                    </div>
                </div>  

                <div className="col-12 mt-3">
                    {/* Add product to sale details */}
                    <AddDetails sale={sale} saleId={ saleId } />
                </div>

                <div className="col-12 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-12'>
                                    { saleId > 0 &&
                                    <>
                                        <ModalPayment 
                                            sale={ sale }
                                            saleId={ saleId }/>
                                        
                                        <ModalDiscount 
                                            sale={ sale }
                                            saleId={ saleId }
                                        />
                                    </>}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <TableDetails 
                                        items={ sale.SaleDetails } 
                                        model={sale} setModel={setSale}
                                        total={ false }/>
                                </div>   
                                <div className='col-8'></div>
                                <div className='col-2'>
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <td className='text-right'>Subtotal Bs.</td>
                                                <td  width={100} className='text-right'>{ formatNumber(sale.subtotal_amount_converted) }</td>
                                            </tr>
                                            <tr >
                                                <td className='text-right'>Descuento Bs.</td>
                                                <td  width={100} className='text-right'>{ formatNumber(totalDiscount.discount_converted) }</td>
                                            </tr>
                                            <tr >
                                                <td className='text-right'>Total Bs.</td>
                                                <td  width={100} className='text-right'>{ formatNumber(sale.subtotal_amount_converted-totalDiscount.discount_converted) }</td>
                                            </tr>
                                            <tr >
                                                <td className='text-right'>Pagado Bs.</td>
                                                <td  width={100} className='text-right'>{ formatNumber(sale.total_amount_paid*sale.exchange_amount) }</td>
                                            </tr>
                                            <tr >
                                                <td className='text-right'>Vuelto/Cambio Bs.</td>
                                                <td  width={100} className='text-right'>{ formatNumber((sale.total_amount_change*-1)*sale.exchange_amount) }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='col-2'>
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <td className='text-right'>Subtotal $US</td>
                                                <td  width={100} className='text-right'>{ formatNumber(sale.subtotal_amount) }</td>
                                            </tr>
                                            <tr >
                                                <td className='text-right'>Descuento $US</td>
                                                <td  width={100} className='text-right'>{ formatNumber(totalDiscount.discount) }</td>
                                            </tr>
                                            <tr >
                                                <td className='text-right'>Total $US</td>
                                                <td  width={100} className='text-right'>{ formatNumber(sale.subtotal_amount-totalDiscount.discount) }</td>
                                            </tr>
                                            <tr >
                                                <td className='text-right'>Pagado $USD.</td>
                                                <td  width={100} className='text-right'>{ formatNumber(sale.total_amount_paid) }</td>
                                            </tr>
                                            <tr >
                                                <td className='text-right'>Vuelto/Cambio $USD.</td>
                                                <td  width={100} className='text-right'>{ formatNumber(sale.total_amount_change*-1) }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                { saleId > 0 &&
                                    <div className='col-12'>
                                        <button onClick={ handleFinnish } className='btn btn-primary float-end'>
                                            <CIcon icon={ icon.cilCheckCircle } /> Finalizar
                                        </button>
                                    </div>
                                }
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Form
