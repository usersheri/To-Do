import React, { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import TokenContext from "../../context/TokenContext.js";
import "./header.css";

function Header() {
  const token = localStorage.getItem("authToken");
  const { user } = useContext(TokenContext);
  console.log("user", user);

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="header bg-bora flex justify-between items-center p-4">
        <div className=" w-1/4 text-center">
          <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold text-skyline"
            >
              Todo App
            </motion.h1>
          </NavLink>
        </div>
        <div className="flex justify-between">
          {token ? (
            <div className="flex items-center justify-center">
              <p className="mr-5">
                Welcome,{" "}
                <span className="text-xl text-blue-800 capitalize">
                  {user.name}
                </span>
              </p>
              <button onClick={logout} className="logout mr-4">
                Logout
              </button>
            </div>
          ) : (
            <ul className="flex justify-end gap-3 w-3/4 pr-6">
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Header;
