import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {

  const year = new Date().getFullYear();

  return (
    <CFooter>
      <div>
        <a href="#" rel="noopener noreferrer">
          HBullon
        </a>
        <span className="ms-1">&copy; { year }</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI 
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
