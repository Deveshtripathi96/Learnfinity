import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteVideo } from "../utils/cloudinary.js";


export const createCourse = async(req,res)=>{
    
    try {
        const {Title,category }= req.body;
        console.log(req.id)
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

export const editCourse = async (req,res) =>{
    console.log(req)
    try {
        const courseId = req.params.courseId
        const {Title,subTitle,description,category,price,courseLevel} =req.body;
        //console.log(Title,subTitle,description,category,price,courseLevel)
        const thumbnail = req.file;

        let course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                message:"course not found"
            })
        }
        let courseThumbnail;
        // if(thumbnail){
        //     if(course.courseThumbnail){
        //         const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        //         // pending for cloudinary part
        //     }
        //     // upload thumbnail on Cloudinary
        // }
        
        const updateData = {Title,subTitle,description,category,price,courseLevel}

        course = await Course.findByIdAndUpdate(courseId,updateData,{new:true})
        return res.status(200).json({
            course,
            message: "Course updated successfully"
        })
    } catch (error) {
        console.log("error in updating data")
        return error
    }
}

export const getCourseById = async (req,res)=>{
    try {
        const courseId = req.params.courseId;

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                message:"course not found"
            })
        }

        return res.status(200).json({
            course,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get course by id"
        })
    }
}

export const createLecture = async(req,res)=>{
    try {
        const {lectureTitle} = req.body;
        const {courseId} = req.params;

        if(!lectureTitle || !courseId){
            return res.status(400).json({
                message: "Please provide lecture title"
            })
        }

        const lecture = await Lecture.create({lectureTitle})

        const course = await Course.findById(courseId)

        if(course){
            course.lectures.push(lecture._id);
            await course.save()
        }

        return res.status(201).json({
            lecture,
            message:"lecture created successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to create lecture"
        })
    }
}

 export const getCourseLecture = async(req,res) =>{
      try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId).populate("lectures");
        if(!course){
            return res.status(400).json({
                message: "Course not found"
            })
        }

        return res.status(200).json({
            lectures: course.lectures
        })
      } catch (error) {
         console.log(error)
         return res.status(500).json({
            message: "Failed to get course lecture"
         })
      }
}

export const editLecture = async(req,res) => {
    try {
        const {lectureTitle,videoInfo,isPreviewFree} = req.body;
        const {courseId,lectureId} = req.params

        const lecture = await Lecture.findById(lectureId);
        if(!lecture){
            return res.status(400).json({
                message: "Lecture not found"
            })
        }

        if(lectureTitle)lecture.lectureTitle = lectureTitle
        if(videoInfo?.videoUrl)lecture.videoUrl = videoInfo.videoUrl;
        if(videoInfo?.publicId)lecture.publicId = videoInfo.publicId;
        lecture.isPreviewFree = isPreviewFree;

        await lecture.save()

        // push lecture id in the course if it not present 
        const course = await Course.findById(courseId);
        if(course && !course.lectures.includes(lecture._id)){
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(200).json({
            message: "Lecture updated successfully",
            lecture
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
           message: "Failed to edit Lecture"
        })
    }
}

export const removeLecture = async(req,res) =>{
    try {
        const {lectureId} = req.params;

        const lecture = await Lecture.findByIdAndDelete(lectureId);

        if(lecture.publicId){
            await deleteVideo(lecture.publicId);
        }

        // remove the lecture reference from the associated lecture
        await Course.updateOne(
            {lectures: lectureId},
            {$pull:{lectures:lectureId}}
        )

        return res.status(200).json({
            message: "Lecture removed successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to remove Lecture"
        })
    }
}

export const getLectureById= async(req,res) =>{
    try {
        const {lectureId} = req.params;
        const lecture = await Lecture.findById(lectureId);
        if(!lecture){
            return res.status(404).json({
                message: "Lecture not found"
            })
        }
        return res.status(200).json({
            lecture
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to get Lecture"
        })
    }
}