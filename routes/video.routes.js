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

        // console.log(title,description, req.files.videoUrl)

        const videoUpload = await cloudinary.uploader.upload(req.files.videoUrl.tempFilePath, {
            resource_type: "video",
            folder: "Youtube/videos"
        })

        const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnailUrl.tempFilePath, {
            folder: "Youtube/thumbnails"

        })

        // console.log(videoUpload);
        // console.log(thumbnailUpload)

        const newVideo = new Video({
            title,
            description,
            category,
            tags: tags ? tags.split(",") : [],
            videoUrl: videoUpload.secure_url,
            videoId: videoUpload.public_id,
            thumbnailUrl: thumbnailUpload.secure_url,
            thumbnailId: thumbnailUpload.public_id,
            user_id: req.user.id

        })
        // console.log(newVideo)

        await newVideo.save();

        res.status(200).json({ message: "video uploaded", newVideo });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
})



router.put('/update/:id', checkAuth, async (req, res) => {
    try {
        const { title, description, category, tags } = req.body;

        const videoId = req.params.id;

        // find video by id
        let video = await Video.findById(videoId);
        // console.log(video)

        if (!video) {
            return res.status(404).json({ error: "Video not found " })
        };

        if (video.user_id.toString() !== req.user.id.toString()) {
            return res.status(401).json({ error: "UnAuthorized" });
        }


        if (req.files && req.files.thumbnailUrl) {
            await cloudinary.uploader.destroy(video.thumbnailId);

            const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnailUrl.tempFilePath, {
                folder: "Youtube/thumbnails"
            })

            video.thumbnailUrl = thumbnailUpload.secure_url,
                video.thumbnailId = thumbnailUpload.public_id
        }

        video.title = title || video.title,
            video.description = description || video.description,
            video.category = category || video.category,
            video.tags = tags ? tags.split(",") : video.tags;

        await video.save();
        res.status(201).json({ message: "Updated successfully", video })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// delete Video 

router.delete("/delete/:id", checkAuth, async (req, res) => {
    try {
        const videoId = req.params.id;

        let video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }

        console.log(video);


        if (video.user_id.toString() !== req.user.id) {
            return res.status(400).json("UnAuthorized");
        }

        // Delete from cloudinary 
        if (video.videoId) {
            await cloudinary.uploader.destroy(video.videoId, { resource_type: "video" });
        }

        if (video.thumbnailId) {
            await cloudinary.uploader.destroy(video.thumbnailId);
        }


        await Video.findByIdAndDelete(videoId)


        res.status(200).json({ message: "Video deleted Successfully" });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Video not Deleted  !!", error: error.message });
    }
})


// Get all video
router.get("/all", async (req, res) => {
    try {
        const video = await Video.find().sort({ createdAt: -1 });
        res.status(200).json(video);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Somethings went wrong ", message: error.message });
    }
})


// GET my video
router.get('/my-videos', checkAuth, async (req, res) => {
    try {
        const videos= await Video.findById({user_id:req.body.id}).sort({createdAt:-1});

        res.status(200).json(videos);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Somethings went wrong ", message: error.message });
    }
})




export default router;