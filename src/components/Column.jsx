import React from "react";
import styled from "styled-components";
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";

const Column = ({column, tasks}) => {
    const Container = styled.div`
      margin: 10px;
      border-radius: 3px;
      background-color: aliceblue;
    `;
    const Title = styled.h3`
      padding: 8px;
    `;
    const TaskList = styled.div`
      padding: 8px;
      transition: background-color .2s ease;
      background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    `;

    return (
        <Container className="column">
            <Title>{column.title}</Title>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index}/>)
                        )}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    );
};

export default Column;
