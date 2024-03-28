import React, { useState } from 'react'

export default function NewProject() {

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [user, setUser] = useState("")
    const [active, setActive] = useState("")
    const [user_id, setUser_id] = useState("")

    const project = (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/api/userByName?name=${user}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                const credentials = {
                    name,
                    desc,
                    user_id,
                    active
                }
                console.log(data.id)
                credentials.user_id = data.id
                const options = {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                }
                fetch('http://localhost:3000/api/project', options)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
            })

    }


    return (
        <>
            <div className='row'>
                <form onSubmit={project} className="col-lg-5 offset-lg-4" style={{}}>
                    <div class="">
                        <label for="name" class="form-label">Project Name</label>
                        <input onInput={(e) => setName(e.target.value)} type="text" class="form-control" id="name" placeholder="Project Name" />
                        <label for="description" class="form-label">Description</label>
                        <input onInput={(e) => setDesc(e.target.value)} type="text" class="form-control" id="description" placeholder="Description" />
                        <label for="active" class="form-label">Active</label>
                        <input onInput={(e) => setActive(e.target.value)} type="number" class="form-control" id="active" placeholder="1 or 2" />
                        <label for="username" class="form-label">Username</label>
                        <input onInput={(e) => setUser(e.target.value)} type="text" class="form-control" id="username" placeholder="username" />
                        <div className='justify-content-center d-flex pt-4'>
                            <button type="submit" class="btn btn-primary mb-3">New Project</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
