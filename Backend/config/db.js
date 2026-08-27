import mongoose from "mongoose";

const connectDB = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb is connected Succesfful");
        
    } catch (error) {
        console.log("Mongodb conenction failed", error.message);
    }
};

export default connectDB;