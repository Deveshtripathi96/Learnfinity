import express from "express"
import connectdb from "./dataBase/db.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import courseRoute from "./routes/course.route.js"
dotenv.config({});

const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/api/v1/course",courseRoute)
const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
     connectdb();
    console.log(`Server is running on port ${PORT}`);
})