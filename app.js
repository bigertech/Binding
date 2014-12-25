/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14/12/23
 * @description
 *
 */

var express     = require('express'),
    bodyParser  = require('body-parser'),
    http        = require('http'),
    multer      = require('multer'),
    routes      = require("./routes");
    app         = express();


//////////////////////////////////////////////////////////////////
// EXPRESS SETUP
//////////////////////////////////////////////////////////////////

//  设置端口为process.env.PORT或者3000
app.set('port', process.env.PORT || 3000);

//  设置body的解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer());

var dataProvider = require("./models");

// 初始化模型
module.exports = dataProvider().then(function (models) {
    app.models = models;

    // 初始化路由
    return routes.init(app);
}).then(function (app) {

    // 开启服务器
    app.listen(app.get('port'),function(err){
        if (err){
            console.log(err);
        }
        console.log('Express server listening on port ' + app.get('port'));
    });

    return app;
});

