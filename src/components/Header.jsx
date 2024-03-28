import React, { useEffect, useState } from 'react'
import { Outlet, Link, useParams } from 'react-router-dom'
import Cookie from 'js-cookie'
export default function Header({ login, setLogin, logout }) {
    const [cookieValue, setCookieValue] = useState("")

    useEffect(() => {
        const cookie = Cookie.get('token')
        if (cookie) {
            setCookieValue(cookie)
        }
    }, [])

    console.log(login)
    return (
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                <Link to="/" className="nav-link px-2 link-secondary"><h3>Regira</h3></Link>
                </div>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    {!login && <Link to="/" className="nav-link px-2 link-secondary">Home</Link>}
                    {login && <Link to="/projects" className="nav-link px-2">Projects</Link>}
                    {login && <Link to="/newProject" className='nav-link px-2'>New Project</Link>}
                </ul>
                <div className="col-md-3 text-end">
                    {!login && <Link to="/register" className="btn btn-primary me-2">Register</Link>}
                    {!login && <Link to="/login" className="btn btn-primary me-2">Login</Link>}
                    {login && <button className='btn btn-danger' onClick={logout}>Logout</button>}
                </div>
            </header>
    )
}
