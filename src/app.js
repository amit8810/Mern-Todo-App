import express from "express";
import cors from 'cors'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))

//routes
import todoRoutes from "./routes/todo.routes.js"

//route declartion
app.use("/api/v1/todos", todoRoutes)

export { app }