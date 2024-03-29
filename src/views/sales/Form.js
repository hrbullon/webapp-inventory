import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import swal from 'sweetalert';
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { CardBasic } from './CardBasic';
import { CardTotal } from 'src/components/cards/CardTotal';
import { TableDetails } from 'src/components/product/TableDetails';

import { Form as FormCustomer } from 'src/views/customers/Form';

import { getProductById } from 'src/services/productsServices';
import { getCustomerByDni } from 'src/services/customersServices'
import { createSale } from 'src/services/salesServices';

import { formatDocument, getTotalDetail, prepareOptions } from 'src/helpers/helpers';
import { formatCurrency } from 'src/helpers/helpers';
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react';
import { AuthContext } from 'src/context/AuthContext';
import { startGettingProducts } from 'src/actions/product';
import { startGettingLastExchange } from 'src/actions/exchange';
import { addRowDetail } from './selector';

const Form = () => {

    const dispatch = useDispatch();
    const user = useContext(AuthContext);
    const products = useSelector(( state ) => state.products );
    const exchange = useSelector(( state ) => state.lastExchange );
    const customerSaved = useSelector( (state) => state.customerSaved );

    const checkoutId = JSON.parse(localStorage.getItem("checkoutId"));

    const [sale, setSale] = useState({
        code:'----',
        customer_id: null,
        date: new Date(Date.now()).toLocaleDateString(),
        description:'',
        checkout_id: checkoutId,
        exchange_amount:0,
        total_amount:0,
        total_amount_converted:0,
        sale_details: []
    });
    
    const [dni, setDni] = useState("");
    const [visible, setVisible] = useState(false);
    const [customer, setCustomer] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [options, setOptions] = useState([]);

    useEffect(() => {
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

    const fetchAll = async () => {

        dispatch( startGettingProducts() );
        dispatch( startGettingLastExchange() );
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
            const item = addRowDetail(product, quantity, sale);
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
            if(user.role == "ADM_ROLE"){
                window.location.href = "/#/sales";
            }else{
                window.location.href = "/#/sales/today/summary";
            }
        }else{
            swal("Oops","Algo salio mal al guardar los datos","warning");
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-8">
                    <div className="mb-3">
                        <input type="text" name="name" autoComplete='autoComplete' autoFocus className="form-control" onKeyUp={ (e) => handleFindCustomer(e) } placeholder="Seleccione un cliente"/>
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
                <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle>Agregar cliente</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <FormCustomer dni={ dni }/>
                </CModalBody>
                </CModal>
            </div>
        </Fragment>
    )
}

export default Form
