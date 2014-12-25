/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14/12/25
 * @description
 *
 */

var app       = require("express"),
    routes    = require("../routes");
    should    = require("should"),
    request   = require("supertest");

describe('GET /api/binding', function(){
    it('respond with json', function(done){

        var dataProvider = require("../models");
        // 初始化模型
        dataProvider().then(function (models) {
            app.models = models;

            // 初始化路由
            return routes.init(app);
        }).then(function () {
            request(app)
                .get('/api/binding')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, result) {
                    console.log(result);
                    done();
                });
        });
    });
});