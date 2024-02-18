import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { config } from 'dotenv';
import userRouter from './routes/userRoutes.js';
config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))
app.use(cookieParser());

app.use('/',(req,res) => {
    res.send("Hello");
})

app.use('/v1/api/user',userRouter);

app.all('*',(req,res) => {
    res.status(404).send("OOPs!! 404 page not found");
})




export default app;