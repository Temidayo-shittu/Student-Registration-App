const StudentPhoto = require('../../models/StudentPhoto');
const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const cloudinary = require("cloudinary");
const { uploader } = cloudinary.v2;
const fileUpload = require('express-fileupload')
const fs = require('fs')

const uploadStudentPhoto = async(req,res)=>{

    try {
      const imagesLinks = [];
      console.log(req.files.file)

      if (!req.files.file) throw new CustomError.BadRequestError(`Please at least one student image is required!`); 
  
      // Single upload
      if (req.files.file) {
        const singleUploadedData = await uploader.upload(req.files.file.tempFilePath, {
          folder: "student-images",
        });
        imagesLinks.push({
          public_id: singleUploadedData.public_id,
          url: singleUploadedData.secure_url,
        });
      }
      // Multiple upload
      if (req.files.files) {
        for (let i = 0; i < req.files.files.length; i++) {
          let filePath = req.files.files[i].tempFilePath;
          const uploadedData = await uploader.upload(filePath, {
            folder: "student-images",
          });
  
          imagesLinks.push({
            public_id: uploadedData.public_id,
            url: uploadedData.secure_url,
          });
        }
      }

      const student = await Student.findOne({_id:req.user.userId});
      if(!student) throw new CustomError.NotFoundError(`Student with the given ID: ${req.user.userId} not found`);

      req.body.images = imagesLinks;
		  req.body.student = student._id;

      const studentPhoto = await StudentPhoto.create(req.body);

      fs.unlinkSync(req.files.file.tempFilePath)

		res.status(StatusCodes.CREATED).json({
			status: "success",
			message: "Successfully Uploaded Student Photo",
      studentPhoto
		});

} catch (err) {
    console.log("INTERNAL_SERVER_ERROR:", err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "fail",
        message: "Internal server error",
        error: err.message,
    });
  }
}

module.exports = { uploadStudentPhoto };