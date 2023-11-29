const { StatusCodes } = require('http-status-codes');
const BlacklistedToken = require('../models/BlacklistedToken');
const CustomError = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid!! Please Login Afresh');
  }
  
  try {
    const { fullname, userId, role } = isTokenValid(token);

    // Attach the user and his permissions to the req object
    req.user = { fullname, userId, role }

    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
};


const checkBlacklist = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header

    if (!token) {
      throw new CustomError.UnauthenticatedError('Authentication invalid');
    }

    // Query the database to check if the token exists in the blacklist collection
    const blacklistedToken = await BlacklistedToken.findOne({ token });

    if (blacklistedToken) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized to access routes - Token blacklisted!! Please Login Afresh' });
    }

    // Token is not blacklisted; proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error checking blacklist:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};


const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = { authenticateUser, checkBlacklist, authorizeRoles };
