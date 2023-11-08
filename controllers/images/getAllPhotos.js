const processFile = require('../../middleware/upload');
const { format } = require('util');
const { Storage } = require('@google-cloud/storage');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket('Profile Photo Upload');

const getAllPhotos = async (req, res) => {
    try {
      const [files] = await bucket.getFiles();
      let fileInfos = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file.name,
          url: file.metadata.mediaLink,
        });
      });
  
      res.status(StatusCodes.OK).json({
          message: `Successfully Retrieved all Student Photos`,
          data: fileInfos
      });

    } catch (err) {
    console.log("INTERNAL_SERVER_ERROR:", err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "fail",
        message: "Unable to get list of photos!",
        error: err.message,
    });
   }
};

module.exports = { getAllPhotos };