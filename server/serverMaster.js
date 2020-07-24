'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs'),
    configFilePath = path.join(__dirname,'../appConfig.json');


//Loading and parsing the config file
let configFileRawData = fs.readFileSync(configFilePath)
let configs = JSON.parse(configFileRawData);


module.exports = function() {
    let server = express(),
        create,
        start;

    create = function(config) {
        let routes = require('./routes/routesMaster');

        // Server settings
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);

        // Returns middleware that parses json
        server.use(bodyParser.json());

        // Set up routes
        routes.init(server);
    };

    start = function() {
        let hostname = server.get('hostname'),
            port = server.get('port');

        server.listen(port, function () {
            console.log('Express server listening on - http://' + hostname + ':' + port);
        });

        mongoose.connect(configs.dbConnectionString).then(()=>{
            console.log("Mongo Connection Successful")
        })
        .catch(() => {
            console.log("Database Connection failed");
        })
    };

    return {
        create: create,
        start: start
    };
};