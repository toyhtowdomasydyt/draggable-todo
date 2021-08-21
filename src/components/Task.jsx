import React from "react";
import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";

const Task = ({task, index, ...props}) => {
    const Container = styled.div`
      padding: 5px 10px;
      margin-bottom: 4px;
      border-radius: 3px;
      background-color: ${props => (props.isDragging ? '#d5d2d2' : '#a8a8c4')};
    `;

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    {task.content}
                </Container>
            )}
        </Draggable>
    );
};

export default Task;
