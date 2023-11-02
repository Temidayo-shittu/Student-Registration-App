const Admin = require('../../models/Admin');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../../errors');
const{attachCookiesToResponse, createTokenUser}= require('../../utils')

const updateAdmin = async(req,res)=>{
    const { fullname, email }= req.body
    if(!fullname || !email) throw new CustomError.BadRequestError('please provide full-name and email')
    const admin = await Admin.findOne({_id:req.admin.userId})
    if(!admin) throw new CustomError.UnauthenticatedError('Invalid Authentication')
    checkPermissions(req.admin, admin._id)
    admin.fullname = fullname;
    admin.email = email
    await admin.save()
    const tokenUser= createTokenUser(admin)
    attachCookiesToResponse({res, admin:tokenUser})
    res.status(StatusCodes.OK).json({ 
        message: `Successfully Updated Admin Details`,
        admin: tokenUser 
    })
}

module.exports = { updateAdmin };