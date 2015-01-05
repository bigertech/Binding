/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14/12/23
 * @description
 *
 */
var Waterline = require("waterline");
var Binding = Waterline.Collection.extend({

    schema      : true,
    identity    : 'binding',
    tableName   : 'binding',
    connection  : 'myLocalMySql',

    attributes: {
        order_num   : {type: 'string', numeric: true},
        qq          : {type: 'string', unique: true, numeric: true},
        isUsed      : {type: 'boolean', defaultsTo : false}
    }
});

module.exports = Binding;