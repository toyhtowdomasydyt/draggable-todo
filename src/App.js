import React, {useState} from 'react';
import {DragDropContext, Droppable} from "react-beautiful-dnd";

import {initalData} from "./initial-data";
import Column from "./components/Column";
import styled from "styled-components";

const App = () => {
    const [state, setState] = useState(initalData);

    const Container = styled.div`
      display: flex;
    `;

    const onDragEnd = result => {
        const {destination, source, draggableId, type} = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        if (type === "column") {
            const newColumnOrder = Array.from(state.columnOrder);

            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            setState({
                ...state,
                columnOrder: newColumnOrder,
            });

            return;
        }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            setState({...state, columns: {...state.columns, [newColumn.id]: newColumn}});

            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);

        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        setState({
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            }
        })
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                    <Container
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {state.columnOrder.map((columnId, index) => {
                            const column = state.columns[columnId];
                            const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                            return <Column key={column.id} index={index} column={column} tasks={tasks}/>
                        })}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    );
};
export default App;
