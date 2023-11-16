import {Router} from "express"
import { createTodo, readAllTodo, readTodo, updateTodo } from "../controller/todoContoller";

const router: Router = Router();

router.route("/create-todo").post(createTodo);
router.route("/read-all-todo").get(readAllTodo);
router.route("/read-todo/:taskId").get(readTodo);
router.route("/update-todo/:taskId").patch(updateTodo);

export default router