import User from "../user/user.model.js"
import { hash} from "argon2"

export const registerStudent = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;
        const encryptedPassword = await hash(password);

        const student = await User.create({
            name,
            surname,
            email,
            password: encryptedPassword,
            role: "STUDENT_ROLE"
        });

        return res.status(201).json({
            success: true,
            message: "Estudiante registrado exitosamente",
            student: {
                name: student.name,
                surname: student.surname,
                email: student.email,
                role: student.role
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al registrar estudiante",
            error: err.message
        });
    }
};
