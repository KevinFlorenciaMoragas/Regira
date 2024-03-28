
import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import IssueCard from './IssueCard';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from "react-router-dom";
const ItemType = 'ISSUE_ITEM';

const BOX = [
    { state: 'done', titol: 'done', color: 'bg-success-subtle' },
    { state: 'no done', titol: 'no done', color: 'bg-danger-subtle' },
    { state: 'in progress', titol:'in progress',color:'bg-danger-subtle'},
    { state: 'review', titol:'review', color:'bg-success-subtle'}
];


const Item = ({ eliminaItem, data }) => {
    const [{ isDragging }, drag_ref] = useDrag({
        type: ItemType,
        item: { type: ItemType, id: data.id }
    });
    return <IssueCard reference={drag_ref} isDragging={isDragging} data={data} eliminaItem={eliminaItem} />;
};

const Box = ({ children, caixa, mouItem, className }) => {
    const [{ isOver }, drop_ref] = useDrop({
        accept: ItemType,
        drop: (item) => {
            mouItem(item, caixa.state)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });
    return (
        <div ref={drop_ref} className={className}>
            <h2 className="text-xl text-center mb-4" >{caixa.titol}</h2>
            {children}
        </div>
    );
};
export default () => {

    const [project, setProjecte] = useState(null);
    const [issue, setIssue] = useState([])
    const [error, setError] = useState('');
    const redirect = useNavigate();
    const [actualitza, setActualitza] = useState(0)

    const { id } = useParams()

    const API_URL = 'http://localhost:3000/api/'

    const mouItem = (item, state) => {
        const opcions = {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ state })
        }
        fetch(API_URL + '/issue/' + item.id, opcions)
            .then(r => r.json())
            .then(data => {
                if (data.error == 'Unauthorized');
                else setActualitza(actualitza + 1);
            })
            .catch(err => console.log(err))
    }

    const eliminaItem = (item) => {
        const opcions = {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(API_URL + '/issue/' + item.id, opcions)
            .then(r => r.json())
            .then(data => {
                if (data.error == 'Unauthorized');
                else setActualitza(actualitza + 1);
            })
            .catch(err => console.log(err))
    }



    useEffect(() => {
        const opcions = {
            credentials: 'include',
        }
        fetch(API_URL + '/project/' + id, opcions)
            .then(resp => resp.json())
            .then(data => {
                setProjecte(data)
            })
        fetch(API_URL + '/issue/' + id + '/data', opcions)
            .then(resp => resp.json())
            .then(data => {
                if (data.error == 'Unauthorized');

                if (data.error) {
                    setError(error)
                } else {
                    console.log(data)
                    setIssue(data)
                }
            })
            .catch(err => {
                console.log(err);
                setError(err)
            })
    }, [actualitza])


    if (error) {
        return <h1 className='text-red-500'>{error}</h1>
    }

    if (!project) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div className="d-flex flex-column">
                
                    <h1 className="text-center"> {project?.name}</h1>
                    <p className=""> {project.desc}</p>
                    <div className="align-self-end">
                    <Link to={`/new-issue/${id}`} className='btn btn-primary '>New Issue</Link>
                    </div>
            </div>
            <div className="row pt-2">
                <DndProvider backend={HTML5Backend}>
                    {
                        BOX.map((caixa, i) => (
                            <div className="col-lg-6" >
                                <Box key={caixa.state} caixa={caixa} mouItem={mouItem} className={`${BOX[i].color}`} >
                                    {
                                        issue.filter(e => e.state == caixa.state).map(e => <Item key={e.id} eliminaItem={eliminaItem} data={e} />)
                                    }
                                </Box>
                            </div>
                        ))
                    }

                </DndProvider>

            </div>

        </>
    )
}