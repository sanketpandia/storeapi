'use strict';

const
    server = require('./server/serverMaster')(),
    config = require('./configs/masterConfig');

server.create(config);
server.start();