const StudentPhoto = require('../../models/StudentPhoto');
const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const{ ApiFeatures } = require('../../utils')
const cloudinary = require("cloudinary");
const { uploader } = cloudinary.v2;

const getAllPhotos = async (req, res) => {
    const totalStudentPhotoCount = await StudentPhoto.countDocuments();
	const resultPerPage = parseInt(req.query.limit) || totalStudentPhotoCount;
	const page = parseInt(req.query.page) || 1;
    try {
        const apiFeature = new ApiFeatures(
			StudentPhoto.find({}).populate({path:'student', select:'fullname faculty department matric_number'}),
			req.query,
		)
			.search()
			.filter()
			.pagination(resultPerPage);

		const studentPhotos = await apiFeature.executeQuery();
		const filteredStudentPhotoCount = studentPhotos.length;

		if (studentPhotos.length === 0) {
			return res.status(StatusCodes.NOT_FOUND).send("No Student Photo Found");
		}

        let totalValues = [];

		const pipeline = [
			{
				$group: {
					_id: null,
					totalValues: { $sum: "$value" },
				},
			},
		];
  
      res.status(StatusCodes.OK).json({
          message: `Successfully Retrieved all Student Photos`,
          data: studentPhotos,
		  totalStudentPhotoCount,
		  filteredStudentPhotoCount,
		  page,
	      resultPerPage,
      });

    } catch (err) {
    console.log("INTERNAL_SERVER_ERROR:", err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "fail",
        message: "Unable to get list of photos!",
        error: err.message,
    });
   }
};

module.exports = { getAllPhotos };