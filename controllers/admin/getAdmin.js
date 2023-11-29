const Admin = require('../../models/Admin');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const getAdmin = async(req, res)=>{
    const admin = await Admin.find({role:'admin'}).select('-password');
    if(!admin) throw new CustomError.NotFoundError(`Admin not found`);
    res.status(StatusCodes.OK).json({ admin, count:admin.length });
};

const showCurrentAdmin = async(req, res)=>{
    const admin = await Admin.findOne({_id:req.user.userId}).select('-password');
    if(!admin) throw new CustomError.NotFoundError(`Admin with the given ID: ${req.user.userId} not found`);
    res.status(StatusCodes.OK).json({admin});
}

module.exports = { getAdmin, showCurrentAdmin };