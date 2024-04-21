import React, { Fragment, useContext } from 'react';

import { Form } from './Form';
import { Table } from './Table';

import { AuthContext } from 'src/context/AuthContext';
import Page403 from '../error/page403/Page403';

import { ADMIN_ROLE } from "../../constants/variables";

const Categories = () => {
  
  let { user } = useContext(AuthContext);

  if(user.role !== ADMIN_ROLE){
    return <Page403/>
  }

  return (
    <Fragment>
      <div className='row'>
        <div className='col-4'>
            <div className="card">
                <div className="card-body">
                  <Form/> 
                </div>
            </div>
        </div>
        <div className='col-8'>
            <Table/>
        </div>
      </div>
    </Fragment>
  )
}

export default Categories
