const mongoose= require('mongoose')


const StudentPhotoSchema= new mongoose.Schema(
    {
    student: {
        type: mongoose.Schema.ObjectId,
        ref:'Student',
    },
    images: [
			{
				public_id: {
					type: String,
				},
				url: {
					type: String,
				},
                _id: false
			},
		],
},
{
    timestamps: true
})


module.exports= mongoose.model('StudentPhoto', StudentPhotoSchema)







        



    