const { ApiFeatures } = require('./apiFeature')
const { createJWT, attachCookiesToResponse, isTokenValid } = require('./jwt')
const createTokenUser = require('./createTokenUser')
const createTokenStudent = require('./createTokenStudent')
const checkPermissions = require('./checkPermissions')
const studentAge = require('./getStudentAge')

module.exports= {
    ApiFeatures,
    createJWT,
    attachCookiesToResponse,
    isTokenValid,
    createTokenUser,
    createTokenStudent,
    checkPermissions,
    studentAge
}