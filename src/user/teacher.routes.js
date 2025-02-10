import { Router } from "express";
import { createCourse, getCourse, updateCourse, deleteCourse } from "./teacher.controller.js";
import { authMiddleware } from "../middlewares/middelware.js";

const router = Router()

/*Crear curso */
router.post("/createCourse", createCourse)
/*Listar curso */
router.get("/", getCourse)
/*Actualizar curso */
router.patch("/updateCourse/:uid", authMiddleware, updateCourse)
/*Eliminar curso*/
router.delete("/deleteCourse/:uid", deleteCourse)

export default router