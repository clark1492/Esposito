// config.js
module.exports = {
    port: process.env.PORT || 3000,
    logLevel: 'info',
    mongodb: {
        atlas_uri: 'mongodbcs',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME || 'username',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'mydatabase'
    }
};