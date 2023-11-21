const { Router } = require("express");

const { getSuperAdmin } = require("../controllers/super-admin/getSuperAdmin");
const { deleteAdmin } = require("../controllers/super-admin/deleteAdmin");
const { deleteStudent } = require("../controllers/super-admin/deleteStudent");
const { authenticateUser, checkBlacklist, authorizeRoles }= require('../middleware/full-auth');

const superAdminRouter = Router();

// Super-Admin level routes
superAdminRouter.route("/getDetails").get([authenticateUser, checkBlacklist, authorizeRoles('super-admin')], getSuperAdmin);
superAdminRouter.route("/delete-admin/:id").delete([authenticateUser, checkBlacklist, authorizeRoles('super-admin')], deleteAdmin);
superAdminRouter.route("/delete-student/:id").delete([authenticateUser, checkBlacklist, authorizeRoles('super-admin')], deleteStudent);

module.exports = { superAdminRouter };