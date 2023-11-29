const { Router } = require("express");

const { getAdmin, showCurrentAdmin } = require("../controllers/admin/getAdmin");
const { updateAdmin, updateAdminPassowrd } = require("../controllers/admin/updateAdmin");
const { authenticateUser, checkBlacklist, authorizeRoles } = require('../middleware/full-auth');

const adminRouter = Router();

// Admin level routes
adminRouter.route("/").get([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], getAdmin);
adminRouter.route("/show-details").get([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], showCurrentAdmin);
adminRouter.route("/admin-details").patch([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], updateAdmin);
adminRouter.route("/admin-password").patch([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], updateAdminPassowrd);

module.exports = { adminRouter };