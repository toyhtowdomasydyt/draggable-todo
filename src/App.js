import React, {useState} from 'react';
import {DragDropContext} from "react-beautiful-dnd";

import {initalData} from "./initial-data";
import Column from "./components/Column";

const App = () => {
    const [state, setState] = useState(initalData);

    return (
        <DragDropContext>
            {state.columnOrder.map(columnId => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                return <Column key={column.id} column={column} tasks={tasks}/>
            })}
        </DragDropContext>
    );
};

export default App;
