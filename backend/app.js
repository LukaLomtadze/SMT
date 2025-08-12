import express from "express"
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"


dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(express.json());//allows us to parse incoming requests with JSON payloads requests:req.body
app.use(cookieParser()) // allows us to parse incoming cookies

app.use("/api/auth", authRoutes)

const port = process.env.PORT || 4040;

app.listen(port, async () => {
    connectDB();
    console.log(`server started on localhost:${port}`)
})

//jdC8ZF133aHm6xsI

//mongodb+srv://nopev16:jdC8ZF133aHm6xsI@cluster0.jvux4zn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0