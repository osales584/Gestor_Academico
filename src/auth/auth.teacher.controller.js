import User from "../user/user.model.js"
import { hash} from "argon2"

export const registerTeacher = async (req, res) => {
    try {
        const { name, surname,email, password } = req.body;
        const encryptedPassword = await hash(password);

        const teacher = await User.create({
            name,
            surname,
            email,
            password: encryptedPassword,
            role: "TEACHER_ROLE"
        });

        return res.status(201).json({
            success: true,
            message: "Profesor registrado exitosamente",
            teacher: {
                name: teacher.name,
                surname: teacher.surname,
                email: teacher.email,
                role: teacher.role
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al registrar profesor",
            error: err.message
        });
    }
};
