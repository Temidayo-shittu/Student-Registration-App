const mongoose = require('mongoose')


const BlacklistedTokenSchema = new mongoose.Schema(
    {
    token: {
        type: String,
        required:[true, 'Please provide your token'],
        unique: true
    },
},
{
    timestamps: true
})


module.exports = mongoose.model('BlacklistedToken', BlacklistedTokenSchema)







        



    