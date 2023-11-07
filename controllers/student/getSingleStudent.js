const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const{ attachCookiesToResponse, createTokenUser, createJWT, checkPermissions } = require('../../utils')

const getSingleStudent = async(req,res)=>{
    const { id:studentId }= req.params;
    const student = await Student.findOne({_id:studentId}).select('-password')
    if(!student) throw new CustomError.NotFoundError(`Student with the given ID: ${studentId} not found`);
    console.log(req.user, student._id)
    checkPermissions(req.user,student._id);
    res.status(StatusCodes.OK).json({student, count:student.length});  
};

module.exports = { getSingleStudent };