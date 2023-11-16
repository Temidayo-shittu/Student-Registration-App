const { Router } = require("express");

const { uploadStudentPhoto } = require("../controllers/images/uploadStudentPhoto");
const { getAllPhotos } = require("../controllers/images/getAllPhotos");
const { getSingleStudentPhoto, showCurrentStudentPhoto } = require("../controllers/images/getSinglePhoto");

const { authenticateUser, authorizeRoles } = require('../middleware/full-auth');

const studentPhotoRouter = Router();

// Admin level routes
studentPhotoRouter.route("/all-images").get([authenticateUser, authorizeRoles('admin','super-admin')], getAllPhotos);


// Student level routes
studentPhotoRouter.route("/uploads").post(authenticateUser, uploadStudentPhoto);
studentPhotoRouter.route("/:id").get(authenticateUser, getSingleStudentPhoto);
studentPhotoRouter.route("/show/AllMyPhoto").get(authenticateUser, showCurrentStudentPhoto);


module.exports = { studentPhotoRouter };