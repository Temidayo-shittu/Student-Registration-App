const mongoose= require('mongoose')
const validator= require('validator')
const bcrypt= require('bcryptjs')

const AdminSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:[true, 'Please provide your full-name'],
        minlength:8,
        maxlength:50
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Please provide your email'],
        validate: {
            validator:validator.isEmail,
            message:'Please provide valid email'
        }
    },
    password:{
        type:String,
        required:[true, 'Please provide your password'],
        minlength:6
    },
    role:{
        type:String,
        enum:['admin','super-admin'],
        default:'admin'
    }
})

AdminSchema.pre('save',async function(){
    if(!this.isModified('password')) return
    const salt= await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)
})

AdminSchema.methods.comparePassword= async function(candidatePassword){
    const isMatch= await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}

module.exports= mongoose.model('Admin', AdminSchema)





        



    