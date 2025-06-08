import express from 'express'
import mongoose from 'mongoose'
import User from '../models/user.model.js'
import Video from '../models/video.model.js'
import cloudinary from '../config/cloudinary.js'
import { checkAuth } from '../middleware/auth.middleware.js'


const router = express.Router();


// upload video

router.post('/upload', checkAuth, async (req, res) => {
    try {
        // console.log("upload video ")
        const { title, description, category, tags } = req.body;

        if (!req.files || !req.files.videoUrl || !req.files.thumbnailUrl) {
            return res.status(400).json({ error: "Video and thumbnails are required " });

        }

        const videoUpload = await cloudinary.uploader.upload(req.files.videoUrl.tempFilePath, {
            resource_type: "video",
            folder: "Youtube/videos"
        })

        const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnailUrl.tempFilePath, {
            folder: "Youtube/thumbnails"

        })

        const newVideo = new Video({
            title,
            description,
            category,
            tags: tags ? tags.split(",") : [],
            videoUrl: videoUpload.secure_url,
            videoId: videoUpload.public_id,
            thumbnailUrl: thumbnailUpload.secure_url,
            thumbnailId: thumbnailUpload.public_id,

        })

        res.status(200).json({ message: "video uploaded", newVideo });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
})


export default router;