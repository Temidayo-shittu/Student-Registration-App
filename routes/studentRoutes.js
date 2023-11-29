const { Router } = require("express");

const { getAllStudents } = require("../controllers/student/getAllStudents");
const { getAllMaleStudents } = require("../controllers/student/getAllMaleStudents");
const { getAllFemaleStudents } = require("../controllers/student/getAllFemaleStudents");
const { getSingleStudent, showCurrentStudent } = require("../controllers/student/getSingleStudent");
const { updateStudent, updateStudentPassowrd } = require("../controllers/student/updateStudent");
const { authenticateUser, checkBlacklist, authorizeRoles }= require('../middleware/full-auth');

const studentRouter = Router();

// Admin level routes
studentRouter.route("/all").get([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], getAllStudents);
studentRouter.route("/male").get([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], getAllMaleStudents);
studentRouter.route("/female").get([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], getAllFemaleStudents);

// Student level routes
studentRouter.route("/:id").get(authenticateUser, checkBlacklist, getSingleStudent);
studentRouter.route("/").get(authenticateUser, checkBlacklist, showCurrentStudent);
studentRouter.route("/:id").patch(authenticateUser, checkBlacklist, updateStudent);
studentRouter.route("/student-password").patch(authenticateUser, checkBlacklist, updateStudentPassowrd);

module.exports = { studentRouter };