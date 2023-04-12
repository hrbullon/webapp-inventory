import React, { Fragment, useState, useEffect } from 'react'

import { Form } from './Form';
import { Table } from './Table';

import { getAllExchanges } from 'src/services/exchangesServices';

const Exchanges = () => {

  const [exchange, setExchange] = useState({});
  const [copies, setCopies] = useState([]);
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    fetchExchanges();
  }, []);

  const fetchExchanges = async () => {
    const res = await getAllExchanges();
    setCopies(res.exchanges);
    setExchanges(res.exchanges);
  }

  return (
    <Fragment>
      <div className='row'>
        <div className='col-4'>
            <div className="card">
                <div className="card-body">
                  <Form exchange={exchange} fetchExchanges={fetchExchanges}/> 
                </div>
            </div>
        </div>
        <div className='col-8'>
            <Table setExchange={setExchange} setExchanges={ setExchanges } exchanges={exchanges} data={copies}/>
        </div>
      </div>
    </Fragment>
  )
}

export default Exchanges
