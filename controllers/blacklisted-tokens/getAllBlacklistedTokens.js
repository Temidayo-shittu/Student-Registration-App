const BlacklistedToken = require('../../models/BlacklistedToken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const getallBlacklistedTokens = async(req,res)=>{
    try {
    const token = await BlacklistedToken.find({})
    if(!token) throw new CustomError.NotFoundError(`Token not found`);
    res.status(StatusCodes.OK).json({ token, count:token.length })
        
    } catch (err) {
        console.log("INTERNAL_SERVER_ERROR:", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "fail",
            error: err.message,
        });
    }
    
};

module.exports = { getallBlacklistedTokens };