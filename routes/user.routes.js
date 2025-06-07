import express from 'express';
import bcrypt from 'bcrypt'
import cloudinary from '../config/cloudinary.js';
import User from '../models/user.model.js'

const router = express.Router();


router.post('/signup', async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(hashedPassword)
        // console.log(req.files.logoUrl.tempFilePath)

        const uploadImage = await cloudinary.uploader.upload(
            req.files.logoUrl.tempFilePath
        )

        console.log("Image", uploadImage);

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            channelName: req.body.channelName,
            phone: req.body.phone,
            logoUrl: uploadImage.secure_url,
            logoId: uploadImage.public_id
        })

        let user = await newUser.save();

        res.status(201).json({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

})


export default router;  