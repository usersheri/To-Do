import React, { useContext } from "react";
import moment from "moment";
import "./task.css";
import TaskContext from "../../context/TaskContext";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../Axios/axios.js";
import { motion } from "framer-motion";

const colors = ["#f1e2d7", "#f9f9f7", "#f8d5c2", "#deeae8", "#cddcdf", "#f3e7e3", "#f8eeea", "#f5d3c5"];

function Task({ task, index }) {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const { dispatch } = useContext(TaskContext);
  const backgroundColor = colors[index % colors.length] + "cc"; // Reduce opacity of background color

  const handleRemove = async () => {
    try {
      console.log("Entering API call");
      const res = await axios.delete(`/task/removeTask/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Response: ", res);

      if (res.status === 200) {
        dispatch({
          type: "REMOVE_TASK",
          id: task._id
        });
      }
    } catch (error) {
      console.log("Error while deleting task:", error);
    }
  };

  const handleMarkDone = () => {
    dispatch({
      type: "MARK_DONE",
      id: task._id
    });
  };

  return (
    <motion.div 
      className="py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3"
      style={{ backgroundColor }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div whileTap={{ scale: 0.9 }}>
        <input
          type="checkbox"
          className="checkbox"
          onChange={handleMarkDone}
          checked={task.completed}
        />
      </motion.div>
      <div className="task-info relative text-slate-900 text-sm w-10/12">
        <h4 className="task-title text-lg capitalize">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        <div className="italic opacity-60 absolute -top-3 -right-3">
          {task?.createdAt ? (
            <p>{moment(task.createdAt).fromNow()}</p>
          ) : (
            <p>Just now</p>
          )}
        </div>
      </div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <DeleteIcon
          style={{ fontSize: 30, cursor: "pointer" }}
          size="large"
          onClick={handleRemove}
          className="remove-task-btn bg-red-500 rounded-full text-white border-2 shadow-2xl border-white p-1"
        />
      </motion.div>
    </motion.div>
  );
}

export default Task;