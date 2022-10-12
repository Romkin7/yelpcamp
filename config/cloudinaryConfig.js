const cloudinary = require('cloudinary');

/* Configure Cloudinary */
async function configClodinary() {
    cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });
}

module.exports = configClodinary;
