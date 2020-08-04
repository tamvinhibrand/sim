var express = require('express');
var router = express.Router();
var Muser= require('../models/user');
var helper= require('../helpers/helper.js');
var session = require('express-session');
var passport = require('passport');
var async = require("async");
var q= require("q");
var sim_md= require('../models/sim');
var sim_ct= require('../controlers/sim');

module.exports = {
    get: (req, res) => {
        let data = req.body;
        let keyword = req.params.keyword;
        var param=sim_ct.searchSim(req.body.keyword);
        param.then(function(items){
            res.json(items)
        })
    },
    getpage: (req, res) => {
        let data = req.body;
        let keyword = req.params.keyword;
        let page = req.params.page;
        var param=sim_ct.searchSimPage(req.body.keyword,page);
        param.then(function(items){
            res.json(items)
        })
    },
}