const { Router } = require("express");

const { getAdmin } = require("../controllers/admin/getAdmin");
const { updateAdmin, updateAdminPassowrd } = require("../controllers/admin/updateAdmin");
const { authenticateUser, authorizeRoles }= require('../middleware/full-auth');

const adminRouter = Router();

// Admin level routes
adminRouter.route("/").get([authenticateUser, authorizeRoles('admin','super-admin')], getAdmin);
adminRouter.route("/updateAdmin").patch(authenticateUser, updateAdmin);
adminRouter.route("/updateAdminPassword").patch(authenticateUser, updateAdminPassowrd);

module.exports = { adminRouter };