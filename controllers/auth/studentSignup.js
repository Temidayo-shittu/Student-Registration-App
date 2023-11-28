const Student = require('../../models/Student');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const { createJWT, createTokenStudent, studentAge } = require('../../utils');

const studentSignup = async(req, res)=>{
    const { firstname, lastname, email, password, dateOfBirth } = req.body;
    const emailAlreadyExists= await Student.findOne({ email });
    if(emailAlreadyExists) throw new CustomError.BadRequestError('email already exists');

	const student = new Student({
			...req.body,
		});

    student.fullname  = `${firstname} ${lastname}`;
    student.age = studentAge(student.dateOfBirth);

	await student.save();
    const tokenUser = createTokenStudent(student);
    const token = createJWT(tokenUser);
    
    res.status(StatusCodes.CREATED).json({ 
        message: `Successfully Registered ${student.fullname} from ${student.department} Department!!`,
        student: tokenUser,
        token 
    });
};

module.exports = { studentSignup };