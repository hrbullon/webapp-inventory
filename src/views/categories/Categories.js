import React, { Fragment, useState, useEffect } from 'react'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useForm } from "react-hook-form";

import { ErrorValidate } from 'src/components/forms/ErrorValidate';

import { 
    createCategory, 
    deleteCategory, 
    getAllCategories, 
    updateCategory } from 'src/services/categoriesServices';

const Categories = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [categories, setCategories] = useState([]);
  const [idCategory, setIdCategory] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.categories);
  }

  const handleDeleteCategory = async (category) => {
    const res = await deleteCategory(category.id);

    if(res.category){
      const filtered = categories.filter( item => item.id !== category.id );
      setCategories(filtered);
    }
  }

  const handleEditCategory = (category) => {
    reset(category);
    setIdCategory(category.id);
  }

  const onSubmit = async data => {

    if(!idCategory){
      const res = await createCategory(data);
      setCategories([...categories, res.category]);
    }else{
      const res = await updateCategory(idCategory, data);
      fetchCategories();
    }
  };
  
  return (
    <Fragment>
      <div className='row'>
        <div className='col-6'>
            <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className="card-title">Datos de categoria</h5>
                    <div className="mb-3">
                        <input type="text" name="name" {...register("name", { required: true, maxLength: 45 }) } autoComplete='off' className="form-control" placeholder="Nombre de la categoría"/>
                        <ErrorValidate error={ errors.name } />
                    </div>
                    <div className="mb-3">
                        <input type="text" name="description" {...register("description")} autoComplete='off' className="form-control" placeholder="Descripción de la categoría"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button className="btn btn-desabled">Cancelar</button>
                  </form>  
                </div>
            </div>
        </div>
        <div className='col-6'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Listado de categorías</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nro</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                              categories.map(  (category, index) => {
                                  return (
                                      <tr key={ category.id }>
                                          <td>{ (index+1) }</td>
                                          <td width={100}>{ category.name }</td>
                                          <td>
                                              <button onClick={ (e) => handleEditCategory(category) } className='btn btn-sm btn-primary'>
                                                <CIcon icon={ icon.cilPencil }/>
                                              </button>
                                              <button onClick={ (e) => handleDeleteCategory(category) } className='btn btn-sm btn-danger'>
                                                <CIcon icon={ icon.cilDelete }/>
                                              </button>
                                          </td>
                                      </tr>
                                  )
                              })
                          }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Categories
