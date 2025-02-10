import { Router } from "express";
import { assignCourse, getCourses, updateProfile, deleteProfile } from "./student.controller.js";
import { authMiddleware } from "../middlewares/middelware.js";

const router = Router()

/*Asignar curso */
router.post("/assignCourse", authMiddleware , assignCourse)
/*Listar curso */
router.get("/", getCourses)
/*Actualizar perfil */
router.patch("/updateProfile/:uid", updateProfile)
/*Eliminar perfil*/
router.delete("/deleteProfile/:uid", deleteProfile)

export default router