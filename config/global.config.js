const dotenv = require("dotenv");

dotenv.config();

const config = {

    api: {
		prefix: "/api/v1",
	},

	cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
	cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
	cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,

}


module.exports = { config };