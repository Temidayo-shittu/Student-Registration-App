const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const{ ApiFeatures } = require('../../utils');

const getAllStudents = async(req,res)=>{
    const totalStudentCount = await Student.countDocuments();
	const resultPerPage = parseInt(req.query.limit) || totalStudentCount;
	const page = parseInt(req.query.page) || 1;

	try {
		const apiFeature = new ApiFeatures(
			Student.find({}).select('-password'),
			req.query,
		)
			.search()
			.filter()
			.pagination(resultPerPage);

		const students = await apiFeature.executeQuery();
		const filteredStudentCount = students.length;

		if (students.length === 0) {
			return res.status(StatusCodes.NOT_FOUND).send("No Students Found");
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

        // Optional: Filter by asset faculty
		if (req.query.faculty) {
			pipeline.unshift({
				$match: { faculty: req.query.faculty },
			});
		}

		// Optional: Filter by department
		if (req.query.department) {
			pipeline.unshift({
				$match: { department: req.query.department },
			});
		}

        // Optional: Filter by current_level
		if (req.query.current_level) {
			pipeline.unshift({
				$match: { current_level: req.query.current_level },
			});
		}

        // Optional: Filter by state of residence
		if (req.query.state) {
			pipeline.unshift({
				$match: { state: req.query.state },
			});
		}

        // Optional: Filter by age
		if (req.query.age) {
			pipeline.unshift({
				$match: { age: req.query.age },
			});
		}

		res.status(StatusCodes.OK).json({
			status: "success",
			data: students,
			totalStudentCount,
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

module.exports = { getAllStudents };