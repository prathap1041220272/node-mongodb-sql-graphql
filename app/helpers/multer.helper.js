const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');
const dUri = new Datauri();

const storage = multer.memoryStorage();
const multerUploads = (uploadType, fileType) => {
    return multer({ storage })[uploadType](fileType);
};

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

// app.post('/upload', multerUploads, (req, res) => {
//     if(req.file) {
//         const file = dataUri(req).content;
//         const result = await  uploader.upload(file)
//          const image = result.url;
//     }}
// );

module.exports = { multerUploads, dataUri };