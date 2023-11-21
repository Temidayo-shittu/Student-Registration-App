const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const{ createJWT, checkPermissions } = require('../../utils')

const getSingleStudent = async(req, res)=>{
    const { id:studentId } = req.params;
    const student = await Student.findOne({ _id:studentId }).select('-password');
    if(!student) throw new CustomError.NotFoundError(`Student with the given ID: ${studentId} not found`);
    console.log(req.user, student._id);
    checkPermissions(req.user, student._id);
    res.status(StatusCodes.OK).json({student, count:student.length});  
};

const showCurrentStudent = async(req, res)=>{
    const student = await Student.findOne({_id:req.user.userId}).select('-password');
    if(!student) throw new CustomError.NotFoundError(`Student with the given ID: ${req.user.userId} not found`);
    res.status(StatusCodes.OK).json({student});
}

module.exports = { getSingleStudent, showCurrentStudent };