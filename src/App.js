import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/auth/login/Login'))
const Recovery = React.lazy(() => import('./views/auth/recovery/Recovery'))
const Register = React.lazy(() => import('./views/auth/register/Register'))
const Page404 = React.lazy(() => import('./views/error/page404/Page404'))
const Page500 = React.lazy(() => import('./views/error/page500/Page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/auth/login" name="Login Page" element={<Login />} />
            <Route exact path="/auth/register" name="Register Page" element={<Register />} />
            <Route exact path="/auth/recovery" name="Login Page" element={<Recovery />} />
            
            <Route exact path="/error/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/error/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
