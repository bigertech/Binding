/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14/12/23
 * @description
 *
 */

//  注册路由表
app.get('/users', function(req, res) {
    app.models.user.find().exec(function(err, models) {
        if(err) return res.json({ err: err }, 500);
        res.json(models);
    });
});

app.post('/users', function(req, res) {
    app.models.user.create(req.body, function(err, model) {
        if(err) return res.json({ err: err }, 500);
        res.json(model);
    });
});

app.get('/users/:id', function(req, res) {
    app.models.user.findOne({ id: req.params.id }, function(err, model) {
        if(err) return res.json({ err: err }, 500);
        res.json(model);
    });
});

app.delete('/users/:id', function(req, res) {
    app.models.user.destroy({ id: req.params.id }, function(err) {
        if(err) return res.json({ err: err }, 500);
        res.json({ status: 'ok' });
    });
});

app.put('/users/:id', function(req, res) {
    // Don't pass ID to update
    delete req.body.id;

    app.models.user.update({ id: req.params.id }, req.body, function(err, model) {
        if(err) return res.json({ err: err }, 500);
        res.json(model);
    });
});