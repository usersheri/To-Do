import React, { useContext } from "react";
import TaskContext from "../context/TaskContext";
import CompletedTask from "./CompletedTask";
import { motion } from "framer-motion";

const Completed = () => {
    const { tasks } = useContext(TaskContext);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div className="">
            {completedTasks.length > 0 ? (
                <div className="grid grid-cols-1">
                    {completedTasks.map((task, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className=""
                        >
                            <CompletedTask task={task} id={index} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <h1 className="text-center text-xl font-semibold text-gray-600">No Completed Tasks Found</h1>
            )}
        </div>
    );
};

export default Completed;
