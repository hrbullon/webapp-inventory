import React, { Fragment } from 'react'

const Products = () => {
  
  const products = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20];

  return (
    <Fragment>
        <div className='row'>
            {
                products.map( product => {
                    return (
                        <div className='col-4 mt-4'>
                            <div className="card">
                                <img src="https://dummyimage.com/640x360/fff/aaa"  className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <b>Touting “quick and simple image placeholders</b>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </Fragment>
  )
}

export default Products
