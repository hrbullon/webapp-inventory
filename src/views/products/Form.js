import React, { useState, useEffect } from 'react';

import swal from 'sweetalert';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { CAlert } from '@coreui/react';

import { prepareOptions } from 'src/helpers/helpers';
import { ActionButtons } from 'src/components/forms/ActionButtons';
import { ErrorValidate } from 'src/components/forms/ErrorValidate';

import { getAllCategories } from 'src/services/categoriesServices';
import { createProduct, getProductById, updateProduct } from 'src/services/productsServices';

export const Form = ({ title }) => {

    let { id } = useParams();

    const defaultCategory = {
      value:'',
      label:'Seleccione una categoría'
    }

    const [idCategory, setIdCategory] = useState(defaultCategory);
    const {register, handleSubmit, reset, formState: { errors } } = useForm();
    
    const [options, setOptions] = useState([]);
   

    useEffect(() => {
      fetchCategories();
    }, [])
    

    useEffect(() => {
      if(id && id !== undefined){
          getProductDetail(id);
      }
    }, [id])
    
    const getProductDetail = async (id) => {

      const res = await getProductById(id);

      if(res.product.category_id){
        const { Category } = res.product;
        setIdCategory({ value: Category.id, label: Category.name });
      }

      reset(res.product);
    }

    const fetchCategories = async () => {
      const res = await getAllCategories();
      const items = prepareOptions(res.categories);
      setOptions(items);
    }

    const handleChangingCategory = (input) => {
      if(input){
        setIdCategory(input)
      } else {
        setIdCategory({value:"", label: "Seleccione una categoría"})
      }
    }

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

      let res;
  
      if(!id){
          res = await createProduct(formData);
      }else{
          res = await updateProduct(id, formData);
      }

      if(res.product){
          (id)? reset(data) : reset();
          swal("Completado!", "Datos guardados!", "success");
      }else{
          swal("Oops","Algo salio mal al guardar los datos","warning");
      }
    } 

    return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{ title }</h5>
          <hr/>
          <CAlert color="primary" visible={true}>
            Los campos con <b>*</b> son obligatorios
          </CAlert>
          <div className='row mt-5'>
            <div className="col-4">
              <div className="form-group">
                <label>Codigo/Serial:</label>
                <input type="text" className="form-control" name="code" {...register("code")}/>
              </div>
              <div className="form-group">
                <label>Nombre: *</label>
                <input type="text" className="form-control" name="name" {...register("name", { required: true, maxLength: 150 }) }/>
                <ErrorValidate error={ errors.name }/>
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea className='form-control' name="description" {...register("description", { maxLength: 300 })}>
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
                <input type="text" className="form-control" name="brand" {...register("brand")}/>
              </div>
              <div className="form-group">
                <label>Modelo:</label>
                <input type="text" className="form-control" name="model" {...register("model")}/>
              </div>
            </div>
            <div className="col-4">
              <div id='imagePreview'></div>
              <div className="form-group">
                <label>Imagen:</label>
                <input type="file" className="form-control" name="image" {...register("image")}/>
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
