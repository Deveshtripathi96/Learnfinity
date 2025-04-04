import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

//register business logic
export const register= async(req,res)=>{
    try{
   const {name,email,password}=req.body;
   if(!name || !password || !email){
    return res.status(400).json({
        success:false,
        message:"All fields are required"
    })
   }
   const user= await User.findOne({email});
   if(user){
    return res.status(400).json({
        success:false,
        message:"User already exists with this email"
    })
   }
 const hashedPassword= await bcrypt.hash(password,10);
   await User.create(
    {
        name,
        email,
        password:hashedPassword
    }
   );
   return res.status(201).json({
    success:true,
    message:"User Created successfully"
   })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Failed to register"
        })


    }
}

//Login business logic
export const login=async(req,res)=>{
    try{
   const {email,password}=req.body;
   if( !password || !email){
    return res.status(400).json({
        success:false,
        message:"All fields are required"
    })
    const user= await User.findOne({email});
    if(!email){
        return res.status(400).json({
            success:false,
            message:"Incorrect email or password"
        })
    }
    const isPasswordMatch=bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            success:false,
            message:"Incorrect email or password"
        });
    }
   }

    } catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Failed to register"
        })

    }
}