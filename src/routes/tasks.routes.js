import { Router } from "express";
import tasksController from "../controllers/tasks.controller.js";
import {authenticateToken} from '../middlewares/authenticate.middleware.js'

const router =Router();

//router.get('/',(req,res)=>{
//    res.send('Bienvenidos a task');
//})

//router.post('/',(req,res)=>{
//    res.send('creando a task');
//})

router.route('/')
    .get(authenticateToken, tasksController.getTasks)
    .post(authenticateToken, tasksController.createTasks);

router.route('/:id')
.get(tasksController.getTask)
.put(tasksController.updateTask)
.delete(tasksController.deleteTask)
.patch(tasksController.taskDone)

export default router;