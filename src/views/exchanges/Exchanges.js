import React, { Fragment, useState } from 'react'

import { Form } from './Form';
import { Table } from './Table';

const Exchanges = () => {

  const [exchange, setExchange] = useState({});

  return (
    <Fragment>
      <div className='row'>
        <div className='col-4'>
            <div className="card">
                <div className="card-body">
                  <Form exchange={exchange}/> 
                </div>
            </div>
        </div>
        <div className='col-8'>
            <Table setExchange={setExchange}/>
        </div>
      </div>
    </Fragment>
  )
}

export default Exchanges
