var q= require("q");
var express = require('express');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
var Daily=mongoose.Schema({
    stt: {type: Number},
    ten: {type: String},
    file: {type: String},
    ngaytao: {type: String},
    soluong:{type: Number},
    hienthi:{type: Number},
}, {collection : 'daily'});
module.exports = mongoose.model('daily', Daily);
