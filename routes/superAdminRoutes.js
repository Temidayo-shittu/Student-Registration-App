const { Router } = require("express");

const { deleteAdmin } = require("../controllers/super-admin/deleteAdmin");
const { authenticateUser, authorizePermissions }= require('../middleware/authentication')

const superAdminRouter = Router();

// Super-Admin level routes
superAdminRouter.route("/:id").delete([authenticateUser, authorizePermissions('super-admin')], deleteAdmin);

module.exports = { superAdminRouter };