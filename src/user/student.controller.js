import User from "./user.model.js"
import course from "../course/course.model.js";

/* Asignarse a un curso*/
export const assignCourse = async(req, res) => {
    try {
        
        const studentId = req.user.id; 
        const { courseId } = req.body;

        const student = await User.findById(studentId);
        if (student.courses.length >= 3) {
            return res.status(400).json({
                success: false,
                message: "Máximo 3 cursos permitidos"
            });
        }

        const course = await course.findById(req.params.courseId);
        if (student.courses.includes(courseId)){
            return res.status(400).json({ 
                success: false,
                message: "Ya se asigno a este curso" });
        }

        student.courses.push(courseId);
        course.students.push(studentId); 

        await student.save();
        await course.save();

        return res.status(200).json({
            success: true,
            message: "Se ha inscrito exitosamente",
            course: {
                id: course._id,
                name: course.name
            }
        })
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al asignarse a un curso",
            error: err.message
        })
    }
}

/* Ver cursos asignado */
export const getCourses = async(req, res) => {
    try {
        const student = await User.findById(req.user.id).populate('course', 'name description');
        
        return res.status(200).json({
            succes: true,
            course: student.courses
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: err.message
        })
    }
}

/* Editar perfil */
export const updateProfile = async(req,res) => {
    try {
        const { uid } = req.params;
        const { name, email, surname} = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            uid,
            { name, email , surname},
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "Perfil no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Perfil actualizado exitosamente",
            user: updatedUser
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar perfil",
            error: err.message
        })
    }
}

/* Eliminar perfil */
export const deleteProfile = async(req,res) => {
    try {
        
        const {uid} = req.params
        const deletedUser = await User.findByIdAndDelete(uid);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "Perfil no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Perfil eliminado permanentemente",
            user: deletedUser
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar perfil",
            error: err.message
        })
    }
}