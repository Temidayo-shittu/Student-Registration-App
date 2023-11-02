const Admin = require('../../models/Admin');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../../errors');

const getAdmin = async(req,res)=>{
    const admin = await Admin.find({role:'admin'}).select('-password')
    res.status(StatusCodes.OK).json({admin, count:admin.length})
};

module.exports = { getAdmin };