import React, {useState} from 'react';

import {initalData} from "./initial-data";
import Column from "./components/Column";

const App = () => {
    const [state, setState] = useState(initalData);

    return (
        <div>
            {state.columnOrder.map(columnId => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                return <Column key={column.id} column={column} tasks={tasks}/>
            })}
        </div>
    );
};

export default App;
