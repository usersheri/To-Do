function taskReducer(tasks, action) {
    console.log("taskReducer");
    switch (action.type) {
        case "ADD_TASK": {
            return [
                ...tasks,
                {
                    ...action.payload,  // Assuming payload has title, description, and completed
                }
            ];
        }
        case "SET_TASK": {
            return action.payload;
        }
        case "REMOVE_TASK": {
            // Remove task based on ID, not index
            return tasks.filter(task => task._id !== action.id);
        }
        case "MARK_DONE": {
            // Toggle completion based on ID, not index
            return tasks.map(task => 
                task._id === action.id ? { ...task, completed: !task.completed } : task
            );
        }
        default: {
            throw Error("Unknown Action " + action.type);
        }
    }
}

export default taskReducer;
