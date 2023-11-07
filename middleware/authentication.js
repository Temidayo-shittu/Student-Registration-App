const CustomError = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async(req,res,next)=>{
    const token = req.signedCookies.token
    console.log("token", token);
    if(!token) throw new CustomError.UnauthenticatedError('Invalid Credentials')
    try {
        const { fullname, userId, role } = isTokenValid(token)
        req.user = { fullname, userId, role }
        next()
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
}

const authorizePermissions = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)) throw new CustomError.UnauthorizedError('Unauthorized to access routes')
        next()
    }
}

module.exports= {
    authenticateUser,
    authorizePermissions
}