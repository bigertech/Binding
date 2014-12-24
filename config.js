/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14/12/23
 * @description
 *
 */

var mysqlAdapter = require('sails-mysql');

var config = {

    // Setup Adapters
    // Creates named adapters that have have been required
    adapters: {
        'default': mysqlAdapter,
        mysql: mysqlAdapter
    },

    // Build Connections Config
    // Setup connections using the named adapter configs
    connections: {

        myLocalMySql: {
            adapter: 'mysql',
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'bg_binding'
        }
    },

    defaults: {
        migrate: 'alter'
    }

};

module.exports = config;