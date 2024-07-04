/* Use mongodb driver (test) */
const { MongoClient } = require('mongodb');
const services = require('../service-layer')('./services');
const config = require('../configs/config');

const connectionString = config.mongodb.atlas_uri || 'mongodb://localhost:27017/mydatabase';

let client;

async function connect() {
    try {
        client = await MongoClient.connect(connectionString, {});
        services.log.info('Connected to MongoDB');
    } catch (error) {
        services.log.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

function getClient() {
    return client;
}

module.exports = { connect, getClient };
