import React, { Fragment, useState, useEffect } from 'react'

import { Form } from './Form';
import { Table } from './Table';
import { getAllCategories } from 'src/services/categoriesServices';

const Categories = () => {

  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.categories);
  }

  return (
    <Fragment>
      <div className='row'>
        <div className='col-6'>
            <div className="card">
                <div className="card-body">
                  <Form 
                    category={category} 
                    setCategories={ setCategories } 
                    fetchCategories={ fetchCategories }/> 
                </div>
            </div>
        </div>
        <div className='col-6'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Listado de categorías</h5>
                    <Table 
                      categories={ categories } 
                      setCategory={ setCategory }
                      setCategories={ setCategories } />
                </div>
            </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Categories
