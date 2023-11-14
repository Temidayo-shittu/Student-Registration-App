const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const getMaleStudentsCounts = async (req, res) => {
	try {
        const result = await Student.aggregate([
			{
				$match: {
					"gender": "male",
				},
			},
			{
				$group: {
					_id: null,
					maleCount: { $sum: 1 },
				},
			},
		]);

        return res.status(StatusCodes.OK).json({
			status: "success",
			maleCount: result[0].maleCount,
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

module.exports = { getMaleStudentsCounts };