import express from "express";
import morgan from "morgan";
import authRoutes from './routes/auth.routes.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use('/public/uploads', express.static(path.join(__dirname, '..', 'public/uploads')));

app.use("/api",authRoutes);


export default app;