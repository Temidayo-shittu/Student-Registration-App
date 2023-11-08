const processFile = require('../../middleware/upload');
const { format } = require('util');
const { Storage } = require('@google-cloud/storage');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket('Profile Photo Upload');

const uploadStudentPhoto = async(req,res)=>{

    try {
        await processFile(req, res);
    
        if (!req.file) {
          return res.status(StatusCodes.BAD_REQUEST).send({ message: "Please upload a file!" });
        }
    
        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });
    
        blobStream.on("error", (err) => {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message });
        });
    
        blobStream.on("finish", async (data) => {
          // Create URL for directly file access via HTTP.
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          );
    
          try {
            // Make the file public
            await bucket.file(req.file.originalname).makePublic();
          } catch {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
              message:
                `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
              url: publicUrl,
            });
          }
    
          res.status(StatusCodes.OK).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
            url: publicUrl,
          });
        });
    
        blobStream.end(req.file.buffer);

} catch (err) {
    console.log("INTERNAL_SERVER_ERROR:", err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "fail",
        message: "Internal server error",
        error: err.message,
    });
  }
}

module.exports = { uploadStudentPhoto };