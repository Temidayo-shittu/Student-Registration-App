const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const numOfStudentsInEachLevel = async (req, res) => {
	try {
        const counts = await Student.aggregate([
			{
				$group: {
					_id: "$current_level",
					studentsCount: { $sum: 1 },
				},
			},
		]);

        const result = {
			totalYr1: 0,
			totalYr2: 0,
			totalYr3: 0,
			totalYr4: 0,
			totalYr5: 0,
            totalYr6: 0,
            totalHousemanship: 0,
		};

		counts.forEach((count) => {
			switch (count._id) {
				case "100 level":
					result.totalYr1 = count.studentsCount;
					break;
				case "200 level":
					result.totalYr2 = count.studentsCount;
					break;
				case "300 level":
					result.totalYr3 = count.studentsCount;
					break;
				case "400 level":
					result.totalYr4 = count.studentsCount;
					break;
                case "500 level":
                    result.totalYr5 = count.studentsCount;
                    break;
                case "600 level":
					result.totalYr6 = count.studentsCount;
					break;
                case "Housemanship":
                    result.totalHousemanship = count.studentsCount;
                    break;
				default:
					      
			}
		});
        const values = Object.values(result)

        const totalStudentsCount = values.reduce((a,b)=>{
            return a + b
        },0)
        
        return res.status(StatusCodes.OK).json({
			status: "success",
			data: result,
            totalStudentsCount,
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

module.exports = { numOfStudentsInEachLevel };