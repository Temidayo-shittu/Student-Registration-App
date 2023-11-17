const { Router } = require("express");

const { getSuperAdmin } = require("../controllers/super-admin/getSuperAdmin");
const { deleteAdmin } = require("../controllers/super-admin/deleteAdmin");
const { deleteStudent } = require("../controllers/super-admin/deleteStudent");
const { authenticateUser, authorizeRoles }= require('../middleware/full-auth')

const superAdminRouter = Router();

// Super-Admin level routes
superAdminRouter.route("/getDetails").get([authenticateUser, authorizeRoles('super-admin')], getSuperAdmin);
superAdminRouter.route("/delete-admin/:id").delete([authenticateUser, authorizeRoles('super-admin')], deleteAdmin);
superAdminRouter.route("/delete-student/:id").delete([authenticateUser, authorizeRoles('super-admin')], deleteStudent);

module.exports = { superAdminRouter };