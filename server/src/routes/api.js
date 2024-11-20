import express from "express";
import { login, profileUpdate, registration } from "../controller/UsersController.js";
import authUser from "../middleware/AuthVerifyMiddleware.js";
import { createTask, listTaskByStatus, taskStatusCount, updateTaskStatus } from "../controller/TasksController.js";

const router = express.Router()




router.post("/registration", registration)
router.post("/login", login)
router.post("/profileUpdate", authUser, profileUpdate  )
router.post("/createTask", authUser, createTask )
router.get("/updateTaskStatus/:id/:status", authUser, updateTaskStatus)
router.get("/listTaskByStatus/:status", authUser, listTaskByStatus)
router.get("/taskStatusCount", authUser, taskStatusCount)

export default router