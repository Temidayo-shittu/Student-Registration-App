const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const getFemaleStudentsCounts = async (req, res) => {
	try {
        const result = await Student.aggregate([
			{
				$match: {
					"gender": "female",
				},
			},
			{
				$group: {
					_id: null,
					femaleCount: { $sum: 1 },
				},
			},
		]);

        return res.status(StatusCodes.OK).json({
			status: "success",
			femaleCount: result[0]?.femaleCount || 0,
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

module.exports = { getFemaleStudentsCounts };