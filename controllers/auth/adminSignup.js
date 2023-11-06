const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const { attachCookiesToResponse, createJWT, createTokenUser }= require('../../utils')

const adminSignup = async(req,res)=>{
    const { fullname, email, password, role } = req.body
    const emailAlreadyExists= await Admin.findOne({email})
    if(emailAlreadyExists) throw new CustomError.BadRequestError('email already exists')

    const admin = await Admin.create({ fullname, email, password, role })
    const tokenUser = createTokenUser(admin)
    console.log(tokenUser)
    const token = createJWT(tokenUser)
    console.log(token)
    attachCookiesToResponse(res, tokenUser)
    
    res.status(StatusCodes.CREATED).json({ 
        message: `Successfully Registered ${admin.fullname} as ${admin.role}`,
        admin: tokenUser,
        token 
    })
}

module.exports = { adminSignup };