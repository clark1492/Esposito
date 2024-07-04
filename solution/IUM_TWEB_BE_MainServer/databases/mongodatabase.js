const mongoose = require('mongoose');
const services = require('../service-layer')('./services');
const config = require('../configs/config');

const mongoClusterConnectionString = config.mongodb.atlas_uri;
const mongoDB = config.mongodb.database;
//mongoose.Promise = global.Promise; // Not needed in mongoose greater than 5.x (mongoose.Promise = global.Promise;)

async function connect() {
    services.log.info('Trying to connect to MongoDB...');
    return mongoose.connect(mongoClusterConnectionString, {
        dbName: mongoDB
    })
}

module.exports = { connect };