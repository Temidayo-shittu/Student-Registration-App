const jwt = require('jsonwebtoken')

const createJWT = (user)=>{
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn:process.env.JWT_LIFETIME })
    return token
};

const isTokenValid = (token)=> jwt.verify(token, process.env.JWT_SECRET)

module.exports = {
    createJWT,
    isTokenValid
};


/*
const attachCookiesToResponse = (res, user)=>{
    const token = createJWT(user);
    const oneDay = 1000 * 60 * 60 * 24 ;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    })
}
*/