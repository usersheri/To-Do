import React, { useContext } from "react";
import Task from "./Task/Task";
import TaskContext from "../context/TaskContext";
import { motion } from "framer-motion";


const Active = () => {
    const { tasks } = useContext(TaskContext);
    const activeTasks = tasks.filter(task => !task.completed);

    return (
        <div className="">
            {activeTasks.length > 0 ? (
                <div className="grid grid-cols-1">
                    {activeTasks.map((task, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className=""
                        >
                                <Task task={task} index={index} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <h1 className="text-center text-xl font-semibold text-gray-600">No Active Tasks Found</h1>
            )}
        </div>
    );
};

export default Active;
