const Student = require('../../models/Student');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const { attachCookiesToResponse, createJWT, createTokenStudent }= require('../../utils');

const studentLogout = async(req,res)=>{
    res.cookie('token', studentLogout, {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({message:"Successfully Logged out Student"})
}

module.exports = { studentLogout };