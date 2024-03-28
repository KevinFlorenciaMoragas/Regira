import React from 'react'
import { useState, useEffect } from 'react'
import IssueCard from './IssueCard';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
const BOXES = [
    { state: 'done', title: 'done' },
    { state: 'no done', title: 'nodone' },
    { state: 'in progress', title:'in progress'},
    { state: 'review', title:'review'}
]
const ItemType = 'ISSUE_ITEM';

const Item = ({ deleteItem, data }) => {
    const [{ isDragging }, drag_ref] = useDrag({
        type: ItemType,
        item: { type: ItemType, id: data.id }
    })
    return <IssueCard reference={drag_ref} isDragging={isDragging} data={data} remove={deleteItem}></IssueCard>
}

const Box = ({ children, caixa, mouItem }) => {
    const [{ isOver }, drop_ref] = useDrop({
        accept: ItemType,
        drop: (item) => {
            mouItem(item, caixa.state)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    })
    return (
        <div ref={drop_ref} className={`bg-slate-100 p-3 min-h-[400px] border ${isOver ? 'border-blue-500' : ''}`}>
            <h2 className="text-xl text-center mb-4" >{caixa.titol}</h2>
            {children}
        </div>
    )
}
export default function Issue(props) {

    const [task, setTask] = useState([""])

    const mouItem = (item, state) => {
        const opcions = {
            credentials: 'include',
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ state })
        }
        fetch('http://localhost:3000/api' + '/issue/' + item.id, opcions)
            .then(r => r.json())
            .then(data => {
                if (data.error == 'Unauthorized') logout();
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
        fetch('http://localhost:3000/api' + '/issue/' + item.id, opcions)
            .then(r => r.json())
            .then(data => {
                if (data.error == 'Unauthorized') logout();
                else setActualitza(actualitza + 1);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch('http://localhost:3000/api/issue/' + props.id + '/data', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTask(data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className='row'>
                    <div className='col-lg-4'>
                        {
                            BOXES.map(caixa => {

                                <Box key={caixa.state} caixa={caixa} mouItem={mouItem}>
                                    {
                                        task.filter(e => e.state === caixa.state).map(e => <Item key={e.id} eliminaItem={eliminaItem} data={e}></Item>)
                                    }
                                </Box>


                            })
                        }
                    </div>
                </div>
            </DndProvider>
        </>
    )
}
