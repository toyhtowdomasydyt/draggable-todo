import React from "react";
import styled from "styled-components";
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";

const Column = ({column, tasks}) => {
    const Container = styled.div`
      margin: 10px;
      border-radius: 3px;
      background-color: #fff;
    `;
    const Title = styled.h3`
      padding: 8px
    `;
    const TaskList = styled.div`
      padding: 8px
    `;

    return (
        <Container className="column">
            <Title>{column.title}</Title>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
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
