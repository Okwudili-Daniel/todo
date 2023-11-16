import { Router } from "express";
import { createTask, viewOneTodo, readTasks, viewOneAndUpdateTodo, viewDeleteTodo } from "../controller/taskController";

export const router: Router = Router();

router.route("/create-task").post(createTask)
router.route("/read-all-tasks").get(readTasks)
router.route("/read-one-task/:todoID").get(viewOneTodo)
router.route("/update-task/:todoID").patch(viewOneAndUpdateTodo)
router.route("/delete-task/:todoID").delete(viewDeleteTodo)

export default router;