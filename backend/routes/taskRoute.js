import express from "express"
import { addTask, getExpiredTasks, getTask, removeTask} from "../controllers/taskController.js"
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.post("/addTask", requireAuth, addTask)
router.get("/getTask",requireAuth, getTask)
router.delete("/removeTask/:id",requireAuth, removeTask)
router.get("/getExpiredTasks", requireAuth, getExpiredTasks);

export default router