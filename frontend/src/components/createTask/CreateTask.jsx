import React, { useState } from 'react';
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js"
import "./createTask.css"
function CreateTask() {
    const { dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");  // New state for deadline

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/task/addTask", { title, description, deadline }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            console.log(res.data);  // Use the response here
            
        } catch (error) {
            console.log(error);
        }
        dispatch({
            type: "ADD_TASK",
            title,
            description,
            deadline  // Include deadline in local state
        });
        setTitle("");
        setDescription("");
        setDeadline("");  // Reset deadline
    };

    // const showToast = () => {
    //     const toast = document.getElementById('toast');
    //     toast.style.display = "block"
    //     setTimeout(hideToast,2000)
    // }
    // const hideToast = () => {
    //     const toast = document.getElementById('toast');
    //     toast.style.display = "none"
    // }
    return (
        <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center">
            <div className='w-11/12'>
                <form onSubmit={handleAdd}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            rows={5}
                            name="description"
                            id="description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: "none" }}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="deadline">Deadline</label>
                        <input type="datetime-local" value={deadline} required onChange={(e) => setDeadline(e.target.value)} className='inputField' />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type='submit'
                            className=' bg-blue-700 rounded-md text-white px-5 py-1 '
                        >Add</button>
                    </div>
                </form>
                <div className="toast bg-green-600 text-white p-3 rounded-xl shadow-2xl text-center absolute bottom-4 left-1/2 -translate-x-1/2" id='toast'>
                    <p>This is test</p>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;