import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  
  return (
    <div ref={setNodeRef} className={props.className} style={props.style}>
      <h2>{props.name}</h2>
      {props.children}
    </div>
  );
}
export default Droppable;
