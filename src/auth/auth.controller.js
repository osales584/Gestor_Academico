import User from "../user/user.model.js"
import { verify } from "argon2"
import { generateToken } from "../helpers/generate-jwt.js"

/* Inicio de sesión */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Credenciales inválidas",
                error: "Usuario no encontrado"
            });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        const token = await generateToken(user.uid);

        return res.status(200).json({
            success: true,
            message: "Inicio de sesión exitoso",
            Details: {
                token,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al iniciar sesión",
            error: err.message
        });
    }
};
