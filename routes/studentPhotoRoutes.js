const { Router } = require("express");

const { uploadStudentPhoto } = require("../controllers/images/uploadStudentPhoto");
const { getAllPhotos } = require("../controllers/images/getAllPhotos");
const { getSingleStudentPhoto, showCurrentStudentPhoto } = require("../controllers/images/getSinglePhoto");

const { authenticateUser, checkBlacklist, authorizeRoles } = require('../middleware/full-auth');

const studentPhotoRouter = Router();

// Admin level routes
studentPhotoRouter.route("/all-images").get([authenticateUser, checkBlacklist, authorizeRoles('admin','super-admin')], getAllPhotos);


// Student level routes
studentPhotoRouter.route("/uploads").post(authenticateUser, checkBlacklist, uploadStudentPhoto);
studentPhotoRouter.route("/:id").get(authenticateUser, checkBlacklist, getSingleStudentPhoto);
studentPhotoRouter.route("/show/photo").get(authenticateUser, checkBlacklist, showCurrentStudentPhoto);


module.exports = { studentPhotoRouter };