const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    router = require('./router'),
    app = express(),
    PORT = process.env.PORT || 2020;

class Server {

    constructor() {
        this.initExpressMiddleware();
        this.start();
    }

    initExpressMiddleware() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).send('internal server error');
        });
    }

    start() {
        router.load(app, './controllers')
        app.listen(PORT, (err) => {
            if (err) console.log(`Error: ${err}`);
            else console.log(`Server is running on port: ${PORT}`);
        })
    }
}

module.exports = new Server();