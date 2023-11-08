const { Router } = require("express");

const { uploadStudentPhoto } = require("../controllers/images/uploadStudentPhoto");
const { getAllPhotos } = require("../controllers/images/getAllPhotos");
const { getSinglePhoto } = require("../controllers/images/getSinglePhoto");

const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const studentPhotoRouter = Router();

// Admin level routes
studentPhotoRouter.route("/files").get([authenticateUser, authorizePermissions('admin','super-admin')], getAllPhotos);


// Student level routes
studentPhotoRouter.route("/uploads").post(authenticateUser, uploadStudentPhoto);
studentPhotoRouter.route("/files/:name").get(authenticateUser, getSinglePhoto);


module.exports = { studentPhotoRouter };