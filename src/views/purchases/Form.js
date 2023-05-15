import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import swal from 'sweetalert';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { getTotalDetail, prepareOptions } from 'src/helpers/helpers';
import { TableDetails } from 'src/components/product/TableDetails';
import { CardTotal } from 'src/components/cards/CardTotal';

import { formatCurrency } from 'src/helpers/helpers';

import { addRowDetail, 
         defaultValues, 
         defaultValuesDetails } from './selector';

//Actions
import { startGettingProducts } from 'src/actions/product';
import { startGettingLastExchange } from 'src/actions/exchange';
import { startCreatingPurchase } from 'src/actions/purchase';

const Form = () => {

    const dispatch = useDispatch();
    const products = useSelector(( state ) => state.products );
    const exchange = useSelector(( state ) => state.lastExchange );

    const [purchase, setPurchase] = useState(defaultValues);
    const [product, setProduct] = useState("");
    const [options, setOptions] = useState([]);

    const { 
        watch, 
        register, 
        getValues, 
        setValue} = useForm({ defaultValues: defaultValuesDetails });

    useEffect(() => {
        fetchAll();
    }, []);
  
    useEffect(() => {
        if(products && products !== undefined){
            const items = prepareOptions(products);
            setOptions(items);
        }

        if(exchange && exchange !== undefined){
            setPurchase({ ...purchase, exchange_amount: exchange.amount});
        }
    }, [ products, exchange ]);
    
    //Watchers
    useEffect(() => {
        if(watch("price") !== ""){
            const priceConverted = Number(watch("price"))*purchase.exchange_amount;
            setValue("priceConverted",priceConverted);
        }else{
            setValue("priceConverted","");
        }
    }, [watch("price")]);

    useEffect(() => {
        if(watch("priceConverted") !== ""){
            const price = Number(watch("priceConverted"))/purchase.exchange_amount;
            setValue("price",price);
        }else{
            setValue("price","");
        }
    }, [watch("priceConverted")]);
    
    useEffect(() => {

        if(purchase.purchase_details.length > 0){
            const { total, totalConverted } = getTotalDetail(purchase.purchase_details);
            setPurchase({ ...purchase, total_amount: total, total_amount_converted: totalConverted});
        }

    }, [purchase.purchase_details]);

    const fetchAll = async () => {

        dispatch( startGettingProducts() );
        dispatch( startGettingLastExchange() );
    }

    const handleChangingProduct = input => setProduct(input.value);

    const addRow = () => {

        const { quantity, price, priceConverted, salePrice } = getValues();

        if(quantity > 0 && product !== "" && (price !== "" || priceConverted !== "")) {
        
            let productFiltered = products.filter( item => item.id === product )[0];
            let price = Number(getValues("price")).toFixed(2);
            let priceConverted = Number(getValues("priceConverted")).toFixed(2);

            const item = addRowDetail(productFiltered, price, priceConverted, quantity, salePrice);
            setPurchase({ ...purchase, purchase_details: [ ...purchase.purchase_details, item] }) 
            
        }else{
            swal("Alerta","Debe seleccionar producto y precio","warning");
        }
    }

    const handleSubmit = () => {

        const { document, date, exchange_amount, purchase_details } = purchase;
        
        if(purchase_details.length == 0){
            swal("Error", "Debe agregar productos a la compra", "warning");
        }
       
        if(exchange_amount == ""){
            swal("Error", "No se ha encontrado una tasa de cambio válida", "warning");
        }

        if(document == ""){
            swal("Error", "Debe agregar un Nro Factura/Documento", "warning");
        }

        if(date == ""){
            swal("Error", "Debe seleccionar una fecha", "warning");
        }

        if(document && date && exchange_amount &&  purchase_details.length > 0){
            dispatch( startCreatingPurchase(purchase) )
        }
    };

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
                                <br/>
                                <br/>
                                <div className="col-6">
                                    <input type="number" name="quantity" {...register("quantity") } autoComplete='off' className="form-control"/>
                                </div>
                                <div className="col-4">
                                    <input type="number" name="price" {...register("price") } autoComplete='off' className="form-control" placeholder='Precio $US (Compra)'/>
                                </div>
                                <div className="col-4">
                                    <input type="number" name="priceConverted" {...register("priceConverted") } autoComplete='off' className="form-control" placeholder='Precio Bs. (Compra)'/>
                                </div>
                                <div className="col-4">
                                    <input type="number" name="salePrice" {...register("salePrice") } autoComplete='off' className="form-control" placeholder='Precio $US (Venta)'/>
                                </div>
                                <div className="col-12">
                                    <button type="button" onClick={ addRow } className='btn btn-sm btn-primary float-end mt-2' title='Agregar producto'>
                                        <CIcon icon={icon.cilPlus} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <TableDetails items={ purchase.purchase_details } model={purchase} setModel={setPurchase} doc={"purchase"}/>
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
