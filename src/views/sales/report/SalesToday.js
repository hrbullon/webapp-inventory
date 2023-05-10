import React from 'react';
import moment from 'moment';

import { Table } from '../Table';

const SalesToday = () => {
  
    const today = moment().format("YYYY-MM-DD");

    return (
    <div className='row'>
        <div className='col'>
            <div className="card  mt-4">
                <div className="card-body">
                    <Table title={ "Resumen de ventas diarias" } today={ today }/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SalesToday

