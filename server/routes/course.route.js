import express from "express"
import { createCourse, getAdminCourses } from "../controller/course.controller.js";

const router = express.Router();

router.route("/").post(createCourse);
router.route("/").get(getAdminCourses);
export default router