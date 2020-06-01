const cloudinary = require('cloudinary').v2;

const config = require('./config');
const CLOUDINARY_URL = config.cloudinaryUrl();

cloudinary.config(CLOUDINARY_URL);

const getUploadTag = imageId => cloudinary.uploader.image_upload_tag(imageId)

module.exports = {
  getUploadTag
}