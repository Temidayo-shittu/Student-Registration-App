const StudentPhoto = require('../../models/StudentPhoto');
const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const cloudinary = require("cloudinary");
const { uploader } = cloudinary.v2;
const{ attachCookiesToResponse, createTokenUser, createJWT, checkPermissions } = require('../../utils');

const getSingleStudentPhoto = async(req,res)=>{
    const { id:studentPhotoId } = req.params;
    const studentPhoto = await StudentPhoto.findOne({ _id:studentPhotoId }).populate({path:'student', select:'fullname faculty department matric_number'})
    if(!studentPhoto) throw new CustomError.NotFoundError(`StudentPhoto with the given ID: ${studentPhotoId} not found`);
    console.log(req.user, studentPhoto.student._id)
    checkPermissions(req.user, studentPhoto.student._id);
    res.status(StatusCodes.OK).json({studentPhoto, count:studentPhoto.length});  
};

const showCurrentStudentPhoto = async(req,res)=>{
    const studentPhoto = await StudentPhoto.findOne({ student:req.user.userId }).populate({path:'student', select:'fullname faculty department matric_number'})
    if(!studentPhoto) throw new CustomError.NotFoundError(`Student with the given ID: ${req.user.userId} not found`);
    res.status(StatusCodes.OK).json({ studentPhoto })
}

module.exports = { getSingleStudentPhoto, showCurrentStudentPhoto };