import User from "./user.model.js";
import Course from "../course/course.model.js";

/* Crear curso */
export const createCourse = async (req, res) => {
    try {
        const { name, description, teacher } = req.body;

        if (!teacher) {
            return res.status(400).json({
                success: false,
                message: "El campo 'teacher' es obligatorio"
            });
        }

        const newCourse = new Course({
            name,
            description,
            teacher
        });

        await newCourse.save();

        return res.status(201).json({
            success: true,
            message: "Curso creado exitosamente",
            course: newCourse
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear un curso",
            error: err.message
        });
    }
}   
/* Listar curso */
export const getCourse = async(req, res) => {
    try {

        const courses = await courses.find({ teacher: teacher._id }).populate("students", "name email");

        return res.status(200).json({
            success: true,
            courses
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: err.message
        })
    }    
}

/* Actualizar curso */
export const updateCourse = async(req, res) => {
    try {

        const { courseId } = req.params;
        const { name, description} = req.body;
        const teacher = req.user;

        const course = await Course.findOneAndUpdate(
            { _id: courseId, teacher: teacher._id },
            { name, description },
            { new: true, runValidators: true }
        );
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado o no tienes permiso para editarlo",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Curso actualizado exitosamente",
            course
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar un curso",
            error: err.message
        })
    }    
}

/* Eliminar curso */
export const deleteCourse = async(req, res) => {
    try {
        const{courseId} = req.params

        const course = await Course.findByIdandUpdate(courseId, teacher._id )

        if (!deletedCourse) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado o no tienes permiso para eliminarlo",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Curso eliminado exitosamente",
            course
        })
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar un curso",
            error: err.message
        })
    }    
}
