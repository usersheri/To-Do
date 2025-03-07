import React, { useContext } from 'react';
import moment from 'moment';
import "./task.css";
import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../Axios/axios.js';  // Fix the axios import

function Task({ task }) {
    const token = JSON.parse(localStorage.getItem("authToken"));
    const { dispatch } = useContext(TaskContext);

    const handleRemove = async () => {
        try {
            console.log("entert to the api call")
            // API call to delete the task from MongoDB
            const res = await axios.delete(`/task/removeTask/${task._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("res is ",res);
            
            if (res.status === 200) {
                // Update state after successful deletion
                dispatch({
                    type: "REMOVE_TASK",
                    id: task._id  // Pass the task ID to the reducer
                });
            }
        } catch (error) {
            console.log("Error while deleting task:", error);
        }
    };

    const handleMarkDone = () => {
        dispatch({
            type: "MARK_DONE",
            id: task._id  // Use task ID instead of index
        });
    };

    return (
        <div className='bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3'>
            <div className="mark-done">
                <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={task.completed} />
            </div>
            <div className="task-info text-slate-900 text-sm w-10/12">
                <h4 className="task-title text-lg capitalize">{task.title}</h4>
                <p className="task-description">{task.description}</p>
                <div className=' italic opacity-60'>
                    {task?.createdAt ? (
                        <p>{moment(task.createdAt).fromNow()}</p>
                    ) : (
                        <p>just now</p>
                    )}
                </div>
            </div>
            <div className="remove-task text-sm text-white">
                <DeleteIcon
                    style={{ fontSize: 30, cursor: "pointer" }}
                    size="large"
                    onClick={handleRemove}
                    className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
                />
            </div>
        </div>
    );
}

export default Task;
