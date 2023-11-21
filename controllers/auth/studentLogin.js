const Student = require('../../models/Student');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const { createJWT, createTokenStudent } = require('../../utils');

const studentLogin = async(req, res)=>{
    const { email, password } = req.body;
    if(!email || !password) throw new CustomError.BadRequestError('please provide email and password');
    const student = await Student.findOne({ email });
    if(!student) throw new CustomError.UnauthenticatedError('Invalid Credentials');
    const isPasswordCorrect = await student.comparePassword(password);
    if(!isPasswordCorrect) throw new CustomError.UnauthenticatedError('Invalid Password!! Please input the correct password');

    const tokenUser = createTokenStudent(student);
    const token = createJWT(tokenUser);
    
    res.status(StatusCodes.OK).json({ 
        message: `Successfully Logged In ${student.fullname}`,
        student: tokenUser,
        token 
    });
};

module.exports = { studentLogin };