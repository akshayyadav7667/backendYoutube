
import express from 'express'
import Video from '../models/video.model.js';
import Comment from '../models/comment.model.js'
import { checkAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/new', checkAuth, async (req, res) => {
    try {
        const { video_id, commentText } = req.body;

        const video = await Video.findById(video_id);

        if (!video) {
            return res.status(404).json("Video not found !");
        }

        if (!video_id || !commentText) {
            return res.status(404).json({ errror: "Video Id and Comment Text are required !" });
        }


        const comment = new Comment({
            video_id: video_id,
            user_id: req.user.id,
            commentText
        })

        // console.log(comment);
        await comment.save();
        res.status(200).json({ message: "Comment added successfully" });


    } catch (error) {
        console.log(error)
        res.status(500).json({})
    }
})



// update the comments

router.put('/update/:commentId', checkAuth, async (req,res)=>{
    try {
        const {commentText}=req.body;

        const {commentId}= req.params;


        const comment= await Comment.findById(commentId);
        
        // console.log(comment)

        if(!comment)
        {
            return res.status(404).json("Video not found !");
        }

        const updateComment= await Comment.findByIdAndUpdate(commentId,{
            commentText:commentText,

        },{new:true});

        // console.log(comment);
        // console.log(updateComment)

        res.status(200).json({message:'Updated comment successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"somethings wents wrong", message: error.message})
    }
})


// delete the comment 
router.delete('/delete/:id', checkAuth,async (req,res)=>{

    try {
        const {id}= req.params;


        const comment= await Comment.findByIdAndDelete(id);

        // console.log(comment);

        res.status(200).json({message:'Comment Deleted Successfully '});


    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Somethings wents wrong !"});
    }


})


//get all comments on videos

router.get('/comments/:videoId', checkAuth,async(req,res)=>{
    try {
        const {videoId}= req.params;

        if(!videoId)
        {
            return res.status(404).json({message:"video not found !"})
        }

        const comments= await Comment.find({video_id:videoId}).populate("user_id","channelName logoUrl").sort({createdAt:-1});


        // console.log(comments);

        res.status(200).json({message:"Get all comments", comments});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Somethings wents wrong !"});
    }
})

export default router;