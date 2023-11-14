const { Router } = require("express");

const { getMaleStudentsCounts } = require("../controllers/analytics/getMaleStudentsCounts");
const { getFemaleStudentsCounts } = require("../controllers/analytics/getFemaleStudentsCount");
const { totalStudentsCounts } = require("../controllers/analytics/totalStudentsCount");
const { averageStudentsAge } = require("../controllers/analytics/averageStudentsAge");
const { numOfStudentsInEachLevel } = require("../controllers/analytics/numOfStudentsInEachLevel");
const { numOfStudentsInEachFaculty } = require("../controllers/analytics/studentsPerFaculty");

const { authenticateUser, authorizePermissions }= require('../middleware/authentication');


const analyticsRouter = Router();

// Admin level routes
analyticsRouter.route("/fetch/all/male-count").get([authenticateUser, authorizePermissions('admin','super-admin')], getMaleStudentsCounts);
analyticsRouter.route("/fetch/all/female-count").get([authenticateUser, authorizePermissions('admin','super-admin')], getFemaleStudentsCounts);
analyticsRouter.route("/fetch/all/students-count").get([authenticateUser, authorizePermissions('admin','super-admin')], totalStudentsCounts);
analyticsRouter.route("/fetch/all/average-age").get([authenticateUser, authorizePermissions('admin','super-admin')], averageStudentsAge);
analyticsRouter.route("/fetch/all/students-level").get([authenticateUser, authorizePermissions('admin','super-admin')], numOfStudentsInEachLevel);
analyticsRouter.route("/fetch/all/students-faculty").get([authenticateUser, authorizePermissions('admin','super-admin')], numOfStudentsInEachFaculty);


module.exports = { analyticsRouter };