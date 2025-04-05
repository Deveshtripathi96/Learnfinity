import express from "express";
import dotenv from "dotenv";
import UserRoute from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";



dotenv.config({});
import connectDB from "./database/dB.js";
const app=express();
//database called
connectDB();
  
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

// apis
app.use("/api/v1/user",UserRoute);

app.get("/home",(_,res)=>{
    res.status(200).json({
        success:true,
        message:"i m coming from backend beta bakchodi nahi"
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));