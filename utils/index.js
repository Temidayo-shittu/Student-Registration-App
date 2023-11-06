const {createJWT, attachCookiesToResponse, isTokenValid} = require('./jwt')
const createTokenUser = require('./createTokenUser')
const createTokenStudent = require('./createTokenStudent')
const checkPermissions = require('./checkPermissions')

module.exports= {
    createJWT,
    attachCookiesToResponse,
    isTokenValid,
    createTokenUser,
    createTokenStudent,
    checkPermissions
}