const { Router } = require("express");

const { deleteAdmin } = require("../controllers/super-admin/deleteAdmin");
const { authenticateUser, authorizeRoles }= require('../middleware/full-auth')

const superAdminRouter = Router();

// Super-Admin level routes
superAdminRouter.route("/:id").delete([authenticateUser, authorizeRoles('super-admin')], deleteAdmin);

module.exports = { superAdminRouter };