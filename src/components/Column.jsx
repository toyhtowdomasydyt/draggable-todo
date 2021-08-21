import React from "react";
import styled from "styled-components";

const Column = ({column, tasks}) => {
    const Container = styled.div`
      margin: 10px;
      border-radius: 5px;
      background-color: #fff;
      max-width: fit-content;
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
            <TaskList>
                {tasks.map(task => <div key={task.id}>{task.content}</div>)}
            </TaskList>
        </Container>
    );
};

export default Column;
