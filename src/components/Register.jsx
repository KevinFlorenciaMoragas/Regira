import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
//import { json, redirect } from 'react-router-dom'
//import { useNavigate } from 'react-router.dom'
const API_URL = 'http://localhost:3000/api';
export default function Register() {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const redirect = useNavigate();
    const register = (e) => {
        e.preventDefault()

        const credentials = {
            name,
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
        fetch(API_URL + '/register', options)
            .then(res => res.json())
            .then(data => {
                console.log("resp", data)
                redirect('/login')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <form onSubmit={register} className="col-lg-5 offset-lg-4" style={{ minHeight: "100vh" }}>
                <div class="card">
                    <div className='card-body'>
                        <label for="name" class="form-label">Name</label>
                        <input onInput={(e) => setName(e.target.value)} type="text" class="form-control" id="name" placeholder="name" />
                        <label for="email" class="form-label">Email address</label>
                        <input onInput={(e) => setEmail(e.target.value)} type="email" class="form-control" id="email" placeholder="name@example.com" />
                        <label for="password" class="form-label">Password</label>
                        <input onInput={(e) => setPassword(e.target.value)} type="password" class="form-control" id="password" placeholder="password" />
                        <div className='d-flex justify-content-center pt-4'>
                            <button type="submit" class="btn btn-primary mb-3">Register</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
