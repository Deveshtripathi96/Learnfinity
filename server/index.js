import express from "express";
import dotenv from "dotenv";



dotenv.config({});
import connectDB from "./database/dB.js";
const app=express();
//database called
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));