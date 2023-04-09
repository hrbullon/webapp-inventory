import React, { Fragment } from 'react';

import { Table } from './Table';

const Users = () => {

    return (
    <Fragment>
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

export default Users;
