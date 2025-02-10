import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1]; // Obtener token del header
        if (!token) {
            return res.status(401).json({ 
                message: "Acceso denegado. Token no proporcionado." 
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verificar token
        req.user = await User.findById(decoded.uid).select("-password"); // Obtener usuario

        if (!req.user) {
            return res.status(401).json({
                 message: "Token inválido" 
            });
        }

        next(); 
    } catch (err) {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
};