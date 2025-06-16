import express from "express"
import connectDB from "./dataBase/db.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import courseRoute from "./routes/course.route.js"
import UserRoute from "./routes/user.routes.js"
import mediaRoute from "./routes/media.route.js"
dotenv.config({});
//database called
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    //methods: ["GET", "POST", "PUT", "DELETE",],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

// apis
app.use("/api/v1/user",UserRoute);
app.use("/api/v1/course",courseRoute)
app.use("/api/v1/media",mediaRoute)

app.get("/home",(_,res)=>{
    res.status(200).json({
        success:true,
        message:"i m coming from backend beta bakchodi nahi"
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
