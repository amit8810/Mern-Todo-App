import { Router } from "express"
import { 
    createTodo, 
    getAllTodos, 
    updateTodo,
    deleteTodo 
} from "../controllers/todo.controller.js"

const router = Router()

router.route("/create").post(createTodo)
router.route("/get-all").get(getAllTodos)
router.route("/update/:id").patch(updateTodo)
router.route("/delete/:id").delete(deleteTodo)


export default router;