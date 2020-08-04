var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
var banking=mongoose.Schema({
    ten: {type: String},
    website: {type: String},
    chutk: {type: String},
    sotk: {type: String},
    stt: {type: Number},
    ngaytao: {type: Number},
    hienthi:{type: Number},
}, {collection : 'banking'});
module.exports = mongoose.model('banking', banking);
