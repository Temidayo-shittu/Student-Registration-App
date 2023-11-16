const Student = require('../../models/Student');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const{ createTokenStudent, createJWT, checkPermissions, studentAge }= require('../../utils')

const updateStudent = async(req,res)=>{
    const student = await Student.findById(req.params.id).select('-password');
    if(!student) throw new CustomError.NotFoundError(`Student with the given ID: ${req.params.id} not found`)
    checkPermissions(req.user, student._id)
    
    try {
		const updatedStudent = await Student.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true },
		);
    
    updatedStudent.age = studentAge(updatedStudent.dateOfBirth);
	await updatedStudent.save();
    
    const tokenUser = createTokenStudent(updatedStudent);
   
    res.status(StatusCodes.OK).json({ 
        message: `Successfully Updated Student Details`,
        updatedStudent: tokenUser
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



const updateStudentPassowrd = async(req,res)=>{
    const { oldPassword, newPassword } = req.body
    if(!oldPassword || !newPassword) throw new CustomError.BadRequestError('please provide both passwords')
    try {
    const student = await Student.findOne({_id:req.user.userId})
    console.log(req.user.userId)
    if(!student) throw new CustomError.UnauthenticatedError(`Student with the given ID: ${req.user.userId} not found`)
    checkPermissions(req.user, student._id)
    console.log(req.user, student._id, req.user.role, student.role)
    const isPasswordCorrect= await student.comparePassword(oldPassword)
    if(!isPasswordCorrect) throw new CustomError.UnauthenticatedError('Invalid Authentication')
    student.password= newPassword
    await student.save()
    res.status(StatusCodes.OK).json({message:"Successfully Updated Student Passowrd!!"})
    } catch (err) {
        console.log("INTERNAL_SERVER_ERROR:", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "fail",
            message: "Internal server error",
            error: err.message,
        });
    }
    
}


module.exports = { updateStudent, updateStudentPassowrd };