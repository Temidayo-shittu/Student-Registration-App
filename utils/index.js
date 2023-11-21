const { ApiFeatures } = require('./apiFeature')
const { createJWT, isTokenValid } = require('./jwt')
const createTokenAdmin = require('./createTokenAdmin')
const createTokenStudent = require('./createTokenStudent')
const checkPermissions = require('./checkPermissions')
const studentAge = require('./getStudentAge')

module.exports= {
    ApiFeatures,
    createJWT,
    isTokenValid,
    createTokenAdmin,
    createTokenStudent,
    checkPermissions,
    studentAge
}