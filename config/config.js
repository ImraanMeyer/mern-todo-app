const dotenv = require('dotenv');

dotenv.config()

module.exports = {
    mongooseURI: process.env.ATLAS_URI,
    port: process.env.PORT
}