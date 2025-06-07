import { v2 as cloudinary } from 'cloudinary'

import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// console.log("Cloudinary config:");
// console.log("cloud_name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("api_key:", process.env.CLOUDINARY_API_KEY);
// console.log("api_secret:", process.env.CLOUDINARY_API_SECRET);

export default cloudinary
