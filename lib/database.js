const mongoose = require('mongoose'),
    dbConfig = require('./configLoader').databaseConfig,
    connectionString = 'mongodb://' + dbConfig.host + '/' + dbConfig.database;

let connection = null;

class Database {

    open(callback) {
        var options = {
            useMongoClient: true,
            promiseLibrary: global.Promise
        };
        mongoose.connect(connectionString, options, (err) => {
            if (err) {
                console.error('mongoose.connect() failed: ' + err);
            }
        });
        connection = mongoose.connection;

        mongoose.connection.on('error', (err) => {
            console.error('Error connecting to MongoDB: ' + err);
            callback(err, false);
        });

        mongoose.connection.once('open', () => {
            console.log('We have connected to mongodb');
            callback(null, true);
        });

    }

    close() {
        connection.close(() => {
            console.log('Mongoose default connection disconnected');
            process.exit(0);
        });
    }

}

module.exports = new Database();
