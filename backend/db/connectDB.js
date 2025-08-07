import mongoose from "mongoose"
import dotenv from "dotenv"

export const connectDB = async () => {
    try{
        const connected = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${connected.connection.host}`)
    }
    catch(err){
        console.error("Error: ", err)
        process.exit(1) // 1 is failurte exit code, 0 is succsess code
    }
}