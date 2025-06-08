import express from 'express';
import bcrypt from 'bcrypt'
import cloudinary from '../config/cloudinary.js';
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

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


router.post('/login', async (req, res) => {
    try {
        const existingUser =await User.findOne({ email: req.body.email });

        if (!existingUser) {
            return res.status(401).json({ message: "User not found !" });
        }

        const isMatch = await bcrypt.compare(req.body.password, existingUser.password);

        if (!isMatch) {
            return res.status(500).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({
            id: existingUser._id,
            email: existingUser.email,
            channelName: existingUser.channelName,
        }, process.env.JWT_TOKEN, { expiresIn: "2d" });


        const {password,...others}=existingUser._doc;

        res.status(200).json({
            ...others,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Somethings went wrong", message: error.message })
    }
})





export default router;  