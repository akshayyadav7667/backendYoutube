import express from 'express'
import mongoose from 'mongoose'
import User from '../models/user.model.js'
import Video from '../models/video.model.js'
import cloudinary from '../config/cloudinary.js'


const router= express.Router();


// upload video

router.post('/upload',async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})


export default router;