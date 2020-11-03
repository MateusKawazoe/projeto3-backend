require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dfzp80pg3',
    api_key: 229566936416442,
    api_secret: 'rC6q3kExzB09hXeWnIxIijohM8Y',
});

module.exports = { cloudinary };