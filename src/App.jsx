import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Context from './Context'
import Cookie from 'js-cookie'
import Footer from './components/Footer'
function App() {

  const API_URL = 'http://localhost:3000/api';
  const cookie = Cookie.get('token')
  console.log(cookie)
  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Set the expiration date to a past date
    setLogin(null)
    window.location.href = "/login";
  }
  const [login, setLogin] = useState(null)

  const data = { login, setLogin, logout }
  useEffect(() => {
    // si tenim una cookie, intentem validar-la!
    if (cookie) {
      fetch(API_URL + '/refresh', { credentials: 'include' })
        .then(e => e.json())
        .then(data => {
          if (data.error) {
            // api rebutja la cookie local, l'esborrem per mitjà de la funció logout()
            logout();
          } else {
            // api accepta la cookie, simulem login desant les dades rebudes a "loguejat"
            setLogin(data)
          }
        })
    }

  }, [])
  return (
    <>
      <Context.Provider value={data}>
        <div className='bg'>
          <div className='container'>
            <Header login={login} setLogin={setLogin} logout={logout}></Header>
            <Outlet></Outlet>
          </div>
          
        </div>
        <Footer></Footer>
      </Context.Provider>
    </>
  )
}

export default App
