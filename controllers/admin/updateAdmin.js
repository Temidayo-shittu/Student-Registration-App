const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const{  createTokenAdmin, createJWT, checkPermissions }= require('../../utils')

const updateAdmin = async(req, res)=>{
    const { fullname, email } = req.body;
    try {
    if(!fullname || !email) throw new CustomError.BadRequestError('please provide full-name and email');
    const admin = await Admin.findOne({_id:req.user.userId});
    if(!admin) throw new CustomError.UnauthenticatedError('Invalid Authentication');
    console.log(req.user, req.user.userId, admin._id)
    checkPermissions(req.user, admin._id);
    
    admin.fullname = fullname;
    admin.email = email;
    await admin.save();
    const tokenUser = createTokenAdmin(admin);
   
    res.status(StatusCodes.OK).json({ 
        message: `Successfully Updated Admin Details`,
        admin: tokenUser 
    })

    } catch (err) {
        console.log("INTERNAL_SERVER_ERROR:", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "fail",
            message: "Internal server error",
            error: err.message,
        });
    }
    
}

const updateAdminPassowrd = async(req, res)=>{
    const { oldPassword, newPassword } = req.body;
    try {
    if(!oldPassword || !newPassword) throw new CustomError.BadRequestError('please provide both passwords');
    const admin = await Admin.findOne({ _id:req.user.userId });
    if(!admin) throw new CustomError.UnauthenticatedError(`Admin with the given ID: ${req.user.userId} not found`);
    console.log(req.user, req.user.userId, admin._id)
    checkPermissions(req.user, admin._id);
    
    const isPasswordCorrect = await admin.comparePassword(oldPassword);
    if(!isPasswordCorrect) throw new CustomError.UnauthenticatedError('Invalid Authentication');
    admin.password = newPassword;
    await admin.save();
    res.status(StatusCodes.OK).json({ message:"Successfully Updated Admin Passowrd!!" })
    } catch (err) {
        console.log("INTERNAL_SERVER_ERROR:", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "fail",
            message: "Internal server error",
            error: err.message,
        });
    }
    
};

module.exports = { updateAdmin, updateAdminPassowrd };