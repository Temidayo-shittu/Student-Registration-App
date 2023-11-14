const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const numOfStudentsInEachFaculty = async (req, res) => {
	try {
        const counts = await Student.aggregate([
			{
				$group: {
					_id: "$faculty",
					studentsCount: { $sum: 1 },
				},
			},
		]);

        const result = {
			Arts: 0,
			BasicMedicalSciences: 0,
			ClinicalServices: 0,
			DentalServices: 0,
			Education: 0,
            Engineering: 0,
            EnvironmentalSciences: 0,
            Law: 0,
            ManagementSciences: 0,
            Pharmacy: 0,
            Sciences: 0,
            SocialSciences: 0,
		};

		counts.forEach((count) => {
			switch (count._id) {
				case "Arts":
					result.Arts = count.studentsCount;
					break;
				case "Basic Medical Sciences":
					result.BasicMedicalSciences = count.studentsCount;
					break;
				case "Clinical Services":
					result.ClinicalServices = count.studentsCount;
					break;
				case "Dental Services":
					result.DentalServices = count.studentsCount;
					break;
                case "Education":
                    result.Education = count.studentsCount;
                    break;
                case "Engineering":
					result.Engineering = count.studentsCount;
					break;
                case "Environmental Sciences":
                    result.EnvironmentalSciences = count.studentsCount;
                    break;
                case "Law":
                    result.Law = count.studentsCount;
                    break;
                case "Management Sciences":
                    result.ManagementSciences = count.studentsCount;
                    break;
                case "Pharmacy":
                    result.Pharmacy = count.studentsCount;
                    break;
                case "Sciences":
                    result.EnvironmentalSciences = count.studentsCount;
                    break;
                case "Social Sciences":
                    result.SocialSciences = count.studentsCount;
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

module.exports = { numOfStudentsInEachFaculty };