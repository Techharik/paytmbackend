import express from 'express';
import cors from "cors";
import { dbConnect } from './db/connect.js';
import userRouter from './routes/userRouter.js'

const app = express();
dbConnect()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", userRouter)

app.get('/', (req, res) => {
    res.json({
        success: true
    })
})


app.listen(3000, () => {
    console.log('Server started successfully')
})