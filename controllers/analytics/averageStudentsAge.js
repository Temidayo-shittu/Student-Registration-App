const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const averageStudentsAge = async (req, res) => {
	try {
        const result = await Student.aggregate([
			{
				$group: {
					_id: null,
					averageAge: { $avg:"$age" },
				},
			},
		]);

        return res.status(StatusCodes.OK).json({
			status: "success",
			averageAge: Math.ceil(result[0]?.averageAge || 0),
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

module.exports = { averageStudentsAge };