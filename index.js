import express from 'express'
import dotenv from 'dotenv'
import { ConnectDB } from './config/db.config.js';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';


import userRoutes from './routes/user.routes.js'
import videoRoutes from './routes/video.routes.js';
import commentRoutes from './routes/comment.routes.js'

dotenv.config();


const app= express();
ConnectDB()


app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp/"
}))

app.use('/api/user',userRoutes)
app.use('/api/video',videoRoutes)
app.use('/api/comment',commentRoutes)


app.listen(process.env.PORT,()=>{
        console.log(`server is running on ${process.env.PORT}`)
})