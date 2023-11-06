const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const{ attachCookiesToResponse, createTokenUser, createJWT, checkPermissions }= require('../../utils')

const updateAdmin = async(req,res)=>{
    const { fullname, email }= req.body
    if(!fullname || !email) throw new CustomError.BadRequestError('please provide full-name and email')
    const admin = await Admin.findOne({_id:req.user.userId})
    if(!admin) throw new CustomError.UnauthenticatedError('Invalid Authentication')
    checkPermissions(req.user, admin._id)
    console.log(req.user, admin._id, req.user.role, admin.role)
    admin.fullname = fullname;
    admin.email = email
    await admin.save()
    const tokenUser = createTokenUser(admin)
    attachCookiesToResponse(res, tokenUser)
   
    res.status(StatusCodes.OK).json({ 
        message: `Successfully Updated Admin Details`,
        admin: tokenUser 
    })
}

const updateAdminPassowrd = async(req,res)=>{
    const { oldPassword, newPassword } = req.body
    if(!oldPassword || !newPassword) throw new CustomError.BadRequestError('please provide both passwords')
    const admin = await Admin.findOne({_id:req.user.userId})
    if(!admin) throw new CustomError.UnauthenticatedError(`Admin with the given ID: ${req.user.userId} not found`)
    checkPermissions(req.user, admin._id)
    console.log(req.user, admin._id, req.user.role, admin.role)
    const isPasswordCorrect= await admin.comparePassword(oldPassword)
    if(!isPasswordCorrect) throw new CustomError.UnauthenticatedError('Invalid Authentication')
    admin.password= newPassword
    await admin.save()
    res.status(StatusCodes.OK).json({message:"Successfully Updated Admin Passowrd!!"})
}

module.exports = { updateAdmin, updateAdminPassowrd };