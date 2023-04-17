import React, { Fragment, useState, useEffect, useContext } from 'react'

import { Form } from './Form';
import { Table } from './Table';

import { getAllCategories } from 'src/services/categoriesServices';
import { AuthContext } from 'src/context/AuthContext';
import Page403 from '../error/page403/Page403';

const Categories = () => {

  let { user } = useContext(AuthContext);

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

  if(user.role !== "ADM_ROLE"){
    return <Page403/>
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
