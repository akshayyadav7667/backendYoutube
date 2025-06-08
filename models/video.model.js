import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        tirm: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
        trim: true,   // This removes any spaces at the beginning or end
    },
    thumbnailUrl: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnailId: {
        type:String,
        required:true,
        trim: true,

    },
    category:{
        type:String,
        required:true,
        trim: true,    // This removes any spaces at the beginning or end

    },
    tags: {
        type: String,
        trim: true,
    },
    likes: {
        type: String,
        default: 0,
        min: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
        min: 0,
    },
    views: {
        type: Number,
        default: 0,
        min: 0,
    },
    likedBy: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ]
    },
    disLinkedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    viewedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
}, { timestamps: true });


const videoModel= mongoose.model('Video',videoSchema);

export default videoModel;

