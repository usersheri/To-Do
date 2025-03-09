import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import TaskContext from "../../context/TaskContext";
import TokenContext from "../../context/TokenContext";
import axios from "../../Axios/axios.js";

const CreateTask = () => {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/task/addTask",
        { title, description, deadline },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: "ADD_TASK", title, description, deadline });

    setTitle("");
    setDescription("");
    setDeadline("");

    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <div className="flex justify-center items-center addContainer rounded-xl h-fit py-0 md:w-1/3 md:mx-auto mx-3 mt-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-slate-900/30  backdrop-blur-sm shadow-2xl rounded-xl p-6"
      >
        <h2 className="text-white text-2xl font-semibold text-center mb-4">
          Create a New Task
        </h2>
        <form onSubmit={handleAdd} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="text-white font-bold block mb-1">
              Title
            </label>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/20 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="text-white font-bold block mb-1"
            >
              Description
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.05 }}
              rows="4"
              id="description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white/20 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          {/* Deadline Field */}
          <div>
            <label
              htmlFor="deadline"
              className="text-white font-bold block mb-1"
            >
              Deadline
            </label>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="datetime-local"
              id="deadline"
              value={deadline}
              required
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-white/20 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-bora to-white text-skyline font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Add Task
            </button>
          </motion.div>
        </form>
      </motion.div>

      {/* Toast Notification */}
      {toastVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          Task Added Successfully!
        </motion.div>
      )}
    </div>
  );
};

export default CreateTask;
