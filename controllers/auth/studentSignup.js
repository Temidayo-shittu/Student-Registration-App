const Student = require('../../models/Student');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const { attachCookiesToResponse, createJWT, createTokenStudent }= require('../../utils')

const studentSignup = async(req,res)=>{
    const { firstname, lastname, email, password, dateOfBirth } = req.body
    const emailAlreadyExists= await Student.findOne({email})
    if(emailAlreadyExists) throw new CustomError.BadRequestError('email already exists')

	const student = new Student({
			...req.body,
		});

    student.fullname  = `${firstname} ${lastname}`
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    student.age = age;

	await student.save();
    const tokenUser = createTokenStudent(student)
    console.log(tokenUser)
    const token = createJWT(tokenUser)
    console.log(token)
    attachCookiesToResponse(res, tokenUser)
    
    res.status(StatusCodes.CREATED).json({ 
        message: `Successfully Registered ${student.fullname} from ${student.department} Department!!`,
        student: tokenUser,
        token 
    })
}

module.exports = { studentSignup };