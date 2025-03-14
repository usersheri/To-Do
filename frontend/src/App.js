import "./App.css";
import { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Active from "./components/Active";
import Completed from "./components/Completed";
import AllTask from "./components/AllTask";
import Layout from "./components/Layout";
import Header from "./components/Header/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/forgotPassword/ResetPassword";
import TaskContext from "./context/TaskContext";
import TokenContext from "./context/TokenContext";
import taskReducer from "./reducer/taskReducer";
import tokenReducer from "./reducer/tokenReducer";
import userReducer from "./reducer/userReducer";
import axios from "./Axios/axios.js";
import Clouds from "./components/Clouds.jsx";

function App() {
  // Retrieve token from local storage
  const token = JSON.parse(localStorage.getItem("authToken"));

  // Define reducers
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [userToken, tokenDispatch] = useReducer(tokenReducer, token);
  const [user, userDispatch] = useReducer(userReducer, {});

  // Fetch user data if token exists
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/getUser", {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        userDispatch({ type: "SET_USER", payload: res.data.user });
      } catch (error) {
        console.log(error);
      }
    };
    if (userToken) fetchUser();
  }, [userToken]);

  // Fetch tasks if token exists
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/task/getTask", {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        dispatch({ type: "SET_TASK", payload: res.data });
      } catch (error) {
        console.log(error);
      }
    };
    if (userToken) fetchTasks();
  }, [userToken]);

  // Check for expired tasks every minute
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      tasks.forEach((task) => {
        if (task.deadline) {
          const taskDeadline = new Date(task.deadline);
          const diffMinutes = Math.floor((now - taskDeadline) / (1000 * 60));
          if (diffMinutes === 30 && !task.completed) {
            // Trigger if task ended 30 mins ago
            alert(`Reminder: Task "${task.title}" ended 30 minutes ago!`);
          }
        }
      });
    };

    const intervalId = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [tasks]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Clouds /> {/* Clouds rendered first, so they are in the background */}
        <TokenContext.Provider
          value={{ userToken, tokenDispatch, user, userDispatch }}
        >
          <TaskContext.Provider value={{ tasks, dispatch }}>
            <Routes>
              <Route path="/" element={<Header />}>
                <Route path="/" element={userToken ? <Layout /> : <Login />}>
                  <Route index element={<AllTask />} />
                  <Route path="active" element={<Active />} />
                  <Route path="completed" element={<Completed />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
              </Route>
            </Routes>
          </TaskContext.Provider>
        </TokenContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
