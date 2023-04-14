/* eslint-disable no-undef */
'use strict';
const aws_s3 = require('aws-sdk');
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const region = process.env.AWS_S3_REGION;

aws_s3.config.update({
    secretAccessKey: secretAccessKey,
    accessKeyId: accessKeyId,
    region: region
});

module.exports = {
    aws_s3
};