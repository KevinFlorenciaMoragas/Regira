import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import Issues from './Issues.jsx'
import { useNavigate, Link } from 'react-router-dom'
import './ProjectList.css'
export default function ProjectsList() {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const id = Cookie.get('id')
  const navigate = useNavigate(); // Movemos useNavigate aquí dentro del componente

  const handleProjectClick = (e) => {
    setSelectedProject(e)
    navigate("/new-issue/" + e.id, { state: { e } }) // Utilizamos navigate en lugar de useNavigate
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/project/' + id + '/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setProjects(data)
      })
      .catch(err => console.log(err))
  }, [])

  const deleteProject = async (id) => {
    try {
      const res = await fetch('http://localhost:3000/api/project/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      if (res.ok) {
        setProjects(prevProjects => prevProjects.filter(project => project.id !== id))
        console.log('Proyecto eliminado correctamente');
      } else {
        console.log('Error al eliminar el proyecto');
      }
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  return (
    <>
      <div className='row'>
        {
          projects.map(e => {
            return (
              // <div className="card p-2" key={e.id} style={{ width: 18 + 'rem' }}>
              //   <div className="card-body">
              //     <h5 className="card-title">{e.name}</h5>
              //     <h6 className="card-subtitle mb-2 text-body-secondary">{e.user}</h6>

              //     <Link className='btn btn-primary p-2' to={`/project/${e.id}`}> Project </Link>
              //     
              //   </div>
              // </div >
              <div class="col-xs-12 col-sm-4">
                <div class="card">
                  <a class="img-card" href="http://www.fostrap.com/2016/03/5-button-hover-animation-effects-css3.html">
                    <img src="https://3.bp.blogspot.com/-bAsTyYC8U80/VtLZRKN6OlI/AAAAAAAABjY/kAoljiMALkQ/s400/material%2Bnavbar.jpg" />
                  </a>
                  <div class="card-content">
                    <h4 class="card-title">
                      <a href="http://www.fostrap.com/2016/02/awesome-material-design-responsive-menu.html">{e.name}
                      </a>
                    </h4>
                  </div>
                  <div class="card-read-more d-flex flex-row justify-content-between">
                    <Link className='btn btn-link btn-block pl-2' to={`/project/${e.id}`}> Project </Link>
                    <button className='btn btn-link btn-block pl-2' onClick={() => deleteProject(e.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}