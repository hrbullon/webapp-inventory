import React, { Fragment } from 'react';

import { Table } from './Table';

const Customers = () => {
  return (
    <Fragment>
        <div className='row'>
            <div className='col-12'>
               
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <div className="card  mt-4">
                    <div className="card-body">
                        <Table />
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Customers

