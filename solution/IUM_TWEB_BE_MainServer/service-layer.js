'use strict';
module.exports = (dir) => {
    const config = require('./configs/config');
    const log = require(dir + '/log-service')(config);
    //const data = require(dir + '/myService')(arg1, arg2, arg3);
    return {
        log,
    };
}