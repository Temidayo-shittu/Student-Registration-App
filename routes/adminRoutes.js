const { Router } = require("express");

const { getAdmin } = require("../controllers/admin/getAdmin");
const { updateAdmin, updateAdminPassowrd } = require("../controllers/admin/updateAdmin");
const { authenticateUser, authorizePermissions }= require('../middleware/authentication');

const adminRouter = Router();

// Admin level routes
adminRouter.route("/").get([authenticateUser, authorizePermissions('admin','super-admin')], getAdmin);
adminRouter.route("/updateAdmin").patch(authenticateUser, updateAdmin);
adminRouter.route("/updateAdminPassword").patch(authenticateUser, updateAdminPassowrd);

module.exports = { adminRouter };