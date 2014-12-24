/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14/12/23
 * @description
 *
 */


var Waterline   = require("waterline"),
    Promise     = require("bluebird"),
    config      = require("../config"),
    Binding     = require("./Binding.js"),
    orm         = new Waterline();

module.exports = function () {
    orm.loadCollection(Binding);
    return new Promise (function (resolve, reject) {
        orm.initialize(config, function(err, models) {
            if (err){
                reject(err);
            }
            resolve(models.collections);
        });
    });
};