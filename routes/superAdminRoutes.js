const { Router } = require("express");

const { deleteAdmin } = require("../controllers/super-admin/deleteAdmin");
const { deleteStudent } = require("../controllers/super-admin/deleteStudent");
const { authenticateUser, authorizePermissions }= require('../middleware/authentication')

const superAdminRouter = Router();

// Super-Admin level routes
superAdminRouter.route("/delete-admin/:id").delete([authenticateUser, authorizePermissions('super-admin')], deleteAdmin);
superAdminRouter.route("/delete-student/:id").delete([authenticateUser, authorizePermissions('super-admin')], deleteStudent);

module.exports = { superAdminRouter };