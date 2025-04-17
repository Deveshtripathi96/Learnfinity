import express from "express"
import isAuthenticated from "../middleware/isAuth.js"
import { createCourse, createLecture, editCourse, getAdminCourses, getCourseById, getCourseLecture } from "../controller/course.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated,createCourse);
router.route("/").get(isAuthenticated,getAdminCourses);
// upload middleware is pending
router.route("/:courseId").put(isAuthenticated,editCourse);
router.route("/:courseId").get(isAuthenticated,getCourseById)
router.route("/:courseId/lecture").post(isAuthenticated,createLecture);
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture)
export default router