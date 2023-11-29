const Student = require('../../models/Student');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const deleteStudent = async(req, res)=>{
    try {
    const { id:studentId } = req.params;
    const student = await Student.findOne({ _id:studentId });
    if(!student) throw new CustomError.NotFoundError(`Student with the given ID: ${studentId} not found`);
    const studentName = student.fullname;
    await student.remove();
    res.status(StatusCodes.OK).json({ message: `Succesfully Deleted Student: ${studentName}!!` });
    } catch (err) {
        console.log("INTERNAL_SERVER_ERROR:", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "fail",
            message: "Internal server error",
            error: err.message,
        });
    };
}

module.exports = { deleteStudent };