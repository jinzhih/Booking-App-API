const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const { S3_ACCESSKEY, S3_SECRET, S3_BUCKET } = process.env;

const s3 = new aws.S3({
    accessKeyId: S3_ACCESSKEY,
    secretAccessKey: S3_SECRET,
    Bucket: S3_BUCKET,
});

const profileUpload = multer({
/*     storage: multerS3({
        s3: s3,
        bucket: 'bookingupload-aibt-test',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(
                null,
                path.basename(
                    file.originalname,
                    path.extname(file.originalname)
                ) +
                    '-' +
                    Date.now() +
                    path.extname(file.originalname)
            );
        },
    }), */
    //  For Dev 
    dest: 'uploads/',
    limits: { fileSize: 5000000 }, //limit 5M, In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).any();

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /doc|docx|pdf|xlsx|jpg|jpeg|png/;

    // Check ext
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Invalid File Type!');
    }
}

function upload(req, res) {
    profileUpload(req, res, (error) => {
        if (error) {
            console.log('errors', error);
            return res.json({ error: error });
        } else {
            // If File not found
            if (req.files === undefined) {
                console.log('Error: No File Selected!');
                return res.json('Error: No File Selected');
            } else {
                // If Success
                const file = req.files[0];
                const fileName = file.originalname;
                const fileLocation = file.path;
                /*  let fileArray = req.files;
            const fileLocationArray = [];
            for (let i = 0; i < fileArray.length; i++) {
                fileLocation = fileArray[i].path;
                console.log('filenm', fileLocation);
                fileLocationArray.push(fileLocation);
            } */
                // Save the file name into database

                // Save the file name into database into profile model
                return res.json({
                    fileName,
                    fileLocation,
                });
            }
        }
    });
}

module.exports = { upload };
