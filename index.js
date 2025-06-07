import express from 'express'
import dotenv from 'dotenv'
import { ConnectDB } from './config/db.config.js';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';


import userRouter from './routes/user.routes.js'

dotenv.config();


const app= express();
ConnectDB()


app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp/"
}))

app.use('/api/user',userRouter)


app.listen(process.env.PORT,()=>{
        console.log(`server is running on ${process.env.PORT}`)
})