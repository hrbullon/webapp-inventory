import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import swal from 'sweetalert';
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { CardBasic } from './CardBasic';
import { CardTotal } from 'src/components/cards/CardTotal';
import { TableDetails } from 'src/components/product/TableDetails';
import { TableDetails as PaymentDetails} from 'src/components/payment/TableDetails';

import { getProductById } from 'src/services/productsServices';
import { getCustomerByDni } from 'src/services/customersServices'
import { createSale } from 'src/services/salesServices';

import { formatDocument, getTotalDetail, prepareOptions } from 'src/helpers/helpers';
import { formatCurrency } from 'src/helpers/helpers';
import { CModal, CModalBody, CModalHeader, CTable } from '@coreui/react';
import { AuthContext } from 'src/context/AuthContext';

import { startGettingProductsWithStock } from 'src/actions/product';
import { startGettingLastExchange } from 'src/actions/exchange';
import { startGettingPayments } from 'src/actions/payment';

import { addRowDetail, getTotal } from './selector';
import { FormPayment } from '../payments/FormPayment';
import { startClosingSale } from 'src/actions/sales';

const Form = () => {

    const dispatch = useDispatch();

    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const products = useSelector(( state ) => state.products );
    const payments = useSelector(( state ) => state.payments );
    const saleClosed = useSelector( (state) => state.saleClosed );
    const exchange = useSelector(( state ) => state.lastExchange );
    const customerSaved = useSelector( (state) => state.customerSaved );

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
        total_amount:0,
        total_amount_converted:0,
        sale_details: []
    });
    
    const [dni, setDni] = useState("");
    const [visible, setVisible] = useState(false);
    const [customer, setCustomer] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [serial, setSerial] = useState("");
    const [options, setOptions] = useState([]);
    const [totalPayments, setTotalPayments] = useState(0);

    useEffect(() => {
        checkSaleExist();
        fetchAll();
    }, []);

    useEffect(() => {
        if(products && products !== undefined){
            const items = prepareOptions(products);
            setOptions(items);
        }

        if(exchange && exchange !== undefined){
            setSale({ ...sale, exchange_amount: exchange.amount});
        }
    }, [ products, exchange ]);

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
            const { total, totalConverted } = getTotalDetail(sale.sale_details);
            setSale({ ...sale, total_amount: total, total_amount_converted: totalConverted});
        }

    }, [sale.sale_details]);

    useEffect(() => {
      
        if(payments){
            let { total } = getTotal(payments);
            setTotalPayments( total );
        }

    }, [payments])

    useEffect(() => {

        if(saleClosed) {

            localStorage.removeItem('sale');
            localStorage.removeItem('sale_id');
            localStorage.removeItem('customer');
    
            window.location.reload();
        }
      
    }, [saleClosed])

    const fetchAll = async () => {

        dispatch( startGettingProductsWithStock() );
        dispatch( startGettingLastExchange() );
        dispatch( startGettingPayments(saleId) );
    }

    const checkSaleExist = () => {

        let sale = localStorage.getItem('sale');
        let saleId = localStorage.getItem('sale_id');
        let customer = localStorage.getItem('customer');
    
        if(sale && saleId){

            sale = JSON.parse(sale);
            saleId = JSON.parse(saleId);
            customer = JSON.parse(customer);

            setSale(sale);
            setSaleId(saleId);
            setCustomer(customer);
        }
    }

    const handleFindCustomer = async (evt) => {
        if(evt.key == "Enter"){
            const document = evt.target.value;
            const res = await getCustomerByDni(document);
            if(res.customer){
                setSale({ ...sale, 
                    customer_id: res.customer.id,
                })
                setCustomer(res.customer);
            }else{

                setDni(document);
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
                        navigate(`/customers/create?document=${ document }`);
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
            const item = addRowDetail({ product, quantity, sale, serial});
            setSale({ ...sale, 
                sale_details: [ ...sale.sale_details, item]
            })

            setSerial("");

        }else{
            swal("Alerta", `Cantidad: ${ quantity } no disponible, quedan ${ (product.quantity-total) }`,'warning');
        }
        
    }

    const handleClickFinnish = async () => {
       const data = { checkout_session_id, sale_id: saleId }; 
       dispatch( startClosingSale( data ) );
    }

    const handleSubmit = async () => {

        //saleId > 0 it's just because sale has been saved
        if(!saleId){

            let res = await createSale(sale);
  
            if(res.sale){
    
                //Save id on saleId
                setSaleId(res.sale.id);
                setVisible(true);

                ///Save on local in case of error to refresh and get data from localstorage
                localStorage.setItem('sale_id', res.sale.id);
                localStorage.setItem('customer', JSON.stringify(customer));
                localStorage.setItem('sale', JSON.stringify(sale));

    
            }else{
                swal("Oops","Algo salio mal al guardar los datos","warning");
            }
        }else{
            setVisible(true);
        }

    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-7">
                    <div className="mb-3">
                        <input type="text" name="name" autoComplete='autoComplete' autoFocus className="form-control" onKeyUp={ (e) => handleFindCustomer(e) } placeholder="Seleccione un cliente"/>
                    </div>
                    <CardBasic customer={customer} />
                </div>

                <div className="col-3">
                    <div className="card">
                        <div className="card-body bg-info">
                            { sale.exchange_amount && 
                                <b style={{ fontSize: "29px"}}>Tasa: {  formatCurrency(sale.exchange_amount, true) }</b>
                            }    
                        </div>
                    </div>
                    <CardTotal model={sale} />
                </div>

                <div className="col-2 text-right">
                    { sale.sale_details.length > 0 &&
                        <button type='button' onClick={ handleSubmit } className='btn btn-warning m-2'>
                            <CIcon icon={icon.cilDollar} title='Cobrar venta'/> Cobrar
                        </button>
                    }
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
                                <div className="col-4">
                                    <input type="text" name="serial" placeholder='Número Serial ej. xxxx-xxxx' value={ serial } onChange={ (e) => setSerial(e.target.value) } autoComplete='off' className="form-control"/>
                                </div>
                                <div className="col-4">
                                    <input type="number" name="quantity" value={ quantity } onChange={ (e) => setQuantity(e.target.value) } autoComplete='off' className="form-control"/>
                                </div>
                                <div className="col-4">
                                    <Select options={options} onChange={handleChangingProduct}/>
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

                <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)}>
                    <h2>Monto a cobrar 
                        <b className='text-danger'> { formatCurrency(sale.total_amount) }</b> 
                    </h2>
                </CModalHeader>
                <CModalBody>
                    <div className='row'>
                        <div className='col-6'>
                            <FormPayment sale={sale} saleId={saleId} totalPayments={ totalPayments }  exchangeAmount={ sale.exchange_amount }/>
                        </div>
                        <div className='col-6'>
                            <CardTotal model={sale} />
                        </div>
                        <div className='col-12 mb-3'>
                            <PaymentDetails items={ payments } />
                        </div>

                        <div className='col-12 mb-3 text-right'>
                            { (sale.total_amount <= totalPayments) &&
                            <button type='button' onClick={ handleClickFinnish } className='btn btn-success m-2'>
                                <CIcon icon={icon.cilCheck} title='Finalizar'/> Finalizar
                            </button>
                            }
                        </div>
                    </div>
                </CModalBody>
                </CModal>
            </div>
        </Fragment>
    )
}

export default Form
