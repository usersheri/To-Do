import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function TaskIndicator() {
  return (
    <nav className="w-full p-3 rounded-lg ">
      <ul className="flex gap-3 justify-between">
        {["All Task", "Active", "Completed"].map((text, index) => {
          const toPath = text === "All Task" ? "/" : `/${text.toLowerCase()}`;
          return (
            <motion.li
              key={text}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to={toPath}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-200 text-black hover:bg-blue-400 hover:border hover:border-white hover:text-white"
                  }`
                }
              >
                {text}
              </NavLink>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TaskIndicator;
