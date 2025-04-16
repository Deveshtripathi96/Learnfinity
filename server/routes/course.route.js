import express from "express"
import isAuthenticated from "../middleware/isAuth.js"
import { createCourse, editCourse, getAdminCourses, getCourseById } from "../controller/course.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated,createCourse);
router.route("/").get(isAuthenticated,getAdminCourses);
// upload middleware is pending
router.route("/:courseId").put(isAuthenticated,editCourse);
router.route("/:courseId").get(isAuthenticated,getCourseById)
export default router