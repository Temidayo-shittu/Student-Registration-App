const mongoose= require('mongoose')
const validator= require('validator')
const bcrypt= require('bcryptjs')

const StudentSchema= new mongoose.Schema(
    {
    firstname:{
        type: String,
        required: [true, 'Please provide your first-name'],
        minlength: 3,
        maxlength: 50
    },
    lastname:{
        type: String,
        required: [true, 'Please provide your last-name'],
        minlength: 3,
        maxlength: 50
    },
    fullname:{
        type: String,
    },
    phone_number:{
        type: String,
        default: "",
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Please provide your email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    password:{
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 6
    },
    nationality: {
        type: String,
        default: "nigerian",
    },
    home_address: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    state: {
        type: String,
        default: "",
    },
    gender:{
        type: String,
        enum: ['male','female']
    },
    dateOfBirth:{
        type: Date,
        required: [true, 'Please provide your date of birth'],
    },
    age:{
        type: Number,
    },
    faculty:{
        type: String,
        required: [true, 'Please provide your faculty'],
        enum: ['Arts', 'Basic Medical Sciences', 'Clinical Services', 'Dental Services', 'Education', 'Engineering', 'Environmental Sciences',
                'Law', 'Management Sciences', 'Pharmacy', 'Sciences', 'Social Sciences']
    },
    department:{
        type: String,
    },
    current_level:{
        type: String,
        required: [true, 'Please provide your current level'],
        enum: ['100 level', '200 level', '300 level', '400 level', '500 level', '600 level', 'Housemanship']
    },
    matric_number:{
        type: Number,
    },
    guardian_fullname:{
        type: String,
        default: "",
    },
    guardian_mobile:{
        type: String,
        default: "",
    }
},
    { timestamps: true },
)


StudentSchema.pre('save',async function(){
    if(!this.isModified('password')) return
    const salt= await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)
})

StudentSchema.methods.comparePassword= async function(candidatePassword){
    const isMatch= await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}

module.exports= mongoose.model('Student', StudentSchema)





        



    