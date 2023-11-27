const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const{ ApiFeatures } = require('../../utils');

const getAllMaleStudents = async(req, res)=>{
    const maleStudentCount = await Student.find({ gender:"male" }).countDocuments();
	const resultPerPage = parseInt(req.query.limit) || maleStudentCount;
	const page = parseInt(req.query.page) || 1;

	try {
		const apiFeature = new ApiFeatures(
			Student.find({ gender:"male" }).select('-password'),
			req.query,
		)
			.search()
			.filter()
			.pagination(resultPerPage);

		const students = await apiFeature.executeQuery();
		const filteredStudentCount = students.length;

		if (students.length === 0) {
			return res.status(StatusCodes.NOT_FOUND).send("No male students found");
		}

		res.status(StatusCodes.OK).json({
			status: "success",
			data: students,
			maleStudentCount,
			filteredStudentCount,
			page,
			resultPerPage,
		});
	} catch (err) {
        console.log("INTERNAL_SERVER_ERROR:", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "fail",
            message: "Internal server error",
            error: err.message,
        });
      };
};

module.exports = { getAllMaleStudents };