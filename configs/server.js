"use strict"

import express from 'express'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
import authRoutes from "../src/auth/auth.routes.js"
import studentRoutes from "../src/user/student.routes.js"
import teacherRoutes from "../src/user/teacher.routes.js"
import apiLimiter from '../src/middlewares/valid-cant-peticiones.js'

const configs = (app) => {
    app.use(cors()),
    app.use(helmet()),
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/gestorAcademico/v1/auth", authRoutes)
    app.use("/gestorAcademico/v1/student", studentRoutes)
    app.use("/gestorAcademico/v1/teacher", teacherRoutes)
}    

const conectarDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

export const initServer = () => {
    const app = express()
    try{
        configs(app)
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port: ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}