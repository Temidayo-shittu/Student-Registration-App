const processFile = require('../../middleware/upload');
const { format } = require('util');
const { Storage } = require('@google-cloud/storage');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
const bucket = storage.bucket('Profile Photo Upload');

const getSinglePhoto = async (req, res) => {
    try {
      const [metaData] = await bucket.file(req.params.name).getMetadata();
      res.redirect(metaData.mediaLink);
      
    } catch (err) {
        console.log("INTERNAL_SERVER_ERROR:", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "fail",
            message: "Could not download the file. " + err,
        });
    }
};

module.exports = { getSinglePhoto };