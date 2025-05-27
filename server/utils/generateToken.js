import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({});

export const generateToken = (res, user, message) => {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

    return res.status(201).cookie("token", token, 
        { httpOnly: true,
             sameSite: 'strict',
             secure: process.env.NODE_ENV === "production" ? true : false,
             maxAge: 24 * 60 * 60 * 1000 })
        .json({
        success: true,
        message,
        user
    });
}
