import React from 'react'

export const ErrorValidate = ({ error }) => {
  return (
    <div>
        { error && error.type == "required" && 
          <span className='text-danger'>Este campo es obligatorio</span>
        }
    </div>
  )
}
