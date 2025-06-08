import jwt from 'jsonwebtoken'

export const  checkAuth = async(req,res,next)=>{
    try {
        const token= req.headers.authorization?.split(" ")[1];

        if(!token)
        {
            return res.status(401).json({error:"TOken is not Provided "});
        }

        // decoded token

        const decodeUser=jwt.verify(token,process.env.JWT_TOKEN);
        // console.log(decodeUser?._id);

        req.user= decodeUser;
        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Somethings wents wrong ",message:error.message})
    }
}