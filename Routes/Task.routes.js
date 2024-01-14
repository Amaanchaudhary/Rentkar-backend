import {Router} from 'express'
import { addTask, completedTask, deleteTask, getAllTask } from '../Controllers/Task.controller.js';

const router = Router();

router.post("/add-task" , addTask)
router.get("/get-all-task" , getAllTask)
router.delete("/delete-task" , deleteTask)
router.patch("/completed-task" , completedTask)


export default router