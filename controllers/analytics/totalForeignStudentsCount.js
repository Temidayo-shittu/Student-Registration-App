const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const totalForeignStudentsCounts = async (req, res) => {
	try {
        const result = await Student.aggregate([
            {
                $match:{ nationality: { $ne: "nigerian" } }
            },
			{
				$group: {
					_id: null,
					totalForeignStudentsCount: { $sum: 1 },
				},
			},
		]);

        return res.status(StatusCodes.OK).json({
			status: "success",
			totalForeignStudentsCount: result[0]?.totalForeignStudentsCount || 0,
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

module.exports = { totalForeignStudentsCounts };