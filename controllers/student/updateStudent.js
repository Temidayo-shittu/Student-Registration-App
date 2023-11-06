const Student = require('../../models/Student');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const{ attachCookiesToResponse, createTokenUser, createJWT, checkPermissions }= require('../../utils')