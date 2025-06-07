import mongoose from 'mongoose'

export const ConnectDB= async()=>{
    try {

        await mongoose.connect(process.env.MONGO_DB)
        console.log("connected to database");
    } catch (error) {
        console.log(error);
        throw new Error("Somethings went wrong",error)
    }
}