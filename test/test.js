/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14/12/25
 * @description
 *
 */

var should    = require("should"),
    request   = require("supertest");


describe('Binding route test', function () {

    var app ,
        preData;

    before(function (done) {
        // 启动应用
        require("../app.js").then(function (appliaction) {
            return app = appliaction;
        }).then(function () {
            // 准备数据
            return app.models.binding.create([
                {order_num: '7703718173', qq: '446289691'},
                {order_num: '6577818241'}
            ]);
        }).then(function (result) {
            preData = result ;
            done();
        }).catch(function (err) {
            console.log(err);
            done();
        });
    });

    // 删除测试数据
    after(function (done) {
        app.models.binding.destroy({id: preData[0].id}).then(function (result) {
            return app.models.binding.destroy({id: preData[1].id});
        }).then(function () {
            done();
        }).catch(function (err) {
            console.log(err);
            done();
        });
    });

    describe('POST /binding', function () {

        // Case 1 : 缺少必要信息
        describe('#Case 1 : 缺少必要信息', function () {
            it('should return the 500 error message', function (done) {
                request(app)
                    .post('/binding')
                    .set('Accept', 'application/json')
                    .send({order_num: preData[0].order_num})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end(function (err, result) {
                        if (err){
                            return done(err);
                        }
                        done();
                    });
            });
        });

        // Case 2 : 订单号填错
        describe('#Case 2 : 订单号填错', function () {
            it('should return the 500 error message', function (done) {
                request(app)
                    .post('/binding')
                    .set('Accept', 'application/json')
                    .send({order_num: '000000', qq: '446289691'})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end(function (err, result) {
                        if (err){
                            return done(err);
                        }
                        done();
                    });
            });
        });

        // Case 3 : QQ号已被绑定
        describe('#Case 3 : QQ号已被绑定', function () {
            it('should return the 500 error message', function (done) {
                request(app)
                    .post('/binding')
                    .set('Accept', 'application/json')
                    .send({order_num: preData[1].order_num, qq: '446289691'})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end(function (err, result) {
                        if (err){
                            return done(err);
                        }
                        done();
                    });
            });
        });

        // Case 4 : 订单号已被绑定
        describe('#Case 4 : 订单号已被绑定', function () {
            it('should return the 500 error message', function (done) {
                request(app)
                    .post('/binding')
                    .set('Accept', 'application/json')
                    .send({order_num: preData[0].order_num, qq: '446289691'})
                    .expect('Content-Type', /json/)
                    .expect(500)
                    .end(function (err, result) {
                        if (err){
                            return done(err);
                        }
                        done();
                    });
            });
        });

        // Case 5 : 订单号填对，QQ号填对
        describe('#Case 5 : 订单号填对，QQ号填对', function () {
            it('should return the 200 success json', function (done) {
                request(app)
                    .post('/binding')
                    .set('Accept', 'application/json')
                    .send({order_num: preData[0].order_num, qq: '12345678'})
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, result) {
                        if (err){
                            return done(err);
                        }
                        done();
                    });
            });
        });
    });

    describe.skip('GET /api/binding', function(){
        it('respond with json', function(done){
            request(app)
                .get('/api/binding')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, result) {
                    console.log(result.body);
                    done();
                });
        });
    });

    describe.skip('POST /api/binding', function(){
        it('respond with json', function(done){
            request(app)
                .post('/api/binding')
                .send({order_num: '7703718173'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, result) {
                    console.log(result.body);
                    done();
                });
        });
    });


});


