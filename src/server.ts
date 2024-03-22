import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db";
import projectRoutes from './routes/project.router'
dotenv.config();

connectDB();

const app = express();

//config
app.use(express.json());

//Routes

// app.use('/api/auth')
app.use('/api/projects', projectRoutes)




export default app