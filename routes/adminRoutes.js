const { Router } = require("express");

const { getAdmin, showCurrentAdmin } = require("../controllers/admin/getAdmin");
const { updateAdmin, updateAdminPassowrd } = require("../controllers/admin/updateAdmin");
const { authenticateUser, checkBlacklist, authorizeRoles } = require('../middleware/full-auth');

const adminRouter = Router();

// Admin level routes
adminRouter.route("/").get([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], getAdmin);
adminRouter.route("/show/AllMyDetails").get([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], showCurrentAdmin);
adminRouter.route("/updateAdmin").patch([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], updateAdmin);
adminRouter.route("/updateAdminPassword").patch([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], updateAdminPassowrd);

module.exports = { adminRouter };