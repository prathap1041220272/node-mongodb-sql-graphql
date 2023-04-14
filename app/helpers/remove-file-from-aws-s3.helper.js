/* eslint-disable no-undef */
const { aws_s3 } = require('../lib/aws-s3.library');

const s3 = new aws_s3.S3();

async function removeFilesInAwsS3(files) {
    const key = files.split('/')[3];
    var params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
    };
    s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
    });
}

module.exports = { removeFilesInAwsS3 };