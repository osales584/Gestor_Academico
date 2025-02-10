import { Router } from "express";
import { registerStudent } from "./auth.student.controller.js";
import { registerTeacher } from "./auth.teacher.controller.js";
import { login } from "./auth.controller.js"

const router = Router();

/* Ruta para registro de estudiante */
router.post("/register/student", registerStudent);
/* Ruta para registro de profesor */
router.post("/register/teacher", registerTeacher);

/* Ruta para inicio de sesión */
router.post("/login", login);

export default router;