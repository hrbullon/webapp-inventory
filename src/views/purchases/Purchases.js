import React from 'react';

import { Table } from './Table';

const Purchases = () => {
  return (
    <div className='row'>
        <div className='col'>
            <div className="card  mt-4">
                <div className="card-body">
                    <Table />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Purchases

