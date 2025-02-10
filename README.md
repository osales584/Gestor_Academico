# API del Sistema de Gestor Academico

Esta API está diseñada para gestionar la administración del control de alumnos de un centro educativo. Incluye funcionalidades para crear, actualizar y listar, así como gestionar la información del profesor.

## Variables de Entorno

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
SECRET_KEY=(palabra_secret)
```

## Endpoints de la API

### AUTH

- **Registrar Estudiante**
  - **URL:** `/api/auth/register/student`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "String",
      "surname": "String",
      "email": "String"
      "password": "String",
      "role": "STUDENT_ROLE"
    }
    ```
- **Registrar Profesor**
  - **URL:** `/api/auth/register/teacher`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "String",
      "surname": "String",
      "email": "String"
      "password": "String",
      "role": "TEACHER_ROLE"
    }
    ```
- **Iniciar Sesión**
  - **URL:** `/api/auth/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "String"
      "password": "String",
      "role": "Role"
    }
    ```

### PROFESORES

- **Crear Curso**
  - **URL:** `/api/teacher/createCourse`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "description": "string (50 characters)",
      "teacher": "_id"
    }
    ```
- **Listar Cursos**
  - **URL:** `/api/teacher/`
  - **Método:** `GET`

- **Actualizar Curso*
  - **URL:** `/api/teacher/updateCourse/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:**
    ```json
    {
      "teacher": "uid",
      "name": "String",
      "description": "String(50 characters)"
    }
    ```

- **Eliminar Curso**
  - **URL:** `/api/teacher/deleteCourse/:uid`
  - **Método:** `DELETE`

### ALUMNOS

- **Asignación a un curso**
  - **URL:** `/api/student/assignCourse`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "courseID": "string",
    }
    ```

- **Listar Cursos Asignados**
  - **URL:** `/api/student/`
  - **Método:** `GET`

- **Editar Perfil**
  - **URL:** `/api/student/updateProfile/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:**
    ```json
    {
      "name": "String",
      "surname": "String",
      "email": "String"
      "password": "String",
      "role": "TEACHER_ROLE"
    }
    ```

- **Eliminar Perfil**
  - **URL:** `/api/student/deleteProfile/:uid`
  - **Método:** `DELETE`
