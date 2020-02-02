const express = require('express'),
    path = require('path'),
    fs = require('fs');

class Router {

    constructor() {
        this.startFolder = null
    }

    load(app, folderName) {
        if (!this.startFolder) this.startFolder = path.basename(folderName);

        fs.readdirSync(folderName).forEach(file => {
            const fullName = path.join(folderName, file);
            const stat = fs.lstatSync(fullName);

            if (stat.isDirectory()) {
                this.load(app, fullName);
            } else if (file.toLowerCase().indexOf('.js')) {
                let dirs = path.dirname(fullName).split(path.sep);

                if (dirs[0].toLowerCase() === this.startFolder.toLowerCase()) {
                    dirs.shift();
                }

                const router = express.Router();
                const baseRoute = '/' + dirs.join('/');
                console.log('Created route: ' + baseRoute + ' for ' + fullName);
                const controllerClass = require('../' + fullName);
                const controller = new controllerClass(router);
                app.use(baseRoute, router)
            }
        });
    }
}

module.exports = new Router();