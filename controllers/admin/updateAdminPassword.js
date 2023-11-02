const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../../errors');
const{attachCookiesToResponse, createTokenUser}= require('../../utils')

const updateAdminPassowrd = async(req,res)=>{
    const { oldPassword, newPassword } = req.body
    if(!oldPassword || !newPassword) throw new CustomError.BadRequestError('please provide both passwords')
    const admin = await Admin.findOne({_id:req.admin.userId})
    if(!admin) throw new CustomError.UnauthenticatedError(`Admin with the given ID: ${req.admin.userId} not found`)
    const isPasswordCorrect= await admin.comparePassword(oldPassword)
    if(!isPasswordCorrect) throw new CustomError.UnauthenticatedError('Invalid Authentication')
    admin.password= newPassword
    await admin.save()
    res.status(StatusCodes.OK).json({message:"Successfully Updated User Passowrd!!"})
}

module.exports = { updateAdminPassowrd };