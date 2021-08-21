import React from "react";
import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";

const Task = ({task, index}) => {
    const Container = styled.div`
      padding: 5px 10px;
      margin-bottom: 4px;
      border-radius: 3px;
      background-color: #d5d2d2;
    `;

    return (
        <Draggable draggableId={task.id} index={index}>
            {provided => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {task.content}
                </Container>
            )}
        </Draggable>
    );
};

export default Task;
