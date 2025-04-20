import express from "express"
import isAuthenticated from "../middleware/isAuth.js"
import { createCourse, createLecture, editCourse, editLecture, getAdminCourses, getCourseById, getCourseLecture, getLectureById, removeLecture } from "../controller/course.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated,createCourse);
router.route("/").get(isAuthenticated,getAdminCourses);
// upload middleware is pending
router.route("/:courseId").put(isAuthenticated,editCourse);
router.route("/:courseId").get(isAuthenticated,getCourseById)
router.route("/:courseId/lecture").post(isAuthenticated,createLecture);
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated,editLecture)
router.route("/lecture/:lectureId").delete(isAuthenticated,removeLecture)
router.route("/lecture/:lectureId").get(isAuthenticated,getLectureById)
export default router