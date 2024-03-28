import React, { useContext } from "react";
import { useState } from "react";
import Context from "../Context";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
const API_URL = 'http://localhost:3000/api';
export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setLogin } = useContext(Context)
    const redirect = useNavigate()
    const login = (e) => {
        e.preventDefault()
        const credentials = {
            email,
            password
        }
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
        fetch(API_URL + '/login', options)
            .then(res => res.json())
            .then(data => {
                console.log("resp", data)
                setLogin(data)
                redirect('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <form onSubmit={login} className="col-lg-5 offset-lg-4" style={{ minHeight: "100vh" }}>
                <div className="card">
                    <div className="card-body">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input onInput={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="name@example.com" />
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onInput={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="name@example.com" />
                        <div className="justify-content-center d-flex pt-4">
                            <button type="submit" className="btn btn-primary ">Register</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
