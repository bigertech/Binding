/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14/12/23
 * @description
 *
 */

var Promise = require("bluebird"),
    _       = require("lodash");

module.exports = {
    init: function (app) {

        return new Promise(function (resolve, reject) {

            /**
             * 绑定订单号和QQ号
             */
            app.post('/binding', function (req, res) {
                var order_num    = req.body.order_num ? req.body.order_num.trim() : null,
                    qq           = req.body.qq ? req.body.qq.trim() : null,
                    orderRecords = {},
                    orderUnusedIndex,
                    orderRemain;

                // 检测数据完整性
                if (!order_num || !qq){
                    return res.status(500).json({err: '数据不完整'});
                }

                // 查询binding
                app.models.binding.find({order_num: order_num}).then(function (result) {

                    orderRecords = result;

                    // 检测order_num 是否存在
                    if (_.isEmpty(orderRecords)){
                        throw '订单编号不存在';
                    }

                    // 检测order_num 是否已经被用完，并给出当前还没用的索引
                    for (var i = 0; i < orderRecords.length; i++) {
                        if (!orderRecords[i].isUsed || !orderRecords[i].qq){
                            orderUnusedIndex = i;
                            orderRemain = orderRecords.length - (i+1);
                            break;
                        }
                        if (i == orderRecords.length - 1){
                            throw '该订单号已领取过';
                        }
                    }

                    // 检测 QQ 是否已被绑定
                    return app.models.binding.findOne({qq: qq});
                }).then(function (result) {

                    if (result){
                        throw '该QQ号已领取过';
                    }

                    // 绑定QQ号码
                    return app.models.binding.update({id:orderRecords[orderUnusedIndex].id},{qq: qq, isUsed: true});

                }).then(function (result) {
                    res.json({
                        status : 'success',
                        remain : orderRemain
                    });
                }).catch(function (err) {
                    if (err){
                        res.json({
                            status  : 'error',
                            message : err
                        });
                    }
                });
            });

            /**
             * 获取绑定的QQ号码
             */
            app.get('/list', function (req, res) {
                app.models.binding.find({isUsed:1}).then(function (result) {
                    var qqArray = [];
                    _.forEach(result, function (binding) {
                        qqArray.push(binding.qq);
                    });
                    res.json(qqArray);
                }).catch(function (err) {
                    res.status(500).json({err: err});
                    console.log(err);
                });
            });

            /*
            REST full routes
             */
            /*
            app.get('/api/binding', function(req, res) {
                app.models.binding.find().exec(function(err, models) {
                    if (err){
                        return res.status(500).json({err: err});
                    }
                    console.log(models);
                    res.json(models);
                });
            });


            app.post('/api/binding', function(req, res) {
                app.models.binding.create(req.body, function(err, model) {
                    if (err){
                        return res.status(500).json({err: err});
                    }
                    res.json(model);
                });
            });

            app.get('/api/binding/:id', function(req, res) {
                app.models.binding.findOne({ id: req.params.id }, function(err, model) {
                    if (err){
                        return res.status(500).json({err: err});
                    }
                    res.json(model);
                });
            });

            app.delete('/api/binding/:id', function(req, res) {
                app.models.binding.destroy({ id: req.params.id }, function(err) {
                    if (err){
                        return res.status(500).json({err: err});
                    }
                    res.json({ status: 'ok' });
                });
            });

            app.put('/api/binding/:id', function(req, res) {
                // Don't pass ID to update
                delete req.body.id;

                app.models.binding.update({ id: req.params.id }, req.body, function(err, model) {
                    if (err){
                        return res.status(500).json({err: err});
                    }
                    res.json(model);
                });
            });
            */

            resolve(app);
        });
    }
};