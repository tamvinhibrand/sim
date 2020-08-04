var express = require('express');
var router = express.Router();
var helper= require('../helpers/helper.js');
var session = require('express-session');
module.exports = function(app) {
    var searchCtrl = require('./api/search');

    // todoList Routes
    app.route('/search/:key')
        .get(searchCtrl.get);


    app.route('/search/:key/:page')
        .get(searchCtrl.getpage);
};