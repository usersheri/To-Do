import React, { useContext } from "react";
import Task from "./Task/Task";
import TaskContext from "../context/TaskContext";
import { motion } from "framer-motion";

const AllTask = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {tasks && tasks.length > 0 ? (
        <div className="grid grid-cols-1">
          {tasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Task task={task} index={index} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.h1
          className="text-center text-xl font-semibold text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No Task Found
        </motion.h1>
      )}
    </motion.div>
  );
};

export default AllTask;
