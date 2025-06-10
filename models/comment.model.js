import mongoose from "mongoose";


const commentSchema= new mongoose.Schema({
    video_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Video",
        required:true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    commentText:{
        type:String,
        required:true,
    }
},{timestamps:true});

const Comment= mongoose.model("Comment",commentSchema);

export default Comment;