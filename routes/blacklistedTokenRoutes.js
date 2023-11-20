const { Router } = require("express");

const { getallBlacklistedTokens } = require("../controllers/blacklisted-tokens/getAllBlacklistedTokens");
const { authenticateUser, checkBlacklist, authorizeRoles }= require('../middleware/full-auth');

const blackListedTokenRouter = Router();

// Admin level routes
blackListedTokenRouter.route("/fetch/all").get([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], getallBlacklistedTokens);

module.exports = { blackListedTokenRouter };