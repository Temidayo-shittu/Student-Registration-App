const { Router } = require("express");

const { getAllStudents } = require("../controllers/student/getAllStudents");
const { getAllMaleStudents } = require("../controllers/student/getAllMaleStudents");
const { getAllFemaleStudents } = require("../controllers/student/getAllFemaleStudents");
const { getSingleStudent, showCurrentStudent } = require("../controllers/student/getSingleStudent");
const { updateStudent, updateStudentPassowrd } = require("../controllers/student/updateStudent");
const { authenticateUser, authorizeRoles }= require('../middleware/full-auth');

const studentRouter = Router();

// Admin level routes
studentRouter.route("/fetch/all").get([authenticateUser, authorizeRoles('admin','super-admin')], getAllStudents);
studentRouter.route("/fetch/all/male").get([authenticateUser, authorizeRoles('admin','super-admin')], getAllMaleStudents);
studentRouter.route("/fetch/all/female").get([authenticateUser, authorizeRoles('admin','super-admin')], getAllFemaleStudents);

// Student level routes
studentRouter.route("/:id").get(authenticateUser, getSingleStudent);
studentRouter.route("/show/AllMyDetails").get(authenticateUser, showCurrentStudent);
studentRouter.route("/:id").patch(authenticateUser, updateStudent);
studentRouter.route("/update/StudentPassword").patch(authenticateUser, updateStudentPassowrd);

module.exports = { studentRouter };