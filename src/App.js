import React, { Component, Suspense } from 'react'

import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { Logout } from './views/auth/logout/Logout'

import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const PosLayout = React.lazy(() => import('./layout/PosLayout'))
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/auth/login/Login'))
const Page404 = React.lazy(() => import('./views/error/page404/Page404'))
const Page500 = React.lazy(() => import('./views/error/page500/Page500'))

class App extends Component {
  render() {

    const token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    user = JSON.parse(user);

    const company = user? user.Company : {};

    return (
      <AuthContext.Provider value={{ token: token, user: user, company: company }}>
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/auth/login" name="Iniciar sesión" element={<Login />} />
            <Route exact path="/auth/logout" name="Cerrando sesión" element={<Logout />} />
            
            <Route exact path="/error/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/error/500" name="Page 500" element={<Page500 />} />
     
            { user && user !== undefined && user.role == "ADM_ROLE" && <Route path="*" name="Home" element={<DefaultLayout />} /> }
            { user && user !== undefined && user.role == "STD_ROLE" && <Route path="*" name="Home" element={<PosLayout />} /> }

          </Routes>
        </Suspense>
      </HashRouter>
      </AuthContext.Provider>
    )
  }
}

export default App
