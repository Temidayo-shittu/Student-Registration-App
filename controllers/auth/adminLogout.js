const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../../errors');
const{attachCookiesToResponse, createTokenUser}= require('../../utils')

const adminLogout = async(req,res)=>{
    res.cookie('token', logout, {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({message:"Successfully Logged out Admin"})
}

module.exports = { adminLogout };