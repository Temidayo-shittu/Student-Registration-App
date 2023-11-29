const { Router } = require("express");

const { studentSignup } = require("../controllers/auth/studentSignup");
const { adminLogin } = require("../controllers/auth/adminLogin");
const { studentLogin } = require("../controllers/auth/studentLogin");
const { adminLogout } = require("../controllers/auth/adminLogout");
const { studentLogout } = require("../controllers/auth/studentLogout");


const authRouter = Router();

// Admin level routes
authRouter.route("/student/signup").post(studentSignup);
authRouter.route("/admin/login").post(adminLogin);
authRouter.route("/student/login").post(studentLogin);
authRouter.route("/admin/logout").get(adminLogout);
authRouter.route("/student/logout").get(studentLogout);


module.exports = { authRouter };