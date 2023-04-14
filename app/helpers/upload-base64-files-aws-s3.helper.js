/* eslint-disable no-undef */
const { aws_s3 } = require('../lib/aws-s3.library');

const s3 = new aws_s3.S3({ params: { Bucket: process.env.AWS_S3_BUCKET } });

function uploadBase64(path, loc) {
  return new Promise((resolve, reject) => {
    const base64Data = new Buffer.from(path.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${loc}`, // type is not required
      Body: base64Data,
      ContentEncoding: 'base64', // required
      ContentType: 'image/png', // required. Notice the back ticks
    };
    s3.upload(params, (err, data) => {
      if (err) {
        console.log('Error uploading data: ', err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = { uploadBase64 };
