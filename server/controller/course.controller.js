import { Course } from "../model/course.model.js";


export const createCourse = async(req,res)=>{
    
    try {
        const {Title,category }= req.body;

        if(!Title || !category){
            console.log(Title,category);
            return res.status(400).json({
                message: "Please fill in all fields"
            })
        }
        const course = await Course.create({
            Title,
            category,
            creator: req.id
        });
        
        return res.status(201).json({
            course,
            message :"course created successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:'Failed to create course'
        })
    }
}

export const getAdminCourses = async(req,res) =>{
    try {
        const adminId = req.id;
        if(!adminId){
            return res.status(400).json({
                message: "Please login to access this route"
            })
        }

        const courses = await Course.find({creator:adminId})
        if(!courses){
            return res.status(404).json({
                courses:[],
                message: "Course not Found"
            })
        };

        return res.status(200).json({
            courses,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:'Failed to create course'
        })
    }
}