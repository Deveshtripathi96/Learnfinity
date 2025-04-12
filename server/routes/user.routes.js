import express from "express";

import {register,login} from "../controller/user.controller.js";

const UserRoute=express.Router();

UserRoute.route("/register").post(register);
UserRoute.route("/login").post(login);

export default UserRoute;


