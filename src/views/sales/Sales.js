import React from 'react';

import { Table } from './Table';

const Sales = () => {
  return (
    <div className='row'>
        <div className='col'>
            <div className="card  mt-4">
                <div className="card-body">
                    <Table title="Todas las ventas"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sales

