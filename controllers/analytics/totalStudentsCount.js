const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const totalStudentsCounts = async (req, res) => {
	try {
        const result = await Student.aggregate([
			{
				$group: {
					_id: null,
					totalStudentsCount: { $sum: 1 },
				},
			},
		]);

        return res.status(StatusCodes.OK).json({
			status: "success",
			totalStudentsCount: result[0].totalStudentsCount,
		});
        
    } catch (err) {
        console.log("INTERNAL_SERVER_ERROR:", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "fail",
            message: "Internal server error",
            error: err.message,
        });
      }
};

module.exports = { totalStudentsCounts };