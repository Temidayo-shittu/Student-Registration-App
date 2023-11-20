const BlacklistedToken = require('../../models/BlacklistedToken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const { isTokenValid } = require('../../utils');

const studentLogout = async(req,res)=>{
    let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
  const { fullname, userId, role } = isTokenValid(token);
  // Attach the user and his permissions to the req object
  req.user = { fullname, userId, role }

  const blacklistedToken = await BlacklistedToken.create(token);
  res.status(StatusCodes.OK).json({ message: `Successfully Logged out ${req.user.fullname} as Student` })
}

module.exports = { studentLogout };