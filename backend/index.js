import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import forgotPasswordRouter from "./routes/forgotPassword.js";
import reminderService from "./services/reminderService.js";  // Import reminder service

// App config
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
mongoose.set("strictQuery", true);

// Middlewares
app.use(express.json());
app.use(cors());

// DB config (using async/await for better error handling)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ DB Connected");
    } catch (err) {
        console.error("❌ DB Connection Error:", err.message);
        process.exit(1);  // Exit process with failure
    }
};
connectDB();

app.get("/", (req, res) => {
    res.send("I am batman!");
});

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Listen
app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
