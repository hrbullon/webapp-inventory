import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { CAlert } from '@coreui/react';

import { prepareOptions } from 'src/helpers/helpers';
import { ActionButtons } from 'src/components/forms/ActionButtons';
import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { Barcode } from 'src/components/barcode/Barcode';

import { AuthContext } from 'src/context/AuthContext';
import Page403 from '../error/page403/Page403';

//Actions
import { startGettingCategory } from '../../actions/category';
import { startGettingProductById, startSendingProduct } from '../../actions/product';

export const Form = ({ title }) => {

    let { id } = useParams();
    let { user } = useContext(AuthContext);

    const dispatch = useDispatch()
    const model = useSelector((state) => state.product);
    const categories = useSelector((state) => state.categories);
    
    const defaultCategory = { value:'', label:'Seleccione una categoría' }

    const [options, setOptions] = useState([]);
    const [idCategory, setIdCategory] = useState(defaultCategory);
    const {register, handleSubmit, reset, watch, formState: { errors } } = useForm({ defaultValues:{} });

    useEffect(() => { dispatch( startGettingCategory() ) }, [])

    useEffect(() => { 
      if(model){

        if(model.category_id){
          const { Category } = model;
          setIdCategory({ value: Category.id, label: Category.name });
        }

        reset(model);
      }
    }, [model])

    useEffect(() => {
      if(categories && categories !== undefined){
        const items = prepareOptions(categories);
        setOptions(items);
      }
    }, [categories])
    
    useEffect(() => { (id && id !== undefined)? dispatch( startGettingProductById(id) ) : reset({}) }, [id])

    const handleChangingCategory = (input) => { input? setIdCategory(input) : setIdCategory(defaultCategory) }

    const onSubmit = async data => { 
      
      let formData = new FormData();

      formData.append("code", data.code);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category_id", idCategory.value);
      formData.append("brand", data.brand);
      formData.append("model", data.model);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      formData.append("image", data.image[0]);

      dispatch( startSendingProduct(formData, id) )
    } 

    if(user.role !== "ADM_ROLE"){
      return <Page403/>
    }

    return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{ title }</h5>
          <hr/>
          <CAlert color="primary" visible={(Object.entries(errors).length > 0 )}>
            Los campos con <b>*</b> son obligatorios
          </CAlert>
          <div className='row mt-4'>
            <div className="col-4">
              <div className="form-group">
                <label>Codigo/Serial:</label>
                <input type="text" className="form-control" name="code" {...register("code")} autoComplete='autoComplete' />
              </div>
              <div className="form-group">
                <label>Nombre: *</label>
                <input type="text" className="form-control" name="name" {...register("name", { required: true, maxLength: 150 }) } autoComplete='autoComplete'/>
                <ErrorValidate error={ errors.name }/>
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea className='form-control' name="description" {...register("description", { maxLength: 300 })} >
                </textarea>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label>Categoria:</label>
                <Select name="category_id" value={ idCategory }  options={options} onChange={handleChangingCategory}/>
              </div>
              <div className="form-group">
                <label>Marca:</label>
                <input type="text" className="form-control" name="brand" {...register("brand")} autoComplete='autoComplete'/>
              </div>
              <div className="form-group">
                <label>Modelo:</label>
                <input type="text" className="form-control" name="model" {...register("model")} autoComplete='autoComplete'/>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label>Imagen:</label>
                <input type="file" className="form-control" name="image" {...register("image")}/>
              </div>
              <div className="form-group mt-2">
                { watch("code") &&
                  <Barcode value={ watch("code") } />
                }
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-4'>
              <div className="form-group">
                <label>Precio: *</label>
                <input type="text" className="form-control" name="price" {...register("price", { required: true }) }/>
                <ErrorValidate error={ errors.price }/>
               </div>
            </div>
            <div className='col-4'>
              <div className="form-group">
                <label>Cantidad: *</label>
                <input type="text" className="form-control" name="quantity" {...register("quantity", { required: true }) }/>
                <ErrorValidate error={ errors.quantity }/>
              </div>
            </div>
          </div>
          <div className='row'>
            <ActionButtons />
          </div>
        </div>
      </div>
    </form>
  )
}
