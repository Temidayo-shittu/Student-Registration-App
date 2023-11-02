const { Router } = require("express");

const { adminSignup } = require("../controllers/auth/adminSignup");
const { adminLogin } = require("../controllers/auth/adminLogin");
const { adminLogout } = require("../controllers/auth/adminLogout");

const authRouter = Router();

// Admin level routes
authRouter.route("/admin/signup").post(adminSignup);
authRouter.route("/admin/login").post(adminLogin);
authRouter.route("/admin/logout").get(adminLogout);



module.exports = { authRouter };