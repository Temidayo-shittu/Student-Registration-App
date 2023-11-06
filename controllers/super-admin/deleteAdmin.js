const Admin = require('../../models/Admin');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../../errors');

const deleteAdmin = async(req,res)=>{
    const { id:adminId }= req.params
    const admin = await Admin.findOne({_id:adminId})
    if(!admin) throw new CustomError.NotFoundError(`Admin with the given ID: ${adminId} not found`)
    await admin.remove()
    res.status(StatusCodes.OK).json({message:'Admin has been Succesfully Deleted!!'})
}

module.exports = { deleteAdmin };