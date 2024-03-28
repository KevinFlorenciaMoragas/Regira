import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Cookie from 'js-cookie';

export default function NewIssue() {
    const { idProject } = useParams();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [user, setUser] = useState("");
    const [issueType, setIssueType] = useState("");
    const [priority, setPriority] = useState("");
    const [state, setState] = useState("");
    const [cookieValue, setCookieValue] = useState("");
    console.log(idProject)
    useEffect(() => {
        const cookie = Cookie.get('id');
        if (cookie) {
            setCookieValue(cookie);
        }
    }, []);

    const issue = (e) => {
        e.preventDefault();
        console.log("El id es ", idProject)
        fetch(`http://localhost:3000/api/userByName?name=${user}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                const credentials = {
                    title,
                    desc,
                    user_id: data.id,
                    issueType,
                    priority,
                    state,
                    author_id: cookieValue,
                    projects_id: idProject
                };

                const options = {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                };

                fetch('http://localhost:3000/api/issue', options)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.error('Error al enviar la solicitud:', error);
                    });
            })
            .catch(error => {
                console.error('Error al obtener el usuario:', error);
            });
    };

    return (
        <>
            <div className='row'>
            <form onSubmit={issue} className='col-lg-5 offset-lg-4'>
                <div className="">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input onInput={(e) => setTitle(e.target.value)} type="text" className="form-control" id="title" placeholder="Title" />
                    <label htmlFor="description" className="form-label">Description</label>
                    <input onInput={(e) => setDesc(e.target.value)} type="text" className="form-control" id="description" placeholder="Description" />
                    <label htmlFor="issue_type" className="form-label">Issue Type</label>
                    <select name="issue_type" id="issue_type" className="form-select" onChange={(e) => setIssueType(e.target.value)}>
                        <option value="">Select Issue Type</option>
                        <option value="bug">Bug</option>
                        <option value="nobug">No Bug</option>
                    </select>
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <select name="priority" id="priority" className="form-select" onChange={(e) => setPriority(e.target.value)}>
                        <option value="">Select Priority</option>
                        <option value="high">High</option>
                        <option value="mid">Mid</option>
                        <option value="low">Low</option>
                    </select>
                    <label htmlFor="state" className="form-label">State</label>
                    <select name="state" id="state" className="form-select" onChange={(e) => setState(e.target.value)}>
                        <option value="">Select State</option>
                        <option value="done">Done</option>
                        <option value="not_done">Not Done</option>
                    </select>
                    <label htmlFor="username" className="form-label">Username</label>
                    <input onInput={(e) => setUser(e.target.value)} type="text" className="form-control" id="username" placeholder="Username" />
                    <div className='p-2 d-flex flex-row justify-content-center'>
                    <button type="submit" className="btn btn-primary mb-3">New Issue</button>
                    </div>
                </div>
            </form>
            </div>
        </>
    );
}