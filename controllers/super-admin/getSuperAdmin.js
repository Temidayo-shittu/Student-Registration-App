const Admin = require('../../models/Admin');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const getSuperAdmin = async(req,res)=>{
    const admin = await Admin.find({role:'super-admin'}).select('-password')
    if(!admin) throw new CustomError.NotFoundError(`Super-Admin not found`);
    res.status(StatusCodes.OK).json({ admin, count:admin.length })
};

module.exports = { getSuperAdmin };