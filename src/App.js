import React, {useState} from 'react';
import {DragDropContext} from "react-beautiful-dnd";

import {initalData} from "./initial-data";
import Column from "./components/Column";

const App = () => {
    const [state, setState] = useState(initalData);

    const onDragStart = () => {
        document.body.style.color = 'red';
        document.body.style.transition = 'background-color .2s ease';
    };

    const onDragUpdate = update => {
        const {destination} = update;

        const opacity = destination
            ? destination.index / Object.keys(state.tasks).length
            : 0;

        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity}`;
    }

    const onDragEnd = result => {
        document.body.style.color = 'inherit';
        document.body.style.backgroundColor = '#444444';

        const {destination, source, draggableId} = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const column = state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);

        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        setState({...state, columns: {...state.columns, [newColumn.id]: newColumn}})
    };

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
        >
            {state.columnOrder.map(columnId => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                return <Column key={column.id} column={column} tasks={tasks}/>
            })}
        </DragDropContext>
    );
};

export default App;
