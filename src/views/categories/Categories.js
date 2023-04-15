import React, { Fragment, useState, useEffect } from 'react'

import { Form } from './Form';
import { Table } from './Table';

import { getAllCategories } from 'src/services/categoriesServices';

const Categories = () => {

  const [category, setCategory] = useState({});
  const [copies, setCopies] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCopies(res.categories);
    setCategories(res.categories);
  }

  return (
    <Fragment>
      <div className='row'>
        <div className='col-4'>
            <div className="card">
                <div className="card-body">
                  <Form category={category} fetchCategories={fetchCategories}/> 
                </div>
            </div>
        </div>
        <div className='col-8'>
            <Table setCategory={setCategory} setCategories={ setCategories } categories={categories} data={copies}/>
        </div>
      </div>
    </Fragment>
  )
}

export default Categories
