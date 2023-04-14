/* eslint-disable no-undef */
const { aws_s3 } = require('../lib/aws-s3.library');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws_s3.S3();

const fileFilter = (req, file, cb) => {
    req.fieldname = file.fieldname;
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Wrong file type, only upload JPEG and/or PNG !'),
            false);
    }
};

const uploadS3 = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: process.env.AWS_S3_BUCKET,
        key: (req, file, cb) => {
            // console.log(req.file, req)
            /*I'm using Date.now() to make sure my file has a unique name*/
            const fileName = Date.now() + file.originalname.replace(/ /g, '-');
            req.file = fileName;
            // console.log(file)
            req[file.fieldname] = {
                logo: process.env.AWS_S3_URL + fileName,
                fileName: file.originalname,
                size: req.body.size
            };
            req['fileName'] = file.originalname;
            cb(null, fileName);
        }
    })
});

module.exports = { uploadS3 };