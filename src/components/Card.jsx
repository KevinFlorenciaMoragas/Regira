import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
export default function Card(props) {

    const navigate = useNavigate(); // Movemos useNavigate aquí dentro del componente

  const handleProjectClick = (e) => {
    setSelectedProject(e)
    navigate("/new-issue/"+e.id, { state: { e } }) // Utilizamos navigate en lugar de useNavigate
  }
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
                props.setProjects(prevProjects => prevProjects.filter(project => project.id !== id))
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
            <div class="card" style={{width: 18+ 'rem'}}>
                <div class="card-body">
                    <h5 class="card-title">{props.name}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">{ }</h6>
                    <p class="card-text">{props.desc}</p>
                    <Link class='btn-primary' to="/project/"> Project </Link>
                    <button className='btn-danger' onClick={() => deleteProject(props.id)}>Eliminar</button>
                </div>
            </div >
        </>
    )
}
