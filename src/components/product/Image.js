import React from 'react'

export const Image = ({ url, name }) => {
  return (
    <img 
        height={250} 
        src={ url } 
        className="card-img-top" 
        alt={ name }/>
  )
}
