const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../../errors');
const{attachCookiesToResponse, createTokenUser}= require('../../utils')

const adminLogin = async(req,res)=>{
    const { email, password } = req.body
    if(!email || !password) throw new CustomError.BadRequestError('please provide email and password')
    const admin = await Admin.findOne({email})
    if(!admin) throw new CustomError.UnauthenticatedError('Invalid Credentials')
    const isPasswordCorrect = await admin.comparePassword(password)
    if(!isPasswordCorrect) throw new CustomError.UnauthenticatedError('Invalid Password')

    const tokenUser = createTokenUser(admin)
    const token = jwt.sign(tokenUser,process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
    attachCookiesToResponse({res, admin:tokenUser})
    res.status(StatusCodes.OK).json({ 
        message: `Successfully Logged In ${admin.fullname}`,
        admin: tokenUser,
        token 
    })
}

module.exports = { adminLogin };