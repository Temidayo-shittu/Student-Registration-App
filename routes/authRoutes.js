const { Router } = require("express");

const { adminSignup } = require("../controllers/auth/adminSignup");
const { studentSignup } = require("../controllers/auth/studentSignup");
const { adminLogin } = require("../controllers/auth/adminLogin");
const { studentLogin } = require("../controllers/auth/studentLogin");
const { adminLogout } = require("../controllers/auth/adminLogout");
const { studentLogout } = require("../controllers/auth/studentLogout");
const { authenticateUser, authorizeRoles } = require('../middleware/full-auth');


const authRouter = Router();

// Admin level routes
authRouter.route("/admin/signup").post(adminSignup);
authRouter.route("/student/signup").post(studentSignup);
authRouter.route("/admin/login").post(adminLogin);
authRouter.route("/student/login").post(studentLogin);
authRouter.route("/admin/logout").get(authenticateUser, adminLogout);
authRouter.route("/student/logout").get(authenticateUser, studentLogout);


module.exports = { authRouter };